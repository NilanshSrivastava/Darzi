import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { Package, Clock, CheckCircle2, Scissors, MapPin, Truck, RefreshCw, UserCheck, Crown, Wrench, MessageCircle, Phone, Sparkles, Heart } from 'lucide-react';

export const OrderTracker = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'DZ-849201',
      categoryName: 'Designer Saree Blouse',
      status: 'STITCHING_IN_PROGRESS',
      necklineStyle: 'Sweetheart Neck (Mulmul Cotton)',
      sleeveStyle: 'Elbow Length (10")',
      tailorName: 'Master Rajesh Kumar (Lajpat Nagar)',
      tailorPhone: '+91 98112 23344',
      tailorRating: 4.9,
      pickupAddress: 'B-42, Lajpat Nagar II, New Delhi',
      totalPrice: 649.00,
      freeAdjustmentTicketsLeft: 2,
      createdAt: '2026-10-08T14:30:00',
      artisanMessage: 'Master Rajesh has chalked your pattern darts and is currently hand-stitching the neckline piping.'
    }
  ]);

  const [claimedNotice, setClaimedNotice] = useState(null);

  const fetchOrders = () => {
    if (user?.id) {
      fetch(`${API_BASE_URL}/api/orders/customer/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setOrders(data.map(o => ({
              id: o.id,
              orderNumber: o.orderNumber,
              categoryName: o.category ? o.category.name : 'Bespoke Apparel',
              status: o.status,
              necklineStyle: o.necklineStyle || 'Custom Neckline',
              sleeveStyle: o.sleeveStyle || 'Custom Sleeve',
              tailorName: o.tailor ? o.tailor.name : 'Master Rajesh Kumar (Lajpat Nagar)',
              tailorPhone: '+91 98112 23344',
              tailorRating: 4.9,
              pickupAddress: o.pickupAddress || 'Customer Address',
              totalPrice: o.totalPrice,
              freeAdjustmentTicketsLeft: 2,
              createdAt: o.createdAt,
              artisanMessage: 'Your master tailor is crafting each seam with care for your doorstep trial.'
            })));
          }
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleClaimFreeAdjustment = (orderId) => {
    setOrders(orders.map(o => {
      if (o.id === orderId && o.freeAdjustmentTicketsLeft > 0) {
        const msg = `Free Doorstep Fitting Adjustment Claimed for ${o.orderNumber}! Masterji specialist assigned.`;
        setClaimedNotice(msg);
        showToast(msg, 'gold', 'Doorstep visit scheduled at no cost');
        return { ...o, freeAdjustmentTicketsLeft: o.freeAdjustmentTicketsLeft - 1 };
      }
      return o;
    }));
  };

  const stages = [
    { key: 'ACCEPTED', label: 'Order Confirmed', desc: 'Fabric spec & measurements logged' },
    { key: 'FABRIC_PICKED_UP', label: 'Fabric Collected', desc: 'Doorstep executive collected cloth' },
    { key: 'STITCHING_IN_PROGRESS', label: 'Master Stitching', desc: 'Pattern cut & seams stitched by Masterji' },
    { key: 'QUALITY_CHECK', label: 'Measurement Audit', desc: 'Iron pressed & seam allowance checked' },
    { key: 'OUT_FOR_FITTING', label: 'Doorstep Trial', desc: 'Try at home with female specialist' },
    { key: 'DELIVERED', label: 'Delivered & Delighted', desc: '14-day fit guarantee starts' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'ACCEPTED': return 0;
      case 'FABRIC_PICKED_UP': return 1;
      case 'STITCHING_IN_PROGRESS': return 2;
      case 'QUALITY_CHECK': return 3;
      case 'OUT_FOR_FITTING': return 4;
      case 'DELIVERED': return 5;
      default: return 2;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Live Fitting Journey
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--primary-emerald)', marginTop: '0.2rem' }}>
            My Active Stitching Orders
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
            Track every gentle stitch from doorstep fabric pickup to your private living room trial fit.
          </p>
        </div>

        <button 
          onClick={fetchOrders}
          className="btn-outline" 
          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
        >
          <RefreshCw size={15} /> Refresh Journey
        </button>
      </div>

      {/* Claimed Adjustment Notice */}
      {claimedNotice && (
        <div className="glass-card gold-glow-border" style={{
          padding: '1.25rem 1.6rem',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#78350F'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={20} style={{ color: '#D97706' }} />
            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{claimedNotice}</span>
          </div>
          <button
            onClick={() => setClaimedNotice(null)}
            style={{ background: 'none', border: 'none', color: '#78350F', fontWeight: '800', cursor: 'pointer', fontSize: '0.82rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {orders.map(order => {
          const currentStageIndex = getStageIndex(order.status);

          return (
            <div 
              key={order.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1.5px solid var(--border-gold)',
                padding: '2.2rem',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              
              {/* Order Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '800' }}>
                      {order.orderNumber}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Booked: {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.65rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>
                    {order.categoryName}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {order.necklineStyle} • {order.sleeveStyle}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                    Total Fair Wage
                  </span>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-emerald)', lineHeight: 1.1 }}>
                    ₹{order.totalPrice ? order.totalPrice.toFixed(2) : '649.00'}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: '700' }}>
                    ✓ 100% Fit Guarantee Active
                  </span>
                </div>
              </div>

              {/* Master Tailor In-Action Human Card */}
              <div style={{
                background: '#FAF7F2',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Master Tailor"
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-accent)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--primary-emerald)' }}>{order.tailorName}</strong>
                      <span style={{ background: 'var(--gold-soft)', color: '#92400E', padding: '0.1rem 0.45rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                        ★ {order.tailorRating || '4.9'} Masterji
                      </span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                      "{order.artisanMessage || 'Taking extra care with inner seam allowance.'}"
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={`tel:${order.tailorPhone || '+919811223344'}`}
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', textDecoration: 'none' }}
                  >
                    <Phone size={14} /> Call Tailor
                  </a>
                  <button
                    onClick={() => showToast('Connecting you with Masterji on WhatsApp...', 'info')}
                    className="btn-gold"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                  >
                    <MessageCircle size={14} /> WhatsApp Update
                  </button>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '1.25rem' }}>
                  Craft Journey Milestones:
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', position: 'relative' }}>
                  {stages.map((stage, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        style={{
                          background: isCurrent ? 'var(--gold-soft)' : (isCompleted ? '#F0FDF4' : '#F9FAFB'),
                          border: isCurrent ? '2px solid var(--primary-emerald)' : (isCompleted ? '1.5px solid #86EFAC' : '1px solid var(--border-light)'),
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.35rem',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: isCompleted ? '#16A34A' : (isCurrent ? 'var(--primary-emerald)' : '#E5E7EB'),
                            color: isCompleted || isCurrent ? '#FFFFFF' : '#6B7280',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.78rem', fontWeight: '800'
                          }}>
                            {isCompleted ? '✓' : idx + 1}
                          </span>
                          {isCurrent && (
                            <span style={{ background: 'var(--primary-emerald)', color: '#FFF', fontSize: '0.68rem', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                              In Progress
                            </span>
                          )}
                        </div>

                        <strong style={{ fontSize: '0.88rem', color: isCurrent ? 'var(--primary-emerald)' : (isCompleted ? '#166534' : '#6B7280'), marginTop: '0.3rem' }}>
                          {stage.label}
                        </strong>

                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                          {stage.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Free Fitting Adjustment Ticket Guarantee Box */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Wrench size={17} style={{ color: 'var(--gold-accent)' }} />
                    <strong style={{ fontSize: '0.92rem', color: 'var(--primary-emerald)' }}>
                      Free Doorstep Fitting Adjustments
                    </strong>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '0.1rem 0.55rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: '800' }}>
                      {order.freeAdjustmentTicketsLeft} Tickets Available
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Need a tweak after trying on your garment? Click to summon our specialist for a free doorstep adjustment within 30 days.
                  </p>
                </div>

                <button
                  onClick={() => handleClaimFreeAdjustment(order.id)}
                  disabled={order.freeAdjustmentTicketsLeft <= 0}
                  className="btn-gold"
                  style={{
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.84rem',
                    opacity: order.freeAdjustmentTicketsLeft <= 0 ? 0.5 : 1
                  }}
                >
                  <RefreshCw size={15} /> Claim Free Fitting Tweak
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
