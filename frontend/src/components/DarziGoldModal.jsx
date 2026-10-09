import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import { X, Crown, Zap, Scissors, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const DarziGoldModal = ({ isOpen, onClose, onSuccess }) => {
  const { user, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubscribeGold = async () => {
    setIsSubmitting(true);
    try {
      if (user?.id) {
        await fetch(`${API_BASE_URL}/api/membership/subscribe-gold/${user.id}`, { method: 'POST' });
      }
    } catch (e) {}

    if (user) {
      login({ ...user, isGoldMember: true }, 'JWT_GOLD_MEMBER_TOKEN');
    }
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ padding: '0', maxWidth: '540px', border: '2px solid var(--gold-accent)', position: 'relative', overflow: 'hidden' }}
      >
        
        {/* Crown Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #2D0036 0%, #0F382C 50%, #900C3F 100%)',
          color: '#FFFFFF', padding: '2.25rem 1.5rem 1.5rem 1.5rem', textAlign: 'center', position: 'relative'
        }}>
          
          {/* Prominent High-Visibility Close X Button */}
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'rgba(0, 0, 0, 0.4)', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.8)',
              width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#EF4444'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'}
          >
            <X size={20} />
          </button>

          <div style={{
            width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #FEF3C7 0%, #D4AF37 100%)',
            color: '#0F382C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
          }}>
            <Crown size={30} />
          </div>

          <span style={{ color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
            VIP ACCESS PASS
          </span>
          
          <h2 className="font-serif" style={{ fontSize: '1.85rem', fontWeight: '800', marginTop: '0.15rem' }}>
            DARZI GOLD MEMBERSHIP
          </h2>

          <div style={{
            display: 'inline-block', background: 'rgba(212, 175, 55, 0.25)', border: '1px solid var(--gold-accent)',
            padding: '0.35rem 1.15rem', borderRadius: 'var(--radius-full)', fontSize: '1.1rem', fontWeight: '800', color: 'var(--gold-accent)', marginTop: '0.6rem'
          }}>
            ONLY ₹79 FOR 3 MONTHS <span style={{ fontSize: '0.75rem', color: '#FDE68A', textDecoration: 'line-through', marginLeft: '0.35rem' }}>₹499</span>
          </div>
        </div>

        {/* Benefits List */}
        <div style={{ padding: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', background: 'var(--gold-soft)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
              <div style={{ background: 'var(--gold-accent)', color: '#0F382C', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                <Zap size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#78350F' }}>⚡ Priority Express Deliveries (₹0 Surcharge)</h4>
                <p style={{ fontSize: '0.8rem', color: '#92400E', marginTop: '0.15rem', lineHeight: 1.35 }}>
                  Express 30-min visit surcharge (+₹50) is 100% waived for Gold Members! Priority dispatch matching.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', background: '#F0FDF4', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0' }}>
              <div style={{ background: '#15803D', color: '#FFF', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                <Scissors size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#14532D' }}>✂️ 2 Free Post-Service Fitting Adjustments</h4>
                <p style={{ fontSize: '0.8rem', color: '#166534', marginTop: '0.15rem', lineHeight: 1.35 }}>
                  Need post-delivery tweaks? Claim up to 2 FREE alteration/adjustment changes per order within 30 days!
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', background: 'var(--bg-ivory)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ background: 'var(--primary-emerald)', color: 'var(--gold-accent)', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800' }}>
                <Crown size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--primary-emerald)' }}>👑 VIP Master Tailor Matching</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: 1.35 }}>
                  Direct priority dispatch to top 4.9+ ★ Master Tailor artisans in your neighborhood.
                </p>
              </div>
            </div>

          </div>

          <button 
            onClick={handleSubscribeGold}
            disabled={isSubmitting}
            className="btn-gold" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
          >
            <Crown size={20} /> {isSubmitting ? 'Activating Darzi Gold...' : 'Subscribe Now for ₹79 / 3 Months'}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '0.65rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Cancel anytime • One-time ₹79 payment for 90 days of VIP perks
          </div>

        </div>

      </div>
    </div>
  );
};
