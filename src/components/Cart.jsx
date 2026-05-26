import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Format currency to VND
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setOrderSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <>
      {/* Background Dim Backdrop */}
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--color-primary-dim)" />
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>GIỎ HÀNG CỦA BẠN</h3>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Content list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              color: 'var(--color-outline)'
            }}>
              <ShoppingBag size={48} strokeWidth={1} />
              <p style={{ fontSize: '14px' }}>Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                }}
              >
                {/* Item Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--rounded-sm)',
                    objectFit: 'cover',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                />

                {/* Info & Quantity controls */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'white',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                    {formatVND(item.price)}
                  </span>

                  {/* Quantity row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--color-surface-container-lowest)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 'var(--rounded-sm)',
                      padding: '2px'
                    }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="btn btn-ghost"
                        style={{ padding: '4px', minWidth: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Minus size={12} color="white" />
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: '700', width: '28px', textAlign: 'center', color: 'white' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="btn btn-ghost"
                        style={{ padding: '4px', minWidth: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Plus size={12} color="white" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="btn btn-ghost"
                      style={{ color: 'var(--color-error)', padding: '4px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'var(--color-surface-container-lowest)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Thành tiền:</span>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                {formatVND(subtotal)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              {isCheckingOut ? (
                <span>Đang xử lý thanh toán...</span>
              ) : (
                <>
                  <CreditCard size={16} />
                  <span>TIẾN HÀNH THANH TOÁN</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Checkout Success Popup Modal */}
      {orderSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: 'var(--rounded-lg)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            border: '1px solid rgba(76, 175, 80, 0.3)'
          }}>
            <CheckCircle size={56} color="#81c784" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>ĐẶT HÀNG THÀNH CÔNG!</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
              Cảm ơn bạn đã lựa chọn mua sắm tại Kinetic Tech. Đơn hàng của bạn đang được xử lý kiểm tra tương thích và giao hàng nhanh.
            </p>
            <button 
              onClick={handleCloseSuccess}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
