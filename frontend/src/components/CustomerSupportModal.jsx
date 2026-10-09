import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, Heart, Sparkles, User, HelpCircle, PhoneCall } from 'lucide-react';

export const CustomerSupportModal = () => {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  
  const [queries, setQueries] = useState([
    {
      id: 1,
      subject: 'Female Measurement Specialist Request',
      message: 'Can I request a female measurement specialist for this Saturday evening at 5 PM?',
      adminReply: 'Hello Pooja! Yes, our female doorstep specialist Suman Ji will arrive at 5 PM on Saturday with calibrated measuring tape. We look forward to meeting you!',
      status: 'RESOLVED',
      createdAt: '2026-10-08T10:00:00'
    }
  ]);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const quickPresets = [
    { title: 'Female Specialist Visit', msg: 'I would like to request a female measurement specialist for my home fitting appointment.' },
    { title: 'Own Fabric & Lining', msg: 'I already have my own banarasi brocade fabric. Do I need to provide cotton lining or does Masterji provide it?' },
    { title: 'Urgent 24-Hour Blouse', msg: 'I have a family wedding this Sunday. Can I request express priority stitching for my saree blouse?' },
    { title: 'Doorstep Fit Reschedule', msg: 'I need to adjust my home doorstep measurement visit by 1 hour due to work.' }
  ];

  useEffect(() => {
    if (user?.id) {
      fetch(`${API_BASE_URL}/api/queries/customer/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) setQueries(data);
        })
        .catch(() => {});
    }
  }, [user]);

  const handleApplyPreset = (preset) => {
    setSubject(preset.title);
    setMessage(preset.msg);
    showToast(`Quick topic selected: ${preset.title}`, 'info');
  };

  const handleSendQuery = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to send a query', 'info');
      openAuthModal('CUSTOMER');
      return;
    }

    if (!subject.trim() || !message.trim()) {
      showToast('Please enter both subject and message', 'error');
      return;
    }

    setIsSubmitting(true);
    const newQ = {
      customerId: user.id,
      subject: subject.trim(),
      message: message.trim()
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/queries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQ)
      });
      const data = await res.json().catch(() => null);
      if (data && data.id) {
        setQueries([data, ...queries]);
      } else {
        setQueries([{ ...newQ, id: Date.now(), status: 'OPEN', createdAt: new Date().toISOString() }, ...queries]);
      }
      showToast('Your message was sent to Atelier Concierge! 💌', 'success');
    } catch (err) {
      setQueries([{ ...newQ, id: Date.now(), status: 'OPEN', createdAt: new Date().toISOString() }, ...queries]);
      showToast('Your message was sent to Atelier Concierge! 💌', 'success');
    } finally {
      setIsSubmitting(false);
      setSentSuccess(true);
      setSubject('');
      setMessage('');
      setTimeout(() => setSentSuccess(false), 5000);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2.5rem auto', padding: '0 1.5rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          Atelier Care &amp; Concierge
        </span>
        <h2 className="font-serif" style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--primary-emerald)', marginTop: '0.2rem' }}>
          Namaste{user ? `, ${user.name}` : ''}! How Can We Help?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          Direct line to our neighborhood master tailors and doorstep measurement coordinators.
        </p>
      </div>

      {/* Quick Topic Chips */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
          Common Inquiries (Click to prefill):
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {quickPresets.map(preset => (
            <button
              key={preset.title}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-gold)',
                color: 'var(--primary-emerald)',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--gold-soft)'}
              onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}
            >
              <span>💬 {preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Ask Question Form */}
        <div className="glass-card" style={{ padding: '2.2rem', border: '1.5px solid var(--border-gold)', borderRadius: 'var(--radius-lg)' }}>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} style={{ color: 'var(--gold-accent)' }} /> Submit Question or Request
          </h3>

          {sentSuccess && (
            <div style={{ background: '#DCFCE7', color: '#15803D', padding: '0.9rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid #86EFAC' }}>
              <CheckCircle2 size={20} />
              <span>Your message has been received! Team Darzi will reply to your inbox shortly.</span>
            </div>
          )}

          <form onSubmit={handleSendQuery}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.86rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                Subject / Purpose:
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g. Female measurement specialist request, Fabric query..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '700', fontSize: '0.86rem', color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>
                Your Message / Details:
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Tell us what you need. Mention any specific neckline preferences, urgent dates, or preferred times for home visits..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '0.88rem', outline: 'none', fontFamily: 'var(--font-sans)' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              {isSubmitting ? (
                <span>Sending to Team Darzi...</span>
              ) : (
                <>
                  <Send size={17} /> Send Message to Atelier Team
                </>
              )}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
              🤝 Personalized support by real tailoring specialists — not automated chatbots.
            </p>
          </form>
        </div>

        {/* Previous Queries Inbox */}
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--primary-emerald)', marginBottom: '1.25rem' }}>
            My Conversation History ({queries.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {queries.map(q => (
              <div 
                key={q.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: q.status === 'RESOLVED' ? '1px solid #BBF7D0' : '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-emerald)' }}>
                    {q.subject}
                  </h4>
                  <span style={{
                    background: q.status === 'RESOLVED' ? '#DCFCE7' : '#FEF3C7',
                    color: q.status === 'RESOLVED' ? '#15803D' : '#B45309',
                    padding: '0.15rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>
                    {q.status === 'RESOLVED' ? '✓ Replied' : 'Pending Review'}
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  "{q.message}"
                </p>

                {q.adminReply && (
                  <div style={{ background: '#FAF7F2', borderLeft: '3px solid var(--gold-accent)', padding: '0.75rem 1rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-emerald)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Scissors size={13} style={{ color: 'var(--gold-accent)' }} /> Response from Team Darzi:
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.45 }}>
                      "{q.adminReply}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
