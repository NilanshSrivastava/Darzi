import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { Crown, Zap, Scissors, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const DarziGoldSection = () => {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

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
    setSubscribedSuccess(true);
    showToast('👑 Welcome to Darzi Gold VIP!', 'gold', 'Doorstep express waivers & 2 free alterations unlocked');
  };

  return (
    <section id="darzi-gold-section" style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem', scrollMarginTop: '100px' }}>
      
      <div style={{
        background: 'linear-gradient(135deg, #2D0036 0%, #0F382C 50%, #900C3F 100%)',
        color: '#FFFFFF', padding: '3rem 2.5rem', borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 45px rgba(45, 0, 54, 0.3)', border: '2px solid var(--gold-accent)',
        position: 'relative', overflow: 'hidden'
      }}>
        
        {/* Top Gold Badge */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #FEF3C7 0%, #D4AF37 100%)',
              color: '#0F382C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
            }}>
              <Crown size={32} />
            </div>

            <div>
              <span style={{ color: 'var(--gold-accent)', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
                VIP ACCESS PASS
              </span>
              <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: 1.1 }}>
                DARZI GOLD MEMBERSHIP
              </h2>
            </div>
          </div>

          <div style={{
            background: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--gold-accent)',
            padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)', textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#FDE68A', display: 'block' }}>Special 3-Month Plan</span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--gold-accent)' }}>
              ONLY ₹79 FOR 3 MONTHS <span style={{ fontSize: '0.8rem', color: '#FDE68A', textDecoration: 'line-through' }}>₹499</span>
            </strong>
          </div>
        </div>

        {subscribedSuccess || user?.isGoldMember ? (
          <div style={{ background: '#DCFCE7', color: '#15803D', padding: '1.25rem 1.75rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={24} /> Congratulations! You are an Active 👑 Darzi Gold VIP Member! All delivery surcharges waived & 2 free fitting adjustments unlocked.
          </div>
        ) : (
          <div>
            {/* Perks Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-accent)', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  <Zap size={22} /> ⚡ Priority Express Deliveries
                </div>
                <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  Express 30-min visit surcharge (+₹50) is <strong>100% WAIVED (₹0)</strong> for Gold Members! Priority dispatch matching.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A7F3D0', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  <Scissors size={22} /> ✂️ 2 Free Fitting Adjustments
                </div>
                <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  Need post-delivery tweaks? Claim up to <strong>2 FREE alteration changes</strong> per order within 30 days of delivery!
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-accent)', fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  <Crown size={22} /> 👑 VIP Master Artisan Access
                </div>
                <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                  Direct priority dispatch to top 4.9+ ★ Master Tailor partners in your neighborhood.
                </p>
              </div>

            </div>

            {/* Subscribe Action Button */}
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={handleSubscribeGold}
                disabled={isSubmitting}
                className="btn-gold" 
                style={{ padding: '1rem 3rem', fontSize: '1.15rem', borderRadius: 'var(--radius-full)' }}
              >
                <Crown size={22} /> {isSubmitting ? 'Activating Darzi Gold...' : 'Subscribe to Darzi Gold for ₹79 / 3 Months'}
              </button>

              <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '0.65rem' }}>
                Instant activation • One-time ₹79 payment for 90 days of VIP tailoring benefits
              </div>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
