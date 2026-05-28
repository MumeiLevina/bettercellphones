import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import PCBuilder from './components/PCBuilder';
import AIAdvisor from './components/AIAdvisor';
import Cart from './components/Cart';
import { products } from './mockData';
import { Sparkles, Shield, Truck, RotateCcw, MessageSquareCode } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('deals');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Catalog search filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Reset filters on tab switch
  useEffect(() => {
    setSelectedBrands([]);
    setPriceRange('all');
    setOnlyInStock(false);
  }, [activeView]);

  // Keep the top of the page visible when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleBuyNow = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleAddPartsToCart = (parts) => {
    setCartItems(prev => {
      let updated = [...prev];
      parts.forEach(part => {
        const exists = updated.find(item => item.id === part.id);
        if (exists) {
          updated = updated.map(item => item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          updated.push({ ...part, quantity: 1 });
        }
      });
      return updated;
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Switch view from carousel banner CTAs
  const handleCarouselCta = (slideIndex) => {
    if (slideIndex === 0) {
      setActiveView('laptop');
    } else if (slideIndex === 1) {
      setActiveView('pc-builder');
    } else {
      setActiveView('ai-advisor');
    }
  };

  // Scroll reveal Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach(t => observer.observe(t));

    return () => {
      targets.forEach(t => observer.unobserve(t));
    };
  }, [activeView, searchQuery, selectedBrands, priceRange, onlyInStock]);

  // Filter products based on search query and sidebar filters
  const filteredProducts = products.filter(product => {
    // 1. Category check
    const matchesCategory = activeView === 'deals' ? true : product.category === activeView;
    
    // 2. Search check
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          Object.values(product.specs).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 3. Brand check
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => {
      return product.name.toLowerCase().includes(brand.toLowerCase()) || 
             product.tags.some(tag => tag.toLowerCase() === brand.toLowerCase()) ||
             (brand.toLowerCase() === 'asus' && product.name.toLowerCase().includes('rog'));
    });
    
    // 4. Price check
    let matchesPrice = true;
    if (priceRange === 'under-10m') {
      matchesPrice = product.price < 10000000;
    } else if (priceRange === '10m-30m') {
      matchesPrice = product.price >= 10000000 && product.price <= 30000000;
    } else if (priceRange === 'over-30m') {
      matchesPrice = product.price > 30000000;
    }
    
    // 5. Stock check
    const matchesStock = !onlyInStock || product.inStock;
    
    return matchesCategory && matchesSearch && matchesBrand && matchesPrice && matchesStock;
  });

  const featuredDeals = products.filter(p => p.featured);

  // Available brands to show filters depending on category
  const getCategoryBrands = () => {
    if (activeView === 'laptop') return ['ASUS', 'Apple', 'Lenovo'];
    if (activeView === 'điện thoại') return ['Apple', 'Samsung', 'Xiaomi'];
    if (activeView === 'gaming gear') return ['ASUS', 'Logitech', 'Razer'];
    return ['ASUS', 'Apple', 'Samsung', 'Xiaomi', 'Lenovo', 'Logitech', 'Razer', 'AMD', 'Intel', 'MSI', 'Gigabyte', 'Corsair', 'Kingston'];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation bar */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        cartItemsCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        toggleCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Carousel: Full Width - Rendered outside main container */}
      {activeView === 'deals' && (
        <HeroCarousel onCtaClick={handleCarouselCta} />
      )}

      {/* Main layout container */}
      <main style={{ flex: 1, padding: '0 0 60px' }}>
        
        {/* VIEW 1: Showcase & Benefits */}
        {activeView === 'deals' && (
          <div className="container" style={{ marginTop: '40px' }}>
            {/* Showcase Grid header */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={22} color="var(--color-primary-dim)" />
                SẢN PHẨM NỔI BẬT
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Khám phá cấu hình phần cứng mới nhất được khuyên dùng bởi chuyên gia.
              </p>
            </div>

            {/* Product card grid */}
            <div 
              className="reveal-on-scroll" 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
              }}
            >
              {featuredDeals.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>

            {/* Brand benefits section */}
            <div 
              className="reveal-on-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginTop: '60px',
                padding: '30px 20px',
                borderRadius: 'var(--rounded-lg)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Shield size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>100% Chính Hãng</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Sản phẩm nhập khẩu chính ngạch, hóa đơn đỏ đầy đủ.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Truck size={24} color="var(--color-secondary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Giao Hàng Siêu Tốc</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Hỗ trợ giao nhanh hoả tốc 2h khu vực nội đô.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <RotateCcw size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Đổi Trả Dễ Dàng</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Đổi trả 1-đổi-1 trong vòng 15 ngày nếu lỗi nhà sản xuất.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Standard Catalogs (Laptops, Phones, Gear, Components) */}
        {['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', textTransform: 'capitalize' }}>
                  DANH MỤC: {activeView}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Hiển thị {filteredProducts.length} sản phẩm phù hợp.
                </p>
              </div>

              {/* Desktop Two-Column Layout with filters */}
              <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }} className="catalog-layout">
                {/* Sidebar Filters */}
                <aside className="filter-sidebar glass-panel" style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '20px',
                  height: 'fit-content',
                  position: 'sticky',
                  top: '92px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '16px', color: 'white' }}>
                    BỘ LỌC TÌM KIẾM
                  </h3>
                  
                  {/* Filter Stock */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'white' }}>
                      <input 
                        type="checkbox" 
                        checked={onlyInStock}
                        onChange={(e) => setOnlyInStock(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                      />
                      <span style={{ userSelect: 'none' }}>Chỉ hàng còn kho</span>
                    </label>
                  </div>

                  {/* Filter Price */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.5px' }}>
                      Khoảng Giá
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      {[
                        { label: 'Tất cả mức giá', value: 'all' },
                        { label: 'Dưới 10 triệu VND', value: 'under-10m' },
                        { label: '10 triệu - 30 triệu VND', value: '10m-30m' },
                        { label: 'Trên 30 triệu VND', value: 'over-30m' }
                      ].map((range) => (
                        <label key={range.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input 
                            type="radio" 
                            name="price-range"
                            checked={priceRange === range.value}
                            onChange={() => setPriceRange(range.value)}
                            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                          />
                          <span style={{ color: priceRange === range.value ? 'white' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                            {range.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Brand */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.5px' }}>
                      Thương Hiệu
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', maxHeight: '180px', overflowY: 'auto' }}>
                      {getCategoryBrands().map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedBrands(prev => prev.filter(b => b !== brand));
                                } else {
                                  setSelectedBrands(prev => [...prev, brand]);
                                }
                              }}
                              style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                            />
                            <span style={{ color: isChecked ? 'white' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                              {brand}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reset Filters button */}
                  <button 
                    onClick={() => {
                      setSelectedBrands([]);
                      setPriceRange('all');
                      setOnlyInStock(false);
                    }}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                  >
                    Xóa bộ lọc
                  </button>
                </aside>

                {/* Product Grid Area */}
                <div>
                  {filteredProducts.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: 'var(--color-outline)',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px dashed rgba(255,255,255,0.08)',
                      borderRadius: 'var(--rounded-md)'
                    }}>
                      <MessageSquareCode size={40} style={{ marginBottom: '12px', color: 'var(--color-outline)' }} />
                      <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                  ) : (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                      }}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          onAddToCart={handleAddToCart}
                          onBuyNow={handleBuyNow}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Custom PC Builder Dashboard */}
        {activeView === 'pc-builder' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <PCBuilder onAddPartsToCart={handleAddPartsToCart} />
            </div>
          </div>
        )}

        {/* VIEW 4: AI Advisor Chat */}
        {activeView === 'ai-advisor' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>TRỢ LÝ THÔNG MINH KINETIC</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>AI tự động cấu hình máy tính cá nhân hóa dựa trên mô tả yêu cầu của bạn.</p>
              </div>
              <AIAdvisor onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}

      </main>

      {/* Footer System */}
      <footer style={{
        background: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          fontSize: '13px',
          color: 'var(--color-on-surface-variant)'
        }}>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>KINETIC TECH</h4>
            <p style={{ lineHeight: '1.6' }}>Hệ thống cửa hàng bán lẻ linh kiện máy tính, laptop hi-end hàng đầu Việt Nam.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}>
              <li>Hướng dẫn mua hàng online</li>
              <li>Chính sách bảo hành đổi trả</li>
              <li>Phương thức thanh toán</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>LIÊN HỆ</h4>
            <p style={{ lineHeight: '1.6' }}>
              Email: hotro@kinetictech.vn<br />
              Hotline: 1900 1234 (8:00 - 21:00)<br />
              Địa chỉ: Cầu Giấy, Hà Nội
            </p>
          </div>
        </div>
        <div className="container" style={{
          marginTop: '30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)'
        }}>
          © 2026 Kinetic Tech Store. All Rights Reserved. Built with Premium React & Vanilla CSS.
        </div>
      </footer>

      {/* Shopping Cart Slider */}
      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Embedded CSS rules for media queries responsive layout inside JS */}
      <style>{`
        @media (max-width: 899px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .filter-sidebar {
            position: static !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
