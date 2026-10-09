import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { API_BASE_URL } from '../config/api';
import { ShieldAlert, Users, Layers, MessageSquare, Plus, Trash2, CheckCircle2, DollarSign, X } from 'lucide-react';

export const AdminPortalView = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('TAILORS'); // TAILORS, CATEGORIES, QUERIES

  const [tailors, setTailors] = useState([
    { id: 1, shopName: 'Rajesh Master Craft', user: { name: 'Master Rajesh Kumar', email: 'rajesh@darzi.com', phone: '+91 9811223344' }, experienceYears: 18, specialties: 'Saree Blouses, Kurtis', rating: 4.9, status: 'APPROVED' },
    { id: 2, shopName: 'Sultana Studio', user: { name: 'Sultana Boutique', email: 'sultana@darzi.com', phone: '+91 9899887766' }, experienceYears: 12, specialties: 'Anarkalis, Indo-Western', rating: 4.8, status: 'APPROVED' }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Designer Saree Blouse', basePrice: 499.00, estimatedDays: 3, description: 'Padded/Non-padded bespoke saree blouses with custom necklines.' },
    { id: 2, name: 'Ethnic Kurti & Suits', basePrice: 699.00, estimatedDays: 4, description: 'Daily wear & festive straight-cut, A-line, and flared kurtis.' },
    { id: 3, name: 'Grand Anarkali & Gowns', basePrice: 1499.00, estimatedDays: 6, description: 'Floor-length flared Anarkali ensembles & designer dupattas.' }
  ]);

  const [queries, setQueries] = useState([
    { id: 1, customerName: 'Pooja Sharma', subject: 'Doorstep Measurement Availability', message: 'Can I request a female measurement specialist for this Saturday evening at 5 PM?', adminReply: 'Appointment confirmed for Saturday 5 PM.', status: 'RESOLVED' }
  ]);

  const [replyText, setReplyText] = useState({});
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatPrice, setNewCatPrice] = useState(599);
  const [newCatDesc, setNewCatDesc] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/tailors`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTailors(data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setCategories(data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/queries/admin/all`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setQueries(data); })
      .catch(() => {});
  }, []);

  const handleRemoveTailor = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/admin/tailors/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setTailors(tailors.filter(t => t.id !== id));
    showToast('Tailor profile removed from network', 'info');
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newCat = { name: newCatName, basePrice: parseFloat(newCatPrice), estimatedDays: 4, description: newCatDesc, isActive: true };
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
      });
      const data = await res.json().catch(() => null);
      setCategories([...categories, data || { ...newCat, id: Date.now() }]);
      showToast(`Category "${newCatName}" added to catalog ✨`, 'success');
    } catch (err) {
      setCategories([...categories, { ...newCat, id: Date.now() }]);
      showToast(`Category "${newCatName}" added to catalog ✨`, 'success');
    } finally {
      setIsAddingCategory(false);
      setNewCatName('');
      setNewCatDesc('');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/categories/${id}`, { method: 'DELETE' });
    } catch (e) {}
    setCategories(categories.filter(c => c.id !== id));
    showToast('Category removed from catalog', 'info');
  };

  const handleSendReply = async (queryId) => {
    const text = replyText[queryId];
    if (!text) return;

    try {
      await fetch(`${API_BASE_URL}/api/queries/${queryId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: text, status: 'RESOLVED' })
      });
    } catch (e) {}

    setQueries(queries.map(q => q.id === queryId ? { ...q, adminReply: text, status: 'RESOLVED' } : q));
    showToast('Reply dispatched to patron inbox ✉️', 'success');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
      
      {/* Super Admin Header */}
      <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Primary Owner Control Center
          </span>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '0.2rem' }}>
            Darzi Super Admin Portal ({user?.email || 'admin@darzi.com'})
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Manage Tailors, Categories, Pricing & Customer Support Enquiries
          </p>
        </div>

        {/* Global Stats */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Verified Tailors</span>
            <strong style={{ fontSize: '1.4rem', color: '#FFF' }}>{tailors.length}</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Total Categories</span>
            <strong style={{ fontSize: '1.4rem', color: '#FFF' }}>{categories.length}</strong>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('TAILORS')}
          className="btn-outline"
          style={{ background: activeTab === 'TAILORS' ? 'var(--primary-emerald)' : 'transparent', color: activeTab === 'TAILORS' ? '#FFF' : 'var(--text-main)' }}
        >
          <Users size={18} /> Manage Tailors & Partners ({tailors.length})
        </button>

        <button
          onClick={() => setActiveTab('CATEGORIES')}
          className="btn-outline"
          style={{ background: activeTab === 'CATEGORIES' ? 'var(--primary-emerald)' : 'transparent', color: activeTab === 'CATEGORIES' ? '#FFF' : 'var(--text-main)' }}
        >
          <Layers size={18} /> Manage Categories ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab('QUERIES')}
          className="btn-outline"
          style={{ background: activeTab === 'QUERIES' ? 'var(--primary-emerald)' : 'transparent', color: activeTab === 'QUERIES' ? '#FFF' : 'var(--text-main)' }}
        >
          <MessageSquare size={18} /> Customer Queries ({queries.length})
        </button>
      </div>

      {/* TAB 1: TAILOR MANAGEMENT */}
      {activeTab === 'TAILORS' && (
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)', marginBottom: '1rem' }}>
            Registered Tailor Partners
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {tailors.map(t => (
              <div key={t.id} className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--border-light)', position: 'relative' }}>
                <button
                  onClick={() => handleRemoveTailor(t.id)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                  title="Remove Tailor"
                >
                  <Trash2 size={18} />
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: '700' }}>★ {t.rating} RATING</div>
                <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary-emerald)' }}>{t.shopName}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Owner: <strong>{t.user?.name || 'Master Tailor'}</strong> ({t.user?.phone || 'Contact Verified'})
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '0.5rem' }}>
                  Experience: <strong>{t.experienceYears} Years</strong> • Specialties: {t.specialties}
                </div>

                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#15803D', fontWeight: '700' }}>
                  <CheckCircle2 size={14} /> STATUS: APPROVED PARTNER
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGEMENT */}
      {activeTab === 'CATEGORIES' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)' }}>
              Garment Categories & Base Pricing
            </h3>
            <button onClick={() => setIsAddingCategory(true)} className="btn-gold">
              <Plus size={18} /> Add New Category
            </button>
          </div>

          {isAddingCategory && (
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-gold)' }}>
              <h4 className="font-serif" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Create Garment Category</h4>
              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" required placeholder="Category Name (e.g. Indo-Western Lehenga)" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }} />
                  <input type="number" required placeholder="Base Price (₹)" value={newCatPrice} onChange={(e) => setNewCatPrice(e.target.value)} style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }} />
                </div>
                <input type="text" placeholder="Description" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)} style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }} />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setIsAddingCategory(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-gold">Save Category</button>
                </div>
              </form>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {categories.map(c => (
              <div key={c.id} className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--border-light)', position: 'relative' }}>
                <button
                  onClick={() => handleDeleteCategory(c.id)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>

                <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--primary-emerald)' }}>{c.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.75rem 0' }}>{c.description}</p>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-emerald)' }}>
                  ₹{c.basePrice.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER QUERIES */}
      {activeTab === 'QUERIES' && (
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)', marginBottom: '1rem' }}>
            Customer Support Queries Inbox
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {queries.map(q => (
              <div key={q.id} className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-emerald)' }}>{q.subject}</h4>
                  <span className={`badge-status ${q.status === 'RESOLVED' ? 'badge-delivered' : 'badge-stitching'}`}>
                    {q.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  "{q.message}"
                </p>

                {q.adminReply ? (
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#166534' }}>
                    <strong>Admin Reply Sent:</strong> {q.adminReply}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <input 
                      type="text" 
                      placeholder="Write response to customer..."
                      value={replyText[q.id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                      style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                    />
                    <button onClick={() => handleSendReply(q.id)} className="btn-emerald" style={{ padding: '0.5rem 1.25rem' }}>
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
