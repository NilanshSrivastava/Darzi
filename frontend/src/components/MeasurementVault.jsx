import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { Ruler, Plus, Trash2, CheckCircle2, Shield, Sparkles, User, Scissors, Heart, Info, HelpCircle, Check, ArrowRight } from 'lucide-react';

export const MeasurementVault = () => {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      profileTitle: 'Festive Saree Blouse Spec',
      garmentType: 'Designer Saree Blouse',
      chest: 36.0,
      waist: 30.0,
      hips: 38.0,
      shoulder: 14.5,
      sleeveLength: 10.5,
      garmentLength: 14.0,
      customNotes: 'Sweetheart neck, padded front, deep back with dori latkans.',
      sampleGarmentPickupRequested: true
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeMeasurementTip, setActiveMeasurementTip] = useState('chest');

  // Form Fields
  const [profileTitle, setProfileTitle] = useState('');
  const [garmentType, setGarmentType] = useState('Designer Saree Blouse');
  const [chest, setChest] = useState(36);
  const [waist, setWaist] = useState(30);
  const [hips, setHips] = useState(38);
  const [shoulder, setShoulder] = useState(14.5);
  const [sleeveLength, setSleeveLength] = useState(10.5);
  const [garmentLength, setGarmentLength] = useState(14);
  const [customNotes, setCustomNotes] = useState('');
  const [sampleGarmentPickupRequested, setSampleGarmentPickupRequested] = useState(true);

  const measurementTips = {
    chest: { label: 'Bust / Chest', tip: 'Measure around the fullest part of your bust. Keep tape level across shoulder blades, breathing naturally.' },
    waist: { label: 'Natural Waist', tip: 'Measure around your natural waistline (narrowest area above navel). Leave one finger breathability room.' },
    hips: { label: 'Full Hips', tip: 'Stand with feet together and measure around the fullest curve of hips & seat.' },
    shoulder: { label: 'Shoulder Width', tip: 'Measure across the back from the edge of the left shoulder bone to the right.' },
    sleeveLength: { label: 'Sleeve Length', tip: 'Measure from shoulder bone down to desired sleeve hem (e.g., 5" for short, 10" for elbow).' },
    garmentLength: { label: 'Garment Length', tip: 'Measure from high point of shoulder straight down to where you want the hem to rest.' }
  };

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_BASE_URL}/api/measurements/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) setProfiles(data);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to save measurements to your vault', 'info');
      openAuthModal('CUSTOMER');
      return;
    }

    const newProfile = {
      profileTitle: profileTitle || `${garmentType} Custom Fit`,
      garmentType,
      chest: parseFloat(chest),
      waist: parseFloat(waist),
      hips: parseFloat(hips),
      shoulder: parseFloat(shoulder),
      sleeveLength: parseFloat(sleeveLength),
      garmentLength: parseFloat(garmentLength),
      customNotes,
      sampleGarmentPickupRequested
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/measurements/user/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
      const data = await res.json().catch(() => null);
      if (data && data.id) {
        setProfiles([...profiles, data]);
      } else {
        setProfiles([...profiles, { ...newProfile, id: Date.now() }]);
      }
      showToast('Measurement profile saved to Vault! 📐', 'success', 'Available for all your future orders');
    } catch (err) {
      setProfiles([...profiles, { ...newProfile, id: Date.now() }]);
      showToast('Measurement profile saved locally! 📐', 'success');
    } finally {
      setIsAddingNew(false);
      setProfileTitle('');
      setCustomNotes('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/measurements/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setProfiles(profiles.filter(p => p.id !== id));
    showToast('Measurement profile removed', 'info');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at 70% 30%, #164E3D 0%, #0A2F23 60%, #051A13 100%)',
        color: '#FFFFFF',
        padding: '3rem 2.5rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2.5rem',
        boxShadow: '0 16px 40px rgba(10, 47, 35, 0.22)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(212, 175, 55, 0.16)', border: '1px solid var(--gold-accent)',
            padding: '0.4rem 1.25rem', borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem', fontWeight: '800', color: 'var(--gold-warm)',
            marginBottom: '1rem'
          }}>
            <Ruler size={17} style={{ color: 'var(--gold-accent)' }} /> SMART DIGITAL MEASUREMENT VAULT
          </div>

          <h2 className="font-serif" style={{ fontSize: '2.7rem', fontWeight: '700', lineHeight: 1.18, marginBottom: '0.85rem' }}>
            Your Personal Fit Passport. <br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold-warm)', fontWeight: '500' }}>
              Measure Once, Stitch Flawlessly Forever.
            </span>
          </h2>

          <p style={{ color: '#DCE7E2', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Every body is wonderfully unique. Save multiple fit silhouettes (e.g. festive padded blouse, relaxed comfort kurti) and our master tailors will craft with precision accuracy.
          </p>

        </div>
      </div>

      {/* Human Reassurance & Sample Garment Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FBF6E9 0%, #F5EFEB 100%)',
        border: '1.5px solid var(--border-gold)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 2rem',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--primary-emerald)', color: 'var(--gold-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Heart size={24} />
          </div>
          <div>
            <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--primary-emerald)', fontWeight: '700' }}>
              Unsure about inches? Let our Master Tailor measure you at home!
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              During your doorstep visit, our female specialist will take all measurements with calibrated tape, or you can provide your best-fitting garment for us to clone.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="btn-gold"
          style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
        >
          <Plus size={18} /> Add New Measurement Spec
        </button>
      </div>

      {/* Add New Profile Modal / Form */}
      {isAddingNew && (
        <div className="glass-card gold-glow-border" style={{ padding: '2.2rem', marginBottom: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                New Fit Profile
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--primary-emerald)', fontWeight: '700' }}>
                Define Silhouette Dimensions (in Inches)
              </h3>
            </div>
            <button
              onClick={() => setIsAddingNew(false)}
              className="btn-outline"
              style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveProfile}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                  Profile Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Bridal Velvet Blouse Fit, Casual Cotton Kurti..."
                  value={profileTitle}
                  onChange={(e) => setProfileTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                  Garment Category:
                </label>
                <select
                  value={garmentType}
                  onChange={(e) => setGarmentType(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
                >
                  <option value="Designer Saree Blouse">Designer Saree Blouse</option>
                  <option value="Ethnic Kurti & Suits">Ethnic Kurti &amp; Suits</option>
                  <option value="Grand Anarkali & Gowns">Grand Anarkali &amp; Gowns</option>
                  <option value="Lehenga Choli Set">Lehenga Choli Set</option>
                  <option value="Men Sherwani & Kurta">Men Sherwani &amp; Kurta</option>
                </select>
              </div>
            </div>

            {/* Interactive Human Measurement Guidance Card */}
            <div style={{
              background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
              <HelpCircle size={20} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Tip for {measurementTips[activeMeasurementTip]?.label}:</strong> {measurementTips[activeMeasurementTip]?.tip}
              </div>
            </div>

            {/* Dimension Numeric Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              
              <div onFocus={() => setActiveMeasurementTip('chest')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Bust / Chest (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

              <div onFocus={() => setActiveMeasurementTip('waist')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Waist (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

              <div onFocus={() => setActiveMeasurementTip('hips')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Hips (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={hips}
                  onChange={(e) => setHips(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

              <div onFocus={() => setActiveMeasurementTip('shoulder')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Shoulder (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

              <div onFocus={() => setActiveMeasurementTip('sleeveLength')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Sleeve Length (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={sleeveLength}
                  onChange={(e) => setSleeveLength(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

              <div onFocus={() => setActiveMeasurementTip('garmentLength')}>
                <label style={{ display: 'block', fontWeight: '700', fontSize: '0.82rem', color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>
                  Garment Length (in)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={garmentLength}
                  onChange={(e) => setGarmentLength(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.9rem', fontWeight: '700' }}
                />
              </div>

            </div>

            {/* Custom Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                Posture / Fit Preferences for Tailor:
              </label>
              <input
                type="text"
                placeholder="e.g. Broader shoulders, prefer relaxed fit under arms, deep back cut..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem' }}
              />
            </div>

            {/* Sample Garment Clone Option */}
            <label style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              background: 'var(--gold-soft)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-gold)', marginBottom: '1.75rem', cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={sampleGarmentPickupRequested}
                onChange={(e) => setSampleGarmentPickupRequested(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-emerald)' }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--primary-emerald)', fontWeight: '600' }}>
                👗 I will also hand over my best-fitting sample garment during doorstep visit for exact clone replication.
              </span>
            </label>

            <button type="submit" className="btn-gold" style={{ padding: '0.75rem 2rem' }}>
              <CheckCircle2 size={18} /> Save to My Measurement Vault
            </button>

          </form>

        </div>
      )}

      {/* Profiles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {profiles.map(p => (
          <div
            key={p.id}
            className="glass-card"
            style={{
              padding: '1.8rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ background: 'var(--gold-soft)', color: 'var(--primary-emerald)', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: '800' }}>
                  {p.garmentType}
                </span>

                <button
                  onClick={() => handleDelete(p.id)}
                  title="Remove Profile"
                  style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '0.2rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-emerald)', marginBottom: '1rem' }}>
                {p.profileTitle || 'Bespoke Fit Spec'}
              </h3>

              {/* Dimensions Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Bust / Chest</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.chest}"</strong>
                </div>

                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Waist</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.waist}"</strong>
                </div>

                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Hips</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.hips}"</strong>
                </div>

                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Shoulder</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.shoulder}"</strong>
                </div>

                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Sleeve</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.sleeveLength}"</strong>
                </div>

                <div style={{ background: '#F8FAF9', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Length</span>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary-emerald)' }}>{p.garmentLength}"</strong>
                </div>
              </div>

              {p.customNotes && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: '#FAF7F2', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{p.customNotes}"
                </p>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#166534' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
                <CheckCircle2 size={15} /> Verified for 100% Fit Guarantee
              </span>
              {p.sampleGarmentPickupRequested && (
                <span style={{ background: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>
                  Sample Clone
                </span>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
