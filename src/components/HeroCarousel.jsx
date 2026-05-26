import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Flame } from 'lucide-react';

const bannerSlides = [
  {
    id: 1,
    title: 'SIÊU PHẨM WORKSTATION & GAMING',
    subtitle: 'Nâng tầm hiệu năng đồ họa và lập trình chuyên nghiệp cùng ASUS ROG Strix và RTX 40-Series.',
    discount: 'Ưu đãi lên tới 15%',
    cta: 'Khám phá ngay',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(0, 123, 255, 0.45) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'XÂY DỰNG CẤU HÌNH PC MƠ ƯỚC',
    subtitle: 'Công cụ tính toán công suất tự động, kiểm tra Socket tương thích thông minh giúp việc tự ráp máy dễ dàng hơn bao giờ hết.',
    discount: 'Miễn phí lắp đặt toàn quốc',
    cta: 'Ráp máy ngay',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(253, 139, 0, 0.45) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'TRỢ LÝ CỐ VẤN AI THÔNG MINH',
    subtitle: 'Chat ngay với Cố vấn AI để nhận đề xuất cấu hình PC, laptop học tập, văn phòng phù hợp nhất với ví tiền của bạn.',
    discount: 'Tư vấn trực tuyến 24/7',
    cta: 'Chat với AI',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(131, 145, 173, 0.45) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function HeroCarousel({ onCtaClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-play slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
  };

  const slide = bannerSlides[currentSlide];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: 0, width: '100%' }} className="animate-fade-in-up">
      {/* Full-width Dynamic Slide Banner */}
      <div 
        style={{
          position: 'relative',
          height: '460px',
          width: '100%',
          overflow: 'hidden',
          backgroundImage: `url(${slide.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none'
        }}
      >
        {/* Banner Overlay Gradient */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: slide.gradient,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white'
        }} className="banner-content">
          <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: 'var(--color-secondary-dim)',
              background: 'rgba(253, 139, 0, 0.1)',
              border: '1px solid rgba(253, 139, 0, 0.25)',
              padding: '4px 12px',
              borderRadius: 'var(--rounded-full)',
              alignSelf: 'flex-start',
              marginBottom: '16px'
            }}>
              {slide.discount}
            </span>
            <h1 style={{
              fontFamily: 'Montserrat',
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: '1.2',
              maxWidth: '650px',
              marginBottom: '16px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              color: 'var(--color-on-surface-variant)',
              maxWidth: '550px',
              lineHeight: '1.6',
              marginBottom: '24px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.4)'
            }}>
              {slide.subtitle}
            </p>
            <button 
              onClick={() => onCtaClick(currentSlide)}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', padding: '12px 28px', fontSize: '15px' }}
            >
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <button 
          onClick={handlePrev}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 0
          }}
        >
          <ArrowLeft size={20} color="white" />
        </button>
        <button 
          onClick={handleNext}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 0
          }}
        >
          <ArrowRight size={20} color="white" />
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 3
        }}>
          {bannerSlides.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: 'var(--rounded-full)',
                background: currentSlide === idx ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Countdown Flash Sale Banner wrapped in grid container for alignment */}
      <div className="container">
        <div 
          className="glass-panel" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderRadius: 'var(--rounded-md)',
            borderLeft: '4px solid var(--color-secondary)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(253, 139, 0, 0.15)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px' }}>
                DEALS CHỚP NHOÁNG
                <span style={{
                  background: 'red',
                  color: 'white',
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: 'var(--rounded-sm)'
                }}>HOT</span>
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Khuyến mãi giới hạn, mua ngay kẻo lỡ!</span>
            </div>
          </div>

          {/* Countdown Ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>Kết thúc sau:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div className="countdown-box">{String(timeLeft.hours).padStart(2, '0')}</div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>:</span>
              <div className="countdown-box">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>:</span>
              <div className="countdown-box">{String(timeLeft.seconds).padStart(2, '0')}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .countdown-box {
          background: var(--color-surface-bright);
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--rounded);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 768px) {
          .banner-content {
            padding: 24px 0 !important;
          }
          .banner-content h1 {
            font-size: 26px !important;
          }
          .banner-content p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
