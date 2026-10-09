import React, { useState } from 'react';
import { Search, Scissors, ShieldCheck, Truck, Sparkles, MapPin, Heart, Check, Users } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Hero = ({ onSearchNeighborhood, activeNeighborhood }) => {
  const [query, setQuery] = useState(activeNeighborhood || '');
  const { showToast } = useToast();

  const popularNeighborhoods = [
    'Lajpat Nagar',
    'Shahpur Jat',
    'Karol Bagh',
    'South Ex',
    'Connaught Place'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchNeighborhood(query.trim());
    if (query.trim()) {
      showToast(`Showing master craftsmen in ${query.trim()}`, 'success', 'Verified local boutiques loaded');
    } else {
      showToast('Showing all neighborhood artisans across Delhi NCR', 'info');
    }
  };

  const handleSelectPill = (loc) => {
    setQuery(loc);
    onSearchNeighborhood(loc);
    showToast(`Neighborhood set to ${loc} 📍`, 'success', 'Found top-rated local master tailors');
  };

  return (
    <section style={{
      background: 'radial-gradient(ellipse at 50% 10%, #164E3D 0%, #0A281E 65%, #051A13 100%)',
      color: '#FFFFFF',
      padding: '4.5rem 1.5rem 5rem 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Warm Fabric Light Glow */}
      <div style={{
        position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: '750px', height: '650px',
        background: 'radial-gradient(circle, rgba(226, 191, 78, 0.14) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Decorative Needle & Thread Floating Line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, transparent, var(--gold-accent), transparent)',
        opacity: 0.6
      }} />

      <div style={{ maxWidth: '920px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Warm Craft Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          background: 'rgba(212, 175, 55, 0.12)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          backdropFilter: 'blur(10px)',
          padding: '0.45rem 1.35rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: 'var(--gold-warm)',
          marginBottom: '1.6rem'
        }}>
          <Sparkles size={16} style={{ color: 'var(--gold-accent)' }} />
          <span>Neighborhood Artisanship • 500+ Verified Master Tailors</span>
        </div>

        {/* Humanized Editorial Headline */}
        <h1 className="font-serif hero-headline" style={{
          fontSize: '3.4rem',
          fontWeight: '700',
          lineHeight: 1.18,
          marginBottom: '1.35rem',
          letterSpacing: '-0.3px',
          color: '#FAF8F5'
        }}>
          Your Personal Master Tailor, <br />
          <span style={{ fontStyle: 'italic', color: 'var(--gold-warm)', fontWeight: '500' }}>
            Right in Your Living Room.
          </span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: '#D4DDD8',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.65,
          fontWeight: '400'
        }}>
          Bespoke blouses, designer kurtis, Anarkalis & suits stitched by local master craftsmen.
          We send our certified measurement specialist to your doorstep, with a <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>100% perfect fit guarantee</strong>.
        </p>

        {/* Reactive Neighborhood Search Bar */}
        <form onSubmit={handleSearch} style={{
          display: 'flex', alignItems: 'center',
          background: '#FFFFFF',
          padding: '0.45rem 0.6rem 0.45rem 1.4rem',
          borderRadius: 'var(--radius-full)',
          maxWidth: '640px',
          margin: '0 auto 1.25rem auto',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(212, 175, 55, 0.25)',
          border: '1.5px solid rgba(212, 175, 55, 0.6)',
          transition: 'transform 0.2s ease'
        }}>
          <MapPin size={22} style={{ color: 'var(--primary-emerald)', marginRight: '0.65rem', flexShrink: 0 }} />
          <input 
            type="text" 
            placeholder="Type your neighborhood (e.g. Lajpat Nagar, Karol Bagh, Indiranagar)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearchNeighborhood(e.target.value.trim());
            }}
            style={{
              border: 'none', outline: 'none', width: '100%',
              fontSize: '1rem', color: 'var(--text-main)', background: 'transparent',
              fontFamily: 'var(--font-sans)', fontWeight: '500'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); onSearchNeighborhood(''); }}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '0 0.5rem', fontSize: '0.85rem' }}
            >
              Clear
            </button>
          )}
          <button type="submit" className="btn-gold" style={{ padding: '0.75rem 1.8rem', borderRadius: 'var(--radius-full)', flexShrink: 0, fontWeight: '700' }}>
            <Search size={18} /> Find Artisans
          </button>
        </form>

        {/* Quick Neighborhood Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3.2rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#A0B1A9', marginRight: '0.25rem' }}>Popular Hubs:</span>
          {popularNeighborhoods.map(loc => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelectPill(loc)}
              style={{
                background: query.toLowerCase() === loc.toLowerCase() ? 'var(--gold-accent)' : 'rgba(255, 255, 255, 0.08)',
                color: query.toLowerCase() === loc.toLowerCase() ? '#0A2A20' : '#E2E8E5',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (query.toLowerCase() !== loc.toLowerCase()) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                }
              }}
              onMouseOut={(e) => {
                if (query.toLowerCase() !== loc.toLowerCase()) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }
              }}
            >
              📍 {loc}
            </button>
          ))}
        </div>

        {/* Human Trust Feature Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            padding: '1.25rem 1.35rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transition: 'all 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-warm)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <Truck size={19} /> Doorstep Concierge
            </div>
            <p style={{ fontSize: '0.82rem', color: '#B5C4BD', lineHeight: 1.5 }}>
              Female specialist available for home measurement visits with calibrated measuring tapes.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            padding: '1.25rem 1.35rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transition: 'all 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-warm)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <ShieldCheck size={19} /> 100% Fit Guarantee
            </div>
            <p style={{ fontSize: '0.82rem', color: '#B5C4BD', lineHeight: 1.5 }}>
              Free alterations within 14 days — no questions asked until your garment fits like second skin.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            padding: '1.25rem 1.35rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transition: 'all 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-warm)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <Scissors size={19} /> Transparent Fair Wage
            </div>
            <p style={{ fontSize: '0.82rem', color: '#B5C4BD', lineHeight: 1.5 }}>
              Starting ₹199 with zero boutique markup. 80%+ of booking directly empowers neighborhood tailors.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
