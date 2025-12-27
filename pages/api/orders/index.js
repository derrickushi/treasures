import dbConnect from '../../../backend/lib/mongodb';
import Order from '../../../backend/models/Order';
import Product from '../../../backend/models/Product';
import { authMiddleware } from '../../../backend/middleware/auth';

async function handleGet(req, res) {
    try {
        // Get orders for the authenticated user
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Get orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching orders',
        });
    }
}

async function handlePost(req, res) {
    try {
        const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Validation
        if (!items || !items.length || !totalAmount || !shippingAddress) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // Verify products exist and have sufficient inventory
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${item.name} not found`,
                });
            }

            if (product.currentInventory < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient inventory for ${product.title}`,
                });
            }
        }

        // Create order
        const order = await Order.create({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'UPI',
            paymentStatus: 'pending',
            orderStatus: 'processing',
        });

        // Update inventory
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { currentInventory: -item.quantity } }
            );
        }

        // Populate product details
        await order.populate('items.product');

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating order',
        });
    }
}

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            return handleGet(req, res);
        case 'POST':
            return handlePost(req, res);
        default:
            return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}

export default authMiddleware(handler);
