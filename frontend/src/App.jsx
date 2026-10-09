import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { Storefront } from './components/Storefront';
import { InstaTailorSection } from './components/InstaTailorSection';
import { MeasurementVault } from './components/MeasurementVault';
import { OrderTracker } from './components/OrderTracker';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { TailorPortalView } from './components/TailorPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import { Scissors, Heart, Shield, Sparkles, User, Store, Zap, Crown, MessageSquare, Compass, PhoneCall } from 'lucide-react';

const MainAppContent = () => {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const [activeView, setActiveView] = useState('STOREFRONT'); // STOREFRONT, INSTA_TAILOR, MEASUREMENTS, ORDERS, QUERIES

  // Role-Based Router
  const renderActiveView = () => {
    if (user?.role === 'ROLE_ADMIN') {
      return <AdminPortalView />;
    }

    if (user?.role === 'ROLE_TAILOR') {
      return <TailorPortalView />;
    }

    // Default Customer Portal Navigation
    switch (activeView) {
      case 'INSTA_TAILOR':
        return <InstaTailorSection />;
      case 'MEASUREMENTS':
        return <MeasurementVault />;
      case 'ORDERS':
        return <OrderTracker />;
      case 'QUERIES':
        return <CustomerSupportModal />;
      case 'STOREFRONT':
      default:
        return <Storefront onGoToOrders={() => setActiveView('ORDERS')} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Auth Modal with Customer, Partner, and Admin tabs */}
      <AuthModal />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {renderActiveView()}
      </main>

      {/* Humanized Concierge Persona Switcher Bar */}
      <div style={{
        background: '#0B1D16',
        color: '#CBD5E1',
        padding: '0.75rem 1.25rem',
        fontSize: '0.82rem',
        borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--gold-warm)', fontWeight: '700' }}>
          <Sparkles size={15} /> Atelier Persona Tour:
        </span>
        
        <button 
          onClick={() => {
            openAuthModal('CUSTOMER');
            showToast('Switched to Patron Persona (Pooja)', 'info');
          }} 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
          🌸 Patron / Customer
        </button>

        <button 
          onClick={() => {
            openAuthModal('PARTNER');
            showToast('Switched to Master Tailor Persona', 'gold');
          }} 
          style={{
            background: 'var(--gold-accent)',
            color: '#0A3226',
            border: 'none',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
        >
          ✂️ Master Tailor Partner
        </button>

        <button 
          onClick={() => {
            openAuthModal('ADMIN');
            showToast('Switched to Atelier Admin Persona', 'info');
          }} 
          style={{
            background: '#1E293B',
            color: '#E2E8F0',
            border: '1px solid #334155',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#334155'}
          onMouseOut={(e) => e.currentTarget.style.background = '#1E293B'}
        >
          🏛️ Atelier Owner Admin
        </button>
      </div>

      {/* Humanized Warm Footer */}
      <footer style={{ background: 'var(--primary-emerald)', color: '#FFFFFF', padding: '3.5rem 1.5rem 2rem 1.5rem', borderTop: '2px solid var(--gold-accent)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-warm)', marginBottom: '0.85rem' }}>
              <Scissors size={26} />
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: '800', letterSpacing: '0.5px' }}>DARZI</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#D1DDD6', lineHeight: 1.65 }}>
              Democratising bespoke boutique tailoring. Handcrafted by verified neighborhood master artisans with in-home measurement visits and a reassuring 100% perfect fit guarantee.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--gold-warm)' }}>
              <span>📍 Serving 150+ Neighborhoods Across Delhi NCR</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--gold-warm)', marginBottom: '0.85rem', fontWeight: '700' }}>
              Patron Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#E2ECE7' }}>
              <li style={{ cursor: 'pointer', transition: 'color 0.2s ease' }} onClick={() => { setActiveView('STOREFRONT'); showToast('Atelier Catalog', 'info'); }}>
                🧵 Bespoke Garment Catalog
              </li>
              <li style={{ cursor: 'pointer', color: 'var(--gold-warm)', fontWeight: '700' }} onClick={() => { setActiveView('INSTA_TAILOR'); showToast('Insta Tailor Concierge', 'info'); }}>
                ⚡ Insta Tailor (Doorstep Masterji Visit)
              </li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveView('MEASUREMENTS'); showToast('Measurement Vault', 'info'); }}>
                📐 Digital Fit Vault &amp; Garment Clone
              </li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveView('ORDERS'); showToast('Order Tracker', 'info'); }}>
                📦 Live Stitching Journey &amp; Fit Tracker
              </li>
              <li style={{ cursor: 'pointer' }} onClick={() => { setActiveView('QUERIES'); showToast('Customer Care', 'info'); }}>
                💬 Chat with Team Darzi
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--gold-warm)', marginBottom: '0.85rem', fontWeight: '700' }}>
              Craftsmanship &amp; Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: '#E2ECE7' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => openAuthModal('PARTNER')}>
                ✂️ Master Tailor Partner Onboarding
              </li>
              <li style={{ cursor: 'pointer' }} onClick={() => openAuthModal('ADMIN')}>
                🏛️ Atelier Owner Admin Login
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Shield size={15} style={{ color: 'var(--gold-accent)' }} /> 100% Free Doorstep Alteration Policy
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Heart size={15} style={{ color: 'var(--terracotta)' }} /> Female Specialists for Private Home Fittings
              </li>
            </ul>
          </div>

        </div>

        <div style={{
          maxWidth: '1240px', margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.82rem', color: '#A0B4AA'
        }}>
          <div>© 2026 Darzi Technologies Private Limited. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Handcrafted with <Heart size={14} style={{ color: 'var(--terracotta)', fill: 'var(--terracotta)' }} /> for Neighborhood Master Tailors &amp; Fashion Lovers
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </ToastProvider>
  );
}
