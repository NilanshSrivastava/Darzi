import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { MapPin, Navigation, Phone, Share2, ShieldCheck, Zap, Bike, Clock, Compass } from 'lucide-react';

export const LiveTailorTrackerMap = ({ booking }) => {
  const { showToast } = useToast();
  // Animation state for tailor rider moving along route
  const [progress, setProgress] = useState(0.2); // 0.0 (start) to 1.0 (arrived)
  const [etaMins, setEtaMins] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.95) return 0.95;
        const next = prev + 0.08;
        setEtaMins(Math.max(1, Math.round((1 - next) * 14)));
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleShareLocation = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Live tracking link copied to clipboard! 🔗', 'success', 'Family can track Masterji in real-time');
  };

  // Map route vector path calculation (Start: Tailor shop, End: Customer house)
  const startX = 60;
  const startY = 220;
  const endX = 360;
  const endY = 80;

  // Interpolated tailor position
  const currentX = startX + (endX - startX) * progress;
  const currentY = startY + (endY - startY) * progress;

  return (
    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1.5px solid var(--border-gold)', boxShadow: 'var(--shadow-md)', background: '#1E293B', color: '#FFF' }}>
      
      {/* Live Status Header Bar */}
      <div style={{ background: 'linear-gradient(90deg, #0A3226 0%, #164E3D 100%)', padding: '0.9rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ background: '#22C55E', width: '10px', height: '10px', borderRadius: '50%', boxShadow: '0 0 10px #22C55E' }} className="animate-pulse" />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--gold-warm)' }}>
            Live Doorstep Specialist GPS Radar
          </span>
        </div>

        <div style={{ background: 'rgba(212, 175, 55, 0.2)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-gold)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--gold-warm)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={14} /> ETA: {etaMins > 1 ? `${etaMins} Mins Away` : 'Arriving at Your Door!'}
        </div>
      </div>

      {/* Vector Interactive Map View Canvas */}
      <div style={{ height: '260px', position: 'relative', background: '#0F172A', overflow: 'hidden' }}>
        
        <svg width="100%" height="100%" viewBox="0 0 420 280" preserveAspectRatio="none">
          {/* Map Grid Roads */}
          <path d="M 0 100 Q 200 120 420 80" stroke="#334155" strokeWidth="18" fill="none" />
          <path d="M 60 280 Q 150 140 360 40" stroke="#475569" strokeWidth="12" fill="none" />
          <path d="M 180 0 L 220 280" stroke="#334155" strokeWidth="14" fill="none" />
          
          {/* Active Route Line (Tailor to Customer) */}
          <path d="M 60 220 C 120 180, 240 140, 360 80" stroke="var(--gold-accent)" strokeWidth="6" strokeDasharray="8 4" fill="none" />

          {/* Landmarks Text */}
          <text x="70" y="250" fill="#94A3B8" fontSize="11" fontWeight="600">Lajpat Nagar Central Market</text>
          <text x="240" y="50" fill="#94A3B8" fontSize="11" fontWeight="600">Ring Road Junction</text>

          {/* Customer Home Pin */}
          <g transform={`translate(${endX - 16}, ${endY - 32})`}>
            <circle cx="16" cy="16" r="14" fill="rgba(34, 197, 94, 0.25)" className="animate-ping" />
            <circle cx="16" cy="16" r="10" fill="#22C55E" />
            <text x="16" y="20" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="800">🏠</text>
          </g>

          {/* Moving Tailor Rider Scooter Marker */}
          <g transform={`translate(${currentX - 16}, ${currentY - 16})`}>
            <circle cx="16" cy="16" r="16" fill="var(--gold-accent)" boxShadow="0 0 12px var(--gold-accent)" />
            <text x="16" y="21" textAnchor="middle" fill="#0A3226" fontSize="14" fontWeight="800">🛵</text>
          </g>
        </svg>

        {/* Floating Map Labels Overlay */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(15, 23, 42, 0.88)', backdropFilter: 'blur(8px)', padding: '0.45rem 0.95rem', borderRadius: 'var(--radius-sm)', border: '1px solid #334155', fontSize: '0.78rem', color: '#CBD5E1' }}>
          📍 Doorstep Fitting At: <strong style={{ color: '#FFF' }}>{booking?.homeAddress || 'Lajpat Nagar II'}</strong>
        </div>

      </div>

      {/* Tailor Partner Rider Card & Quick Actions */}
      <div style={{ padding: '1.4rem', background: '#0F172A', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
              alt="Tailor Partner" 
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-accent)' }}
            />
            <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: '#22C55E', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #0F172A' }} />
          </div>

          <div>
            <div style={{ fontWeight: '800', fontSize: '0.96rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {booking?.assignedTailorName || 'Master Rajesh Kumar (Lajpat Nagar)'}
              <span style={{ color: 'var(--gold-accent)', fontSize: '0.78rem' }}>★ 4.9</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.15rem' }}>
              Specialist Ride: <strong style={{ color: '#E2E8F0' }}>{booking?.tailorVehicleNo || 'Hero Splendor DL-3S-9821'}</strong> • Sanitized Kit Ready
            </div>
          </div>
        </div>

        {/* Action Triggers */}
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <a 
            href={`tel:${booking?.contactPhone || '+919811223344'}`}
            className="btn-gold" 
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.84rem', borderRadius: 'var(--radius-full)', textDecoration: 'none' }}
          >
            <Phone size={15} /> Call Masterji
          </a>
          <button 
            type="button"
            onClick={handleShareLocation}
            className="btn-outline" 
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.84rem', borderRadius: 'var(--radius-full)', color: '#FFF', borderColor: '#475569' }}
          >
            <Share2 size={15} /> Share Live Link
          </button>
        </div>

      </div>

    </div>
  );
};
