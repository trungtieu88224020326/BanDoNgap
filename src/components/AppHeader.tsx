import React, { useState } from 'react';
import { 
  Waves, 
  MapPin, 
  User, 
  ChevronDown, 
  Bell, 
  Plus, 
  Menu, 
  X,
  Compass,
  FileText,
  BarChart2,
  Info
} from 'lucide-react';

interface AppHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenReportModal: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenReportModal,
  selectedCity,
  onCityChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const navItems = [
    { id: 'map', label: 'Bản đồ', icon: Waves },
    { id: 'reports', label: 'Danh sách', icon: FileText },
    { id: 'alerts', label: 'Cảnh báo', icon: Bell },
    { id: 'route', label: 'Tìm đường', icon: Compass },
    { id: 'data', label: 'Dữ liệu', icon: BarChart2 },
    { id: 'about', label: 'Giới thiệu', icon: Info },
  ];

  const cities = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'];

  return (
    <header className="h-16 bg-white border-b border-[#E3E8EF] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40 select-none shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left: Brand Logo & Navigation */}
      <div className="flex items-center gap-6 lg:gap-8 h-full">
        <button 
          onClick={() => onSelectTab('map')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          {/* Logo icon matching reference: Burgundy rounded badge with wave symbol */}
          <div className="w-9 h-9 rounded-lg bg-[#C52D5A] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Waves className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[19px] text-[#172033] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                Bản đồ ngập
              </span>
            </div>
            <p className="text-[10px] text-[#667085] leading-none hidden xl:block">
              An toàn mỗi hành trình
            </p>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative h-full px-3.5 flex items-center text-[14px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#C52D5A] font-semibold'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C52D5A] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: City Selector, Action Button, Avatar */}
      <div className="flex items-center gap-3">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="h-9 px-3 flex items-center gap-1.5 text-[13px] font-medium text-[#172033] bg-[#F7F9FB] hover:bg-[#EEF2F6] border border-[#E3E8EF] rounded-lg transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C52D5A]" />
            <span className="hidden sm:inline">{selectedCity}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-[#E3E8EF] rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onCityChange(city);
                    setCityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#F7F9FB] flex items-center justify-between ${
                    selectedCity === city ? 'text-[#C52D5A] font-semibold bg-[#FDF2F4]' : 'text-[#172033]'
                  }`}
                >
                  {city}
                  {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-[#C52D5A]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Primary Report Button */}
        <button
          onClick={onOpenReportModal}
          className="h-9 px-3.5 bg-[#C52D5A] hover:bg-[#AA244B] text-white text-[13px] font-medium rounded-lg flex items-center gap-1.5 shadow-sm transition-colors active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Báo ngập</span>
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full border border-[#E3E8EF] bg-[#F7F9FB] flex items-center justify-center text-[#667085] hover:text-[#172033] hover:border-[#CBD5E1] cursor-pointer transition-colors">
          <User className="w-4 h-4" />
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#667085] hover:text-[#172033] rounded-lg focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 p-4 border-t border-[#E3E8EF] flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium ${
                    isActive ? 'bg-[#FDF2F4] text-[#C52D5A] font-semibold' : 'text-[#172033] hover:bg-[#F7F9FB]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#C52D5A]' : 'text-[#667085]'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E3E8EF]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReportModal();
              }}
              className="w-full h-11 bg-[#C52D5A] text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Gửi báo cáo điểm ngập mới
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
