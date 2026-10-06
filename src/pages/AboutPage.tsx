import React from 'react';
import { 
  Waves, 
  ShieldCheck, 
  Users, 
  Radio, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle, 
  Heart,
  Smartphone,
  Navigation
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToMap: () => void;
  onOpenReportModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToMap,
  onOpenReportModal,
}) => {
  return (
    <div className="w-full h-full bg-[#F7F9FB] overflow-y-auto select-none">
      {/* Hero Banner */}
      <section className="bg-white border-b border-[#E3E8EF] py-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDF2F4] text-[#C52D5A] border border-[#FBCFE8] rounded-full text-[12px] font-semibold mb-4">
            <Waves className="w-4 h-4" />
            Civic-Tech Platform · Đô thị thông minh TP.HCM
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
            Bản đồ ngập – Đô thị TP. Hồ Chí Minh
          </h1>
          <p className="text-lg sm:text-xl text-[#C52D5A] font-semibold mt-2">
            An toàn mỗi hành trình
          </p>

          <p className="text-[15px] text-[#667085] max-w-2xl mx-auto mt-4 leading-relaxed">
            Nền tảng mở theo dõi, cảnh báo và điều hướng tránh ngập thời gian thực tại TP. Hồ Chí Minh. 
            Kết hợp cảm biến quan trắc thủy văn, dữ liệu radar khí tượng và sức mạnh kiểm chứng từ hàng ngàn người dân đi đường.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={onNavigateToMap}
              className="h-11 px-6 bg-[#C52D5A] hover:bg-[#AA244B] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Khám phá bản đồ ngập</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenReportModal}
              className="h-11 px-5 bg-white hover:bg-gray-50 border border-[#E3E8EF] text-[#172033] font-medium rounded-lg shadow-2xs transition-colors"
            >
              Gửi phản ánh điểm ngập
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section className="py-12 px-6 lg:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#FDF2F4] text-[#C52D5A] flex items-center justify-center mb-4">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-[17px] font-bold text-[#172033] mb-2">
              Dữ liệu đa nguồn
            </h3>
            <p className="text-[13px] text-[#667085] leading-relaxed">
              Tích hợp cảm biến SCADA, số liệu từ Trung tâm Quản lý Hạ tầng Kỹ thuật (Sở Xây dựng) và các trạm khí tượng thủy văn khu vực Nam Bộ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1683E2] flex items-center justify-center mb-4">
              <Navigation className="w-5 h-5" />
            </div>
            <h3 className="text-[17px] font-bold text-[#172033] mb-2">
              Điều hướng an toàn
            </h3>
            <p className="text-[13px] text-[#667085] leading-relaxed">
              Hệ thống thuật toán định tuyến tự động né tránh các cung đường ngập sâu trên 20cm, giúp người dân bảo vệ xe cộ và tiết kiệm thời gian.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E3E8EF] shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-[17px] font-bold text-[#172033] mb-2">
              Sức mạnh cộng đồng
            </h3>
            <p className="text-[13px] text-[#667085] leading-relaxed">
              Người đi đường dễ dàng gửi ảnh chụp hiện trường, ước tính mực nước và bấm xác nhận để chia sẻ cho mọi người trong bán kính di chuyển.
            </p>
          </div>
        </div>
      </section>

      {/* Guide & Civic FAQ */}
      <section className="py-8 px-6 lg:px-12 max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-[#E3E8EF] p-6 sm:p-8 shadow-2xs">
          <h2 className="text-[20px] font-bold text-[#172033] mb-4">
            Quy chuẩn phân cấp mức độ ngập
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200">
              <div className="font-bold text-[#E31B23] text-[15px] mb-1">
                Ngập nặng (&gt; 50 cm)
              </div>
              <p className="text-gray-700">
                Nước ngập qua ống bô xe máy, tràn vào nhà dân. Xe máy tuyệt đối không nên cố di chuyển; ô tô gầm thấp có nguy cơ thủy kích.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="font-bold text-[#F97316] text-[15px] mb-1">
                Ngập vừa (20 – 50 cm)
              </div>
              <p className="text-gray-700">
                Nước ngập lút nửa bánh xe máy. Di chuyển rất chậm chạp, sóng nước có thể làm tắt máy xe nếu đi sát xe tải.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="font-bold text-[#D97706] text-[15px] mb-1">
                Ngập nhẹ (5 – 20 cm)
              </div>
              <p className="text-gray-700">
                Nước dâng mép vỉa hè hoặc đọng vũng cục bộ. Phương tiện đi lại được bình thường nhưng nên giảm tốc độ tránh văng nước.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center py-6 text-[12px] text-gray-500 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 font-medium text-gray-700">
            <span>Dự án phi lợi nhuận phục vụ cộng đồng dân cư TP. Hồ Chí Minh</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
          <div>Bản quyền dữ liệu © 2024–2026 Bản đồ ngập GIS · Mọi quyền được bảo lưu</div>
        </div>
      </section>
    </div>
  );
};
