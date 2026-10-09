import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { Scissors, Ruler, CheckCircle2, Clock, AlertCircle, Eye, User, Star, DollarSign, X, Zap, MapPin, Check, ThumbsDown, Phone } from 'lucide-react';

export const TailorPortalView = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  // Nearby Broadcast Offers Radar
  const [pendingJobOffers, setPendingJobOffers] = useState([
    {
      id: 101,
      bookingNumber: 'INSTA-8942',
      customerName: 'Pooja Sharma',
      selectedRequirements: 'Fall & Piko Work, Blouse Customisation, Adding Borders',
      timeSlot: 'Express 30 Mins Visit',
      homeAddress: 'B-42, Lajpat Nagar II, New Delhi',
      contactPhone: '+91 9988776655',
      offeredPayout: 387.00, // 80% of total
      distance: '0.8 km away (Lajpat Nagar)'
    }
  ]);

  const [partnerOrders, setPartnerOrders] = useState([
    {
      id: 1,
      orderNumber: 'DZ-849201',
      customerName: 'Pooja Sharma',
      customerPhone: '+91 9988776655',
      categoryName: 'Designer Saree Blouse',
      status: 'STITCHING_IN_PROGRESS',
      necklineStyle: 'Sweetheart Neck',
      sleeveStyle: 'Elbow Length (10")',
      liningOption: 'Padded Premium Cotton',
      totalPrice: 649.00,
      tailorEarnings: 519.20,
      measurements: {
        chest: 36.0,
        waist: 30.0,
        hips: 38.0,
        shoulder: 14.5,
        sleeveLength: 10.5,
        garmentLength: 14.0,
        customNotes: 'Sweetheart neck, padded front, deep back with dori latkans.'
      }
    }
  ]);

  const [selectedMeasurement, setSelectedMeasurement] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/insta-tailor/offers/pending`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPendingJobOffers(data.map(b => ({
            id: b.id,
            bookingNumber: b.bookingNumber,
            customerName: b.customer?.name || 'Neighborhood Customer',
            selectedRequirements: b.selectedRequirements,
            timeSlot: b.timeSlot,
            homeAddress: b.homeAddress,
            contactPhone: b.contactPhone,
            offeredPayout: b.estimatedCost * 0.8,
            distance: '1.2 km away'
          })));
        }
      })
      .catch(() => {});

    if (user?.id) {
      fetch(`${API_BASE_URL}/api/orders/partner/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) setPartnerOrders(data);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleAcceptJobOffer = async (offer) => {
    try {
      await fetch(`${API_BASE_URL}/api/insta-tailor/${offer.id}/accept-offer?tailorId=${user?.id || 2}`, { method: 'PUT' });
    } catch (e) {}

    // Move from pending radar to active accepted queue
    setPendingJobOffers(pendingJobOffers.filter(o => o.id !== offer.id));
    setPartnerOrders([
      {
        id: offer.id,
        orderNumber: offer.bookingNumber,
        customerName: offer.customerName,
        customerPhone: offer.contactPhone,
        categoryName: 'Insta Tailor Visit: ' + offer.selectedRequirements,
        status: 'ACCEPTED',
        necklineStyle: 'At-Home Service',
        sleeveStyle: offer.timeSlot,
        liningOption: 'On-Spot Handiwork',
        totalPrice: offer.offeredPayout / 0.8,
        tailorEarnings: offer.offeredPayout
      },
      ...partnerOrders
    ]);
    showToast(`Accepted Booking #${offer.bookingNumber}! ✂️`, 'gold', `Added to your active queue (Earn ₹${offer.offeredPayout.toFixed(2)})`);
  };

  const handleDeclineJobOffer = (offerId) => {
    setPendingJobOffers(pendingJobOffers.filter(o => o.id !== offerId));
    showToast('Job offer declined', 'info');
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_BASE_URL}/api/orders/${orderId}/status?status=${newStatus}`, { method: 'PUT' });
    } catch (e) {}

    setPartnerOrders(partnerOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to: ${newStatus}`, 'success');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
      
      {/* Partner Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0F382C 0%, #164E3D 100%)', color: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Tailor Partner Portal
          </span>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.2rem' }}>
            Master Workbench - {user?.name || 'Master Rajesh Kumar'}
          </h2>
          <p style={{ color: 'var(--border-light)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Lajpat Nagar Zone • 142 Completed Garments • ★ 4.9 Rating
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-soft)', display: 'block' }}>Pending Offers Radar</span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--gold-accent)' }}>{pendingJobOffers.length} Offers</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-soft)', display: 'block' }}>Active Jobs</span>
            <strong style={{ fontSize: '1.4rem', color: '#FFF' }}>{partnerOrders.length}</strong>
          </div>
        </div>
      </div>

      {/* SECTION 1: INCOMING NEIGHBORHOOD OFFERS RADAR */}
      {pendingJobOffers.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Zap size={22} style={{ color: 'var(--gold-accent)' }} />
            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)' }}>
              Incoming Neighborhood Job Offers (Requires Your Acceptance)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {pendingJobOffers.map(offer => (
              <div 
                key={offer.id} 
                className="glass-card gold-glow-border" 
                style={{ padding: '1.5rem', background: '#FFFDF9', borderRadius: 'var(--radius-lg)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: '800' }}>{offer.bookingNumber}</span>
                  <span style={{ background: '#FEF3C7', color: '#92400E', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '800' }}>
                    ⚡ {offer.distance}
                  </span>
                </div>

                <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                  {offer.selectedRequirements}
                </h4>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Customer: <strong>{offer.customerName}</strong> • Slot: <strong>{offer.timeSlot}</strong>
                  <br />
                  <MapPin size={14} style={{ display: 'inline', marginRight: '3px' }} /> Address: {offer.homeAddress}
                </div>

                <div style={{ background: 'var(--bg-ivory)', border: '1px solid var(--border-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Offered Payout Amount</span>
                  <strong style={{ fontSize: '1.3rem', color: '#15803D' }}>₹{offer.offeredPayout.toFixed(2)}</strong>
                </div>

                {/* Tailor Accept / Decline Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => handleDeclineJobOffer(offer.id)}
                    className="btn-outline" 
                    style={{ flex: 1, justifyContent: 'center', padding: '0.6rem' }}
                  >
                    <ThumbsDown size={16} /> Decline
                  </button>
                  <button 
                    onClick={() => handleAcceptJobOffer(offer)}
                    className="btn-gold" 
                    style={{ flex: 1.5, justifyContent: 'center', padding: '0.6rem' }}
                  >
                    <Check size={18} /> Accept Job Offer
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: ACCEPTED STITCHING QUEUE */}
      <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)', marginBottom: '1rem' }}>
        Accepted Stitching & Visit Queue
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {partnerOrders.map(ord => (
          <div key={ord.id} className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border-gold)' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-accent)', fontWeight: '700' }}>{ord.orderNumber}</span>
                <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary-emerald)' }}>{ord.categoryName}</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Customer: <strong>{ord.customerName || 'Pooja Sharma'}</strong> ({ord.customerPhone || '+91 9988776655'})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {ord.measurements && (
                  <button 
                    onClick={() => setSelectedMeasurement(ord.measurements)}
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    <Eye size={16} /> View Measurement Spec
                  </button>
                )}

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Partner Earnings</span>
                  <strong style={{ fontSize: '1.2rem', color: '#15803D' }}>₹{ord.tailorEarnings ? ord.tailorEarnings.toFixed(2) : (ord.totalPrice * 0.8).toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Customization Details Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{ background: 'var(--bg-ivory)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600' }}>
                Style: {ord.necklineStyle}
              </span>
              <span style={{ background: 'var(--bg-ivory)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '600' }}>
                Slot: {ord.sleeveStyle}
              </span>
            </div>

            {/* Status Transition Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>Update Progress:</span>
              
              {['ACCEPTED', 'FABRIC_PICKED_UP', 'STITCHING_IN_PROGRESS', 'QUALITY_CHECK', 'OUT_FOR_FITTING', 'DELIVERED'].map(stg => (
                <button
                  key={stg}
                  onClick={() => handleUpdateStatus(ord.id, stg)}
                  style={{
                    padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
                    fontSize: '0.75rem', fontWeight: '700',
                    background: ord.status === stg ? 'var(--primary-emerald)' : 'var(--bg-ivory)',
                    color: ord.status === stg ? 'var(--gold-accent)' : 'var(--text-muted)'
                  }}
                >
                  {stg.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Measurement Spec Card Modal */}
      {selectedMeasurement && (
        <div className="modal-overlay" onClick={() => setSelectedMeasurement(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '500px' }}>
            <button 
              onClick={() => setSelectedMeasurement(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Ruler size={20} style={{ color: 'var(--gold-accent)' }} /> Measurement Blueprint Card
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'var(--bg-ivory)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              <div>Bust / Chest: <strong>{selectedMeasurement.chest}"</strong></div>
              <div>Waist: <strong>{selectedMeasurement.waist}"</strong></div>
              <div>Hips: <strong>{selectedMeasurement.hips}"</strong></div>
              <div>Shoulder: <strong>{selectedMeasurement.shoulder}"</strong></div>
              <div>Sleeve Length: <strong>{selectedMeasurement.sleeveLength}"</strong></div>
              <div>Garment Length: <strong>{selectedMeasurement.garmentLength}"</strong></div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <strong>Custom Notes:</strong> "{selectedMeasurement.customNotes}"
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
