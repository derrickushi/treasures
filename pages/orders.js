import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../frontend/context/authContext';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/orders');
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return `₹${parseFloat(price).toFixed(2)}`;
    };

    const getStatusColor = (status) => {
        const colors = {
            processing: '#8B7355',
            shipped: '#4A90E2',
            delivered: '#2E7D32',
            cancelled: '#D32F2F'
        };
        return colors[status] || '#8B7355';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            pending: '#F57C00',
            completed: '#2E7D32',
            failed: '#D32F2F'
        };
        return colors[status] || '#F57C00';
    };

    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                style={{ background: 'linear-gradient(to bottom, #f5f1e8 0%, #e8dcc8 100%)' }}>
                <div style={{ color: '#3E2723', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
            style={{
                background: 'linear-gradient(to bottom, #f5f1e8 0%, #e8dcc8 100%)',
                fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
            <Head>
                <title>My Orders - Timeless Treasures</title>
                <meta name="description" content="View your order history" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <style jsx>{`
                .vintage-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .vintage-title {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    letter-spacing: 2px;
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .ornament {
                    color: #D4AF37;
                    font-size: 1.5rem;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    margin: 1rem 0;
                }

                .order-card {
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
                    border: 3px solid #8B7355;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .order-card:hover {
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                    transform: translateY(-2px);
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-family: 'Crimson Text', serif;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .order-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .order-id {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .order-date {
                    font-family: 'Crimson Text', serif;
                    color: #704214;
                    font-size: 0.875rem;
                }

                .order-total {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .vintage-button {
                    background: linear-gradient(to bottom, #8B7355 0%, #704214 100%);
                    border: 2px solid #D4AF37;
                    color: #FBF8F1;
                    font-family: 'Playfair Display', serif;
                    font-weight: 600;
                    letter-spacing: 1px;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }

                .vintage-button:hover {
                    background: linear-gradient(to bottom, #704214 0%, #5a3410 100%);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
                    transform: translateY(-2px);
                }

                .order-details {
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 2px solid #C9B896;
                }

                .item-row {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid #E8DCC8;
                }

                .item-image {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border: 2px solid #C9B896;
                    border-radius: 4px;
                }

                .item-info {
                    flex: 1;
                }

                .item-name {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    font-weight: 600;
                    font-size: 1.125rem;
                }

                .item-price {
                    font-family: 'Crimson Text', serif;
                    color: #704214;
                    font-size: 1rem;
                }

                .empty-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: rgba(255, 255, 255, 0.8);
                    border: 3px solid #8B7355;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .empty-state-text {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                .vintage-link {
                    color: #8B7355;
                    text-decoration: none;
                    border-bottom: 1px solid #D4AF37;
                    transition: all 0.3s ease;
                    font-family: 'Crimson Text', serif;
                }

                .vintage-link:hover {
                    color: #D4AF37;
                    border-bottom-color: #8B7355;
                }

                @media (max-width: 640px) {
                    .order-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .item-row {
                        flex-direction: column;
                    }
                }
            `}</style>

            <div className="vintage-container">
                <div className="ornament">❦</div>
                <h1 className="vintage-title text-4xl font-bold">
                    My Orders
                </h1>
                <div className="ornament">✦ ✦ ✦</div>

                {isLoading ? (
                    <div className="text-center py-10">
                        <div style={{ color: '#3E2723', fontFamily: "'Playfair Display', serif", fontSize: '1.25rem' }}>
                            Loading your orders...
                        </div>
                    </div>
                ) : error ? (
                    <div className="empty-state">
                        <div className="empty-state-text">{error}</div>
                        <button onClick={fetchOrders} className="vintage-button mt-4">
                            Try Again
                        </button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty-state">
                        <div className="ornament text-3xl">❦</div>
                        <div className="empty-state-text">No Orders Yet</div>
                        <p style={{ fontFamily: "'Crimson Text', serif", color: '#704214', marginBottom: '2rem' }}>
                            Start your collection journey today
                        </p>
                        <Link href="/">
                            <a className="vintage-button">
                                Browse Treasures
                            </a>
                        </Link>
                    </div>
                ) : (
                    <div>
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <div>
                                        <div className="order-id">Order #{order._id.slice(-8).toUpperCase()}</div>
                                        <div className="order-date">{formatDate(order.createdAt)}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className="order-total">{formatPrice(order.totalAmount)}</div>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <span
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                                    <div>
                                        <strong style={{ fontFamily: "'Crimson Text', serif", color: '#3E2723' }}>
                                            Payment:
                                        </strong>{' '}
                                        <span
                                            className="status-badge"
                                            style={{
                                                backgroundColor: getPaymentStatusColor(order.paymentStatus),
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.75rem'
                                            }}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    <div>
                                        <strong style={{ fontFamily: "'Crimson Text', serif", color: '#3E2723' }}>
                                            Method:
                                        </strong>{' '}
                                        <span style={{ fontFamily: "'Crimson Text', serif", color: '#704214' }}>
                                            {order.paymentMethod}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                    className="vintage-button mt-4"
                                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                                >
                                    {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                                </button>

                                {expandedOrder === order._id && (
                                    <div className="order-details">
                                        <h3 style={{
                                            fontFamily: "'Playfair Display', serif",
                                            color: '#3E2723',
                                            fontSize: '1.25rem',
                                            marginBottom: '1rem'
                                        }}>
                                            Order Items
                                        </h3>
                                        {order.items.map((item, index) => (
                                            <div key={index} className="item-row">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="item-image"
                                                    />
                                                )}
                                                <div className="item-info">
                                                    <div className="item-name">{item.name}</div>
                                                    <div className="item-price">
                                                        {formatPrice(item.price)} × {item.quantity}
                                                    </div>
                                                    <div className="item-price" style={{ fontWeight: 600 }}>
                                                        Subtotal: {formatPrice(parseFloat(item.price) * item.quantity)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid #C9B896' }}>
                                            <h3 style={{
                                                fontFamily: "'Playfair Display', serif",
                                                color: '#3E2723',
                                                fontSize: '1.25rem',
                                                marginBottom: '1rem'
                                            }}>
                                                Shipping Address
                                            </h3>
                                            <div style={{ fontFamily: "'Crimson Text', serif", color: '#704214' }}>
                                                <div><strong>{order.shippingAddress.name}</strong></div>
                                                <div>{order.shippingAddress.email}</div>
                                                <div>{order.shippingAddress.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href="/">
                        <a className="vintage-link">
                            ← Return to Marketplace
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
