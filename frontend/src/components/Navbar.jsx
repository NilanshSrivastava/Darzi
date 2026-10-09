import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Scissors, User, Ruler, Package, MessageSquare, LogOut, Shield, Store, Zap, Crown, Heart } from 'lucide-react';

export const Navbar = ({ activeView, setActiveView }) => {
  const { user, openAuthModal, logout } = useAuth();
  const { showToast } = useToast();

  const handleGoToGoldSection = () => {
    setActiveView('STOREFRONT');
    showToast('Navigating to Darzi Gold VIP privileges ✨', 'gold');
    setTimeout(() => {
      const element = document.getElementById('darzi-gold-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.25s ease'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo with Warm Artisanal Flair */}
        <div 
          onClick={() => setActiveView('STOREFRONT')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #0A3226 0%, #164E3D 100%)',
            color: 'var(--gold-warm)',
            width: '44px', height: '44px', borderRadius: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(10, 50, 38, 0.2)',
            border: '1px solid rgba(212, 175, 55, 0.4)'
          }}>
            <Scissors size={23} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className="font-serif" style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-emerald)', letterSpacing: '0.5px', lineHeight: 1 }}>
                DARZI
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-accent)' }} />
            </div>
            <span style={{ fontSize: '0.66rem', fontWeight: '800', letterSpacing: '1.8px', color: 'var(--gold-accent)', textTransform: 'uppercase', display: 'block' }}>
              Bespoke Fit Studio
            </span>
          </div>
        </div>

        {/* Dynamic Portal Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          
          {/* Customer Navigation Items */}
          {(!user || user.role === 'ROLE_CUSTOMER') && (
            <>
              <button
                onClick={() => { setActiveView('STOREFRONT'); showToast('Boutique Catalog', 'info'); }}
                style={{
                  background: activeView === 'STOREFRONT' ? 'var(--gold-soft)' : 'transparent',
                  color: activeView === 'STOREFRONT' ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  border: activeView === 'STOREFRONT' ? '1px solid var(--border-gold)' : '1px solid transparent',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                }}
              >
                <Store size={17} /> Atelier Catalog
              </button>

              <button
                onClick={() => { setActiveView('INSTA_TAILOR'); showToast('Doorstep Concierge', 'info'); }}
                style={{
                  background: activeView === 'INSTA_TAILOR' ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' : 'rgba(212, 175, 55, 0.12)',
                  color: activeView === 'INSTA_TAILOR' ? '#78350F' : 'var(--primary-emerald)',
                  border: '1px solid var(--border-gold)',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '700', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                }}
              >
                <Zap size={17} style={{ color: 'var(--gold-accent)' }} /> Insta Tailor
              </button>

              {/* DARZI GOLD MEMBERSHIP BUTTON */}
              <button
                onClick={handleGoToGoldSection}
                style={{
                  background: user?.isGoldMember ? '#2D0036' : 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
                  color: user?.isGoldMember ? '#D4AF37' : '#0A3226',
                  border: '1px solid var(--gold-accent)',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '700', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                  boxShadow: 'var(--shadow-gold)', transition: 'all 0.2s ease'
                }}
              >
                <Crown size={17} /> {user?.isGoldMember ? '👑 VIP Gold Pass' : 'Get Gold (₹79/3 Mo)'}
              </button>

              <button
                onClick={() => { setActiveView('MEASUREMENTS'); showToast('Measurement Vault', 'info'); }}
                style={{
                  background: activeView === 'MEASUREMENTS' ? 'var(--gold-soft)' : 'transparent',
                  color: activeView === 'MEASUREMENTS' ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  border: activeView === 'MEASUREMENTS' ? '1px solid var(--border-gold)' : '1px solid transparent',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                }}
              >
                <Ruler size={17} /> Fit Vault
              </button>

              <button
                onClick={() => { setActiveView('ORDERS'); showToast('Fitting Orders Tracker', 'info'); }}
                style={{
                  background: activeView === 'ORDERS' ? 'var(--gold-soft)' : 'transparent',
                  color: activeView === 'ORDERS' ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  border: activeView === 'ORDERS' ? '1px solid var(--border-gold)' : '1px solid transparent',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                }}
              >
                <Package size={17} /> Orders
              </button>

              <button
                onClick={() => { setActiveView('QUERIES'); showToast('Customer Care & Inquiries', 'info'); }}
                style={{
                  background: activeView === 'QUERIES' ? 'var(--gold-soft)' : 'transparent',
                  color: activeView === 'QUERIES' ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  border: activeView === 'QUERIES' ? '1px solid var(--border-gold)' : '1px solid transparent',
                  padding: '0.55rem 0.95rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '0.88rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                }}
              >
                <MessageSquare size={17} /> Help &amp; Chat
              </button>
            </>
          )}

          {/* Role Badges for Partner & Admin View */}
          {user && user.role === 'ROLE_TAILOR' && (
            <div style={{ background: 'var(--gold-soft)', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--border-gold)', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', fontSize: '0.85rem', color: '#78350F' }}>
              <Scissors size={16} /> Partner Tailor Atelier Workspace
            </div>
          )}

          {user && user.role === 'ROLE_ADMIN' && (
            <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', fontSize: '0.85rem' }}>
              <Shield size={16} style={{ color: 'var(--gold-accent)' }} /> Atelier Super Admin Dashboard
            </div>
          )}

        </nav>

        {/* User Account Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end' }}>
                  {user.name} {user.isGoldMember && <Crown size={15} style={{ color: 'var(--gold-accent)' }} />}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {user.role === 'ROLE_ADMIN' ? 'Atelier Admin' : (user.role === 'ROLE_TAILOR' ? 'Master Tailor' : (user.isGoldMember ? '👑 Gold VIP Member' : 'Valued Patron'))}
                </div>
              </div>
              <button
                onClick={() => { logout(); showToast('Signed out safely', 'info'); }}
                title="Sign Out"
                style={{
                  background: 'rgba(239, 68, 68, 0.08)', color: '#DC2626', border: '1px solid rgba(239, 68, 68, 0.2)',
                  width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.16)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button 
                onClick={() => openAuthModal('CUSTOMER')} 
                className="btn-outline"
                style={{ padding: '0.55rem 1.3rem', fontSize: '0.86rem' }}
              >
                Sign In
              </button>
              <button 
                onClick={() => openAuthModal('PARTNER')} 
                className="btn-gold"
                style={{ padding: '0.55rem 1.3rem', fontSize: '0.86rem' }}
              >
                Join as Master Tailor
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
