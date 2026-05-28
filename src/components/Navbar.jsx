import React from 'react';
import { ShoppingCart, Search, Cpu, Bot, Laptop, Smartphone, Keyboard, Flame, Menu, X } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, cartItemsCount, toggleCart, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navItems = React.useMemo(() => [
    { id: 'deals', label: 'Khuyến Mãi', icon: Flame },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
    { id: 'điện thoại', label: 'Điện Thoại', icon: Smartphone },
    { id: 'gaming gear', label: 'Gaming Gear', icon: Keyboard },
    { id: 'linh kiện', label: 'Linh Kiện', icon: Cpu },
  ], []);
  const navButtonRefs = React.useRef([]);
  const [navIndicator, setNavIndicator] = React.useState({ left: 0, width: 0, top: 0, height: 0, opacity: 0 });

  const updateIndicator = React.useCallback(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeView);
    const activeButton = navButtonRefs.current[activeIndex];
    const navList = activeButton?.closest('ul');

    if (!activeButton || !navList) {
      setNavIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const listRect = navList.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const nextIndicator = {
      left: buttonRect.left - listRect.left,
      width: buttonRect.width,
      top: buttonRect.top - listRect.top,
      height: buttonRect.height,
      opacity: 1
    };

    setNavIndicator((prev) => {
      const isSame =
        prev.left === nextIndicator.left &&
        prev.width === nextIndicator.width &&
        prev.top === nextIndicator.top &&
        prev.height === nextIndicator.height &&
        prev.opacity === nextIndicator.opacity;

      return isSame ? prev : nextIndicator;
    });
  }, [activeView, navItems]);

  React.useLayoutEffect(() => {
    updateIndicator();
  }, [activeView, updateIndicator]);

  React.useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      width: '100%',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        gap: '20px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('deals')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #007BFF, #fd8b00)',
            width: '40px',
            height: '40px',
            borderRadius: 'var(--rounded-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 123, 255, 0.3)'
          }}>
            <Cpu size={22} color="white" />
          </div>
          <div>
            <span style={{
              fontFamily: 'Montserrat',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(90deg, #ffffff, #adc7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>KINETIC</span>
            <span style={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '1px',
              color: 'var(--color-secondary)',
              display: 'block',
              marginTop: '-5px'
            }}>TECH</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', position: 'relative' }} className="desktop-nav">
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '6px',
            position: 'relative'
          }}>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: navIndicator.left,
                top: navIndicator.top,
                width: navIndicator.width,
                height: navIndicator.height,
                background: 'rgba(0, 123, 255, 0.15)',
                border: '1px solid rgba(0, 123, 255, 0.3)',
                borderRadius: 'var(--rounded-md)',
                transition: 'all 260ms ease',
                opacity: navIndicator.opacity,
                pointerEvents: 'none'
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <button
                    ref={(element) => {
                      navButtonRefs.current[index] = element;
                    }}
                    onClick={() => handleNavClick(item.id)}
                    className="btn btn-ghost"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      zIndex: 1,
                      color: isActive ? '#ffffff' : 'var(--color-on-surface-variant)',
                      background: 'transparent',
                      border: '1px solid transparent',
                      padding: '8px 14px',
                      borderRadius: 'var(--rounded-md)'
                    }}
                  >
                    <Icon size={16} color={isActive ? 'var(--color-primary-dim)' : 'currentColor'} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1',
          maxWidth: '300px',
          display: 'none'
        }} className="desktop-search">
          <input
            type="text"
            placeholder="Tìm kiếm linh kiện, laptop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '38px',
              fontSize: '13px'
            }}
          />
          <Search size={16} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-outline)'
          }} />
        </div>

        {/* CTA Tools (PC Builder, AI, Cart) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Custom PC Builder */}
          <button
            onClick={() => handleNavClick('pc-builder')}
            className={`btn ${activeView === 'pc-builder' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              padding: '8px 16px',
              borderRadius: 'var(--rounded-md)'
            }}
          >
            <Cpu size={16} />
            <span className="hide-mobile" style={{ whiteSpace: 'nowrap' }}>Xây Dựng Cấu Hình</span>
            <span className="show-mobile">Build PC</span>
          </button>

          {/* AI Advisor Link */}
          <button
            onClick={() => handleNavClick('ai-advisor')}
            className={`btn ${activeView === 'ai-advisor' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              padding: '8px 16px',
              borderRadius: 'var(--rounded-md)',
              borderColor: activeView === 'ai-advisor' ? 'transparent' : 'rgba(0, 123, 255, 0.4)'
            }}
          >
            <Bot size={16} color={activeView === 'ai-advisor' ? '#fff' : 'var(--color-primary-dim)'} />
            <span className="hide-mobile" style={{ whiteSpace: 'nowrap' }}>Cố Vấn AI</span>
            <span className="show-mobile">AI Advisor</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="btn btn-ghost"
            style={{
              position: 'relative',
              padding: '10px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <ShoppingCart size={20} color="white" />
            {cartItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--color-secondary)',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '9999px',
                boxShadow: '0 0 10px rgba(253, 139, 0, 0.5)',
                animation: 'pulse 1.5s infinite'
              }}>
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost show-mobile-menu-btn"
            style={{
              padding: '8px',
              display: 'flex'
            }}
          >
            {mobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          width: '100%',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 89
        }}>
          {/* Mobile Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Tìm kiếm linh kiện, laptop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px' }}
            />
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-outline)'
            }} />
          </div>

          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            gap: '8px'
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="btn btn-ghost"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '12px',
                      color: isActive ? '#ffffff' : 'var(--color-on-surface-variant)',
                      background: isActive ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                      padding: '12px 16px'
                    }}
                  >
                    <Icon size={18} color={isActive ? 'var(--color-primary-dim)' : 'currentColor'} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Embedded CSS rules for media queries responsive layout inside JS */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block !important;
          }
          .desktop-search {
            display: block !important;
          }
          .show-mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .hide-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .show-mobile {
            display: none !important;
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </header>
  );
}
