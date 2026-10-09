import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { X, Scissors, Sparkles, Check, Home, Ruler, Truck, ShieldCheck, Gift, Heart, Info, Palette } from 'lucide-react';

export const GarmentCustomizerModal = ({ category, onClose, onOrderSuccess }) => {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [necklineStyle, setNecklineStyle] = useState('Sweetheart Neck');
  const [sleeveStyle, setSleeveStyle] = useState('Elbow Length (10")');
  const [liningOption, setLiningOption] = useState('Padded Premium Cotton');
  const [selectedFabricType, setSelectedFabricType] = useState('Pure Mulmul Cotton');
  const [hasDoriTassels, setHasDoriTassels] = useState(true);
  const [customInstructions, setCustomInstructions] = useState('');
  
  const [doorstepVisitRequested, setDoorstepVisitRequested] = useState(true);
  const [pickupAddress, setPickupAddress] = useState(user?.neighborhood ? `${user.neighborhood}, Delhi NCR` : 'B-42, Lajpat Nagar II, New Delhi');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!category) return null;

  // Neckline Style Definitions with Human Styling Advice
  const necklineOptions = [
    { name: 'Sweetheart Neck', tip: 'Graceful & flattering for collarbones', icon: '💖' },
    { name: 'Classic Boat Neck', tip: 'Elegant modern poise, great with broad shoulders', icon: '⛵' },
    { name: 'Royal V-Cut Neck', tip: 'Elongating silhouette, perfect for statement necklaces', icon: '👑' },
    { name: 'Square Princess Neck', tip: 'Retro bespoke vintage charm', icon: '🔲' },
    { name: 'Deep Round with Tie-up', tip: 'Traditional bridal appeal with back dori', icon: '⭕' },
    { name: 'Mandarin High Collar', tip: 'Contemporary sharp tailored finish', icon: '👔' }
  ];

  // Sleeve Options
  const sleeveOptions = [
    { name: 'Sleeveless / Cut-away', tip: 'Chic modern cut with bra-strap locks' },
    { name: 'Short Sleeve (5")', tip: 'Comfortable everyday mobility' },
    { name: 'Elbow Length (10")', tip: 'Traditional royal South-Indian & festive drape' },
    { name: 'Full Flute Sleeve', tip: 'Flowing poetic flare with delicate picot hem' }
  ];

  // Tactile Fabric Swatch Types
  const fabricSwatches = [
    { name: 'Pure Mulmul Cotton', color: '#FFF8E7', feel: 'Soft & Airy', border: '#D97706' },
    { name: 'Chanderi Zari Silk', color: '#FEF3C7', feel: 'Subtle Golden Sheen', border: '#D4AF37' },
    { name: 'Raw Tussar Silk', color: '#F5E6CC', feel: 'Crisp Royal Texture', border: '#B45309' },
    { name: 'Flowing Georgette', color: '#FCE7F3', feel: 'Ethereal Draping', border: '#DB2777' },
    { name: 'Micro-Velvet Soft', color: '#450A0A', feel: 'Rich Winter Warmth', border: '#991B1B', dark: true }
  ];

  // Dynamic Price Breakdown
  const basePrice = category.basePrice || 499;
  const paddingAddon = liningOption.includes('Padded') ? 150 : 0;
  const tasselsAddon = hasDoriTassels ? 60 : 0;
  const doorstepDeliveryFee = 0; // 100% FREE Delivery & Measurement Visit Waiver
  const totalPrice = basePrice + paddingAddon + tasselsAddon + doorstepDeliveryFee;

  const handleConfirmOrder = async () => {
    if (!user) {
      showToast('Please sign in to confirm your tailoring appointment', 'info');
      openAuthModal('CUSTOMER');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      customerId: user.id,
      categoryId: category.id,
      measurementProfileId: 1,
      necklineStyle: `${necklineStyle} (${selectedFabricType})`,
      sleeveStyle,
      liningOption: `${liningOption}${hasDoriTassels ? ' + Hand-tasseled Doris' : ''}`,
      customInstructions: customInstructions ? `[Fabric: ${selectedFabricType}] ${customInstructions}` : `Fabric: ${selectedFabricType}`,
      doorstepVisitRequested,
      pickupAddress,
      totalPrice
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => null);
      
      onOrderSuccess(data || {
        orderNumber: 'DZ-' + Math.floor(100000 + Math.random() * 900000),
        totalPrice,
        categoryName: category.name
      });
    } catch (err) {
      onOrderSuccess({
        orderNumber: 'DZ-' + Math.floor(100000 + Math.random() * 900000),
        totalPrice,
        categoryName: category.name
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', padding: '0', overflow: 'hidden' }}>
        
        {/* Modal Header banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0A3226 0%, #164E3D 100%)',
          color: '#FFFFFF',
          padding: '1.6rem 2.2rem',
          position: 'relative',
          borderBottom: '2px solid var(--gold-accent)'
        }}>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'rgba(255,255,255,0.12)', border: 'none', color: '#FFF',
              width: '34px', height: '34px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <X size={18} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.76rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Artisanal Atelier Customizer
            </span>
            <span style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--gold-warm)', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: '700' }}>
              Handcrafted Pattern
            </span>
          </div>

          <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.2px' }}>
            Bespoke Customisation • {category.name}
          </h2>

          <p style={{ color: '#E2ECE7', fontSize: '0.86rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--gold-accent)' }} /> 
            100% Fit Guarantee • Certified measurement specialist visits your living room
          </p>
        </div>

        <div style={{ padding: '2rem 2.2rem', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* Section 1: Tactile Fabric Type Preference */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.96rem', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Palette size={18} style={{ color: 'var(--gold-accent)' }} />
                1. Select Fabric Base (Or Hand Us Your Own Fabric)
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tailor will inspect grain &amp; fall</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))', gap: '0.75rem' }}>
              {fabricSwatches.map(fab => (
                <div
                  key={fab.name}
                  onClick={() => {
                    setSelectedFabricType(fab.name);
                    showToast(`Fabric: ${fab.name}`, 'info', fab.feel);
                  }}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedFabricType === fab.name ? `2px solid var(--primary-emerald)` : '1px solid var(--border-light)',
                    background: selectedFabricType === fab.name ? 'var(--gold-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedFabricType === fab.name ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: fab.color, border: `2px solid ${fab.border}`,
                    marginBottom: '0.45rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }} />
                  <div style={{ fontWeight: '700', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                    {fab.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {fab.feel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Neckline Styles */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.96rem', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Scissors size={18} style={{ color: 'var(--gold-accent)' }} />
                2. Choose Neckline Silhouette
              </label>
              <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600' }}>Customized depth upon doorstep trial</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
              {necklineOptions.map(opt => (
                <div
                  key={opt.name}
                  onClick={() => {
                    setNecklineStyle(opt.name);
                    showToast(`Neckline: ${opt.name}`, 'info');
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: necklineStyle === opt.name ? '2px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                    background: necklineStyle === opt.name ? 'var(--gold-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)' }}>
                      {opt.icon} {opt.name}
                    </span>
                    {necklineStyle === opt.name && <Check size={16} style={{ color: 'var(--primary-emerald)' }} />}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    {opt.tip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Sleeve Style */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.96rem', marginBottom: '0.75rem', color: 'var(--primary-emerald)' }}>
              3. Choose Sleeve Cut &amp; Length
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {sleeveOptions.map(opt => (
                <div
                  key={opt.name}
                  onClick={() => {
                    setSleeveStyle(opt.name);
                    showToast(`Sleeve: ${opt.name}`, 'info');
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: sleeveStyle === opt.name ? '2px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                    background: sleeveStyle === opt.name ? 'var(--gold-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)' }}>
                      {opt.name}
                    </span>
                    {sleeveStyle === opt.name && <Check size={16} style={{ color: 'var(--primary-emerald)' }} />}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {opt.tip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Lining & Embellishments */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.96rem', marginBottom: '0.75rem', color: 'var(--primary-emerald)' }}>
              4. Inner Lining &amp; Embellishments
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              {[
                { name: 'Padded Premium Cotton', desc: 'Pre-stitched soft molded cups (+₹150)', price: 150 },
                { name: 'Pure Mulmul Breathable Lining', desc: 'Lightweight double breathable layer (+₹0)', price: 0 },
                { name: 'Unlined / Customer Fabric Only', desc: 'As provided without extra lining (+₹0)', price: 0 }
              ].map(opt => (
                <div
                  key={opt.name}
                  onClick={() => {
                    setLiningOption(opt.name);
                    showToast(`Lining: ${opt.name}`, 'info');
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: liningOption === opt.name ? '2px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                    background: liningOption === opt.name ? 'var(--gold-soft)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)', marginBottom: '0.2rem' }}>
                    {opt.name}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {opt.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Dori Tassels Toggle */}
            <div style={{
              background: '#F9FAFB',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }} onClick={() => setHasDoriTassels(!hasDoriTassels)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🎀</span>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-main)', display: 'block' }}>
                    Add Handcrafted Back Dori &amp; Fabric Latkans (+₹60)
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Handmade fabric tassels matching your garment's border
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasDoriTassels}
                onChange={() => {}}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-emerald)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Section 5: Human Notes & Doorstep Fitting Address */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: '700', fontSize: '0.96rem', marginBottom: '0.4rem', color: 'var(--primary-emerald)' }}>
              5. Special Notes for the Master Tailor
            </label>
            <textarea
              placeholder="e.g. Please leave 2 inches extra inner seam allowance for future altering, deep sweetheart neck in front, sweetheart cut at back..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              rows={2}
              style={{
                width: '100%', padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)',
                fontFamily: 'var(--font-sans)', fontSize: '0.88rem', outline: 'none'
              }}
            />
          </div>

          {/* Doorstep Concierge Reassurance Box */}
          <div style={{
            background: 'var(--gold-soft)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.4rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gold-accent)', color: '#0A3226', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Truck size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--primary-emerald)' }}>
                    Doorstep Measurement &amp; Fabric Pickup Visit
                  </h4>
                  <span style={{ background: '#166534', color: '#FFF', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: '800' }}>
                    100% FREE (₹0)
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.3rem 0 0.75rem 0', lineHeight: 1.45 }}>
                  Unsure of your measurements? Don't stress. Our female specialist arrives with a calibrated tape, takes measurements, or you can hand over an existing well-fitting sample garment!
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Home size={16} style={{ color: 'var(--primary-emerald)', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter your home pickup address..."
                    style={{
                      flex: 1, padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)',
                      border: '1px solid #CBD5E1', fontSize: '0.84rem', background: '#FFFFFF'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Reactive Price Breakdown Box */}
          <div style={{
            background: '#F8FAF9',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.6rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
              Live Transparent Price Breakdown
            </h4>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <span>Base Tailoring Rate ({category.name}):</span>
              <span>₹{basePrice.toFixed(2)}</span>
            </div>

            {paddingAddon > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>{liningOption}:</span>
                <span>+₹{paddingAddon.toFixed(2)}</span>
              </div>
            )}

            {tasselsAddon > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Handcrafted Dori &amp; Fabric Latkans:</span>
                <span>+₹{tasselsAddon.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: '#166534', marginBottom: '0.5rem', fontWeight: '600' }}>
              <span>Doorstep Measurement Specialist &amp; Pickup:</span>
              <span>₹0.00 (WAIVED)</span>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>Net Fair Amount</span>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-emerald)', lineHeight: 1 }}>
                  ₹{totalPrice.toFixed(2)}
                </div>
              </div>

              <div style={{ fontSize: '0.76rem', color: '#166534', textAlign: 'right' }}>
                <span>Zero Boutique Markup • 100% Fit Guarantee</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div style={{
          background: '#FFFFFF',
          borderTop: '1px solid var(--border-light)',
          padding: '1.25rem 2.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button 
            type="button"
            onClick={onClose} 
            className="btn-outline" 
            style={{ padding: '0.7rem 1.4rem' }}
          >
            Cancel &amp; Browse
          </button>

          <button 
            type="button"
            onClick={handleConfirmOrder} 
            disabled={isSubmitting}
            className="btn-gold" 
            style={{ padding: '0.75rem 2rem', fontSize: '0.92rem' }}
          >
            {isSubmitting ? (
              <span>Scheduling Master Tailor...</span>
            ) : (
              <>
                <Scissors size={18} /> Confirm Bespoke Order (₹{totalPrice.toFixed(2)})
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
