import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Sparkles, Heart, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', subtitle = null) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, subtitle }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="darzi-toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="darzi-toast">
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: toast.type === 'gold' ? 'var(--gold-soft)' : (toast.type === 'error' ? '#FEE2E2' : '#E8F5E9'),
              color: toast.type === 'gold' ? '#92400E' : (toast.type === 'error' ? '#DC2626' : '#1B5E20'),
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {toast.type === 'gold' ? <Sparkles size={18} /> : (toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                {toast.message}
              </div>
              {toast.subtitle && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {toast.subtitle}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px', display: 'flex' }}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  return context || { showToast: () => {} };
};
