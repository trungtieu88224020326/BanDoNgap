import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Navigation, 
  RefreshCw, 
  Share2, 
  Bookmark, 
  CheckCircle2,
  Building2,
  Radio,
  FileCheck
} from 'lucide-react';
import { FloodReport, FloodSeverity } from '../types';

interface FloodDetailCardProps {
  report: FloodReport;
  onClose: () => void;
  onNavigateToRoute: (destination: string) => void;
  onOpenReportUpdate: (report: FloodReport) => void;
  onToggleConfirm: (reportId: string) => void;
}

export const FloodDetailCard: React.FC<FloodDetailCardProps> = ({
  report,
  onClose,
  onNavigateToRoute,
  onOpenReportUpdate,
  onToggleConfirm,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const getSeverityStyle = (severity: FloodSeverity) => {
    switch (severity) {
      case 'severe':
        return {
          title: 'Ngập nặng',
          badge: 'bg-rose-100 text-[#E31B23] border border-rose-300',
        };
      case 'moderate':
        return {
          title: 'Ngập vừa',
          badge: 'bg-orange-100 text-[#F97316] border border-orange-300',
        };
      case 'light':
        return {
          title: 'Ngập nhẹ',
          badge: 'bg-amber-100 text-[#D97706] border border-amber-300',
        };
      case 'new':
      default:
        return {
          title: 'Báo cáo mới',
          badge: 'bg-blue-100 text-[#1683E2] border border-blue-300',
        };
    }
  };

  const getSourceBadge = () => {
    switch (report.source) {
      case 'official':
        return {
          label: 'Cơ quan chức năng',
          icon: Building2,
          style: 'bg-[#FDF2F4] text-[#C52D5A] border border-[#FBCFE8]',
        };
      case 'sensor':
        return {
          label: 'Cảm biến quan trắc',
          icon: Radio,
          style: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        };
      case 'community':
      default:
        return {
          label: 'Báo cáo cộng đồng',
          icon: Users,
          style: 'bg-blue-50 text-[#1683E2] border border-blue-200',
        };
    }
  };

  const sev = getSeverityStyle(report.severity);
  const src = getSourceBadge();
  const SourceIcon = src.icon;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/reports/${report.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-[360px] sm:w-[400px] max-h-[calc(100vh-140px)] bg-white rounded-xl shadow-2xl border border-[#E3E8EF] z-30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200 select-none">
      {/* Header bar */}
      <div className="p-3.5 border-b border-[#E3E8EF] flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md text-[12px] font-bold ${sev.badge}`}>
            {sev.title}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1 ${src.style}`}>
            <SourceIcon className="w-3 h-3" />
            {src.label}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-1.5 text-[#667085] hover:text-[#C52D5A] hover:bg-[#F7F9FB] rounded-lg transition-colors"
            title="Lưu điểm ngập"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#C52D5A] text-[#C52D5A]' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-[#F7F9FB] rounded-lg transition-colors"
            title="Sao chép liên kết"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-[#F7F9FB] rounded-lg transition-colors"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-4">
        {/* Title and Address */}
        <div>
          <h2 className="text-[17px] font-bold text-[#172033] leading-snug">
            {report.street}
          </h2>
          <div className="flex items-start gap-1.5 text-[12px] text-[#667085] mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#C52D5A] shrink-0 mt-0.5" />
            <span>
              {report.ward}, {report.district}, {report.city}
            </span>
          </div>
        </div>

        {/* Depth & Info Callout */}
        <div className="grid grid-cols-2 gap-2 bg-[#F7F9FB] p-3 rounded-lg border border-[#E3E8EF]">
          <div>
            <div className="text-[11px] text-[#667085]">Ước tính mực nước:</div>
            <div className="text-[15px] font-bold text-[#E31B23]">
              {report.depthEstimate}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#667085]">Thời gian ghi nhận:</div>
            <div className="text-[12px] font-medium text-[#172033] flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-[#667085]" />
              {report.timestamp}
            </div>
          </div>
        </div>

        {/* Verification Counter with interactive confirmation */}
        <div className="flex items-center justify-between p-2.5 bg-emerald-50/60 border border-emerald-200/60 rounded-lg">
          <div className="flex items-center gap-2 text-[12px] text-emerald-800 font-medium">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>{report.confirmationsCount}</strong> người đã xác nhận điểm này
            </span>
          </div>
          <button
            onClick={() => onToggleConfirm(report.id)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 ${
              report.isConfirmedByUser
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-700 hover:bg-emerald-100 border border-emerald-300'
            }`}
          >
            <FileCheck className="w-3 h-3" />
            {report.isConfirmedByUser ? 'Đã xác nhận' : 'Xác nhận ngay'}
          </button>
        </div>

        {/* Description */}
        {report.description && (
          <div className="text-[13px] text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
            {report.description}
          </div>
        )}

        {/* Images Gallery */}
        {report.images && report.images.length > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider mb-2">
              Hình ảnh thực tế ({report.images.length})
            </div>
            {/* Main Featured Photo */}
            <div className="relative rounded-lg overflow-hidden border border-[#E3E8EF] h-44 bg-gray-100">
              <img
                src={report.images[selectedImageIndex] || report.images[0]}
                alt={`Hiện trường ${report.street}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-sm">
                Ảnh {selectedImageIndex + 1}/{report.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {report.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {report.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-14 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#C52D5A] ring-2 ring-[#C52D5A]/20 scale-95'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="p-3.5 border-t border-[#E3E8EF] bg-[#F7F9FB] flex items-center gap-2">
        <button
          onClick={() => onNavigateToRoute(`${report.street}, ${report.district}`)}
          className="flex-1 h-9 bg-[#1683E2] hover:bg-[#126ec0] text-white text-[12px] font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Tìm đường tránh ngập</span>
        </button>
        <button
          onClick={() => onOpenReportUpdate(report)}
          className="h-9 px-3 bg-white hover:bg-[#EEF2F6] border border-[#E3E8EF] text-[#172033] text-[12px] font-medium rounded-lg flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#667085]" />
          <span>Cập nhật</span>
        </button>
      </div>
    </div>
  );
};
