import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  Camera, 
  Bookmark, 
  Share2, 
  Building2, 
  Radio, 
  Sparkles, 
  Newspaper,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { FloodReport, ReportSource, FloodSeverity } from '../types';
import { DISTRICT_LIST } from '../data/mockData';
import { MapComponent } from '../components/MapComponent';
import { FloodDetailCard } from '../components/FloodDetailCard';

interface ReportsPageProps {
  reports: FloodReport[];
  selectedReport: FloodReport | null;
  onSelectReport: (report: FloodReport | null) => void;
  onOpenReportModal: () => void;
  onNavigateToRoute: (destination: string) => void;
  onToggleConfirm: (reportId: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({
  reports,
  selectedReport,
  onSelectReport,
  onOpenReportModal,
  onNavigateToRoute,
  onToggleConfirm,
}) => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<'all' | ReportSource>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | FloodSeverity>('all');
  const [selectedDistrict, setSelectedDistrict] = useState('Tất cả quận/huyện');
  const [selectedTimeWindow, setSelectedTimeWindow] = useState<'all' | '1h' | '6h' | '24h'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'depth' | 'confirmations'>('latest');
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Bookmarked IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Source count calculation
  const sourceCounts = useMemo(() => {
    const counts = {
      all: reports.length,
      community: 0,
      official: 0,
      sensor: 0,
      media: 0,
      inference: 0,
    };
    reports.forEach((r) => {
      if (counts[r.source] !== undefined) {
        counts[r.source]++;
      }
    });
    return counts;
  }, [reports]);

  // Filter & Sort
  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        // Search
        if (
          searchQuery &&
          !r.street.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !r.district.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !r.ward.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Source
        if (selectedSource !== 'all' && r.source !== selectedSource) {
          return false;
        }

        // Severity
        if (selectedSeverity !== 'all' && r.severity !== selectedSeverity) {
          return false;
        }

        // District
        if (
          selectedDistrict !== 'Tất cả quận/huyện' &&
          !r.district.toLowerCase().includes(selectedDistrict.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'confirmations') {
          return b.confirmationsCount - a.confirmationsCount;
        }
        if (sortBy === 'depth') {
          const depthScore: Record<FloodSeverity, number> = {
            severe: 4,
            moderate: 3,
            light: 2,
            new: 1,
            none: 0,
          };
          return depthScore[b.severity] - depthScore[a.severity];
        }
        return 0; // Default latest order
      });
  }, [reports, searchQuery, selectedSource, selectedSeverity, selectedDistrict, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / pageSize) || 1;
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const getSourceBadgeInfo = (source: ReportSource) => {
    switch (source) {
      case 'official':
        return { label: 'Cơ quan chức năng', icon: Building2, style: 'bg-rose-50 text-[#C52D5A] border-rose-200' };
      case 'sensor':
        return { label: 'Cảm biến', icon: Radio, style: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'media':
        return { label: 'Truyền thông', icon: Newspaper, style: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'inference':
        return { label: 'Hệ thống suy luận', icon: Sparkles, style: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'community':
      default:
        return { label: 'Cộng đồng', icon: Users, style: 'bg-blue-50 text-[#1683E2] border-blue-200' };
    }
  };

  const getSeverityBadgeInfo = (severity: FloodSeverity) => {
    switch (severity) {
      case 'severe':
        return { label: 'Ngập nặng', style: 'bg-rose-50 text-[#E31B23] border-rose-200' };
      case 'moderate':
        return { label: 'Ngập vừa', style: 'bg-orange-50 text-[#F97316] border-orange-200' };
      case 'light':
        return { label: 'Ngập nhẹ', style: 'bg-amber-50 text-[#D97706] border-amber-200' };
      case 'new':
      default:
        return { label: 'Báo cáo mới', style: 'bg-blue-50 text-[#1683E2] border-blue-200' };
    }
  };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#F7F9FB]">
      {/* 1. LEFT FILTER SIDEBAR (approx 260px) */}
      <aside className="w-[260px] h-full bg-white border-r border-[#E3E8EF] p-4 flex flex-col shrink-0 overflow-y-auto select-none hidden lg:flex">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#E3E8EF]">
          <Filter className="w-4 h-4 text-[#C52D5A]" />
          <h2 className="text-[14px] font-bold text-[#172033]">Bộ lọc tìm kiếm</h2>
        </div>

        {/* Nguồn báo cáo */}
        <div className="mb-5">
          <div className="text-[12px] font-semibold text-[#172033] mb-2 uppercase tracking-wide">
            Nguồn báo cáo
          </div>
          <div className="space-y-1 text-[13px]">
            {[
              { id: 'all', label: 'Tất cả nguồn', count: sourceCounts.all },
              { id: 'community', label: 'Cộng đồng', count: sourceCounts.community },
              { id: 'official', label: 'Cơ quan chức năng', count: sourceCounts.official },
              { id: 'sensor', label: 'Cảm biến', count: sourceCounts.sensor },
              { id: 'media', label: 'Truyền thông', count: sourceCounts.media },
              { id: 'inference', label: 'Hệ thống suy luận', count: sourceCounts.inference },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setSelectedSource(item.id as any); setCurrentPage(1); }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                  selectedSource === item.id
                    ? 'bg-[#FDF2F4] text-[#C52D5A] font-semibold'
                    : 'text-[#667085] hover:bg-[#F7F9FB] hover:text-[#172033]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mức độ ngập */}
        <div className="mb-5">
          <div className="text-[12px] font-semibold text-[#172033] mb-2 uppercase tracking-wide">
            Mức độ ngập
          </div>
          <div className="space-y-1 text-[13px]">
            {[
              { id: 'all', label: 'Tất cả mức độ' },
              { id: 'severe', label: 'Ngập nặng (> 50 cm)', color: 'text-[#E31B23]' },
              { id: 'moderate', label: 'Ngập vừa (20 – 50 cm)', color: 'text-[#F97316]' },
              { id: 'light', label: 'Ngập nhẹ (5 – 20 cm)', color: 'text-[#D97706]' },
              { id: 'new', label: 'Báo cáo mới', color: 'text-[#1683E2]' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setSelectedSeverity(item.id as any); setCurrentPage(1); }}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors text-left ${
                  selectedSeverity === item.id
                    ? 'bg-[#FDF2F4] text-[#C52D5A] font-semibold'
                    : 'text-[#667085] hover:bg-[#F7F9FB] hover:text-[#172033]'
                }`}
              >
                <span className={item.color || ''}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Thời gian báo cáo */}
        <div className="mb-5">
          <div className="text-[12px] font-semibold text-[#172033] mb-2 uppercase tracking-wide">
            Thời gian báo cáo
          </div>
          <div className="space-y-1 text-[13px]">
            {[
              { id: 'all', label: 'Tất cả thời gian' },
              { id: '1h', label: 'Trong 1 giờ qua' },
              { id: '6h', label: 'Trong 6 giờ qua' },
              { id: '24h', label: 'Trong 24 giờ qua' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTimeWindow(t.id as any)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] ${
                  selectedTimeWindow === t.id
                    ? 'bg-[#FDF2F4] text-[#C52D5A] font-semibold'
                    : 'text-[#667085] hover:bg-[#F7F9FB] hover:text-[#172033]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Khu vực (Quận / Huyện) */}
        <div className="mb-4">
          <div className="text-[12px] font-semibold text-[#172033] mb-2 uppercase tracking-wide">
            Khu vực
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
            className="w-full h-9 px-2.5 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[13px] text-[#172033] focus:border-[#C52D5A] focus:outline-none"
          >
            {DISTRICT_LIST.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={() => {
            setSelectedSource('all');
            setSelectedSeverity('all');
            setSelectedDistrict('Tất cả quận/huyện');
            setSelectedTimeWindow('all');
            setSearchQuery('');
            setCurrentPage(1);
          }}
          className="mt-auto py-2 text-[12px] font-medium text-[#667085] hover:text-[#C52D5A] hover:bg-[#F7F9FB] rounded-lg border border-[#E3E8EF] text-center"
        >
          Đặt lại bộ lọc
        </button>
      </aside>

      {/* 2. MAIN REPORT LIST (650-700px on desktop) */}
      <section
        className={`h-full border-r border-[#E3E8EF] flex flex-col bg-white overflow-hidden ${
          viewMode === 'map' ? 'hidden' : 'w-full md:w-[680px] shrink-0'
        }`}
      >
        {/* Header & Controls */}
        <div className="p-4 sm:p-5 border-b border-[#E3E8EF] space-y-3.5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[20px] font-bold text-[#172033] tracking-tight">
                Danh sách điểm ngập
              </h1>
              <p className="text-[13px] text-[#667085] mt-0.5">
                Tổng cộng <strong className="text-[#C52D5A]">{filteredReports.length}</strong> điểm ngập được ghi nhận
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* View switch (Danh sách / Bản đồ) */}
              <div className="hidden sm:flex items-center bg-[#F7F9FB] border border-[#E3E8EF] p-0.5 rounded-lg text-[12px]">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'split' ? 'bg-white shadow-xs text-[#172033]' : 'text-[#667085]'
                  }`}
                >
                  Danh sách + Bản đồ
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-xs text-[#172033]' : 'text-[#667085]'
                  }`}
                >
                  Toàn danh sách
                </button>
              </div>

              {/* + Báo cáo ngập button */}
              <button
                onClick={onOpenReportModal}
                className="h-9 px-3.5 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[13px] font-semibold rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Báo cáo ngập</span>
              </button>
            </div>
          </div>

          {/* Search bar & Sorting */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm theo tên đường, địa điểm..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full h-9 pl-9 pr-3 text-[13px] bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#C52D5A] focus:bg-white"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-9 px-2.5 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[12px] font-medium text-[#172033] focus:border-[#C52D5A] focus:outline-none"
              >
                <option value="latest">Mới nhất</option>
                <option value="depth">Mức ngập sâu nhất</option>
                <option value="confirmations">Nhiều xác nhận nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Cards Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {paginatedReports.map((report) => {
            const isSelected = selectedReport?.id === report.id;
            const srcBadge = getSourceBadgeInfo(report.source);
            const sevBadge = getSeverityBadgeInfo(report.severity);
            const isSaved = bookmarkedIds[report.id];
            const SrcIcon = srcBadge.icon;

            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all shadow-xs group ${
                  isSelected
                    ? 'border-[#C52D5A] ring-2 ring-[#C52D5A]/15 bg-[#FFF9FA]'
                    : 'border-[#E3E8EF] hover:border-[#CBD5E1] hover:shadow-md'
                }`}
              >
                <div className="flex gap-4 items-start">
                  {/* 1. IMAGE THUMBNAIL */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-[#E3E8EF]">
                    <img
                      src={report.images[0] || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=300&q=80'}
                      alt={report.street}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {report.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded flex items-center gap-1 font-mono">
                        <Camera className="w-3 h-3" />
                        <span>+{report.images.length - 1}</span>
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      {/* Source & Severity badges */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${sevBadge.style}`}>
                          {sevBadge.label} · {report.depthEstimate}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 ${srcBadge.style}`}>
                          <SrcIcon className="w-3 h-3" />
                          {srcBadge.label}
                        </span>
                      </div>

                      {/* 2. LOCATION */}
                      <h3 className="text-[15px] font-bold text-[#172033] group-hover:text-[#C52D5A] transition-colors truncate">
                        {report.street}
                      </h3>
                      <div className="flex items-center gap-1 text-[12px] text-[#667085] truncate mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C52D5A] shrink-0" />
                        <span>
                          {report.ward}, {report.district}, {report.city}
                        </span>
                      </div>

                      {/* Description snippet */}
                      {report.description && (
                        <p className="text-[12px] text-gray-600 line-clamp-1 mt-1.5">
                          {report.description}
                        </p>
                      )}
                    </div>

                    {/* Meta info & Actions bar */}
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F1F5F9] text-[11px] text-[#667085]">
                      <div className="flex items-center gap-3">
                        {/* 4. REPORT TIME */}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{report.timestamp}</span>
                        </div>

                        {/* 5. NUMBER OF CONFIRMATIONS */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleConfirm(report.id);
                          }}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded border transition-colors ${
                            report.isConfirmedByUser
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                              : 'hover:bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                          title="Xác nhận điểm này có ngập"
                        >
                          <Users className="w-3 h-3 text-emerald-600" />
                          <span>{report.confirmationsCount} xác nhận</span>
                        </button>
                      </div>

                      {/* 7. ACTIONS (Bookmark / Share) */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => toggleBookmark(report.id, e)}
                          className="p-1 hover:text-[#C52D5A] transition-colors"
                          title="Lưu lại"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C52D5A] text-[#C52D5A]' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToRoute(`${report.street}, ${report.district}`);
                          }}
                          className="px-2 py-0.5 rounded bg-blue-50 text-[#1683E2] hover:bg-blue-100 font-medium text-[11px]"
                        >
                          Tránh đường này
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredReports.length === 0 && (
            <div className="py-16 text-center text-gray-500 bg-white rounded-xl border border-[#E3E8EF] p-8">
              <Search className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="font-semibold text-gray-700">Không tìm thấy điểm ngập nào</p>
              <p className="text-[12px] text-gray-500 mt-1">
                Hãy thử thay đổi điều kiện tìm kiếm hoặc chọn quận khác.
              </p>
            </div>
          )}
        </div>

        {/* Pagination bar */}
        {filteredReports.length > 0 && (
          <div className="p-3 border-t border-[#E3E8EF] bg-white flex items-center justify-between text-[12px]">
            <span className="text-[#667085]">
              Trang <strong>{currentPage}</strong> / {totalPages} (Hiển thị {paginatedReports.length} / {filteredReports.length})
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded border border-[#E3E8EF] disabled:opacity-40 hover:bg-gray-50 text-gray-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded border border-[#E3E8EF] disabled:opacity-40 hover:bg-gray-50 text-gray-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. RIGHT MAP (remaining width) */}
      <div
        className={`flex-1 h-full relative overflow-hidden ${
          viewMode === 'list' ? 'hidden' : 'block'
        }`}
      >
        <MapComponent
          reports={filteredReports}
          selectedReport={selectedReport}
          onSelectReport={onSelectReport}
          onOpenReportModal={onOpenReportModal}
          height="100%"
        />

        {/* Detail Card Overlay on Map */}
        {selectedReport && (
          <FloodDetailCard
            report={selectedReport}
            onClose={() => onSelectReport(null)}
            onNavigateToRoute={onNavigateToRoute}
            onOpenReportUpdate={onOpenReportModal}
            onToggleConfirm={onToggleConfirm}
          />
        )}
      </div>
    </div>
  );
};
