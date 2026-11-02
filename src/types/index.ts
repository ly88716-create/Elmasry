export type TransmissionType = 'أوتوماتيك' | 'مانيوال';
export type FuelType = 'بنزين' | 'هايبرد' | 'ديزل' | 'غاز طبيعي';
export type VehicleStatus = 'متاحة' | 'مباعة' | 'محجوزة';
export type InquiryStatus = 'جديد' | 'تم التواصل' | 'مكتمل';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number; // in EGP (جنيه مصري)
  mileage: number; // in KM (كيلومتر)
  transmission: TransmissionType;
  fuelType: FuelType;
  engineCapacity: string; // e.g. "1600 CC"
  condition: string; // e.g. "فابريكا بالكامل"
  color: string;
  status: VehicleStatus;
  isFeatured: boolean;
  isDemo: boolean;
  description: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  requestedBrand: string;
  requestedModel: string;
  requestedYear: string;
  budget: number;
  notes: string;
  status: InquiryStatus;
  createdAt: string;
  vehicleId?: string;
  vehicleName?: string;
}

export interface ShowroomSettings {
  name: string;
  subtitleEn: string;
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage?: string;
  logoUrl?: string;
}

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  isSetupComplete: boolean;
  lastLogin?: string;
}

export type ActiveTab = 'home' | 'catalog' | 'request-car' | 'about' | 'contact' | 'admin';
export type AdminTab = 'overview' | 'inventory' | 'inquiries' | 'settings' | 'firebase-guide';
