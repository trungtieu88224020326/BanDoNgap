import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  X, 
  MapPin, 
  Upload, 
  Check, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Info,
  Waves,
  Crosshair,
  Image as ImageIcon
} from 'lucide-react';
import { FloodSeverity, FloodReport } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newReport: FloodReport) => void;
  initialReport?: FloodReport | null;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  initialReport,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 'success'>(1);

  // Form State
  const [street, setStreet] = useState('Đường Nguyễn Hữu Cảnh');
  const [ward, setWard] = useState('Phường 22');
  const [district, setDistrict] = useState('Quận Bình Thạnh');
  const [city] = useState('TP. Hồ Chí Minh');
  const [latLng, setLatLng] = useState<[number, number]>([10.7925, 106.7190]);

  const [severity, setSeverity] = useState<FloodSeverity>('severe');
  const [depthEstimate, setDepthEstimate] = useState('50 – 70 cm');
  const [description, setDescription] = useState(
    'Nước ngập sâu hơn bánh xe máy, đoạn qua gầm cầu ngập nặng làm nhiều phương tiện chết máy.'
  );

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
  ]);

  const [confirmedTruth, setConfirmedTruth] = useState(true);

  // Mini map reference for Step 1
  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const miniMapInstanceRef = useRef<L.Map | null>(null);
  const miniMarkerRef = useRef<L.Marker | null>(null);

  // Initialize form with initialReport if provided
  useEffect(() => {
    if (initialReport) {
      setStreet(initialReport.street);
      setWard(initialReport.ward);
      setDistrict(initialReport.district);
      setLatLng([initialReport.lat, initialReport.lng]);
      setSeverity(initialReport.severity);
      setDepthEstimate(initialReport.depthEstimate);
      setDescription(initialReport.description || '');
      setImages(initialReport.images || []);
    }
  }, [initialReport]);

  // Mini map init in Step 1
  useEffect(() => {
    if (step === 1 && miniMapContainerRef.current && !miniMapInstanceRef.current) {
      const map = L.map(miniMapContainerRef.current, {
        center: latLng,
        zoom: 15,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      const marker = L.marker(latLng, {
        draggable: true,
      }).addTo(map);

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        setLatLng([pos.lat, pos.lng]);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        setLatLng([e.latlng.lat, e.latlng.lng]);
      });

      miniMapInstanceRef.current = map;
      miniMarkerRef.current = marker;
    }

    return () => {
      if (step !== 1 && miniMapInstanceRef.current) {
        miniMapInstanceRef.current.remove();
        miniMapInstanceRef.current = null;
      }
    };
  }, [step]);

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setLatLng(newPos);
          if (miniMapInstanceRef.current && miniMarkerRef.current) {
            miniMapInstanceRef.current.setView(newPos, 16);
            miniMarkerRef.current.setLatLng(newPos);
          }
        },
        () => {
          alert('Không thể lấy vị trí hiện tại. Vui lòng chọn trên bản đồ.');
        }
      );
    }
  };

  const handleAddSampleImage = (url: string) => {
    if (images.length < 5) {
      setImages([...images, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleFinalSubmit = () => {
    const newReport: FloodReport = {
      id: `rep-${Date.now()}`,
      street,
      ward,
      district,
      city,
      severity,
      depthEstimate,
      timestamp: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')} · Hôm nay`,
      timeAgo: 'Vừa xong',
      confirmationsCount: 1,
      isConfirmedByUser: true,
      source: 'community',
      lat: latLng[0],
      lng: latLng[1],
      description,
      images,
      status: 'Đang xác minh',
    };

    onSubmitSuccess(newReport);
    setStep('success');
  };

  const handleResetForm = () => {
    setStep(1);
    setDescription('');
    setImages([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E3E8EF] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E8EF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C52D5A] text-white flex items-center justify-center shadow-sm">
              <Waves className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#172033] leading-tight">
                Báo cáo tình trạng ngập
              </h2>
              <p className="text-[11px] text-[#667085]">
                Cùng cộng đồng xây dựng bản đồ cảnh báo chính xác
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-[#F7F9FB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Indicator */}
        {step !== 'success' && (
          <div className="px-6 py-3 bg-[#F7F9FB] border-b border-[#E3E8EF] flex items-center justify-between text-[12px] font-medium">
            {[
              { num: 1, label: 'Vị trí' },
              { num: 2, label: 'Thông tin' },
              { num: 3, label: 'Hình ảnh' },
              { num: 4, label: 'Xác nhận' },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPassed = typeof step === 'number' && step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isPassed
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-[#C52D5A] text-white ring-2 ring-[#C52D5A]/20'
                        : 'bg-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:inline ${
                      isCurrent
                        ? 'text-[#C52D5A] font-bold'
                        : isPassed
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 4 && <span className="text-gray-300 ml-2 hidden sm:inline">›</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 max-h-[68vh] overflow-y-auto">
          {/* STEP 1: VỊ TRÍ */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#172033]">
                  Chọn vị trí điểm ngập
                </span>
                <button
                  onClick={handleUseCurrentLocation}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#C52D5A] bg-[#FDF2F4] hover:bg-[#FCE7EC] rounded-md border border-[#FBCFE8] flex items-center gap-1.5 transition-colors"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  Dùng vị trí hiện tại
                </button>
              </div>

              {/* Mini Map */}
              <div className="relative h-52 w-full rounded-xl overflow-hidden border border-[#E3E8EF]">
                <div ref={miniMapContainerRef} className="w-full h-full" />
                <div className="absolute bottom-2 left-2 z-20 px-2 py-1 bg-white/90 backdrop-blur-xs text-[10px] text-gray-700 rounded shadow-xs">
                  Kéo ghim hoặc nhấp vào bản đồ để đổi vị trí
                </div>
              </div>

              {/* Address inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#667085] mb-1">
                    Tên đường / Tuyến phố *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] focus:border-[#C52D5A] focus:outline-none"
                    placeholder="VD: Đường Nguyễn Hữu Cảnh"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#667085] mb-1">
                    Phường / Xã *
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] focus:border-[#C52D5A] focus:outline-none"
                    placeholder="VD: Phường 22"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#667085] mb-1">
                    Quận / Huyện *
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-9 px-3 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] focus:border-[#C52D5A] focus:outline-none"
                    placeholder="VD: Quận Bình Thạnh"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#667085] mb-1">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    value={city}
                    disabled
                    className="w-full h-9 px-3 bg-gray-100 border border-[#E3E8EF] rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THÔNG TIN */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#172033] mb-2">
                  Mức độ ngập lụt hiện tại *
                </label>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  {[
                    { key: 'severe', label: 'Ngập nặng', desc: '> 50 cm (Xe máy chết máy)', color: 'border-red-500 bg-red-50 text-red-700' },
                    { key: 'moderate', label: 'Ngập vừa', desc: '20 – 50 cm (Khó di chuyển)', color: 'border-orange-500 bg-orange-50 text-orange-700' },
                    { key: 'light', label: 'Ngập nhẹ', desc: '5 – 20 cm (Mép vỉa hè)', color: 'border-amber-500 bg-amber-50 text-amber-700' },
                    { key: 'none', label: 'Không ngập', desc: 'Nước đã rút hoàn toàn', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
                  ].map((lvl) => (
                    <button
                      key={lvl.key}
                      onClick={() => setSeverity(lvl.key as FloodSeverity)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        severity === lvl.key
                          ? `${lvl.color} ring-2 ring-current font-bold`
                          : 'border-[#E3E8EF] hover:bg-[#F7F9FB] text-gray-700'
                      }`}
                    >
                      <div className="font-semibold text-[13px]">{lvl.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#172033] mb-1.5">
                  Độ sâu ước tính (cm)
                </label>
                <div className="flex gap-2">
                  {['10 – 20 cm', '20 – 35 cm', '35 – 50 cm', '50 – 70 cm', '> 70 cm'].map((depth) => (
                    <button
                      key={depth}
                      onClick={() => setDepthEstimate(depth)}
                      className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium border transition-colors ${
                        depthEstimate === depth
                          ? 'bg-[#C52D5A] text-white border-[#C52D5A]'
                          : 'bg-[#F7F9FB] border-[#E3E8EF] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {depth}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#172033] mb-1">
                  Mô tả tình trạng chi tiết
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="VD: Nước ngập sâu, xe máy khó di chuyển. Đường bị ùn ứ..."
                  className="w-full p-3 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[13px] text-[#172033] focus:border-[#C52D5A] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: HÌNH ẢNH */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#172033]">
                  Thêm hình ảnh hiện trường (Tối đa 5 ảnh)
                </span>
                <span className="text-[11px] text-[#667085]">
                  Đã thêm {images.length}/5 ảnh
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center hover:border-[#C52D5A] transition-colors bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-[#C52D5A] flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-[13px] font-medium text-gray-800">
                  Kéo thả ảnh hoặc chọn từ thiết bị
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Định dạng JPG, PNG dưới 10MB
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      handleAddSampleImage(
                        'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
                      )
                    }
                    className="px-2.5 py-1 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[11px] font-medium rounded text-gray-700"
                  >
                    + Dùng ảnh ngập mẫu 1
                  </button>
                  <button
                    onClick={() =>
                      handleAddSampleImage(
                        'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80'
                      )
                    }
                    className="px-2.5 py-1 bg-white border border-[#CBD5E1] hover:bg-gray-50 text-[11px] font-medium rounded text-gray-700"
                  >
                    + Dùng ảnh mưa mẫu 2
                  </button>
                </div>
              </div>

              {/* Thumbnails list */}
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200 h-20">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-red-600 text-white rounded transition-colors"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex items-start gap-2.5 text-[12px] text-blue-900">
                <Info className="w-4 h-4 text-[#1683E2] shrink-0 mt-0.5" />
                <span>
                  Hình ảnh giúp xác minh tình trạng ngập và hỗ trợ cộng đồng cập nhật thông tin chính xác hơn.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: XÁC NHẬN */}
          {step === 4 && (
            <div className="space-y-4 text-[13px]">
              <div className="text-[13px] font-bold text-[#172033] mb-2">
                Kiểm tra thông tin trước khi gửi
              </div>

              <div className="bg-[#F7F9FB] rounded-xl p-4 border border-[#E3E8EF] space-y-3">
                <div className="flex items-start justify-between pb-2 border-b border-[#E3E8EF]">
                  <span className="text-[#667085]">Vị trí báo cáo:</span>
                  <span className="font-semibold text-right text-[#172033]">
                    {street}, {ward}, {district}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8EF]">
                  <span className="text-[#667085]">Mức độ ngập:</span>
                  <span className="font-bold text-[#E31B23]">
                    {severity === 'severe'
                      ? 'Ngập nặng (> 50 cm)'
                      : severity === 'moderate'
                      ? 'Ngập vừa (20 – 50 cm)'
                      : severity === 'light'
                      ? 'Ngập nhẹ (5 – 20 cm)'
                      : 'Không ngập'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8EF]">
                  <span className="text-[#667085]">Ước tính mực nước:</span>
                  <span className="font-semibold text-[#172033]">{depthEstimate}</span>
                </div>

                <div className="pb-2 border-b border-[#E3E8EF]">
                  <span className="text-[#667085] block mb-1">Mô tả:</span>
                  <p className="text-gray-800 bg-white p-2.5 rounded border border-gray-200 text-[12px]">
                    {description || 'Không có mô tả thêm.'}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Hình ảnh đính kèm:</span>
                  <span className="font-semibold text-[#172033]">{images.length} hình ảnh</span>
                </div>
              </div>

              {/* Checkbox confirmation */}
              <label className="flex items-start gap-2.5 cursor-pointer mt-3">
                <input
                  type="checkbox"
                  checked={confirmedTruth}
                  onChange={(e) => setConfirmedTruth(e.target.checked)}
                  className="mt-0.5 rounded text-[#C52D5A] focus:ring-[#C52D5A]"
                />
                <span className="text-[12px] text-gray-700">
                  Tôi xác nhận thông tin trên là chính xác tại thời điểm báo cáo và đồng ý chia sẻ cho cộng đồng.
                </span>
              </label>
            </div>
          )}

          {/* SUCCESS STATE */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-[20px] font-bold text-gray-900">
                  Gửi báo cáo thành công!
                </h3>
                <p className="text-[13px] text-gray-600 max-w-sm mx-auto mt-1.5 leading-relaxed">
                  Cảm ơn bạn đã đóng góp thông tin! Báo cáo của bạn sẽ được kiểm duyệt và hiển thị trên bản đồ sau khi xác minh.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="h-10 px-5 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[13px] font-semibold rounded-lg shadow-sm"
                >
                  Xem trên bản đồ
                </button>
                <button
                  onClick={handleResetForm}
                  className="h-10 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[13px] font-medium rounded-lg"
                >
                  Gửi báo cáo khác
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step !== 'success' && (
          <div className="p-4 border-t border-[#E3E8EF] bg-[#F7F9FB] flex items-center justify-between">
            {step === 1 ? (
              <button
                onClick={onClose}
                className="px-4 h-9 border border-[#E3E8EF] text-[#667085] hover:text-[#172033] hover:bg-white text-[13px] font-medium rounded-lg"
              >
                Hủy
              </button>
            ) : (
              <button
                onClick={() => setStep((prev) => (typeof prev === 'number' ? ((prev - 1) as any) : 1))}
                className="px-4 h-9 border border-[#E3E8EF] text-[#172033] hover:bg-white text-[13px] font-medium rounded-lg flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep((prev) => (typeof prev === 'number' ? ((prev + 1) as any) : 2))}
                className="px-5 h-9 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[13px] font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                Tiếp theo
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                disabled={!confirmedTruth}
                className={`px-6 h-9 font-semibold text-[13px] rounded-lg shadow-sm transition-all ${
                  confirmedTruth
                    ? 'bg-[#16A34A] hover:bg-emerald-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Gửi báo cáo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
