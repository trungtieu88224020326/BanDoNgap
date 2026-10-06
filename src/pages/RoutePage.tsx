import React, { useState } from 'react';
import { 
  Navigation, 
  Car, 
  Bike, 
  Footprints, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpDown, 
  MapPin, 
  Clock, 
  Route as RouteIcon,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { TransportMode, RouteOption, FloodReport } from '../types';
import { MOCK_ROUTE_OPTIONS } from '../data/mockData';
import { MapComponent } from '../components/MapComponent';

interface RoutePageProps {
  initialDestination?: string;
  reports: FloodReport[];
  onOpenReportModal: () => void;
}

export const RoutePage: React.FC<RoutePageProps> = ({
  initialDestination = 'Thảo Điền, TP. Thủ Đức',
  reports,
  onOpenReportModal,
}) => {
  const [origin, setOrigin] = useState('Chợ Bến Thành, Quận 1');
  const [destination, setDestination] = useState(initialDestination);
  const [mode, setMode] = useState<TransportMode>('bike');
  const [avoidFlooding, setAvoidFlooding] = useState(true);
  const [routes, setRoutes] = useState<RouteOption[]>(MOCK_ROUTE_OPTIONS);
  const [activeRouteId, setActiveRouteId] = useState<string>(MOCK_ROUTE_OPTIONS[0].id);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSwapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearchRoutes = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 400);
  };

  const selectedRoute = routes.find((r) => r.id === activeRouteId) || routes[0];

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#F7F9FB]">
      {/* 1. Left Route Planner Panel */}
      <aside className="w-full md:w-[420px] h-full bg-white border-r border-[#E3E8EF] flex flex-col shrink-0 overflow-y-auto select-none shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E8EF]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#1683E2] text-white flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-[18px] font-bold text-[#172033] tracking-tight">
                Tìm đường tránh ngập
              </h1>
              <p className="text-[12px] text-[#667085]">
                Dẫn đường an toàn dựa trên mực nước thực tế
              </p>
            </div>
          </div>

          {/* Transport mode selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg mb-3 text-[12px]">
            <button
              onClick={() => setMode('bike')}
              className={`py-1.5 px-2 rounded-md font-medium flex items-center justify-center gap-1.5 transition-colors ${
                mode === 'bike' ? 'bg-white shadow-xs text-[#C52D5A] font-bold' : 'text-[#667085]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Xe máy</span>
            </button>
            <button
              onClick={() => setMode('car')}
              className={`py-1.5 px-2 rounded-md font-medium flex items-center justify-center gap-1.5 transition-colors ${
                mode === 'car' ? 'bg-white shadow-xs text-[#C52D5A] font-bold' : 'text-[#667085]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Ô tô</span>
            </button>
            <button
              onClick={() => setMode('walk')}
              className={`py-1.5 px-2 rounded-md font-medium flex items-center justify-center gap-1.5 transition-colors ${
                mode === 'walk' ? 'bg-white shadow-xs text-[#C52D5A] font-bold' : 'text-[#667085]'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Đi bộ</span>
            </button>
          </div>

          {/* Origin & Destination Inputs */}
          <div className="relative space-y-2">
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute left-3 top-3.5 ring-2 ring-emerald-100" />
              <input
                type="text"
                placeholder="Điểm xuất phát..."
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full h-10 pl-9 pr-9 text-[13px] bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] focus:border-[#C52D5A] focus:bg-white"
              />
            </div>

            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C52D5A] absolute left-3 top-3.5 ring-2 ring-rose-100" />
              <input
                type="text"
                placeholder="Điểm đến..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-10 pl-9 pr-9 text-[13px] bg-[#F7F9FB] border border-[#E3E8EF] rounded-lg text-[#172033] focus:border-[#C52D5A] focus:bg-white"
              />
            </div>

            {/* Swap button */}
            <button
              onClick={handleSwapLocations}
              className="absolute right-2 top-6 -translate-y-1/2 p-1.5 bg-white border border-[#E3E8EF] rounded-full text-gray-500 hover:text-gray-900 shadow-xs"
              title="Đảo chiều"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Avoid Flood Toggle */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E3E8EF]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[13px] font-medium text-[#172033]">
                Tránh mọi khu vực ngập
              </span>
            </div>
            <button
              onClick={() => setAvoidFlooding(!avoidFlooding)}
              className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none ${
                avoidFlooding ? 'bg-emerald-600' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${
                  avoidFlooding ? 'left-4.5' : 'left-0.75'
                }`}
              />
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={handleSearchRoutes}
            className="w-full mt-3 h-10 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[13px] font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Navigation className="w-4 h-4" />
            <span>{isCalculating ? 'Đang phân tích đường ngập...' : 'Tìm lộ trình an toàn'}</span>
          </button>
        </div>

        {/* Route Alternatives List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          <div className="text-[12px] font-semibold text-[#667085] uppercase tracking-wide">
            Các lựa chọn lộ trình ({routes.length})
          </div>

          {routes.map((rt) => {
            const isSelected = rt.id === activeRouteId;
            return (
              <div
                key={rt.id}
                onClick={() => setActiveRouteId(rt.id)}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all shadow-xs ${
                  isSelected
                    ? 'border-[#1683E2] ring-2 ring-blue-100 bg-blue-50/20'
                    : 'border-[#E3E8EF] hover:border-[#CBD5E1] hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[17px] font-bold text-[#172033]">
                      {rt.durationMinutes} phút
                    </span>
                    <span className="text-[13px] text-[#667085]">
                      · {rt.distanceKm} km
                    </span>
                  </div>

                  {rt.isRecommended ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Tránh {rt.avoidFloodedSpots} điểm ngập
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Có nguy cơ ngập
                    </span>
                  )}
                </div>

                <div className="text-[13px] font-semibold text-gray-800 mb-1">
                  {rt.name}
                </div>
                <div className="text-[12px] text-gray-500 mb-2">
                  {rt.via}
                </div>

                <p className="text-[12px] text-gray-600 bg-[#F8FAFC] p-2.5 rounded-lg border border-gray-100">
                  {rt.summary}
                </p>

                {rt.warnings && rt.warnings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {rt.warnings.map((w, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-rose-600 font-medium">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Right Large Map with Route Polylines */}
      <main className="flex-1 h-full relative overflow-hidden">
        <MapComponent
          reports={reports}
          selectedReport={null}
          onSelectReport={() => {}}
          onOpenReportModal={onOpenReportModal}
          routes={routes}
          activeRouteId={activeRouteId}
          showFloodMarkers={true}
          height="100%"
        />

        {/* Floating summary of active route */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm border border-[#E3E8EF] p-3.5 rounded-xl shadow-lg max-w-sm text-[12px]">
          <div className="flex items-center gap-2 mb-1.5">
            <RouteIcon className="w-4 h-4 text-[#1683E2]" />
            <span className="font-bold text-[#172033] text-[13px]">{selectedRoute.name}</span>
          </div>
          <div className="text-gray-600">
            {selectedRoute.via} · Thời gian dự kiến: <strong>{selectedRoute.durationMinutes} phút</strong> ({selectedRoute.distanceKm} km).
          </div>
          {selectedRoute.avoidFloodedSpots > 0 && (
            <div className="mt-2 text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Đã tự động định tuyến né tránh {selectedRoute.avoidFloodedSpots} điểm ngập trên đường đi.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
