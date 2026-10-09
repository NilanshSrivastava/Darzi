import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { LiveTailorTrackerMap } from './LiveTailorTrackerMap';
import { Zap, Clock, MapPin, CheckCircle2, Phone, Home, ShieldCheck, Sparkles, Scissors, UserCheck, Radio, Tag, Gift, Truck, Heart, Calendar, User } from 'lucide-react';

export const InstaTailorSection = () => {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const availableRequirements = [
    { id: 'fall_piko', title: 'Fall & Piko Work', desc: 'Saree fall hand-tucking & interlock piko border edging', basePrice: 99, icon: '🧵', tag: '30-min fix' },
    { id: 'stitching', title: 'Express Custom Stitching', desc: 'Doorstep measurement, pattern chalking & fabric cutting pickup', basePrice: 249, icon: '✂️', tag: 'Custom fit' },
    { id: 'designing', title: 'Bespoke Design Consultation', desc: 'At-home fashion styling, neckline guidance & fabric advice', basePrice: 199, icon: '✨', tag: 'Stylist visit' },
    { id: 'blouse_custom', title: 'Blouse Fitting & Latkans', desc: 'Cup padding, side zipper insertion, neck nip & dori fitting', basePrice: 179, icon: '👚', tag: 'Popular' },
    { id: 'curtain_handiwork', title: 'Curtains & Drape Hemming', desc: 'Height shortening, side hem stitching & eyelet ring replacement', basePrice: 149, icon: '🪟', tag: 'Home decor' },
    { id: 'bedsheet_handiwork', title: 'Bedsheet Elasticity & Borders', desc: 'Corner fitted elastic attachment & pillow cover border piping', basePrice: 129, icon: '🛏️', tag: 'Home comfort' },
    { id: 'adding_borders', title: 'Adding Borders & Gota Patti', desc: 'Precision attachment of lace, gota patti & Banarasi borders', basePrice: 159, icon: '🎀', tag: 'Festive upgrade' },
    { id: 'alterations', title: 'Waist & Sleeve Alterations', desc: 'Invisible zipper replacement, waist tapering, sleeve shortening', basePrice: 99, icon: '🪡', tag: 'Fast turnaround' }
  ];

  const [selectedReqIds, setSelectedReqIds] = useState(['fall_piko', 'blouse_custom']);
  const [timeSlot, setTimeSlot] = useState('Express 30 Mins Visit');
  const [preferFemaleSpecialist, setPreferFemaleSpecialist] = useState(true);
  const [homeAddress, setHomeAddress] = useState(user?.neighborhood ? `${user.neighborhood}, Delhi NCR` : 'B-42, Lajpat Nagar II, New Delhi');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 98765 43210');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeBookings, setActiveBookings] = useState([
    {
      id: 1,
      bookingNumber: 'INSTA-4892',
      selectedRequirements: 'Fall & Piko Work, Blouse Fitting & Latkans',
      timeSlot: 'Express 30 Mins Visit (+₹50)',
      assignedTailorName: 'Master Rajesh Kumar (Lajpat Nagar)',
      tailorVehicleNo: 'Hero Splendor DL-3S-9821',
      tailorEta: '12 Mins Away',
      homeAddress: 'B-42, Lajpat Nagar II, New Delhi',
      estimatedCost: 328.00,
      discountApplied: 200.00,
      finalPrice: 128.00,
      status: 'OFFER_ACCEPTED_TAILOR_DISPATCHED'
    }
  ]);

  const toggleRequirement = (id) => {
    if (selectedReqIds.includes(id)) {
      if (selectedReqIds.length > 1) {
        setSelectedReqIds(selectedReqIds.filter(item => item !== id));
      } else {
        showToast('Please keep at least 1 service selected', 'info');
      }
    } else {
      setSelectedReqIds([...selectedReqIds, id]);
      const added = availableRequirements.find(r => r.id === id);
      showToast(`Added ${added?.title}`, 'info');
    }
  };

  // Gross cost calculation including +₹50 express visit surcharge and ₹0 first-order delivery
  const calculateGrossCost = () => {
    const itemsTotal = selectedReqIds.reduce((sum, id) => {
      const item = availableRequirements.find(r => r.id === id);
      return sum + (item ? item.basePrice : 0);
    }, 0);
    
    // Express visit surcharge: +₹50
    const expressSurcharge = timeSlot.includes('Express') ? 50 : 0;
    
    // First order delivery/doorstep measurement visit fee: FREE (₹0)
    const doorstepDeliveryFee = 0;

    return itemsTotal + expressSurcharge + doorstepDeliveryFee;
  };

  // Promo Calculation: Up to ₹200 FREE for 1st service
  const promoDiscount = 200.00;
  const grossTotal = calculateGrossCost();
  const netPayable = Math.max(0.00, grossTotal - promoDiscount);

  const handleBookInstaTailor = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to book your home tailor visit', 'info');
      openAuthModal('CUSTOMER');
      return;
    }

    setIsSubmitting(true);

    const selectedTitles = selectedReqIds.map(id => {
      const item = availableRequirements.find(r => r.id === id);
      return item ? item.title : id;
    }).join(', ');

    const payload = {
      customerId: user.id,
      selectedRequirements: selectedTitles + (preferFemaleSpecialist ? ' [Female Specialist Requested]' : ''),
      timeSlot: timeSlot.includes('Express') ? `${timeSlot} (+₹50 Express)` : timeSlot,
      homeAddress,
      contactPhone,
      estimatedCost: grossTotal
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/insta-tailor/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => null);

      if (data && data.bookingNumber) {
        setActiveBookings([data, ...activeBookings]);
      } else {
        setActiveBookings([{
          id: Date.now(),
          bookingNumber: 'INSTA-' + Math.floor(1000 + Math.random() * 9000),
          selectedRequirements: payload.selectedRequirements,
          timeSlot: payload.timeSlot,
          assignedTailorName: 'Broadcasting to nearby master tailors in ' + (user?.neighborhood || 'Lajpat Nagar'),
          tailorVehicleNo: 'Hero Splendor DL-3S-' + Math.floor(1000 + Math.random() * 8999),
          tailorEta: 'Matching with nearest available master tailor...',
          homeAddress,
          estimatedCost: grossTotal,
          discountApplied: promoDiscount,
          finalPrice: netPayable,
          status: 'PENDING_PARTNER_ACCEPTANCE'
        }, ...activeBookings]);
      }
      showToast('Doorstep Master Tailor Request Sent! 🛵', 'gold', 'Our team will arrive shortly with tailoring kit');
    } catch (err) {
      setActiveBookings([{
        id: Date.now(),
        bookingNumber: 'INSTA-' + Math.floor(1000 + Math.random() * 9000),
        selectedRequirements: payload.selectedRequirements,
        timeSlot: payload.timeSlot,
        assignedTailorName: 'Broadcasting to nearby master tailors in ' + (user?.neighborhood || 'Lajpat Nagar'),
        tailorVehicleNo: 'Hero Splendor DL-3S-' + Math.floor(1000 + Math.random() * 8999),
        tailorEta: 'Matching with nearest available master tailor...',
        homeAddress,
        estimatedCost: grossTotal,
        discountApplied: promoDiscount,
        finalPrice: netPayable,
        status: 'PENDING_PARTNER_ACCEPTANCE'
      }, ...activeBookings]);
      showToast('Doorstep Master Tailor Request Sent! 🛵', 'gold', 'Our team will arrive shortly');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Insta Tailor Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at 80% 20%, #900C3F 0%, #164E3D 50%, #0A2B20 100%)',
        color: '#FFFFFF',
        padding: '3.2rem 2.5rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        boxShadow: '0 18px 40px rgba(10, 43, 32, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Needle thread glow background */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--gold-accent)',
            padding: '0.4rem 1.25rem', borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem', fontWeight: '800', color: 'var(--gold-warm)',
            marginBottom: '1rem'
          }}>
            <Zap size={17} style={{ color: 'var(--gold-accent)' }} /> DARZI INSTA CONCIERGE • AT-HOME MASTER VISIT
          </div>

          <h2 className="font-serif" style={{ fontSize: '2.7rem', fontWeight: '700', lineHeight: 1.18, marginBottom: '0.85rem' }}>
            Invite an Experienced Master Tailor Home <br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold-warm)', fontWeight: '500' }}>
              For On-Spot Alterations &amp; Handiwork
            </span>
          </h2>

          <p style={{ color: '#E8EFEA', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '680px' }}>
            No more dragging heavy bags to cramped market shops. A trusted craftsman arrives at your door with calibrated measuring tapes, chalks, and trimming shears.
          </p>

        </div>
      </div>

      {/* FIRST SERVICE FREE PROMO & ZERO DELIVERY WAIVER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        border: '2px dashed #D97706', padding: '1.35rem 2rem', borderRadius: 'var(--radius-lg)',
        marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.25rem',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{
            background: '#D97706', color: '#FFF', width: '48px', height: '48px',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)', flexShrink: 0
          }}>
            <Gift size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase', letterSpacing: '1px' }}>
                🌸 Neighborly Welcome Gift
              </span>
              <span style={{ background: '#92400E', color: '#FFF', padding: '0.15rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                FIRST200 + FREE DOORSTEP VISIT
              </span>
            </div>
            <h4 className="font-serif" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#78350F', margin: '0.2rem 0' }}>
              1st Order: ₹0 Doorstep Visit Fee + Up to ₹200 Welcome Credit!
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#92400E' }}>
              Enjoy relaxed in-home fittings without any transport surcharge or hidden convenience fees.
            </span>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)', border: '1px solid #FCD34D', textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#92400E', display: 'block', fontWeight: '600' }}>Doorstep Visit Fee</span>
          <strong style={{ fontSize: '1.4rem', color: '#15803D' }}>₹0.00 WAIVED</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Requirements Selection Form */}
        <div>
          
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Step 1 • Select Handiwork Needed
            </span>
            <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>
              What would you like our Masterji to do?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              Select all items that need attention. Multiple tasks can be handled in a single comfortable home visit.
            </p>
          </div>

          {/* Interactive Handiwork Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {availableRequirements.map(req => {
              const isSelected = selectedReqIds.includes(req.id);
              return (
                <div
                  key={req.id}
                  onClick={() => toggleRequirement(req.id)}
                  style={{
                    padding: '1.1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                    background: isSelected ? 'var(--gold-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    boxShadow: isSelected ? '0 4px 16px rgba(10, 50, 38, 0.08)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{req.icon}</span>
                      <span style={{
                        background: isSelected ? 'var(--primary-emerald)' : '#F3F4F6',
                        color: isSelected ? '#FFFFFF' : '#4B5563',
                        padding: '0.15rem 0.55rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        fontWeight: '700'
                      }}>
                        {req.tag}
                      </span>
                    </div>

                    <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-emerald)', marginBottom: '0.25rem' }}>
                      {req.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                      {req.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed var(--border-light)', paddingTop: '0.6rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--primary-emerald)' }}>
                      ₹{req.basePrice}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: isSelected ? 'var(--primary-emerald)' : '#9CA3AF', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {isSelected ? <CheckCircle2 size={16} /> : '+ Add'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concierge Comfort Preference */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--primary-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} style={{ color: 'var(--terracotta)' }} /> Privacy &amp; Comfort Options
            </h4>

            <label style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer',
              padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)',
              background: preferFemaleSpecialist ? 'var(--gold-soft)' : '#F9FAFB',
              border: preferFemaleSpecialist ? '1px solid var(--border-gold)' : '1px solid var(--border-light)'
            }}>
              <input
                type="checkbox"
                checked={preferFemaleSpecialist}
                onChange={(e) => {
                  setPreferFemaleSpecialist(e.target.checked);
                  showToast(e.target.checked ? 'Female specialist assigned' : 'Standard master specialist', 'info');
                }}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-emerald)' }}
              />
              <div>
                <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)', display: 'block' }}>
                  Assign Female Specialist for Home Measurement
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Recommended for blouse &amp; bridal fittings to ensure 100% comfort and privacy
                </span>
              </div>
            </label>
          </div>

        </div>

        {/* Right Column: Time Slot, Address & Instant Booking Summary */}
        <div style={{ position: 'sticky', top: '100px' }}>
          
          <form onSubmit={handleBookInstaTailor} className="glass-card" style={{ padding: '2rem', border: '1.5px solid var(--border-gold)', borderRadius: 'var(--radius-lg)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} style={{ color: 'var(--gold-accent)' }} />
              <h3 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>
                Your Home Visit Summary
              </h3>
            </div>

            {/* Time Slot Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: 'var(--primary-emerald)', marginBottom: '0.5rem' }}>
                Preferred Arrival Time:
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { label: 'Express 30 Mins Visit', note: 'Priority master tailor dispatch (+₹50)' },
                  { label: 'Today Evening (5 PM - 8 PM)', note: 'Relaxed post-work appointment' },
                  { label: 'Tomorrow Morning (10 AM - 1 PM)', note: 'Fresh daylight fabric check' }
                ].map(slot => (
                  <label
                    key={slot.label}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)',
                      background: timeSlot === slot.label ? 'var(--gold-soft)' : '#FFFFFF',
                      border: timeSlot === slot.label ? '1.5px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                      cursor: 'pointer', fontSize: '0.84rem'
                    }}
                  >
                    <div>
                      <strong style={{ display: 'block', color: 'var(--primary-emerald)' }}>{slot.label}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{slot.note}</span>
                    </div>
                    <input
                      type="radio"
                      name="timeslot"
                      checked={timeSlot === slot.label}
                      onChange={() => {
                        setTimeSlot(slot.label);
                        showToast(`Time slot: ${slot.label}`, 'info');
                      }}
                      style={{ accentColor: 'var(--primary-emerald)' }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Doorstep Address */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                Home Doorstep Address:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem' }}>
                <Home size={16} style={{ color: 'var(--primary-emerald)', flexShrink: 0 }} />
                <input
                  type="text"
                  required
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                WhatsApp / Call Contact:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem' }}>
                <Phone size={16} style={{ color: 'var(--primary-emerald)', flexShrink: 0 }} />
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>
            </div>

            {/* Reactive Cost Breakdown */}
            <div style={{ background: '#F8FAF9', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                <span>Selected Handiwork ({selectedReqIds.length} items):</span>
                <span>₹{selectedReqIds.reduce((sum, id) => sum + (availableRequirements.find(r => r.id === id)?.basePrice || 0), 0)}</span>
              </div>

              {timeSlot.includes('Express') && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>Express 30-min Priority Surcharge:</span>
                  <span>+₹50.00</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontWeight: '600', marginBottom: '0.3rem' }}>
                <span>Doorstep Travel &amp; Fuel Visit Fee:</span>
                <span>₹0.00 (FREE)</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B45309', fontWeight: '600', marginBottom: '0.5rem' }}>
                <span>First Service Promo Credit:</span>
                <span>-₹{promoDiscount.toFixed(2)}</span>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--primary-emerald)' }}>Total Payable at Doorstep:</strong>
                <strong style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)' }}>₹{netPayable.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              {isSubmitting ? (
                <span>Dispatching Masterji...</span>
              ) : (
                <>
                  <Zap size={18} /> Request Master Tailor Home (₹{netPayable.toFixed(2)})
                </>
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              🛡️ Cash or UPI on home trial satisfaction • 100% Fit Guarantee
            </p>

          </form>

        </div>

      </div>

      {/* Active Bookings & Live GPS Tailor Tracker */}
      {activeBookings.length > 0 && (
        <div style={{ marginTop: '3.5rem' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Live Concierge Dispatch
            </span>
            <h3 className="font-serif" style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>
              Active Doorstep Bookings &amp; GPS Radar
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {activeBookings.map(b => (
              <div key={b.id || b.bookingNumber} className="glass-card" style={{ padding: '1.8rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-gold)' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: '800', background: '#DCFCE7', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                      BOOKING {b.bookingNumber}
                    </span>
                    <h4 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)', marginTop: '0.3rem' }}>
                      {b.selectedRequirements}
                    </h4>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      📍 {b.homeAddress} • Slot: {b.timeSlot}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Total</span>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)' }}>
                      ₹{b.finalPrice ? b.finalPrice.toFixed(2) : (b.estimatedCost ? b.estimatedCost.toFixed(2) : '128.00')}
                    </strong>
                  </div>
                </div>

                {/* Embedded Live GPS Tailor Map */}
                <LiveTailorTrackerMap booking={b} />

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
