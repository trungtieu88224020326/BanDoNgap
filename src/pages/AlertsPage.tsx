import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CloudRain, 
  Car, 
  Waves, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { FloodAlert, AlertType, AlertSeverity } from '../types';
import { MapComponent } from '../components/MapComponent';

interface AlertsPageProps {
  alerts: FloodAlert[];
  selectedAlert: FloodAlert | null;
  onSelectAlert: (alert: FloodAlert | null) => void;
  onOpenReportModal: () => void;
  onNavigateToRoute: (destination: string) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  selectedAlert,
  onSelectAlert,
  onOpenReportModal,
  onNavigateToRoute,
}) => {
  const [activeFilter, setActiveFilter] = useState<AlertType>('all');

  const filteredAlerts = alerts.filter((alt) => {
    if (activeFilter === 'all') return true;
    return alt.type === activeFilter;
  });

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'flood':
        return Waves;
      case 'rain':
        return CloudRain;
      case 'traffic':
        return Car;
      case 'tide':
        return Waves;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'high':
        return {
          label: 'Mức độ Cao',
          badge: 'bg-rose-50 text-[#E31B23] border border-rose-200',
          dot: 'bg-[#E31B23]',
        };
      case 'medium':
        return {
          label: 'Trung bình',
          badge: 'bg-orange-50 text-[#F97316] border border-orange-200',
          dot: 'bg-[#F97316]',
        };
      case 'low':
      default:
        return {
          label: 'Mức độ Thấp',
          badge: 'bg-amber-50 text-[#D97706] border border-amber-200',
          dot: 'bg-[#FBBF24]',
        };
    }
  };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#F7F9FB]">
      {/* 1. Left Panel (approx 400px) */}
      <aside className="w-full md:w-[420px] h-full bg-white border-r border-[#E3E8EF] flex flex-col shrink-0 overflow-y-auto select-none shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E8EF]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E31B23] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-[#172033] tracking-tight">
                Cảnh báo nguy hiểm
              </h1>
              <p className="text-[12px] text-[#667085]">
                Phát hiện <strong className="text-[#E31B23]">{alerts.length}</strong> vùng có cảnh báo thời tiết và ngập lụt
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1 text-[12px]">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'flood', label: 'Ngập úng' },
              { id: 'rain', label: 'Mưa lớn' },
              { id: 'traffic', label: 'Giao thông' },
              { id: 'tide', label: 'Triều cường' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-[#C52D5A] text-white shadow-xs'
                    : 'bg-[#F7F9FB] text-[#667085] hover:bg-[#EEF2F6] hover:text-[#172033]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {filteredAlerts.map((alt) => {
            const isSelected = selectedAlert?.id === alt.id;
            const Icon = getAlertIcon(alt.type);
            const sev = getSeverityStyle(alt.severity);

            return (
              <div
                key={alt.id}
                onClick={() => onSelectAlert(alt)}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all shadow-xs group ${
                  isSelected
                    ? 'border-[#E31B23] ring-2 ring-rose-200 bg-rose-50/20'
                    : 'border-[#E3E8EF] hover:border-[#CBD5E1] hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-[#FDF2F4] group-hover:text-[#C52D5A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${sev.badge}`}>
                      {sev.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94A3B8] flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {alt.time}
                  </span>
                </div>

                <h3 className="text-[14px] font-bold text-[#172033] group-hover:text-[#C52D5A] transition-colors leading-snug">
                  {alt.title}
                </h3>

                <div className="flex items-start gap-1.5 text-[12px] text-[#667085] mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C52D5A] shrink-0 mt-0.5" />
                  <span>{alt.location} ({alt.district})</span>
                </div>

                <p className="text-[12px] text-gray-600 mt-2 leading-relaxed bg-[#F8FAFC] p-2.5 rounded-lg border border-gray-100">
                  {alt.description}
                </p>

                {/* Affected Roads */}
                {alt.affectedRoads && alt.affectedRoads.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-gray-100">
                    <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Các tuyến đường ảnh hưởng:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {alt.affectedRoads.map((road, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded"
                        >
                          {road}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="py-12 text-center text-gray-500 bg-white rounded-xl border border-[#E3E8EF] p-6">
              <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-700">Không có cảnh báo trong danh mục này</p>
            </div>
          )}
        </div>
      </aside>

      {/* 2. Right Large Map */}
      <main className="flex-1 h-full relative overflow-hidden">
        <MapComponent
          reports={[]}
          selectedReport={null}
          onSelectReport={() => {}}
          onOpenReportModal={onOpenReportModal}
          alerts={filteredAlerts}
          selectedAlert={selectedAlert}
          showWeatherAlerts={true}
          showRadar={true}
          height="100%"
        />

        {/* Legend for Alerts Page */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-[#E3E8EF] p-3 rounded-xl shadow-md text-[12px]">
          <div className="font-semibold text-[#172033] mb-1.5 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#C52D5A]" />
            Mức độ cảnh báo
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E31B23]" />
              <span>Cao (Vùng nguy hiểm ngập sâu)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span>Trung bình (Nguy cơ ngập vừa)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
              <span>Thấp (Ngập mép đường, đọng nước)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
