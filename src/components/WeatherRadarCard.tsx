import React, { useState } from 'react';
import { CloudRain, Play, Pause, ChevronUp, ChevronDown, Droplets } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherRadarCardProps {
  weatherData: WeatherData;
}

export const WeatherRadarCard: React.FC<WeatherRadarCardProps> = ({ weatherData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Play animation through timeline
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % weatherData.timeline.length);
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, weatherData.timeline.length]);

  const currentPoint = weatherData.timeline[activeStep];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 max-w-md w-[calc(100%-48px)] sm:w-[460px] bg-white/95 backdrop-blur-md border border-[#E3E8EF] rounded-xl shadow-xl overflow-hidden select-none transition-all">
      {/* Header bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-[#E3E8EF]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1683E2] flex items-center justify-center">
            <CloudRain className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[12px] font-bold text-[#172033]">
              Dự báo mưa trong 2 giờ tới
            </span>
            <span className="text-[10px] text-[#667085] ml-2 hidden sm:inline">
              {weatherData.area}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-[#667085] hover:text-[#172033] rounded hover:bg-gray-100"
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-3.5 space-y-3">
          {/* Quick status */}
          <div className="flex items-center justify-between bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-[#1683E2]" />
              <div>
                <div className="text-[12px] font-bold text-[#1e40af]">
                  {currentPoint.status} ({currentPoint.rainfallMm} mm/h)
                </div>
                <div className="text-[10px] text-blue-700">
                  Giai đoạn: <strong>{currentPoint.time}</strong>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] font-medium text-blue-900">
              Vũ lượng: <span className="font-bold">{weatherData.rateRange}</span>
            </div>
          </div>

          {/* Timeline points slider / buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-lg bg-[#C52D5A] hover:bg-[#AA244B] text-white flex items-center justify-center shrink-0 shadow-sm transition-colors"
              title={isPlaying ? 'Tạm dừng' : 'Phát diễn biến'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {weatherData.timeline.map((point, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`py-1.5 px-1 rounded-md text-[11px] font-medium transition-all text-center flex flex-col items-center ${
                      isActive
                        ? 'bg-[#1683E2] text-white shadow-sm ring-1 ring-blue-300'
                        : 'bg-[#F7F9FB] hover:bg-[#EEF2F6] text-[#667085]'
                    }`}
                  >
                    <span>{point.time}</span>
                    <span className="text-[9px] opacity-85 font-mono">{point.rainfallMm}mm</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
