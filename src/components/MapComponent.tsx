import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Crosshair, 
  Plus, 
  Minus, 
  Layers, 
  Waves
} from 'lucide-react';
import { FloodReport, FloodAlert, RouteOption } from '../types';

interface MapComponentProps {
  reports: FloodReport[];
  selectedReport: FloodReport | null;
  onSelectReport: (report: FloodReport | null) => void;
  onOpenReportModal: () => void;
  alerts?: FloodAlert[];
  selectedAlert?: FloodAlert | null;
  routes?: RouteOption[];
  activeRouteId?: string;
  showRadar?: boolean;
  showWeatherAlerts?: boolean;
  showTraffic?: boolean;
  showFloodMarkers?: boolean;
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  reports,
  selectedReport,
  onSelectReport,
  onOpenReportModal,
  alerts = [],
  selectedAlert,
  routes = [],
  activeRouteId,
  showRadar = false,
  showWeatherAlerts = true,
  showTraffic = false,
  showFloodMarkers = true,
  center = [10.796, 106.722], // Ho Chi Minh City center (Bình Thạnh / Thảo Điền)
  zoom = 14,
  height = '100%',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const polygonsLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const radarLayerRef = useRef<L.LayerGroup | null>(null);
  const trafficLayerRef = useRef<L.LayerGroup | null>(null);

  const [mapTileTheme, setMapTileTheme] = useState<'voyager' | 'standard'>('voyager');
  const [legendOpen, setLegendOpen] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false, // We build our custom stylish controls
        attributionControl: false,
      });

      // Carto Voyager tile layer gives clean civic GIS look with light blue waterways
      const tileUrl = mapTileTheme === 'voyager'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Attribution
      L.control.attribution({
        position: 'bottomright',
        prefix: '<span class="text-[10px] text-gray-400">© OpenStreetMap · Bản đồ ngập GIS</span>',
      }).addTo(map);

      // Setup layer groups
      markersLayerRef.current = L.layerGroup().addTo(map);
      polygonsLayerRef.current = L.layerGroup().addTo(map);
      routesLayerRef.current = L.layerGroup().addTo(map);
      radarLayerRef.current = L.layerGroup().addTo(map);
      trafficLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep instance intact during fast renders
    };
  }, []);

  // Sync Center/Zoom if props change drastically
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, zoom, { animate: true });
    }
  }, [center?.[0], center?.[1], zoom]);

  // Handle selected report change: center map smoothly
  useEffect(() => {
    if (mapInstanceRef.current && selectedReport) {
      mapInstanceRef.current.flyTo([selectedReport.lat, selectedReport.lng], 16, {
        duration: 0.8,
      });
    }
  }, [selectedReport]);

  // Handle selected alert change: fly to alert coordinates
  useEffect(() => {
    if (mapInstanceRef.current && selectedAlert) {
      mapInstanceRef.current.flyTo(selectedAlert.coordinates, 15, {
        duration: 0.8,
      });
    }
  }, [selectedAlert]);

  // Render Flood Markers
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return;
    markersLayerRef.current.clearLayers();

    if (!showFloodMarkers) return;

    reports.forEach((report) => {
      const isSelected = selectedReport?.id === report.id;

      // Color based on severity
      let bgColor = '#C52D5A';
      let waveColor = '#FFFFFF';
      let pulseClass = '';

      switch (report.severity) {
        case 'severe':
          bgColor = '#E31B23'; // Severe red
          pulseClass = 'flood-pulse-severe';
          break;
        case 'moderate':
          bgColor = '#F97316'; // Moderate orange
          break;
        case 'light':
          bgColor = '#FBBF24'; // Light yellow
          waveColor = '#78350F';
          break;
        case 'new':
          bgColor = '#1683E2'; // New report blue
          break;
      }

      // Shape: Official = slightly rounded square, Community = circle
      const borderRadius = report.source === 'official' ? '8px' : '9999px';

      const customIconHtml = `
        <div class="relative group cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}" style="width: 32px; height: 32px;">
          <div class="w-8 h-8 flex items-center justify-center text-white shadow-md border-2 border-white ${pulseClass}" style="background-color: ${bgColor}; border-radius: ${borderRadius};">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${waveColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
            </svg>
          </div>
          ${isSelected ? `
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#C52D5A] shadow-sm animate-ping"></div>
          ` : ''}
        </div>
      `;

      const markerIcon = L.divIcon({
        className: 'custom-flood-marker',
        html: customIconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([report.lat, report.lng], { icon: markerIcon });

      // Tooltip on hover
      marker.bindTooltip(
        `<div class="p-1 font-sans">
          <div class="font-bold text-[12px] text-gray-900">${report.street}</div>
          <div class="text-[11px] text-gray-600">${report.depthEstimate} · ${report.timeAgo}</div>
        </div>`,
        { direction: 'top', offset: [0, -14], opacity: 0.95 }
      );

      marker.on('click', () => {
        onSelectReport(report);
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [reports, selectedReport, showFloodMarkers, onSelectReport]);

  // Render Alert Warning Polygons
  useEffect(() => {
    if (!polygonsLayerRef.current) return;
    polygonsLayerRef.current.clearLayers();

    if (!showWeatherAlerts || alerts.length === 0) return;

    alerts.forEach((alert) => {
      const isSelected = selectedAlert?.id === alert.id;
      const color = alert.severity === 'high' ? '#E31B23' : alert.severity === 'medium' ? '#F97316' : '#FBBF24';

      if (alert.polygon && alert.polygon.length > 2) {
        const poly = L.polygon(alert.polygon, {
          color: color,
          weight: isSelected ? 3 : 2,
          opacity: 0.8,
          fillColor: color,
          fillOpacity: isSelected ? 0.35 : 0.18,
          dashArray: isSelected ? undefined : '5, 5',
        });

        poly.bindTooltip(
          `<div class="p-1 font-sans">
            <span class="font-bold text-[12px] text-red-600">${alert.title}</span>
            <div class="text-[11px] text-gray-600">${alert.location}</div>
          </div>`,
          { sticky: true }
        );

        poly.addTo(polygonsLayerRef.current!);
      }
    });
  }, [alerts, selectedAlert, showWeatherAlerts]);

  // Render Routes (for route finder screen)
  useEffect(() => {
    if (!routesLayerRef.current) return;
    routesLayerRef.current.clearLayers();

    if (!routes || routes.length === 0) return;

    routes.forEach((route) => {
      const isActive = route.id === activeRouteId;
      const color = isActive ? '#1683E2' : '#94A3B8';
      const weight = isActive ? 6 : 4;
      const opacity = isActive ? 0.9 : 0.6;

      const polyline = L.polyline(route.waypoints, {
        color,
        weight,
        opacity,
        lineCap: 'round',
        lineJoin: 'round',
      });

      polyline.addTo(routesLayerRef.current!);

      // If active, add start and finish markers
      if (isActive && route.waypoints.length > 1) {
        const startPoint = route.waypoints[0];
        const endPoint = route.waypoints[route.waypoints.length - 1];

        const startIcon = L.divIcon({
          className: 'start-marker',
          html: `<div class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center border-2 border-white shadow">A</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const endIcon = L.divIcon({
          className: 'end-marker',
          html: `<div class="w-6 h-6 rounded-full bg-[#C52D5A] text-white font-bold text-[11px] flex items-center justify-center border-2 border-white shadow">B</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        L.marker(startPoint, { icon: startIcon }).addTo(routesLayerRef.current!);
        L.marker(endPoint, { icon: endIcon }).addTo(routesLayerRef.current!);
      }
    });
  }, [routes, activeRouteId]);

  // Render Rain Radar Overlay
  useEffect(() => {
    if (!radarLayerRef.current) return;
    radarLayerRef.current.clearLayers();

    if (!showRadar) return;

    // Simulate animated rain radar concentric circles over Bình Thạnh and Thủ Đức
    const radarCenter: [number, number] = [10.805, 106.725];

    const circle1 = L.circle(radarCenter, {
      radius: 4200,
      color: '#3B82F6',
      weight: 1,
      fillColor: '#3B82F6',
      fillOpacity: 0.16,
    });

    const circle2 = L.circle(radarCenter, {
      radius: 2500,
      color: '#10B981',
      weight: 1,
      fillColor: '#10B981',
      fillOpacity: 0.22,
    });

    const circle3 = L.circle(radarCenter, {
      radius: 1200,
      color: '#EF4444',
      weight: 1,
      fillColor: '#EF4444',
      fillOpacity: 0.28,
    });

    circle1.addTo(radarLayerRef.current!);
    circle2.addTo(radarLayerRef.current!);
    circle3.addTo(radarLayerRef.current!);
  }, [showRadar]);

  // Render Traffic Overlay
  useEffect(() => {
    if (!trafficLayerRef.current) return;
    trafficLayerRef.current.clearLayers();

    if (!showTraffic) return;

    // Mock congested traffic lines along major avenues
    const trafficLines = [
      { coords: [[10.792, 106.712], [10.802, 106.728]] as [number, number][], color: '#E31B23' }, // Heavy congestion
      { coords: [[10.802, 106.728], [10.815, 106.745]] as [number, number][], color: '#F97316' }, // Medium
      { coords: [[10.785, 106.705], [10.792, 106.712]] as [number, number][], color: '#16A34A' }, // Smooth
    ];

    trafficLines.forEach((tl) => {
      L.polyline(tl.coords, {
        color: tl.color,
        weight: 5,
        opacity: 0.75,
      }).addTo(trafficLayerRef.current!);
    });
  }, [showTraffic]);

  // Controls Handlers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          mapInstanceRef.current?.flyTo([lat, lng], 16);
        },
        () => {
          // Fallback to central Saigon if denied
          mapInstanceRef.current?.flyTo([10.796, 106.722], 15);
        }
      );
    } else {
      mapInstanceRef.current?.flyTo([10.796, 106.722], 15);
    }
  };

  const toggleTileTheme = () => {
    const nextTheme = mapTileTheme === 'voyager' ? 'standard' : 'voyager';
    setMapTileTheme(nextTheme);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });
      const newUrl = nextTheme === 'voyager'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      L.tileLayer(newUrl, { maxZoom: 19 }).addTo(mapInstanceRef.current);
    }
  };

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height }}>
      {/* Leaflet DOM container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Right Controls (crosshair, zoom+, zoom-, layers) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-1.5 shadow-md">
        <button
          onClick={handleLocateMe}
          title="Vị trí của tôi"
          className="w-9 h-9 bg-white text-[#172033] hover:bg-[#F7F9FB] rounded-lg border border-[#E3E8EF] flex items-center justify-center transition-colors shadow-sm"
        >
          <Crosshair className="w-4 h-4 text-[#667085]" />
        </button>

        <div className="bg-white rounded-lg border border-[#E3E8EF] flex flex-col divide-y divide-[#E3E8EF] shadow-sm">
          <button
            onClick={handleZoomIn}
            title="Phóng to"
            className="w-9 h-9 text-[#172033] hover:bg-[#F7F9FB] flex items-center justify-center transition-colors rounded-t-lg"
          >
            <Plus className="w-4 h-4 text-[#667085]" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Thu nhỏ"
            className="w-9 h-9 text-[#172033] hover:bg-[#F7F9FB] flex items-center justify-center transition-colors rounded-b-lg"
          >
            <Minus className="w-4 h-4 text-[#667085]" />
          </button>
        </div>

        <button
          onClick={toggleTileTheme}
          title="Đổi kiểu bản đồ"
          className="w-9 h-9 bg-white text-[#172033] hover:bg-[#F7F9FB] rounded-lg border border-[#E3E8EF] flex items-center justify-center transition-colors shadow-sm"
        >
          <Layers className="w-4 h-4 text-[#667085]" />
        </button>
      </div>

      {/* Floating Map Legend (Bottom-Left) matching screenshot exactly */}
      <div className="absolute bottom-6 left-6 z-20 transition-all">
        {legendOpen ? (
          <div className="bg-white/95 backdrop-blur-sm border border-[#E3E8EF] rounded-xl p-3.5 shadow-lg w-72 text-[12px] text-[#172033]">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E3E8EF]">
              <span className="font-semibold text-[#172033]">Chú giải bản đồ</span>
              <button
                onClick={() => setLegendOpen(false)}
                className="text-[11px] text-[#667085] hover:text-[#172033]"
              >
                Thu gọn
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Mức độ ngập */}
              <div>
                <div className="font-medium text-[#172033] mb-2 text-[11px] uppercase tracking-wide text-gray-500">
                  Mức độ ngập
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31B23] shrink-0" />
                    <span className="text-[11px] text-gray-700">Ngập nặng (&gt; 50 cm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0" />
                    <span className="text-[11px] text-gray-700">Ngập vừa (20 – 50 cm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shrink-0" />
                    <span className="text-[11px] text-gray-700">Ngập nhẹ (5 – 20 cm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1683E2] shrink-0" />
                    <span className="text-[11px] text-gray-700">Báo cáo mới</span>
                  </div>
                </div>
              </div>

              {/* Nguồn dữ liệu */}
              <div>
                <div className="font-medium text-[#172033] mb-2 text-[11px] uppercase tracking-wide text-gray-500">
                  Nguồn dữ liệu
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#C52D5A] shrink-0" />
                    <span className="text-[11px] text-gray-700">Cơ quan chức năng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C52D5A] shrink-0" />
                    <span className="text-[11px] text-gray-700">Báo cáo cộng đồng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rotate-45 bg-[#0D9488] shrink-0" />
                    <span className="text-[11px] text-gray-700">Cảm biến đo đạc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setLegendOpen(true)}
            className="bg-white/95 backdrop-blur-sm border border-[#E3E8EF] px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#172033] shadow-md hover:bg-white"
          >
            Hiện chú giải
          </button>
        )}
      </div>

      {/* Bottom-Right Floating Action Button: "Báo ngập" matching screenshot */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={onOpenReportModal}
          className="h-11 px-5 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[14px] font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Waves className="w-5 h-5 stroke-[2.5]" />
          <span>Báo ngập</span>
        </button>
      </div>
    </div>
  );
};
