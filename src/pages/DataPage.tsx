import React, { useState } from 'react';
import { 
  BarChart2, 
  CloudRain, 
  Droplets, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Users, 
  AlertTriangle,
  ArrowUpRight,
  Gauge
} from 'lucide-react';

export const DataPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6h' | '12h' | '24h' | '7d'>('24h');

  // Chart data according to timeRange
  const rainfallHours = [
    { hour: '10:00', mm: 5, floodSpots: 3 },
    { hour: '11:00', mm: 12, floodSpots: 5 },
    { hour: '12:00', mm: 28, floodSpots: 9 },
    { hour: '13:00', mm: 45, floodSpots: 16 },
    { hour: '14:00', mm: 58, floodSpots: 24 },
    { hour: '15:00', mm: 35, floodSpots: 21 },
    { hour: '16:00', mm: 18, floodSpots: 15 },
  ];

  const stationsData = [
    { name: 'Trạm Phú An (Sông Sài Gòn)', level: 1.68, alarm3: 1.60, status: 'Vượt báo động 3 (+8cm)', warning: true },
    { name: 'Trạm Nhà Bè (Kênh Đồng Điền)', level: 1.65, alarm3: 1.60, status: 'Vượt báo động 3 (+5cm)', warning: true },
    { name: 'Trạm Bình Triệu (Sông Sài Gòn)', level: 1.54, alarm3: 1.60, status: 'Báo động 2 (1.50m)', warning: false },
    { name: 'Trạm Rạch Đĩa (Quận 7)', level: 1.52, alarm3: 1.60, status: 'Báo động 2', warning: false },
  ];

  const districtRanks = [
    { name: 'Bình Thạnh', spots: 8, pct: 33 },
    { name: 'TP. Thủ Đức', spots: 7, pct: 29 },
    { name: 'Quận 7', spots: 4, pct: 16 },
    { name: 'Quận 12', spots: 3, pct: 13 },
    { name: 'Tân Bình', spots: 2, pct: 9 },
  ];

  return (
    <div className="w-full h-full bg-[#F7F9FB] overflow-y-auto p-4 sm:p-6 lg:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#C52D5A] text-white flex items-center justify-center">
                <BarChart2 className="w-4 h-4" />
              </div>
              <h1 className="text-[22px] font-bold text-[#172033] tracking-tight">
                Trung tâm Dữ liệu Thủy văn & Ngập úng
              </h1>
            </div>
            <p className="text-[13px] text-[#667085]">
              Tổng hợp và trực quan hóa dữ liệu quan trắc khí tượng, triều cường và phản ánh thời gian thực tại TP.HCM
            </p>
          </div>

          {/* Time range filters */}
          <div className="flex items-center bg-white border border-[#E3E8EF] p-1 rounded-lg text-[12px] shadow-2xs">
            {[
              { id: '6h', label: '6 giờ qua' },
              { id: '12h', label: '12 giờ qua' },
              { id: '24h', label: '24 giờ qua' },
              { id: '7d', label: '7 ngày qua' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setTimeRange(btn.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  timeRange === btn.id
                    ? 'bg-[#C52D5A] text-white font-semibold'
                    : 'text-[#667085] hover:text-[#172033]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Key Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="flex items-center justify-between text-[#667085] text-[12px]">
              <span>Tổng lượng mưa tích lũy</span>
              <CloudRain className="w-4 h-4 text-[#1683E2]" />
            </div>
            <div className="text-[26px] font-bold text-[#172033] mt-2">
              68.5 <span className="text-[14px] font-normal text-gray-500">mm</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Tăng 22% so với hôm qua
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="flex items-center justify-between text-[#667085] text-[12px]">
              <span>Đỉnh triều cường trạm Phú An</span>
              <Droplets className="w-4 h-4 text-[#E31B23]" />
            </div>
            <div className="text-[26px] font-bold text-[#E31B23] mt-2">
              1.68 <span className="text-[14px] font-normal text-gray-500">m</span>
            </div>
            <div className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
              Vượt mức báo động 3 (1.60m)
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="flex items-center justify-between text-[#667085] text-[12px]">
              <span>Điểm ngập được ghi nhận</span>
              <AlertTriangle className="w-4 h-4 text-[#F97316]" />
            </div>
            <div className="text-[26px] font-bold text-[#F97316] mt-2">
              24 <span className="text-[14px] font-normal text-gray-500">vị trí</span>
            </div>
            <div className="text-[11px] text-[#667085] mt-1">
              Đang rút: 6 điểm · Ngập sâu: 7 điểm
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="flex items-center justify-between text-[#667085] text-[12px]">
              <span>Phản ánh từ cộng đồng</span>
              <Users className="w-4 h-4 text-[#1683E2]" />
            </div>
            <div className="text-[26px] font-bold text-[#1683E2] mt-2">
              142 <span className="text-[14px] font-normal text-gray-500">báo cáo</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              Tỷ lệ xác minh chính xác: 94.2%
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart: Lượng mưa & Số điểm ngập theo giờ */}
          <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#172033]">
                  Diễn biến lượng mưa & Số điểm ngập phát sinh
                </h3>
                <p className="text-[12px] text-[#667085]">
                  Tương quan giữa vũ lượng mưa (mm) và số điểm ngập được ghi nhận
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#1683E2]" />
                  <span>Vũ lượng (mm)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#C52D5A]" />
                  <span>Điểm ngập</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive SVG/CSS Bar Graph */}
            <div className="h-64 flex items-end gap-3 pt-6 border-b border-[#E3E8EF] px-2">
              {rainfallHours.map((item, idx) => {
                const maxMm = 65;
                const rainHeightPct = Math.round((item.mm / maxMm) * 100);
                const floodHeightPct = Math.round((item.floodSpots / 25) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-mono">
                      {item.mm}mm / {item.floodSpots} điểm
                    </div>
                    <div className="w-full flex items-end justify-center gap-1.5 h-48">
                      {/* Rain Bar */}
                      <div
                        style={{ height: `${rainHeightPct}%` }}
                        className="w-1/2 max-w-[20px] bg-[#1683E2]/80 hover:bg-[#1683E2] rounded-t-sm transition-all relative"
                      />
                      {/* Flood Bar */}
                      <div
                        style={{ height: `${floodHeightPct}%` }}
                        className="w-1/2 max-w-[20px] bg-[#C52D5A]/80 hover:bg-[#C52D5A] rounded-t-sm transition-all"
                      />
                    </div>
                    <div className="text-[11px] text-[#667085] mt-2 font-mono">
                      {item.hour}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[11px] text-[#667085] mt-3 italic text-right">
              Đỉnh mưa cực đại ghi nhận vào lúc 14:00 (58 mm/h)
            </div>
          </div>

          {/* Leaderboard: Quận bị ảnh hưởng nhiều nhất */}
          <div className="bg-white p-5 rounded-xl border border-[#E3E8EF] shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-[#172033] mb-1">
                Khu vực trọng điểm ngập
              </h3>
              <p className="text-[12px] text-[#667085] mb-4">
                Phân bố số điểm ngập theo địa bàn
              </p>

              <div className="space-y-3.5">
                {districtRanks.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-gray-800">
                        {idx + 1}. {d.name}
                      </span>
                      <span className="text-[12px] text-gray-500 font-mono">
                        {d.spots} điểm ({d.pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${d.pct}%` }}
                        className={`h-full rounded-full ${
                          idx === 0
                            ? 'bg-[#E31B23]'
                            : idx === 1
                            ? 'bg-[#F97316]'
                            : 'bg-[#C52D5A]'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3E8EF] mt-4 text-[11px] text-gray-500">
              * Dữ liệu được hiệu chuẩn từ trạm đo tự động SCADA và cộng đồng.
            </div>
          </div>
        </div>

        {/* Mực nước trạm quan trắc thủy văn */}
        <div className="bg-white p-5 rounded-xl border border-[#E3E8EF] shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#172033]">
                Mực nước tại các trạm quan trắc thủy văn chính
              </h3>
              <p className="text-[12px] text-[#667085]">
                Dữ liệu triều dâng so với các mốc báo động lũ quy chuẩn
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-medium border border-rose-200">
                Báo động 3: 1.60 m
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stationsData.map((st, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-lg border ${
                  st.warning
                    ? 'border-rose-200 bg-rose-50/30'
                    : 'border-[#E3E8EF] bg-[#F7F9FB]'
                }`}
              >
                <div className="text-[12px] font-semibold text-gray-800 truncate mb-1">
                  {st.name}
                </div>
                <div className="text-[22px] font-bold text-[#172033] font-mono">
                  {st.level.toFixed(2)} <span className="text-[13px] font-normal text-gray-500">m</span>
                </div>
                <div className={`text-[11px] font-medium mt-1 ${st.warning ? 'text-[#E31B23]' : 'text-emerald-700'}`}>
                  {st.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
