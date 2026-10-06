export type FloodSeverity = 'severe' | 'moderate' | 'light' | 'new' | 'none';

export type ReportSource = 'community' | 'official' | 'sensor' | 'media' | 'inference';

export interface FloodReport {
  id: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  severity: FloodSeverity;
  depthEstimate: string; // e.g. "50 – 70 cm"
  timestamp: string; // e.g. "15:24 · 12/10/2024"
  timeAgo: string; // e.g. "5 phút trước"
  confirmationsCount: number;
  isConfirmedByUser?: boolean;
  isBookmarked?: boolean;
  source: ReportSource;
  lat: number;
  lng: number;
  description: string;
  images: string[];
  status?: string; // e.g. "Đang ngập", "Nước đang rút"
  reportedBy?: string;
}

export type AlertType = 'all' | 'flood' | 'rain' | 'traffic' | 'tide';
export type AlertSeverity = 'high' | 'medium' | 'low';

export interface FloodAlert {
  id: string;
  title: string;
  location: string;
  district: string;
  time: string;
  severity: AlertSeverity;
  type: AlertType;
  description: string;
  coordinates: [number, number];
  polygon: [number, number][];
  affectedRoads: string[];
}

export interface WeatherTimelinePoint {
  time: string;
  rainfallMm: number;
  status: string;
}

export interface WeatherData {
  summary: string;
  rateRange: string;
  area: string;
  updatedAt: string;
  timeline: WeatherTimelinePoint[];
}

export type TransportMode = 'car' | 'bike' | 'walk';

export interface RouteOption {
  id: string;
  name: string;
  via: string;
  durationMinutes: number;
  distanceKm: number;
  avoidFloodedSpots: number;
  isRecommended: boolean;
  waypoints: [number, number][];
  summary: string;
  warnings?: string[];
}
