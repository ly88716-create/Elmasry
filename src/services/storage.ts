import { CustomerInquiry, ShowroomSettings, Vehicle, AdminCredentials } from '../types';
import { INITIAL_DEMO_VEHICLES, INITIAL_SHOWROOM_SETTINGS } from '../data/demoVehicles';

const STORAGE_KEYS = {
  VEHICLES: 'elmasry_cars_vehicles_v1',
  INQUIRIES: 'elmasry_cars_inquiries_v1',
  SETTINGS: 'elmasry_cars_settings_v1',
  ADMIN_AUTH: 'elmasry_cars_admin_auth_v1',
  ADMIN_SESSION: 'elmasry_cars_admin_session_v1',
};

// Initial realistic customer inquiries to demonstrate lead generation
const INITIAL_DEMO_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-101',
    customerName: 'أحمد محمود عبد الفتاح',
    phone: '01012345678',
    requestedBrand: 'تويوتا',
    requestedModel: 'كورولا أو ياريس',
    requestedYear: '2021 - 2023',
    budget: 950000,
    notes: 'أبحث عن سيارة فابريكا بالكامل بدون أي رش وبحالة التوكيل للدفع كاش فوراً.',
    status: 'جديد',
    createdAt: '2026-11-01T10:15:00.000Z'
  },
  {
    id: 'inq-102',
    customerName: 'م. إبراهيم خليل',
    phone: '01223344556',
    requestedBrand: 'سكودا',
    requestedModel: 'أوكتافيا A8 أو سوبيرب',
    requestedYear: '2022',
    budget: 1500000,
    notes: 'يفضل فئة أمبيشن أو ستايل بلون أسود أو رمادي غامق.',
    status: 'تم التواصل',
    createdAt: '2026-10-31T14:20:00.000Z'
  }
];

// Simple secure hash helper (SHA-256 via browser subtle crypto)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_elmasry_cars_salt_secure_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const StorageService = {
  // ==================== VEHICLES ====================
  getVehicles(): Vehicle[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_DEMO_VEHICLES));
        return INITIAL_DEMO_VEHICLES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading vehicles:', e);
      return INITIAL_DEMO_VEHICLES;
    }
  },

  saveVehicle(vehicle: Vehicle): Vehicle[] {
    const vehicles = this.getVehicles();
    const existingIndex = vehicles.findIndex(v => v.id === vehicle.id);
    let updated: Vehicle[];

    if (existingIndex >= 0) {
      updated = [...vehicles];
      updated[existingIndex] = {
        ...vehicle,
        updatedAt: new Date().toISOString()
      };
    } else {
      updated = [
        {
          ...vehicle,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        ...vehicles
      ];
    }

    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  deleteVehicle(id: string): Vehicle[] {
    const vehicles = this.getVehicles();
    const updated = vehicles.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  toggleVehicleStatus(id: string, status: 'متاحة' | 'مباعة' | 'محجوزة'): Vehicle[] {
    const vehicles = this.getVehicles();
    const updated = vehicles.map(v => v.id === id ? { ...v, status, updatedAt: new Date().toISOString() } : v);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  toggleVehicleFeatured(id: string): Vehicle[] {
    const vehicles = this.getVehicles();
    const updated = vehicles.map(v => v.id === id ? { ...v, isFeatured: !v.isFeatured, updatedAt: new Date().toISOString() } : v);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  convertDemoToReal(id: string): Vehicle[] {
    const vehicles = this.getVehicles();
    const updated = vehicles.map(v => {
      if (v.id === id) {
        return {
          ...v,
          isDemo: false,
          updatedAt: new Date().toISOString()
        };
      }
      return v;
    });
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  deleteAllDemoVehicles(): Vehicle[] {
    const vehicles = this.getVehicles();
    const updated = vehicles.filter(v => !v.isDemo);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
    return updated;
  },

  restoreDemoVehicles(): Vehicle[] {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_DEMO_VEHICLES));
    return INITIAL_DEMO_VEHICLES;
  },

  // ==================== CUSTOMER INQUIRIES ====================
  getInquiries(): CustomerInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_DEMO_INQUIRIES));
        return INITIAL_DEMO_INQUIRIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading inquiries:', e);
      return INITIAL_DEMO_INQUIRIES;
    }
  },

  saveInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'> & { vehicleId?: string; vehicleName?: string }): CustomerInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: CustomerInquiry = {
      ...inquiry,
      id: 'inq-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      status: 'جديد',
      createdAt: new Date().toISOString()
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: 'جديد' | 'تم التواصل' | 'مكتمل'): CustomerInquiry[] {
    const inquiries = this.getInquiries();
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return updated;
  },

  deleteInquiry(id: string): CustomerInquiry[] {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter(inq => inq.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    return updated;
  },

  // ==================== SHOWROOM SETTINGS ====================
  getSettings(): ShowroomSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SHOWROOM_SETTINGS));
        return INITIAL_SHOWROOM_SETTINGS;
      }
      const parsed = JSON.parse(data);
      // Auto-migrate to new name and hero image requested by the owner
      if (parsed.name === 'المصري للسيارات' || !parsed.heroImage) {
        parsed.name = 'المصري موتورز';
        parsed.subtitleEn = 'EL MASRY MOTORS';
        parsed.heroSubtitle = 'اكتشف أرقى تشكيلة من السيارات المتميزة مع المصري موتورز';
        parsed.heroImage = '/assets/aistudio/IMG_4165_d6d8ca93.jpeg';
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
      }
      return { ...INITIAL_SHOWROOM_SETTINGS, ...parsed };
    } catch (e) {
      console.error('Error reading settings:', e);
      return INITIAL_SHOWROOM_SETTINGS;
    }
  },

  saveSettings(settings: ShowroomSettings): ShowroomSettings {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  },

  resetSettings(): ShowroomSettings {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SHOWROOM_SETTINGS));
    return INITIAL_SHOWROOM_SETTINGS;
  },

  // ==================== ADMIN AUTHENTICATION ====================
  async getAdminCredentials(): Promise<AdminCredentials> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (!data) {
        // Default initial credentials for owner (Email: admin@elmasry-cars.com, default password can be set)
        const defaultHash = await hashPassword('ElMasryCars2026!');
        const initialCreds: AdminCredentials = {
          email: 'admin@elmasry-cars.com',
          passwordHash: defaultHash,
          isSetupComplete: true,
          lastLogin: undefined
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(initialCreds));
        return initialCreds;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading admin credentials:', e);
      const defaultHash = await hashPassword('ElMasryCars2026!');
      return {
        email: 'admin@elmasry-cars.com',
        passwordHash: defaultHash,
        isSetupComplete: true
      };
    }
  },

  async setAdminCredentials(email: string, newPassword: string): Promise<boolean> {
    const passwordHash = await hashPassword(newPassword);
    const updated: AdminCredentials = {
      email: email.trim().toLowerCase(),
      passwordHash,
      isSetupComplete: true,
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(updated));
    return true;
  },

  async verifyAdminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const creds = await this.getAdminCredentials();
    const inputEmail = email.trim().toLowerCase();
    const inputHash = await hashPassword(password);

    if (inputEmail !== creds.email) {
      return { success: false, error: 'البريد الإلكتروني غير مسجل كمسؤول للنظام.' };
    }

    if (inputHash !== creds.passwordHash) {
      return { success: false, error: 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.' };
    }

    // Set active admin session
    const session = {
      email: creds.email,
      authenticatedAt: new Date().toISOString()
    };
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));

    // Update last login
    creds.lastLogin = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(creds));

    return { success: true };
  },

  isAdminAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      return !!session;
    } catch {
      return false;
    }
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  },

  // ==================== IMAGE PROCESSING HELPER ====================
  async processImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Canvas compression
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1200;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(event.target?.result as string);
        img.src = event.target?.result as string;
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  },

  // ==================== BACKUP & RESTORE ====================
  exportAllData(): string {
    const data = {
      vehicles: this.getVehicles(),
      inquiries: this.getInquiries(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
      showroomName: 'المصري للسيارات'
    };
    return JSON.stringify(data, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.vehicles && Array.isArray(parsed.vehicles)) {
        localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(parsed.vehicles));
      }
      if (parsed.inquiries && Array.isArray(parsed.inquiries)) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(parsed.inquiries));
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      }
      return true;
    } catch (e) {
      console.error('Failed to import data:', e);
      return false;
    }
  }
};
