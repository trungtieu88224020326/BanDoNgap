import React, { useState } from 'react';
import { 
  Waves, 
  AlertTriangle, 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  CloudRain, 
  Car, 
  Navigation, 
  PlusCircle, 
  BellRing, 
  History,
  ChevronDown
} from 'lucide-react';
import { FloodReport, FloodSeverity } from '../types';

interface SidebarProps {
  reports: FloodReport[];
  selectedReport: FloodReport | null;
  onSelectReport: (report: FloodReport) => void;
  onNavigateToReports: () => void;
  onNavigateToRoute: () => void;
  onOpenReportModal: () => void;
  onNavigateToData: () => void;
  // Layers toggles
  layers: {
    flood: boolean;
    radar: boolean;
    weatherAlerts: boolean;
    traffic: boolean;
  };
  onToggleLayer: (layerKey: 'flood' | 'radar' | 'weatherAlerts' | 'traffic') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  reports,
  selectedReport,
  onSelectReport,
  onNavigateToReports,
  onNavigateToRoute,
  onOpenReportModal,
  onNavigateToData,
  layers,
  onToggleLayer,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [severityFilter, setSeverityFilter] = useState<'all' | FloodSeverity>('all');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Filter reports for sidebar list
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ward.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || r.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (severity: FloodSeverity) => {
    switch (severity) {
      case 'severe':
        return {
          label: 'Ngập nặng',
          bg: 'bg-rose-50 text-[#E31B23] border border-rose-200',
          dot: 'bg-[#E31B23]',
        };
      case 'moderate':
        return {
          label: 'Ngập vừa',
          bg: 'bg-orange-50 text-[#F97316] border border-orange-200',
          dot: 'bg-[#F97316]',
        };
      case 'light':
        return {
          label: 'Ngập nhẹ',
          bg: 'bg-amber-50 text-[#D97706] border border-amber-200',
          dot: 'bg-[#FBBF24]',
        };
      case 'new':
      default:
        return {
          label: 'Báo cáo mới',
          bg: 'bg-blue-50 text-[#1683E2] border border-blue-200',
          dot: 'bg-[#1683E2]',
        };
    }
  };

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={onToggleCollapse}
          className="w-10 h-10 bg-white border border-[#E3E8EF] rounded-lg shadow-md flex items-center justify-center text-[#172033] hover:bg-[#F7F9FB] transition-colors"
          title="Mở bảng điều khiển"
        >
          <ChevronRight className="w-5 h-5 text-[#667085]" />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-[390px] h-full bg-white border-r border-[#E3E8EF] flex flex-col shrink-0 z-30 overflow-y-auto shadow-sm select-none">
      {/* 1. Header with city name & last updated */}
      <div className="p-4 border-b border-[#E3E8EF]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] font-semibold text-[#667085] tracking-wider uppercase mb-0.5">
              TÌNH TRẠNG NGẬP
            </div>
            <h1 className="text-[20px] font-bold text-[#172033] tracking-tight leading-tight">
              TP. Hồ Chí Minh
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#667085] bg-[#F7F9FB] px-2 py-1 rounded border border-[#E3E8EF]">
              Cập nhật <strong className="text-[#172033] font-semibold">15:32 · 12/10</strong>
            </span>
            <button
              onClick={onToggleCollapse}
              className="p-1 text-[#667085] hover:text-[#172033] hover:bg-[#F7F9FB] rounded transition-colors"
              title="Thu gọn"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Three Statistics Cards */}
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          {/* Card 1: Điểm ngập */}
          <div className="bg-[#FDF2F4] border border-[#FBCFE8]/50 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#C52D5A]">
              <Waves className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Điểm ngập</span>
            </div>
            <div className="text-[20px] font-bold text-[#C52D5A] leading-tight my-0.5">
              24
            </div>
            <div className="text-[10px] text-[#C52D5A]/80 font-medium">
              Đang ghi nhận
            </div>
          </div>

          {/* Card 2: Cảnh báo */}
          <div className="bg-[#FFF1F2] border border-[#FECDD3]/60 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#E31B23]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Cảnh báo</span>
            </div>
            <div className="text-[20px] font-bold text-[#E31B23] leading-tight my-0.5">
              5
            </div>
            <div className="text-[10px] text-[#E31B23]/80 font-medium">
              Khu vực nguy hiểm
            </div>
          </div>

          {/* Card 3: Báo cáo mới */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE]/60 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[#1683E2]">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Báo cáo mới</span>
            </div>
            <div className="text-[20px] font-bold text-[#1683E2] leading-tight my-0.5">
              12
            </div>
            <div className="text-[10px] text-[#1683E2]/80 font-medium">
              Trong 60 phút
            </div>
          </div>
        </div>

        {/* 3. Search Box */}
        <div className="relative mt-3.5">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm địa điểm, tuyến đường..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-[13px] bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#C52D5A] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* 4. Map Layers Section */}
      <div className="p-4 border-b border-[#E3E8EF]">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[13px] font-semibold text-[#172033]">Lớp bản đồ</h2>
          <button 
            onClick={() => onToggleLayer('flood')}
            className="text-[11px] text-[#C52D5A] hover:underline font-medium"
          >
            Quản lý lớp
          </button>
        </div>

        <div className="space-y-2 text-[13px]">
          {/* Tình trạng ngập */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5 text-[#172033]">
              <div className="w-6 h-6 rounded bg-[#FDF2F4] text-[#C52D5A] flex items-center justify-center">
                <Waves className="w-3.5 h-3.5" />
              </div>
              <span>Tình trạng ngập</span>
            </div>
            <button
              onClick={() => onToggleLayer('flood')}
              className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none ${
                layers.flood ? 'bg-[#C52D5A]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  layers.flood ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          {/* Radar mưa */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5 text-[#172033]">
              <div className="w-6 h-6 rounded bg-blue-50 text-[#1683E2] flex items-center justify-center">
                <CloudRain className="w-3.5 h-3.5" />
              </div>
              <span>Radar mưa</span>
            </div>
            <button
              onClick={() => onToggleLayer('radar')}
              className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none ${
                layers.radar ? 'bg-[#C52D5A]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  layers.radar ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          {/* Cảnh báo thời tiết */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5 text-[#172033]">
              <div className="w-6 h-6 rounded bg-rose-50 text-[#E31B23] flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <span>Cảnh báo thời tiết</span>
            </div>
            <button
              onClick={() => onToggleLayer('weatherAlerts')}
              className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none ${
                layers.weatherAlerts ? 'bg-[#C52D5A]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  layers.weatherAlerts ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          {/* Giao thông */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5 text-[#172033]">
              <div className="w-6 h-6 rounded bg-gray-100 text-[#475569] flex items-center justify-center">
                <Car className="w-3.5 h-3.5" />
              </div>
              <span>Giao thông</span>
            </div>
            <button
              onClick={() => onToggleLayer('traffic')}
              className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none ${
                layers.traffic ? 'bg-[#C52D5A]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  layers.traffic ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Tiện ích */}
      <div className="p-4 border-b border-[#E3E8EF]">
        <div className="text-[13px] font-semibold text-[#172033] mb-2.5">
          Tiện ích
        </div>
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <button
            onClick={onNavigateToRoute}
            className="p-2.5 bg-[#F7F9FB] hover:bg-[#EEF2F6] border border-[#E3E8EF] rounded-lg flex items-center gap-2 text-left text-[#172033] transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#C52D5A]" />
            <span className="font-medium">Tìm đường tránh</span>
          </button>
          <button
            onClick={onOpenReportModal}
            className="p-2.5 bg-[#F7F9FB] hover:bg-[#EEF2F6] border border-[#E3E8EF] rounded-lg flex items-center gap-2 text-left text-[#172033] transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#1683E2]" />
            <span className="font-medium">Báo cáo ngập</span>
          </button>
          <button
            onClick={onNavigateToData}
            className="p-2.5 bg-[#F7F9FB] hover:bg-[#EEF2F6] border border-[#E3E8EF] rounded-lg flex items-center gap-2 text-left text-[#172033] transition-colors"
          >
            <History className="w-4 h-4 text-[#0D9488]" />
            <span className="font-medium">Lịch sử ngập</span>
          </button>
          <button
            onClick={() => alert('Đã bật theo dõi thông báo khu vực TP. Hồ Chí Minh')}
            className="p-2.5 bg-[#F7F9FB] hover:bg-[#EEF2F6] border border-[#E3E8EF] rounded-lg flex items-center gap-2 text-left text-[#172033] transition-colors"
          >
            <BellRing className="w-4 h-4 text-[#EA580C]" />
            <span className="font-medium">Theo dõi khu vực</span>
          </button>
        </div>
      </div>

      {/* 6. Báo cáo gần đây (Recent Reports) */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[13px] font-semibold text-[#172033]">Báo cáo gần đây</h2>
          <button
            onClick={onNavigateToReports}
            className="text-[12px] text-[#C52D5A] hover:underline font-medium flex items-center gap-0.5"
          >
            Xem tất cả &gt;
          </button>
        </div>

        {/* Severity Filter Dropdown */}
        <div className="relative mb-3">
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="w-full h-8 px-2.5 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[12px] text-[#172033] flex items-center justify-between hover:bg-[#EEF2F6] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Waves className="w-3.5 h-3.5 text-[#667085]" />
              <span>
                {severityFilter === 'all'
                  ? 'Mọi mức độ'
                  : severityFilter === 'severe'
                  ? 'Ngập nặng'
                  : severityFilter === 'moderate'
                  ? 'Ngập vừa'
                  : severityFilter === 'light'
                  ? 'Ngập nhẹ'
                  : 'Báo cáo mới'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
          </button>

          {filterDropdownOpen && (
            <div className="absolute top-9 left-0 right-0 bg-white border border-[#E3E8EF] rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => { setSeverityFilter('all'); setFilterDropdownOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#F7F9FB] text-gray-700"
              >
                Mọi mức độ
              </button>
              <button
                onClick={() => { setSeverityFilter('severe'); setFilterDropdownOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#F7F9FB] text-[#E31B23] font-medium"
              >
                Ngập nặng (&gt; 50 cm)
              </button>
              <button
                onClick={() => { setSeverityFilter('moderate'); setFilterDropdownOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#F7F9FB] text-[#F97316] font-medium"
              >
                Ngập vừa (20 – 50 cm)
              </button>
              <button
                onClick={() => { setSeverityFilter('light'); setFilterDropdownOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#F7F9FB] text-[#D97706] font-medium"
              >
                Ngập nhẹ (5 – 20 cm)
              </button>
              <button
                onClick={() => { setSeverityFilter('new'); setFilterDropdownOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#F7F9FB] text-[#1683E2] font-medium"
              >
                Báo cáo mới
              </button>
            </div>
          )}
        </div>

        {/* List Rows */}
        <div className="space-y-2 divide-y divide-[#E3E8EF]/50">
          {filteredReports.slice(0, 7).map((rep) => {
            const badge = getSeverityBadge(rep.severity);
            const isSelected = selectedReport?.id === rep.id;

            return (
              <div
                key={rep.id}
                onClick={() => onSelectReport(rep)}
                className={`pt-2.5 first:pt-0 cursor-pointer group transition-colors rounded-lg p-2 ${
                  isSelected ? 'bg-[#FDF2F4] border border-[#FBCFE8]' : 'hover:bg-[#F7F9FB]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${badge.dot}`} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#172033] truncate group-hover:text-[#C52D5A] transition-colors">
                        {rep.street}
                      </div>
                      <div className="text-[11px] text-[#667085] truncate">
                        {rep.ward}, {rep.district}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">
                      {rep.timeAgo}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredReports.length === 0 && (
            <div className="py-8 text-center text-[12px] text-[#94A3B8]">
              Không tìm thấy điểm ngập nào phù hợp
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
