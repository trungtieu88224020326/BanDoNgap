import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MapComponent } from '../components/MapComponent';
import { FloodDetailCard } from '../components/FloodDetailCard';
import { WeatherRadarCard } from '../components/WeatherRadarCard';
import { FloodReport, FloodAlert, WeatherData } from '../types';

interface MapPageProps {
  reports: FloodReport[];
  alerts: FloodAlert[];
  weatherData: WeatherData;
  selectedReport: FloodReport | null;
  onSelectReport: (report: FloodReport | null) => void;
  onOpenReportModal: () => void;
  onNavigateToTab: (tab: string, extra?: any) => void;
  onToggleConfirm: (reportId: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({
  reports,
  alerts,
  weatherData,
  selectedReport,
  onSelectReport,
  onOpenReportModal,
  onNavigateToTab,
  onToggleConfirm,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Layer toggles
  const [layers, setLayers] = useState({
    flood: true,
    radar: false,
    weatherAlerts: true,
    traffic: false,
  });

  const handleToggleLayer = (key: 'flood' | 'radar' | 'weatherAlerts' | 'traffic') => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-full flex overflow-hidden">
      {/* Left Sidebar (390px) */}
      <Sidebar
        reports={reports}
        selectedReport={selectedReport}
        onSelectReport={onSelectReport}
        onNavigateToReports={() => onNavigateToTab('reports')}
        onNavigateToRoute={() => onNavigateToTab('route')}
        onOpenReportModal={onOpenReportModal}
        onNavigateToData={() => onNavigateToTab('data')}
        layers={layers}
        onToggleLayer={handleToggleLayer}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Map Viewport */}
      <main className="relative flex-1 h-full overflow-hidden">
        <MapComponent
          reports={reports}
          selectedReport={selectedReport}
          onSelectReport={onSelectReport}
          onOpenReportModal={onOpenReportModal}
          alerts={alerts}
          showRadar={layers.radar}
          showWeatherAlerts={layers.weatherAlerts}
          showTraffic={layers.traffic}
          showFloodMarkers={layers.flood}
          height="100%"
        />

        {/* Floating Detail Card when a report is selected */}
        {selectedReport && (
          <FloodDetailCard
            report={selectedReport}
            onClose={() => onSelectReport(null)}
            onNavigateToRoute={(destination) => onNavigateToTab('route', { destination })}
            onOpenReportUpdate={() => onOpenReportModal()}
            onToggleConfirm={onToggleConfirm}
          />
        )}

        {/* Weather Forecast & Rain Radar timeline widget (Section 5 bottom card) */}
        <WeatherRadarCard weatherData={weatherData} />
      </main>
    </div>
  );
};
