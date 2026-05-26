import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, AlertTriangle, Cpu, Wrench, ShoppingCart, RefreshCw, Layers, Search, X } from 'lucide-react';
import { builderParts } from '../mockData';

export default function PCBuilder({ onAddPartsToCart }) {
  const [selectedParts, setSelectedParts] = useState({
    cpu: null,
    motherboard: null,
    ram: null,
    gpu: null,
    ssd: null,
    psu: null,
    cooler: null,
    pcCase: null
  });

  const [activeModalCat, setActiveModalCat] = useState(null);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [compatibilities, setCompatibilities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWattage, setTotalWattage] = useState(0);

  const categories = [
    { id: 'cpu', name: 'Bộ Vi Xử Lý (CPU)', icon: Cpu, db: builderParts.cpu },
    { id: 'motherboard', name: 'Bo Mạch Chủ (Mainboard)', icon: Layers, db: builderParts.motherboard },
    { id: 'ram', name: 'Bộ Nhớ Trong (RAM)', icon: Layers, db: builderParts.ram },
    { id: 'gpu', name: 'Card Đồ Họa (VGA)', icon: Cpu, db: builderParts.gpu },
    { id: 'ssd', name: 'Ổ Cứng (SSD)', icon: Layers, db: builderParts.ssd },
    { id: 'psu', name: 'Nguồn Máy Tính (PSU)', icon: Layers, db: builderParts.psu },
    { id: 'cooler', name: 'Tản Nhiệt (Cooler)', icon: Layers, db: builderParts.cooler },
    { id: 'pcCase', name: 'Vỏ Máy Tính (Case)', icon: Layers, db: builderParts.pcCase },
  ];

  // Recalculate price, wattage, and check compatibility rules
  useEffect(() => {
    let priceSum = 0;
    let wattSum = 60; // Base wattage for fans, motherboard, peripherals
    const rules = [];

    // Sum price and wattage
    Object.keys(selectedParts).forEach(cat => {
      const part = selectedParts[cat];
      if (part) {
        priceSum += part.price;
        if (part.wattage) wattSum += part.wattage;
      }
    });

    setTotalPrice(priceSum);
    setTotalWattage(wattSum);

    // Rule 1: CPU and Motherboard Socket match
    if (selectedParts.cpu && selectedParts.motherboard) {
      if (selectedParts.cpu.socket !== selectedParts.motherboard.socket) {
        rules.push({
          type: 'error',
          message: `Lỗi tương thích: CPU ${selectedParts.cpu.socket} không khớp với socket ${selectedParts.motherboard.socket} của Bo Mạch Chủ.`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Socket tương thích: CPU và Bo Mạch Chủ đều dùng Socket ${selectedParts.cpu.socket}.`
        });
      }
    }

    // Rule 2: PSU Wattage capacity check
    if (selectedParts.psu) {
      const psuRating = selectedParts.psu.wattageRating;
      if (wattSum > psuRating) {
        rules.push({
          type: 'error',
          message: `Cảnh báo nguồn: Tổng công suất ước tính (${wattSum}W) vượt quá công suất định mức của PSU (${psuRating}W). Vui lòng chọn nguồn lớn hơn!`
        });
      } else if (wattSum > psuRating * 0.8) {
        rules.push({
          type: 'warning',
          message: `Cân nhắc: Tổng công suất ước tính (${wattSum}W) chiếm hơn 80% định mức của PSU (${psuRating}W). Bạn nên nâng cấp nguồn để nâng cao tuổi thọ linh kiện.`
        });
      } else {
        rules.push({
          type: 'success',
          message: `Công suất ổn định: Nguồn ${psuRating}W đáp ứng tốt tổng công suất ${wattSum}W của hệ thống.`
        });
      }
    }

    setCompatibilities(rules);
  }, [selectedParts]);

  const handleSelectPart = (category, part) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: part
    }));
    setActiveModalCat(null); // Close modal on select
  };

  const handleClearCategory = (category) => {
    setSelectedParts(prev => ({
      ...prev,
      [category]: null
    }));
  };

  const handleReset = () => {
    setSelectedParts({
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      ssd: null,
      psu: null,
      cooler: null,
      pcCase: null
    });
  };

  const handleAddAllToCart = () => {
    const activeParts = Object.values(selectedParts).filter(p => p !== null);
    if (activeParts.length === 0) return;
    onAddPartsToCart(activeParts);
  };

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const isConfigEmpty = Object.values(selectedParts).every(p => p === null);

  // Filter items in modal search
  const activeCatDetails = activeModalCat ? categories.find(c => c.id === activeModalCat) : null;
  const filteredModalParts = activeCatDetails 
    ? activeCatDetails.db.filter(part => part.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) || 
                                       part.specs.toLowerCase().includes(modalSearchQuery.toLowerCase()))
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }} className="pc-builder-container">
      {/* Selector List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>XÂY DỰNG CẤU HÌNH PC</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>Lựa chọn các linh kiện tương thích để tạo nên bộ PC hoàn chỉnh.</p>
          </div>
          {!isConfigEmpty && (
            <button 
              onClick={handleReset}
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '12px' }}
            >
              <RefreshCw size={14} />
              Reset cấu hình
            </button>
          )}
        </div>

        {/* Categories checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const selected = selectedParts[cat.id];

            return (
              <div 
                key={cat.id} 
                className="glass-panel" 
                style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '16px',
                  borderLeft: selected ? '4px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      background: selected ? 'rgba(0, 123, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255,255,255,0.05)',
                      flexShrink: 0
                    }}>
                      <Icon size={18} color={selected ? 'var(--color-primary)' : 'var(--color-outline)'} />
                    </div>
                    {/* Item Image Preview if selected */}
                    {selected && (
                      <img 
                        src={selected.image} 
                        alt={selected.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--rounded-sm)',
                          objectFit: 'cover',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                    )}
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '700' }}>{cat.name}</h4>
                      {selected ? (
                        <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500', marginTop: '2px', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {selected.name}
                        </p>
                      ) : (
                        <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginTop: '2px' }}>Chưa chọn linh kiện</p>
                      )}
                    </div>
                  </div>

                  {/* Right: Price & Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {selected && (
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                        {formatVND(selected.price)}
                      </span>
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {selected && (
                        <button 
                          onClick={() => handleClearCategory(cat.id)}
                          className="btn btn-ghost"
                          style={{ color: 'var(--color-error)', fontSize: '12px', padding: '6px 12px' }}
                        >
                          Xóa
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setActiveModalCat(cat.id);
                          setModalSearchQuery('');
                        }}
                        className={`btn ${selected ? 'btn-outline' : 'btn-primary'}`}
                        style={{ padding: '8px 14px', fontSize: '12px' }}
                      >
                        {selected ? 'Thay đổi' : 'Chọn linh kiện'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected part specifications detail dropdown */}
                {selected && (
                  <div style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 'var(--rounded-sm)',
                    fontSize: '12px',
                    color: 'var(--color-on-surface-variant)',
                    borderLeft: '2px solid rgba(255,255,255,0.1)'
                  }}>
                    <strong>Thông số:</strong> {selected.specs}
                    {selected.socket && ` | Socket: ${selected.socket}`}
                    {selected.wattage && ` | Điện tiêu thụ: ${selected.wattage}W`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bill & Compatibility Dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Bill Summary */}
        <div className="glass-panel" style={{ borderRadius: 'var(--rounded-md)', padding: '24px', position: 'sticky', top: '92px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
            TỔNG QUAN HÓA ĐƠN
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span>Linh kiện đã chọn:</span>
              <span style={{ fontWeight: '600', color: 'white' }}>
                {Object.values(selectedParts).filter(p => p !== null).length} / 8
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span>Điện năng ước tính:</span>
              <span style={{ fontWeight: '600', color: totalWattage > 60 ? 'var(--color-primary-dim)' : 'white' }}>
                {totalWattage} W
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>Tổng chi phí:</span>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                {formatVND(totalPrice)}
              </span>
            </div>
          </div>

          {/* Compatibility alerts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '700', letterSpacing: '0.5px' }}>
              ĐÁNH GIÁ TƯƠNG THÍCH
            </h4>

            {compatibilities.length === 0 ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--color-outline)', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--rounded-sm)' }}>
                <Wrench size={14} />
                <span>Vui lòng chọn CPU và bo mạch chủ để kiểm tra.</span>
              </div>
            ) : (
              compatibilities.map((rule, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    fontSize: '12px',
                    padding: '10px 12px',
                    borderRadius: 'var(--rounded-sm)',
                    background: rule.type === 'error' ? 'rgba(147, 0, 10, 0.15)' : rule.type === 'warning' ? 'rgba(253, 139, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    border: `1px solid ${rule.type === 'error' ? 'rgba(147,0,10,0.3)' : rule.type === 'warning' ? 'rgba(253,139,0,0.3)' : 'rgba(76,175,80,0.2)'}`,
                    color: rule.type === 'error' ? '#ffb4ab' : rule.type === 'warning' ? '#ffb77d' : '#81c784'
                  }}
                >
                  {rule.type === 'success' ? (
                    <Check size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <span>{rule.message}</span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleAddAllToCart}
            className="btn btn-secondary"
            disabled={isConfigEmpty}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '14px',
              opacity: isConfigEmpty ? 0.5 : 1,
              cursor: isConfigEmpty ? 'default' : 'pointer'
            }}
          >
            <ShoppingCart size={16} />
            <span>Thêm Cấu Hình Vào Giỏ Hàng</span>
          </button>
        </div>
      </div>

      {/* Component Selection Modal */}
      {activeModalCat && typeof document !== 'undefined' && createPortal(
        <div className="modal-overlay">
          {/* Glass Modal Box */}
          <div className="glass-panel-glow-blue builder-modal">
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(10, 25, 47, 0.8)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>
                CHỌN LINH KIỆN: {activeCatDetails?.name}
              </h3>
              <button 
                onClick={() => setActiveModalCat(null)}
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
              >
                <X size={20} color="white" />
              </button>
            </div>

            {/* Modal Search Tray */}
            <div style={{
              padding: '12px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              background: 'rgba(5, 13, 24, 0.3)',
              position: 'relative'
            }}>
              <input 
                type="text"
                placeholder="Tìm kiếm theo tên, thông số..."
                value={modalSearchQuery}
                onChange={(e) => setModalSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', fontSize: '13px' }}
              />
              <Search size={16} style={{
                position: 'absolute',
                left: '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-outline)'
              }} />
            </div>

            {/* Modal Component List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'rgba(17, 20, 21, 0.4)'
            }}>
              {filteredModalParts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-outline)', fontSize: '13px' }}>
                  Không tìm thấy linh kiện nào khớp với tìm kiếm.
                </div>
              ) : (
                filteredModalParts.map((part) => {
                  const isCurrentSelected = selectedParts[activeModalCat]?.id === part.id;
                  return (
                    <div 
                      key={part.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        background: isCurrentSelected ? 'rgba(0, 123, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        borderRadius: 'var(--rounded-md)',
                        border: `1px solid ${isCurrentSelected ? 'rgba(0, 123, 255, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                        transition: 'var(--transition-smooth)',
                        gap: '16px'
                      }}
                    >
                      {/* Image Preview */}
                      <img 
                        src={part.image} 
                        alt={part.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: 'var(--rounded-sm)',
                          objectFit: 'cover',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          flexShrink: 0
                        }}
                      />

                      {/* Detail Text */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', lineHeight: '1.4' }}>
                          {part.name}
                        </h4>
                        <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                          <strong>Thông số:</strong> {part.specs}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                          {part.socket && (
                            <span className="spec-chip spec-chip-primary">Socket: {part.socket}</span>
                          )}
                          {part.ramType && (
                            <span className="spec-chip">Loại RAM: {part.ramType}</span>
                          )}
                          {part.wattage && (
                            <span className="spec-chip" style={{ color: '#ffb77d', borderColor: 'rgba(253,139,0,0.2)' }}>TDP: {part.wattage}W</span>
                          )}
                        </div>
                      </div>

                      {/* Price & Selection */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                          {formatVND(part.price)}
                        </span>
                        <button
                          onClick={() => handleSelectPart(activeModalCat, part)}
                          className={`btn ${isCurrentSelected ? 'btn-primary' : 'btn-outline'}`}
                          style={{
                            padding: '6px 16px',
                            fontSize: '12px',
                            borderRadius: 'var(--rounded-sm)'
                          }}
                        >
                          {isCurrentSelected ? (
                            <>
                              <Check size={12} />
                              <span>Đã chọn</span>
                            </>
                          ) : (
                            <span>Chọn</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 900px) {
          .pc-builder-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
