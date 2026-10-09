import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { Scissors, Star, MapPin, CheckCircle2, Heart, Award, Sparkles, Image as ImageIcon, MessageCircle, ArrowRight, X } from 'lucide-react';

export const TailorPortfolioShowcase = () => {
  const { showToast } = useToast();

  const [tailors] = useState([
    {
      id: 1,
      shopName: 'Rajesh Master Craft',
      masterName: 'Master Rajesh Kumar',
      neighborhood: 'Lajpat Nagar',
      experienceYears: 18,
      rating: 4.9,
      totalOrdersCompleted: 142,
      specialties: 'Bespoke Saree Blouses, Designer Kurtis, Lehengas',
      artisanQuote: 'For 18 years, I have shaped blouses so women feel both regal and comfortable. You provide the dream fabric, I ensure the seam never bites.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      works: [
        { title: 'Velvet Bridal Blouse with Doris', category: 'Saree Blouse', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
        { title: 'Embroidered Festive Kurti', category: 'Ethnic Kurti', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80' }
      ],
      reviews: [
        { customer: 'Ananya Roy', rating: 5.0, fitScore: 5.0, text: 'Master Rajesh stitched my velvet bridal saree blouse to absolute perfection! Doorstep executive took measurements cleanly.', date: '2 days ago' },
        { customer: 'Sneha Kapoor', rating: 4.9, fitScore: 4.8, text: 'The padded support and sweetheart neck cut were flawless. Will definitely reorder for all my festive kurtis.', date: '1 week ago' }
      ]
    },
    {
      id: 2,
      shopName: 'Sultana Studio',
      masterName: 'Sultana Boutique',
      neighborhood: 'Shahpur Jat',
      experienceYears: 12,
      rating: 4.8,
      totalOrdersCompleted: 98,
      specialties: 'Anarkalis, Indo-Western Gowns, Velvet Cuts',
      artisanQuote: 'Every flare has its own rhythm. We calibrate 32-kali cuts with soft crinoline hem tape so the Anarkali twirls effortlessly.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      works: [
        { title: 'Flared Royal Anarkali (32-Kali)', category: 'Grand Anarkali', image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=80' },
        { title: 'Designer Lehenga Choli Set', category: 'Lehenga Choli', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' }
      ],
      reviews: [
        { customer: 'Meera Sen', rating: 4.8, fitScore: 4.9, text: 'Sultana Studio delivered my floor-length Anarkali in just 4 days. The flared kali cut draping is gorgeous!', date: '3 days ago' }
      ]
    },
    {
      id: 3,
      shopName: 'Verma & Sons Tailors',
      masterName: 'Verma Gentleman Stitchers',
      neighborhood: 'Karol Bagh',
      experienceYears: 25,
      rating: 4.95,
      totalOrdersCompleted: 210,
      specialties: 'Men Sherwanis, Custom Suits, Nehru Jackets',
      artisanQuote: 'A gentleman’s shoulder structure is sacred. We hand-pad every chest piece using natural horsehair canvas for that timeless razor-sharp drape.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      works: [
        { title: 'Royal Silk Wedding Sherwani', category: 'Men Sherwani', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' }
      ],
      reviews: [
        { customer: 'Vikramaditya Rao', rating: 5.0, fitScore: 5.0, text: 'Verma Ji crafted my silk wedding Sherwani with impeccable shoulder structure and hand embroidery detail.', date: '5 days ago' }
      ]
    }
  ]);

  const [selectedWorkImage, setSelectedWorkImage] = useState(null);

  const handleRequestArtisan = (tailorName) => {
    showToast(`Master tailor preference saved: ${tailorName} ✂️`, 'gold', 'Assigned automatically to your next custom garment order');
  };

  return (
    <section style={{ maxWidth: '1240px', margin: '4.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at 80% 20%, #900C3F 0%, #4A0E2E 50%, #0A281E 100%)',
        color: '#FFFFFF', padding: '3.2rem 2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '3.5rem',
        boxShadow: '0 20px 45px rgba(74, 14, 46, 0.28)', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--gold-accent)', padding: '0.35rem 1.1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--gold-warm)', marginBottom: '1rem' }}>
            <Award size={16} /> Neighborhood Heritage &amp; Verified Fit Portfolios
          </div>

          <h2 className="font-serif" style={{ fontSize: '2.7rem', fontWeight: '700', lineHeight: 1.18, marginBottom: '0.85rem' }}>
            Meet Your Neighborhood Master Artisans
          </h2>
          
          <p style={{ color: '#F1F5F3', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Browse authentic hand-stitched creations, actual customer fitting scores, and artisan philosophies from renowned craftsmen across Lajpat Nagar, Shahpur Jat, and Karol Bagh.
          </p>
        </div>
      </div>

      {/* Tailors Showcase Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {tailors.map(t => (
          <div 
            key={t.id}
            className="glass-card"
            style={{
              padding: '2.2rem', borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-gold)',
              boxShadow: 'var(--shadow-md)', background: '#FFFFFF'
            }}
          >
            {/* Tailor Header Info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <img 
                  src={t.avatar} 
                  alt={t.masterName} 
                  style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold-accent)', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <h3 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>
                      {t.shopName}
                    </h3>
                    <span style={{ background: 'var(--gold-soft)', color: '#92400E', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={13} fill="#D97706" color="#D97706" /> {t.rating} / 5.0
                    </span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    <strong>{t.masterName}</strong> • <MapPin size={14} style={{ display: 'inline', color: 'var(--gold-accent)' }} /> {t.neighborhood} • {t.experienceYears} Years Master Craftsmanship
                  </p>

                  <p style={{ fontSize: '0.82rem', color: 'var(--emerald-accent)', fontWeight: '600', marginTop: '0.35rem' }}>
                    Specialties: {t.specialties}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#F8FAF9', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Stitched Garments</span>
                  <strong style={{ fontSize: '1.35rem', color: 'var(--primary-emerald)' }}>{t.totalOrdersCompleted}+ Completed</strong>
                </div>

                <button
                  onClick={() => handleRequestArtisan(t.masterName)}
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.3rem', fontSize: '0.84rem' }}
                >
                  <Scissors size={15} /> Request This Masterji
                </button>
              </div>
            </div>

            {/* Human Artisan Philosophy Quote */}
            {t.artisanQuote && (
              <div style={{
                background: '#FAF7F2',
                borderLeft: '4px solid var(--gold-accent)',
                padding: '0.9rem 1.4rem',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                marginBottom: '1.75rem',
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                fontStyle: 'italic',
                lineHeight: 1.55
              }}>
                "{t.artisanQuote}"
              </div>
            )}

            {/* Portfolio Grid */}
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.75rem' }}>
                Authentic Handcrafted Works:
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {t.works.map((w, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedWorkImage(w)}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      height: '180px',
                      position: 'relative',
                      cursor: 'pointer',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <img 
                      src={w.image} 
                      alt={w.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(10,50,38,0.92))', padding: '1rem 0.85rem 0.65rem 0.85rem', color: '#FFF' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--gold-warm)', fontWeight: '700', textTransform: 'uppercase' }}>{w.category}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>{w.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews */}
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.75rem' }}>
                Verified Doorstep Fitting Reviews ({t.reviews.length}):
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {t.reviews.map((r, idx) => (
                  <div key={idx} style={{ background: '#F8FAF9', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--primary-emerald)' }}>{r.customer}</strong>
                      <span style={{ color: '#166534', fontWeight: '800', fontSize: '0.78rem', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                        ★ {r.fitScore} Fit Score
                      </span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      "{r.text}"
                    </p>
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.35rem', display: 'block' }}>{r.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedWorkImage && (
        <div className="modal-overlay" onClick={() => setSelectedWorkImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSelectedWorkImage(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={18} />
              </button>
              <img src={selectedWorkImage.image} alt={selectedWorkImage.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <span style={{ color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>{selectedWorkImage.category}</span>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)', marginTop: '0.2rem' }}>{selectedWorkImage.title}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Handcrafted pattern cut by verified neighborhood master tailor with reinforced seams and perfect fit guarantee.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
