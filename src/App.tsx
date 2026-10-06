/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { MapPage } from './pages/MapPage';
import { ReportsPage } from './pages/ReportsPage';
import { AlertsPage } from './pages/AlertsPage';
import { RoutePage } from './pages/RoutePage';
import { DataPage } from './pages/DataPage';
import { AboutPage } from './pages/AboutPage';
import { ReportModal } from './components/ReportModal';
import { INITIAL_FLOOD_REPORTS, MOCK_ALERTS, MOCK_WEATHER_DATA } from './data/mockData';
import { FloodReport, FloodAlert } from './types';
import { 
  Waves, 
  FileText, 
  Bell, 
  Compass, 
  BarChart2, 
  Info 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [reports, setReports] = useState<FloodReport[]>(INITIAL_FLOOD_REPORTS);
  const [alerts, setAlerts] = useState<FloodAlert[]>(MOCK_ALERTS);
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<FloodAlert | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('TP. Hồ Chí Minh');
  const [routeDestination, setRouteDestination] = useState<string>('Thảo Điền, TP. Thủ Đức');

  // Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalPrefill, setReportModalPrefill] = useState<FloodReport | null>(null);

  // Confirmation upvote handler
  const handleToggleConfirm = (reportId: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const isConfirmed = rep.isConfirmedByUser;
          return {
            ...rep,
            isConfirmedByUser: !isConfirmed,
            confirmationsCount: isConfirmed
              ? Math.max(1, rep.confirmationsCount - 1)
              : rep.confirmationsCount + 1,
          };
        }
        return rep;
      })
    );

    // Update selectedReport state if currently open
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              isConfirmedByUser: !prev.isConfirmedByUser,
              confirmationsCount: prev.isConfirmedByUser
                ? Math.max(1, prev.confirmationsCount - 1)
                : prev.confirmationsCount + 1,
            }
          : null
      );
    }
  };

  // Add new report submitted from modal
  const handleAddNewReport = (newReport: FloodReport) => {
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
  };

  const handleOpenReportModal = (existingReport?: FloodReport | null) => {
    setReportModalPrefill(existingReport || null);
    setIsReportModalOpen(true);
  };

  const handleNavigateToTab = (tab: string, extra?: any) => {
    setActiveTab(tab);
    if (extra?.destination) {
      setRouteDestination(extra.destination);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#F7F9FB] text-[#172033] overflow-hidden select-none">
      {/* 1. Global Reusable App Header (64px) */}
      <AppHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenReportModal={() => handleOpenReportModal(null)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />

      {/* 2. Main Content Viewport (calc(100vh - 64px)) */}
      <main className="flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
        {activeTab === 'map' && (
          <MapPage
            reports={reports}
            alerts={alerts}
            weatherData={MOCK_WEATHER_DATA}
            selectedReport={selectedReport}
            onSelectReport={setSelectedReport}
            onOpenReportModal={() => handleOpenReportModal(null)}
            onNavigateToTab={handleNavigateToTab}
            onToggleConfirm={handleToggleConfirm}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsPage
            reports={reports}
            selectedReport={selectedReport}
            onSelectReport={setSelectedReport}
            onOpenReportModal={() => handleOpenReportModal(null)}
            onNavigateToRoute={(destination) => handleNavigateToTab('route', { destination })}
            onToggleConfirm={handleToggleConfirm}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsPage
            alerts={alerts}
            selectedAlert={selectedAlert}
            onSelectAlert={setSelectedAlert}
            onOpenReportModal={() => handleOpenReportModal(null)}
            onNavigateToRoute={(destination) => handleNavigateToTab('route', { destination })}
          />
        )}

        {activeTab === 'route' && (
          <RoutePage
            initialDestination={routeDestination}
            reports={reports}
            onOpenReportModal={() => handleOpenReportModal(null)}
          />
        )}

        {activeTab === 'data' && <DataPage />}

        {activeTab === 'about' && (
          <AboutPage
            onNavigateToMap={() => setActiveTab('map')}
            onOpenReportModal={() => handleOpenReportModal(null)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation (Visible on mobile viewports < 768px) */}
      <nav className="md:hidden h-14 bg-white border-t border-[#E3E8EF] flex items-center justify-around px-2 z-40 shrink-0">
        {[
          { id: 'map', label: 'Bản đồ', icon: Waves },
          { id: 'reports', label: 'Danh sách', icon: FileText },
          { id: 'alerts', label: 'Cảnh báo', icon: Bell },
          { id: 'route', label: 'Tìm đường', icon: Compass },
          { id: 'data', label: 'Dữ liệu', icon: BarChart2 },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-[#C52D5A] font-semibold' : 'text-[#667085]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Interactive 4-Step Report Flood Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitSuccess={handleAddNewReport}
        initialReport={reportModalPrefill}
      />
    </div>
  );
}
