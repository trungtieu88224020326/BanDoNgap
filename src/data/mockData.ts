import { FloodReport, FloodAlert, WeatherData, RouteOption } from '../types';

export const INITIAL_FLOOD_REPORTS: FloodReport[] = [
  {
    id: 'rep-01',
    street: 'Đường Nguyễn Hữu Cảnh',
    ward: 'Phường 22',
    district: 'Quận Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    severity: 'severe',
    depthEstimate: '50 – 70 cm',
    timestamp: '15:24 · 12/10/2024',
    timeAgo: '5 phút trước',
    confirmationsCount: 8,
    isConfirmedByUser: false,
    source: 'community',
    lat: 10.7925,
    lng: 106.7190,
    status: 'Ngập nặng',
    description: 'Nước ngập sâu qua trục chân cầu Thủ Thiêm kéo dài đến cầu vượt Nguyễn Hữu Cảnh. Nhiều xe máy bị chết máy dắt bộ, ô tô gầm thấp không thể qua.',
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'rep-02',
    street: 'Đường Điện Biên Phủ',
    ward: 'Phường 17',
    district: 'Quận Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    severity: 'moderate',
    depthEstimate: '30 – 45 cm',
    timestamp: '15:17 · 12/10/2024',
    timeAgo: '12 phút trước',
    confirmationsCount: 5,
    isConfirmedByUser: false,
    source: 'official',
    lat: 10.7998,
    lng: 106.7112,
    status: 'Ngập vừa',
    description: 'Khu vực nút giao Hàng Xanh hướng về cầu Sài Gòn bị đọng nước cục bộ ở hai làn xe máy. Xe di chuyển chậm, ùn ứ nhẹ.',
    images: [
      'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'rep-03',
    street: 'Đường Quốc lộ 13',
    ward: 'Hiệp Bình Phước',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    severity: 'new',
    depthEstimate: '20 – 35 cm',
    timestamp: '15:14 · 12/10/2024',
    timeAgo: '15 phút trước',
    confirmationsCount: 3,
    isConfirmedByUser: false,
    source: 'community',
    lat: 10.8285,
    lng: 106.7128,
    status: 'Báo cáo mới',
    description: 'Đoạn gần cầu Ông Dầu đang bắt đầu ngập mép vỉa hè do mưa to kết hợp triều cường sông Sài Gòn dâng nhanh.',
    images: [
      'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-04',
    street: 'Đường Bùi Hữu Nghĩa',
    ward: 'Phường 2',
    district: 'Quận Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    severity: 'moderate',
    depthEstimate: '25 – 40 cm',
    timestamp: '15:11 · 12/10/2024',
    timeAgo: '18 phút trước',
    confirmationsCount: 6,
    isConfirmedByUser: false,
    source: 'sensor',
    lat: 10.8032,
    lng: 106.6995,
    status: 'Ngập vừa',
    description: 'Cảm biến quan trắc thủy văn ghi nhận mực nước dâng 38cm tại cống thoát nước số 4 gần chợ Bà Chiểu.',
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-05',
    street: 'Đường Lê Văn Sỹ',
    ward: 'Phường 1',
    district: 'Quận Tân Bình',
    city: 'TP. Hồ Chí Minh',
    severity: 'new',
    depthEstimate: '15 – 25 cm',
    timestamp: '15:04 · 12/10/2024',
    timeAgo: '25 phút trước',
    confirmationsCount: 2,
    isConfirmedByUser: false,
    source: 'community',
    lat: 10.7912,
    lng: 106.6715,
    status: 'Báo cáo mới',
    description: 'Khu vực gần cầu Lê Văn Sỹ nước tràn lên mép đường, các phương tiện vẫn qua lại được với tốc độ chậm.',
    images: [
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-06',
    street: 'Đường Thảo Điền',
    ward: 'Phường Thảo Điền',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    severity: 'severe',
    depthEstimate: '55 – 65 cm',
    timestamp: '15:02 · 12/10/2024',
    timeAgo: '27 phút trước',
    confirmationsCount: 11,
    isConfirmedByUser: false,
    source: 'official',
    lat: 10.8045,
    lng: 106.7360,
    status: 'Ngập nặng',
    description: 'Đoạn từ ngã ba Quốc Hương đến trường Quốc tế ngập sâu lút bánh xe máy. Lực lượng cứu hộ đã giăng dây cảnh báo.',
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'rep-07',
    street: 'Đường Trần Não',
    ward: 'Phường An Khánh',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    severity: 'moderate',
    depthEstimate: '20 – 35 cm',
    timestamp: '14:55 · 12/10/2024',
    timeAgo: '34 phút trước',
    confirmationsCount: 4,
    isConfirmedByUser: false,
    source: 'sensor',
    lat: 10.7935,
    lng: 106.7320,
    status: 'Ngập vừa',
    description: 'Nước ngập cục bộ tại một số hẻm giao với đường Trần Não do triều cường rạch Cá Trê.',
    images: [
      'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-08',
    street: 'Đường Tô Ngọc Vân',
    ward: 'Linh Tây',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    severity: 'severe',
    depthEstimate: '60 – 80 cm',
    timestamp: '14:48 · 12/10/2024',
    timeAgo: '41 phút trước',
    confirmationsCount: 14,
    isConfirmedByUser: false,
    source: 'media',
    lat: 10.8560,
    lng: 106.7620,
    status: 'Ngập nặng',
    description: 'Khu vực trũng rào chắn đường ray xe lửa bị ngập nặng, nước chảy xiết nguy hiểm. Khuyến cáo không đi qua đây.',
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-09',
    street: 'Đường Huỳnh Tấn Phát',
    ward: 'Tân Phú',
    district: 'Quận 7',
    city: 'TP. Hồ Chí Minh',
    severity: 'moderate',
    depthEstimate: '30 – 50 cm',
    timestamp: '14:40 · 12/10/2024',
    timeAgo: '49 phút trước',
    confirmationsCount: 9,
    isConfirmedByUser: false,
    source: 'inference',
    lat: 10.7410,
    lng: 106.7340,
    status: 'Ngập vừa',
    description: 'Mô hình suy luận thủy văn kết hợp dữ liệu triều trạm Phú An dự báo đỉnh triều 1.68m gây ngập đoạn từ cầu Phú Xuân đến ngã tư Hoàng Quốc Việt.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-10',
    street: 'Đường Nguyễn Văn Quá',
    ward: 'Đông Hưng Thuận',
    district: 'Quận 12',
    city: 'TP. Hồ Chí Minh',
    severity: 'light',
    depthEstimate: '10 – 20 cm',
    timestamp: '14:30 · 12/10/2024',
    timeAgo: '59 phút trước',
    confirmationsCount: 4,
    isConfirmedByUser: false,
    source: 'community',
    lat: 10.8420,
    lng: 106.6280,
    status: 'Ngập nhẹ',
    description: 'Nước mưa đọng cục bộ dài 200m gần chợ Cầu, phương tiện đi lại bình thường.',
    images: [
      'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-11',
    street: 'Đường Phạm Văn Đồng',
    ward: 'Hiệp Bình Chánh',
    district: 'TP. Thủ Đức',
    city: 'TP. Hồ Chí Minh',
    severity: 'light',
    depthEstimate: '10 – 15 cm',
    timestamp: '14:20 · 12/10/2024',
    timeAgo: '1 giờ trước',
    confirmationsCount: 2,
    isConfirmedByUser: false,
    source: 'sensor',
    lat: 10.8240,
    lng: 106.7210,
    status: 'Ngập nhẹ',
    description: 'Làn xe máy chân cầu Bình Lợi đọng nước nhẹ, không gây ách tắc giao thông.',
    images: [
      'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rep-12',
    street: 'Đường Ung Văn Khiêm',
    ward: 'Phường 25',
    district: 'Quận Bình Thạnh',
    city: 'TP. Hồ Chí Minh',
    severity: 'moderate',
    depthEstimate: '25 – 45 cm',
    timestamp: '14:15 · 12/10/2024',
    timeAgo: '1 giờ trước',
    confirmationsCount: 7,
    isConfirmedByUser: false,
    source: 'community',
    lat: 10.8062,
    lng: 106.7165,
    status: 'Ngập vừa',
    description: 'Đoạn gần ngã ba D2 và bến xe buýt ngập nửa bánh xe, nước tràn vào hiên một số hộ kinh doanh ven đường.',
    images: [
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const MOCK_ALERTS: FloodAlert[] = [
  {
    id: 'alt-01',
    title: 'Cảnh báo ngập sâu – Quận Bình Thạnh',
    location: 'Trục Nguyễn Hữu Cảnh & Ung Văn Khiêm',
    district: 'Quận Bình Thạnh',
    time: '15:20 · Hôm nay',
    severity: 'high',
    type: 'flood',
    description: 'Mưa lớn vũ lượng 58mm kết hợp triều dâng gây ngập diện rộng từ 50-70cm tại Phường 22 và Phường 25. Cảnh báo phương tiện gầm thấp không di chuyển vào khu vực.',
    coordinates: [10.797, 106.718],
    polygon: [
      [10.803, 106.712],
      [10.805, 106.722],
      [10.792, 106.724],
      [10.790, 106.714]
    ],
    affectedRoads: ['Nguyễn Hữu Cảnh', 'Ung Văn Khiêm', 'Nguyễn Gia Trí', 'Bạch Đằng']
  },
  {
    id: 'alt-02',
    title: 'Mưa lớn cực đoan – Khu vực TP. Thủ Đức',
    location: 'Phường Thảo Điền & Hiệp Bình Chánh',
    district: 'TP. Thủ Đức',
    time: '15:05 · Hôm nay',
    severity: 'high',
    type: 'rain',
    description: 'Mây đối lưu phát triển mạnh gây mưa rào kèm dông sét và gió giật cấp 6. Lượng mưa ước tính 45-65mm trong 45 phút tới.',
    coordinates: [10.812, 106.738],
    polygon: [
      [10.820, 106.728],
      [10.825, 106.748],
      [10.800, 106.755],
      [10.798, 106.732]
    ],
    affectedRoads: ['Thảo Điền', 'Quốc Hương', 'Xuân Thủy', 'Lương Định Của']
  },
  {
    id: 'alt-03',
    title: 'Nguy cơ ngập triều cường – Quận 7',
    location: 'Tuyến Huỳnh Tấn Phát & Trần Xuân Soạn',
    district: 'Quận 7',
    time: '14:45 · Hôm nay',
    severity: 'medium',
    type: 'tide',
    description: 'Đài Khí tượng Thủy văn Nam Bộ dự báo đỉnh triều đạt 1.68m vào 17:30 chiều nay, vượt mức báo động 3. Nguy cơ ngập sâu các tuyến đường ven kênh rạch.',
    coordinates: [10.748, 106.730],
    polygon: [
      [10.758, 106.718],
      [10.755, 106.742],
      [10.738, 106.745],
      [10.740, 106.720]
    ],
    affectedRoads: ['Huỳnh Tấn Phát', 'Trần Xuân Soạn', 'Nguyễn Thị Thập', 'Lê Văn Lương']
  },
  {
    id: 'alt-04',
    title: 'Tắc đường nghiêm trọng do ngập – Quận 1',
    location: 'Nút giao Tôn Đức Thắng & Nguyễn Hữu Cảnh',
    district: 'Quận 1',
    time: '14:30 · Hôm nay',
    severity: 'medium',
    type: 'traffic',
    description: 'Ùn ứ giao thông kéo dài do nhiều phương tiện quay đầu tránh vũng nước sâu dưới dạ cầu Ba Son hướng sang Bình Thạnh.',
    coordinates: [10.782, 106.708],
    polygon: [
      [10.788, 106.702],
      [10.789, 106.715],
      [10.776, 106.712],
      [10.778, 106.700]
    ],
    affectedRoads: ['Tôn Đức Thắng', 'Nguyễn Hữu Cảnh', 'Lê Thánh Tôn', 'Đinh Tiên Hoàng']
  },
  {
    id: 'alt-05',
    title: 'Cảnh báo ngập trũng – Quận 12',
    location: 'Khu vực đường Nguyễn Văn Quá và Song Hành',
    district: 'Quận 12',
    time: '13:50 · Hôm nay',
    severity: 'low',
    type: 'flood',
    description: 'Hệ thống thoát nước quá tải cục bộ khi mưa to liên tục trên 30 phút, nước dâng chậm trên mặt đường 10-20cm.',
    coordinates: [10.845, 106.632],
    polygon: [
      [10.852, 106.622],
      [10.855, 106.642],
      [10.835, 106.645],
      [10.838, 106.625]
    ],
    affectedRoads: ['Nguyễn Văn Quá', 'Song Hành', 'Trường Chinh']
  }
];

export const MOCK_WEATHER_DATA: WeatherData = {
  summary: 'Mưa vừa đến mưa to',
  rateRange: '23 – 45 mm/h',
  area: 'Khu vực trung tâm & Đông Sài Gòn',
  updatedAt: '15:30 · 12/10',
  timeline: [
    { time: 'Hiện tại', rainfallMm: 38, status: 'Mưa to' },
    { time: '30 phút', rainfallMm: 42, status: 'Mưa rất to' },
    { time: '1 giờ', rainfallMm: 25, status: 'Mưa vừa' },
    { time: '2 giờ', rainfallMm: 8, status: 'Mưa nhỏ rải rác' }
  ]
};

export const MOCK_ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-optimal',
    name: 'Lộ trình tối ưu (Tránh ngập hoàn toàn)',
    via: 'Qua Mai Chí Thọ & Cầu Ba Son',
    durationMinutes: 22,
    distanceKm: 9.4,
    avoidFloodedSpots: 3,
    isRecommended: true,
    summary: 'Đường cao ráo, hệ thống thoát nước tốt, không có điểm ngập nào được ghi nhận.',
    warnings: ['Đường có thu phí hoặc đông xe giờ cao điểm'],
    waypoints: [
      [10.7769, 106.7009], // Bến Thành
      [10.7798, 106.7082], // Tôn Đức Thắng
      [10.7760, 106.7160], // Cầu Ba Son
      [10.7790, 106.7280], // Mai Chí Thọ
      [10.8030, 106.7450], // Xa Lộ Hà Nội
      [10.8080, 106.7350]  // Thảo Điền
    ]
  },
  {
    id: 'route-fastest',
    name: 'Lộ trình nhanh nhất (Có nguy cơ ngập)',
    via: 'Qua Nguyễn Hữu Cảnh & Cầu Sài Gòn',
    durationMinutes: 18,
    distanceKm: 7.1,
    avoidFloodedSpots: 0,
    isRecommended: false,
    summary: 'Quãng đường ngắn nhất nhưng cắt qua 2 điểm ngập nặng (> 50cm) tại Nguyễn Hữu Cảnh.',
    warnings: ['Đường Nguyễn Hữu Cảnh ngập sâu 50-70cm', 'Xe máy có nguy cơ chết máy'],
    waypoints: [
      [10.7769, 106.7009],
      [10.7850, 106.7070],
      [10.7925, 106.7190], // Đi qua Nguyễn Hữu Cảnh ngập nặng
      [10.8000, 106.7240], // Cầu Sài Gòn
      [10.8080, 106.7350]
    ]
  },
  {
    id: 'route-alternative',
    name: 'Lộ trình vòng tránh (An toàn cho xe máy)',
    via: 'Qua Điện Biên Phủ & Cầu Thủ Thiêm 1',
    durationMinutes: 28,
    distanceKm: 10.2,
    avoidFloodedSpots: 2,
    isRecommended: false,
    summary: 'Đi đường vòng qua khu đô thị mới Thủ Thiêm, chỉ có 1 đoạn đọng nước nhẹ 10cm.',
    waypoints: [
      [10.7769, 106.7009],
      [10.7870, 106.6980],
      [10.7950, 106.7150],
      [10.7880, 106.7250],
      [10.8020, 106.7400],
      [10.8080, 106.7350]
    ]
  }
];

export const DISTRICT_LIST = [
  'Tất cả quận/huyện',
  'Quận 1',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Bình Thạnh',
  'Tân Bình',
  'Tân Phú',
  'Phú Nhuận',
  'Gò Vấp',
  'Bình Tân',
  'TP. Thủ Đức',
  'Huyện Nhà Bè',
  'Huyện Bình Chánh'
];
