import React, { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { GarmentCustomizerModal } from './GarmentCustomizerModal';
import { TailorPortfolioShowcase } from './TailorPortfolioShowcase';
import { DarziGoldSection } from './DarziGoldSection';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { Scissors, Clock, Sparkles, CheckCircle2, ArrowRight, Star, Heart, Shield, Filter, MapPin } from 'lucide-react';

export const Storefront = ({ onGoToOrders }) => {
  const { showToast } = useToast();

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Designer Saree Blouse',
      categoryType: 'women',
      description: 'Padded/Non-padded bespoke saree blouses with custom necklines, back cutouts, and hand-tasseled doris.',
      basePrice: 499.00,
      estimatedDays: 3,
      artisanSpecialist: 'Master Rajesh (Lajpat Nagar)',
      highlightTag: 'Most Loved for Weddings',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Ethnic Kurti & Suits',
      categoryType: 'women',
      description: 'Daily wear & festive straight-cut, A-line, and flared kurtis with pure breathable cotton lining.',
      basePrice: 699.00,
      estimatedDays: 4,
      artisanSpecialist: 'Sultana Studio (Shahpur Jat)',
      highlightTag: 'Everyday & Office Chic',
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Grand Anarkali & Gowns',
      categoryType: 'bridal',
      description: 'Floor-length flared Anarkali ensembles, 32-kali cuts, and bespoke border edging with matching masks.',
      basePrice: 1499.00,
      estimatedDays: 6,
      artisanSpecialist: 'Sultana Studio (Shahpur Jat)',
      highlightTag: 'Royal Heritage Flares',
      imageUrl: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Lehenga Choli Set',
      categoryType: 'bridal',
      description: 'Bespoke blouse tailoring, lehenga skirt cancan waist fitting, and zari dupatta picot edging.',
      basePrice: 1799.00,
      estimatedDays: 7,
      artisanSpecialist: 'Master Rajesh (Lajpat Nagar)',
      highlightTag: 'Full Bridal Ensemble',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'Men Sherwani & Kurta',
      categoryType: 'men',
      description: 'Royal festive sherwanis, structured bandhgalas, and tailored cotton/mulmul kurta pyjama sets.',
      basePrice: 1299.00,
      estimatedDays: 5,
      artisanSpecialist: 'Verma & Sons (Karol Bagh)',
      highlightTag: 'Gentleman Precision Cut',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      name: 'Garment Alteration & Repair',
      categoryType: 'alterations',
      description: 'Express doorstep waist tapering, sleeve shortening, invisible zip replacement, and delicate fall-piko.',
      basePrice: 199.00,
      estimatedDays: 2,
      artisanSpecialist: 'Express Concierge (All Neighborhoods)',
      highlightTag: 'Delivered in 48 Hours',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);
  const [filterNeighborhood, setFilterNeighborhood] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('ALL'); // ALL, WOMEN, BRIDAL, MEN, ALTERATIONS

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with rich humanized metadata
          setCategories(prev => {
            return data.map(item => {
              const matched = prev.find(p => p.id === item.id || p.name === item.name);
              return {
                ...matched,
                ...item,
                categoryType: matched?.categoryType || 'women',
                artisanSpecialist: matched?.artisanSpecialist || 'Certified Neighborhood Master Tailor',
                highlightTag: matched?.highlightTag || 'Bespoke Craftsmanship'
              };
            });
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleOrderSuccess = (orderData) => {
    setSelectedCategory(null);
    setSuccessOrder(orderData);
    showToast(`Order #${orderData.orderNumber} successfully booked! 🎉`, 'gold', 'Doorstep measurement specialist assigned');
  };

  // Reactive filtering
  const filteredCategories = categories.filter(cat => {
    // Filter by tab
    if (activeCategoryTab === 'WOMEN' && cat.categoryType !== 'women') return false;
    if (activeCategoryTab === 'BRIDAL' && cat.categoryType !== 'bridal') return false;
    if (activeCategoryTab === 'MEN' && cat.categoryType !== 'men') return false;
    if (activeCategoryTab === 'ALTERATIONS' && cat.categoryType !== 'alterations') return false;

    // Filter by neighborhood if query exists
    if (filterNeighborhood) {
      const q = filterNeighborhood.toLowerCase();
      const matchName = cat.name.toLowerCase().includes(q);
      const matchDesc = cat.description.toLowerCase().includes(q);
      const matchArtisan = cat.artisanSpecialist && cat.artisanSpecialist.toLowerCase().includes(q);
      return matchName || matchDesc || matchArtisan;
    }
    return true;
  });

  return (
    <div>
      {/* Hero Header with Reactive Neighborhood Filter */}
      <Hero
        onSearchNeighborhood={(loc) => setFilterNeighborhood(loc)}
        activeNeighborhood={filterNeighborhood}
      />

      {/* Order Success Banner Banner */}
      {successOrder && (
        <div style={{ maxWidth: '1240px', margin: '2rem auto 0 auto', padding: '0 1.5rem' }}>
          <div className="glass-card gold-glow-border" style={{
            padding: '2rem',
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.25rem',
            boxShadow: '0 10px 30px rgba(22, 101, 52, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                background: '#15803D', color: '#FFF', width: '54px', height: '54px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(21, 128, 61, 0.3)'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  🌸 Order Received with Love & Care!
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#14532D', margin: '0.2rem 0' }}>
                  {successOrder.orderNumber} • {successOrder.categoryName}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#166534' }}>
                  Our doorstep specialist is preparing calibrated tapes & sample books. Total: <strong>₹{successOrder.totalPrice.toFixed(2)}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <button onClick={() => setSuccessOrder(null)} className="btn-outline" style={{ padding: '0.65rem 1.4rem' }}>
                Dismiss
              </button>
              <button onClick={onGoToOrders} className="btn-gold" style={{ padding: '0.65rem 1.6rem' }}>
                Watch Fitting Journey <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Grid Section */}
      <section style={{ maxWidth: '1240px', margin: '3.5rem auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Atelier Bespoke Collection
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.6rem', fontWeight: '700', color: 'var(--primary-emerald)', marginTop: '0.35rem' }}>
            Select Your Silhouette & Customise
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', maxWidth: '640px', margin: '0.6rem auto 0 auto', lineHeight: 1.6 }}>
            Every garment is cut from individual patterns tailored specifically to your body measurements — never mass manufactured.
          </p>
        </div>

        {/* Reactive Category Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {[
            { id: 'ALL', label: 'All Silhouettes', count: categories.length },
            { id: 'WOMEN', label: 'Blouses & Kurtis', count: 2 },
            { id: 'BRIDAL', label: 'Bridal & Anarkalis', count: 2 },
            { id: 'MEN', label: "Men's Heritage", count: 1 },
            { id: 'ALTERATIONS', label: 'Quick Alterations', count: 1 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategoryTab(tab.id);
                showToast(`Filter: ${tab.label}`, 'info');
              }}
              style={{
                background: activeCategoryTab === tab.id ? 'var(--primary-emerald)' : '#FFFFFF',
                color: activeCategoryTab === tab.id ? '#FFFFFF' : 'var(--text-main)',
                border: activeCategoryTab === tab.id ? '1px solid var(--primary-emerald)' : '1px solid var(--border-light)',
                padding: '0.55rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 0.22s ease',
                boxShadow: activeCategoryTab === tab.id ? 'var(--shadow-md)' : 'none'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                background: activeCategoryTab === tab.id ? 'rgba(212, 175, 55, 0.3)' : '#F3F4F6',
                color: activeCategoryTab === tab.id ? 'var(--gold-accent)' : '#6B7280',
                padding: '0.1rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: '700'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Neighborhood Filter Notice if query active */}
        {filterNeighborhood && (
          <div style={{
            background: 'var(--gold-soft)',
            border: '1px solid var(--border-gold)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.88rem',
            color: 'var(--primary-emerald)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={17} style={{ color: 'var(--gold-accent)' }} />
              <span>Showing master tailor availability for: <strong>"{filterNeighborhood}"</strong></span>
            </div>
            <button
              onClick={() => setFilterNeighborhood('')}
              style={{ background: 'none', border: 'none', color: '#B45309', fontWeight: '700', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              Reset filter
            </button>
          </div>
        )}

        {/* Categories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.2rem' }}>
          {filteredCategories.map(cat => (
            <div 
              key={cat.id} 
              className="glass-card interactive-craft-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)'
              }}
            >
              {/* Category Image */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={cat.imageUrl} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Highlight Tag */}
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: 'rgba(10, 50, 38, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--gold-warm)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  letterSpacing: '0.3px',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  border: '1px solid rgba(212, 175, 55, 0.35)'
                }}>
                  <Sparkles size={13} /> {cat.highlightTag}
                </div>
                
                {/* Delivery SLA Badge */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'rgba(255, 255, 255, 0.94)',
                  color: 'var(--primary-emerald)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Clock size={13} style={{ color: 'var(--gold-accent)' }} /> Ready in {cat.estimatedDays} Days
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Scissors size={13} style={{ color: 'var(--gold-accent)' }} /> {cat.artisanSpecialist}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: '1.42rem', fontWeight: '700', color: 'var(--primary-emerald)', marginBottom: '0.5rem' }}>
                    {cat.name}
                  </h3>
                  
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '1.35rem' }}>
                    {cat.description}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Transparent Fair Wage
                    </span>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-emerald)', lineHeight: 1.1 }}>
                      ₹{cat.basePrice ? cat.basePrice.toFixed(2) : '499.00'}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: '600' }}>
                      ✓ Doorstep Visit Included
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedCategory(cat);
                      showToast(`Customizer loaded for ${cat.name}`, 'info');
                    }}
                    className="btn-gold"
                    style={{ padding: '0.7rem 1.35rem', fontSize: '0.86rem' }}
                  >
                    <Scissors size={16} /> Customise &amp; Book
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Humanized Reassurance Box */}
        <div style={{
          marginTop: '3.5rem',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '2rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gold-soft)', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={22} />
            </div>
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-emerald)', marginBottom: '0.2rem' }}>
                Crafted for Every Body
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Standard sizes don't reflect real bodies. We tailor individually for true comfort and confident posture.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gold-soft)', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={22} />
            </div>
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-emerald)', marginBottom: '0.2rem' }}>
                Free Doorstep Alterations
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                If you need a nip at the waist or a loosened sleeve, our master tailor revisits your home free of charge.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gold-soft)', color: '#92400E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-emerald)', marginBottom: '0.2rem' }}>
                Neighborhood Pride
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                By booking through Darzi, you directly sustain the generational skills of local tailoring families.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* In-Page Darzi Gold VIP Membership Section */}
      <DarziGoldSection />

      {/* Tailor Portfolio & Verified Customer Reviews Showcase */}
      <TailorPortfolioShowcase />

      {/* Garment Customizer Modal */}
      {selectedCategory && (
        <GarmentCustomizerModal 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
};
