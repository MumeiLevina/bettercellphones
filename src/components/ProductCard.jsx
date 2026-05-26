import React from 'react';
import { Star, ShoppingCart, CreditCard } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const { id, name, price, oldPrice, image, specs, rating, reviews, tags, inStock } = product;

  // Format currency to VND
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="product-card">
      {/* Discount / In Stock Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 5
      }}>
        {discount > 0 && (
          <span className="status-badge status-badge-sale">
            -{discount}%
          </span>
        )}
        {inStock ? (
          <span className="status-badge status-badge-stock">Còn hàng</span>
        ) : (
          <span className="status-badge" style={{ background: '#373a3b', color: '#c1c6d7' }}>Hết hàng</span>
        )}
      </div>

      {/* Image Container */}
      <div className="product-card-image-container">
        <img 
          src={image} 
          alt={name} 
          className="product-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400';
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map((tag, idx) => (
            <span key={idx} className="spec-chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '15px',
          fontWeight: '600',
          lineHeight: '1.4',
          color: '#ffffff',
          minHeight: '42px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', color: '#ffb77d' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(rating) ? '#ffb77d' : 'none'} 
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
            ({reviews})
          </span>
        </div>

        {/* Technical Specs List */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '8px',
          borderRadius: 'var(--rounded-sm)',
          fontSize: '11px',
          color: 'var(--color-on-surface-variant)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginTop: '4px',
          border: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
          {Object.entries(specs).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{key}:</span>
              <span style={{ textAlign: 'right', color: '#ffffff', maxWidth: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price Row */}
        <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
          {oldPrice && (
            <span style={{
              fontSize: '12px',
              textDecoration: 'line-through',
              color: 'var(--color-outline)',
              display: 'block'
            }}>
              {formatVND(oldPrice)}
            </span>
          )}
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--color-secondary-dim)',
            display: 'block'
          }}>
            {formatVND(price)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginTop: '12px'
      }}>
        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-outline"
          disabled={!inStock}
          style={{
            padding: '8px 10px',
            fontSize: '12px',
            opacity: inStock ? 1 : 0.5,
            cursor: inStock ? 'pointer' : 'default'
          }}
        >
          <ShoppingCart size={14} />
          <span>Thêm Giỏ</span>
        </button>

        <button
          onClick={() => onBuyNow(product)}
          className="btn btn-secondary"
          disabled={!inStock}
          style={{
            padding: '8px 10px',
            fontSize: '12px',
            opacity: inStock ? 1 : 0.5,
            cursor: inStock ? 'pointer' : 'default'
          }}
        >
          <CreditCard size={14} />
          <span>Mua Ngay</span>
        </button>
      </div>
    </div>
  );
}
