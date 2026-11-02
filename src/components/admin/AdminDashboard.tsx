import React, { useState } from 'react';
import {
  AdminTab,
  CustomerInquiry,
  ShowroomSettings,
  Vehicle
} from '../../types';
import { StorageService } from '../../services/storage';
import { formatCurrencyEGP, formatMileage, formatArabicDate, getCustomerResponseWhatsAppLink } from '../../utils/formatters';
import { VehicleEditModal } from './VehicleEditModal';
import {
  LayoutDashboard,
  Car,
  Users,
  Settings,
  Database,
  Cloud,
  LogOut,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  AlertTriangle,
  Upload,
  Download,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Phone,
  Search,
  Check,
  ShieldAlert
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
  vehicles: Vehicle[];
  onVehiclesChange: (vehicles: Vehicle[]) => void;
  settings: ShowroomSettings;
  onSettingsChange: (settings: ShowroomSettings) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onLogout,
  vehicles,
  onVehiclesChange,
  settings,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => StorageService.getInquiries());
  
  // Modals & form states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicleToEdit, setSelectedVehicleToEdit] = useState<Vehicle | null>(null);
  
  // Settings edit state
  const [editableSettings, setEditableSettings] = useState<ShowroomSettings>(settings);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);
  
  // Inventory filter
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryFilterStatus, setInventoryFilterStatus] = useState<string>('all');
  
  // Inquiries filter
  const [inquiriesFilterStatus, setInquiriesFilterStatus] = useState<string>('all');

  // Confirmation modals
  const [confirmDeleteVehicleId, setConfirmDeleteVehicleId] = useState<string | null>(null);
  const [confirmDeleteInquiryId, setConfirmDeleteInquiryId] = useState<string | null>(null);
  const [confirmDeleteAllDemos, setConfirmDeleteAllDemos] = useState(false);

  // Backup state
  const [backupNotice, setBackupNotice] = useState<string | null>(null);

  // Stats calculation
  const totalVehiclesCount = vehicles.length;
  const availableVehiclesCount = vehicles.filter((v) => v.status === 'متاحة').length;
  const soldVehiclesCount = vehicles.filter((v) => v.status === 'مباعة').length;
  const demoVehiclesCount = vehicles.filter((v) => v.isDemo).length;
  const totalInventoryValue = vehicles
    .filter((v) => v.status === 'متاحة')
    .reduce((acc, curr) => acc + curr.price, 0);
  
  const newInquiriesCount = inquiries.filter((inq) => inq.status === 'جديد').length;

  // Handlers for Inventory
  const handleAddNewCar = () => {
    setSelectedVehicleToEdit(null);
    setIsEditModalOpen(true);
  };

  const handleEditCar = (vehicle: Vehicle) => {
    setSelectedVehicleToEdit(vehicle);
    setIsEditModalOpen(true);
  };

  const handleDeleteCar = (id: string) => {
    const updated = StorageService.deleteVehicle(id);
    onVehiclesChange(updated);
    setConfirmDeleteVehicleId(null);
  };

  const handleToggleSold = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'مباعة' ? 'متاحة' : 'مباعة';
    const updated = StorageService.toggleVehicleStatus(id, nextStatus as any);
    onVehiclesChange(updated);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = StorageService.toggleVehicleFeatured(id);
    onVehiclesChange(updated);
  };

  const handleConvertDemoToReal = (id: string) => {
    const updated = StorageService.convertDemoToReal(id);
    onVehiclesChange(updated);
  };

  const handleDeleteAllDemos = () => {
    const updated = StorageService.deleteAllDemoVehicles();
    onVehiclesChange(updated);
    setConfirmDeleteAllDemos(false);
  };

  const handleRestoreDemos = () => {
    const updated = StorageService.restoreDemoVehicles();
    onVehiclesChange(updated);
  };

  // Handlers for Inquiries
  const handleUpdateInquiryStatus = (id: string, status: 'جديد' | 'تم التواصل' | 'مكتمل') => {
    const updated = StorageService.updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = StorageService.deleteInquiry(id);
    setInquiries(updated);
    setConfirmDeleteInquiryId(null);
  };

  // Handlers for Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = StorageService.saveSettings(editableSettings);
    onSettingsChange(saved);
    setSettingsSavedSuccess(true);
    setTimeout(() => setSettingsSavedSuccess(false), 3000);
  };

  const handleResetSettings = () => {
    if (confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الأصلية لمعرض المصري للسيارات؟')) {
      const reset = StorageService.resetSettings();
      setEditableSettings(reset);
      onSettingsChange(reset);
    }
  };

  // Backup Export/Import
  const handleExportBackup = () => {
    const json = StorageService.exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elmasry_cars_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupNotice('تم تصدير النسخة الاحتياطية بنجاح إلى ملف JSON.');
    setTimeout(() => setBackupNotice(null), 3000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importAllData(content);
      if (success) {
        onVehiclesChange(StorageService.getVehicles());
        setInquiries(StorageService.getInquiries());
        const newSettings = StorageService.getSettings();
        onSettingsChange(newSettings);
        setEditableSettings(newSettings);
        setBackupNotice('تم استيراد واسترجاع بيانات المعرض بنجاح!');
      } else {
        alert('ملف النسخة الاحتياطية غير صالح أو تالف.');
      }
      setTimeout(() => setBackupNotice(null), 3500);
    };
    reader.readAsText(file);
  };

  // Filtered inventory list
  const filteredInventory = vehicles.filter((v) => {
    if (inventorySearch.trim()) {
      const s = inventorySearch.toLowerCase();
      const match = v.name.toLowerCase().includes(s) || v.brand.toLowerCase().includes(s) || v.model.toLowerCase().includes(s);
      if (!match) return false;
    }
    if (inventoryFilterStatus === 'available' && v.status !== 'متاحة') return false;
    if (inventoryFilterStatus === 'sold' && v.status !== 'مباعة') return false;
    if (inventoryFilterStatus === 'demo' && !v.isDemo) return false;
    if (inventoryFilterStatus === 'real' && v.isDemo) return false;
    return true;
  });

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiriesFilterStatus !== 'all' && inq.status !== inquiriesFilterStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#07080b] flex flex-col font-['Cairo',sans-serif] text-neutral-100">
      
      {/* Top Header */}
      <header className="bg-[#0d0f17] border-b border-amber-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <Car className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="text-white font-black text-lg flex items-center gap-2">
              <span>لوحة تحكم معرض {settings.name}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                متصل ومشفر
              </span>
            </h1>
            <span className="text-[11px] text-neutral-400">إدارة المخزون، الطلبات، والإعدادات المباشرة</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>عرض واجهة الموقع</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition flex items-center gap-1.5"
            title="تسجيل خروج من الإدارة"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">تسجيل خروج</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-[#0a0c13] border-l border-neutral-800/80 p-4 hidden md:flex flex-col justify-between">
          <div className="space-y-1.5">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition ${
                activeTab === 'overview'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>نظرة عامة وإحصائيات</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition ${
                activeTab === 'inventory'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Car className="w-4 h-4" />
                <span>إدارة المخزون</span>
              </span>
              <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-300 font-mono">
                {vehicles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition ${
                activeTab === 'inquiries'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>طلبات العملاء (اطلب سيارتك)</span>
              </span>
              {newInquiriesCount > 0 && (
                <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">
                  {newInquiriesCount} جديد
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition ${
                activeTab === 'settings'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>إعدادات المعرض</span>
            </button>

            <button
              onClick={() => setActiveTab('firebase-guide')}
              className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition ${
                activeTab === 'firebase-guide'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Cloud className="w-4 h-4 text-amber-400" />
              <span>ربط سحابة Firebase</span>
            </button>

          </div>

          {/* Quick Backup info */}
          <div className="p-3.5 rounded-xl bg-[#12141c] border border-neutral-800 text-xs text-neutral-400 space-y-2">
            <div className="text-white font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>النسخ الاحتياطي</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              قم بتحميل نسخة احتياطية من جميع بيانات المعرض للرجوع إليها بأمان.
            </p>
            <button
              onClick={handleExportBackup}
              className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>تصدير نسخة JSON</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sub-Nav Tab Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f17] border-t border-amber-500/20 px-2 py-2 flex justify-around">
          <button
            onClick={() => setActiveTab('overview')}
            className={`p-2 flex flex-col items-center text-[10px] ${activeTab === 'overview' ? 'text-amber-400' : 'text-neutral-400'}`}
          >
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span>نظرة عامة</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`p-2 flex flex-col items-center text-[10px] ${activeTab === 'inventory' ? 'text-amber-400' : 'text-neutral-400'}`}
          >
            <Car className="w-5 h-5 mb-1" />
            <span>المخزون</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`p-2 flex flex-col items-center text-[10px] relative ${activeTab === 'inquiries' ? 'text-amber-400' : 'text-neutral-400'}`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span>الطلبات</span>
            {newInquiriesCount > 0 && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 flex flex-col items-center text-[10px] ${activeTab === 'settings' ? 'text-amber-400' : 'text-neutral-400'}`}
          >
            <Settings className="w-5 h-5 mb-1" />
            <span>الإعدادات</span>
          </button>
        </div>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          
          {backupNotice && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{backupNotice}</span>
            </div>
          )}

          {/* ==================== 1. TAB: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header and Quick Add */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    نظرة عامة على نشاط المعرض
                  </h2>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                    ملخص شامل لإحصائيات المخزون، السيارات المتاحة، والطلبات الواردة
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddNewCar}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs sm:text-sm shadow-md hover:scale-102 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>إضافة سيارة جديدة</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                
                {/* Total Vehicles */}
                <div className="p-4 rounded-2xl bg-[#11131c] border border-neutral-800">
                  <span className="text-xs text-neutral-400 font-semibold block mb-1">إجمالي السيارات</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">{totalVehiclesCount}</div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">في سجلات المعرض</span>
                </div>

                {/* Available for sale */}
                <div className="p-4 rounded-2xl bg-[#11131c] border border-emerald-500/30">
                  <span className="text-xs text-emerald-400 font-semibold block mb-1">السيارات المتاحة</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{availableVehiclesCount}</div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">جاهزة للمعاينة والشراء</span>
                </div>

                {/* Sold */}
                <div className="p-4 rounded-2xl bg-[#11131c] border border-neutral-800">
                  <span className="text-xs text-neutral-400 font-semibold block mb-1">السيارات المباعة</span>
                  <div className="text-2xl sm:text-3xl font-black text-neutral-300 font-mono">{soldVehiclesCount}</div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">عمليات بيع ناجحة</span>
                </div>

                {/* Demo Cars */}
                <div className="p-4 rounded-2xl bg-[#11131c] border border-amber-500/30">
                  <span className="text-xs text-amber-400 font-semibold block mb-1">السيارات التجريبية</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{demoVehiclesCount}</div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">نماذج استرشادية للعرض</span>
                </div>

                {/* Inquiries */}
                <div className="p-4 rounded-2xl bg-[#11131c] border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-xs text-neutral-400 font-semibold block mb-1">طلبات العملاء (جديد)</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-2">
                    <span>{inquiries.length}</span>
                    {newInquiriesCount > 0 && (
                      <span className="text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">
                        +{newInquiriesCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">من صفحة "اطلب سيارتك"</span>
                </div>

              </div>

              {/* Total Inventory Value Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141622] via-[#1d202e] to-[#141622] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-400 font-bold block mb-1">القيمة السوقية التقديرية للسيارات المتاحة:</span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    {formatCurrencyEGP(totalInventoryValue)}
                  </div>
                  <span className="text-xs text-neutral-400 mt-1 block">
                    محسوبة بناءً على {availableVehiclesCount} سيارة متاحة للبيع الفوري بالمعرض
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
                  >
                    تصفح وإدارة السيارات
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
                  >
                    مراجعة طلبات العملاء ({newInquiriesCount})
                  </button>
                </div>
              </div>

              {/* Recent Inventory Table */}
              <div className="bg-[#10121a] rounded-2xl border border-neutral-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">أحدث السيارات في المعرض</h3>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    عرض كل السيارات ({vehicles.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-semibold">
                        <th className="pb-3">السيارة</th>
                        <th className="pb-3">الموديل</th>
                        <th className="pb-3">السعر</th>
                        <th className="pb-3">المسافة</th>
                        <th className="pb-3">الحالة</th>
                        <th className="pb-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {vehicles.slice(0, 5).map((car) => (
                        <tr key={car.id} className="hover:bg-neutral-900/50">
                          <td className="py-3 font-bold text-white flex items-center gap-2">
                            <img
                              src={car.images[0]}
                              alt=""
                              className="w-10 h-7 rounded object-cover flex-shrink-0"
                            />
                            <span>{car.name}</span>
                            {car.isDemo && (
                              <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">
                                تجريبية
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-neutral-300 font-mono">{car.year}</td>
                          <td className="py-3 text-amber-400 font-bold font-mono">{formatCurrencyEGP(car.price)}</td>
                          <td className="py-3 text-neutral-300 font-mono">{formatMileage(car.mileage)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              car.status === 'متاحة'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                            }`}>
                              {car.status}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => handleEditCar(car)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                              title="تعديل السيارة"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ==================== 2. TAB: INVENTORY ==================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">إدارة مخزون السيارات</h2>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    إضافة وتعديل وحذف السيارات، والتحكم في حالة العرض والتسعير
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {demoVehiclesCount > 0 ? (
                    <button
                      onClick={() => setConfirmDeleteAllDemos(true)}
                      className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف كافة السيارات التجريبية ({demoVehiclesCount})</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleRestoreDemos}
                      className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>استعادة العينات التجريبية</span>
                    </button>
                  )}

                  <button
                    onClick={handleAddNewCar}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>إضافة سيارة</span>
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-[#10121a] p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    placeholder="ابحث بالاسم، الماركة، أو الموديل..."
                    className="w-full bg-[#171924] text-white border border-neutral-700 rounded-xl pr-9 pl-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inventoryFilterStatus}
                    onChange={(e) => setInventoryFilterStatus(e.target.value)}
                    className="bg-[#171924] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="all">كل الحالات ({vehicles.length})</option>
                    <option value="available">المتاحة فقط</option>
                    <option value="sold">المباعة فقط</option>
                    <option value="demo">التجريبية فقط</option>
                    <option value="real">السيارات الحقيقية</option>
                  </select>
                </div>
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInventory.map((car) => (
                  <div
                    key={car.id}
                    className="p-4 rounded-2xl bg-[#12141c] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail & Badges */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 mb-3">
                        <img src={car.images[0]} alt="" className="w-full h-full object-cover" />
                        
                        <div className="absolute top-2 right-2 flex gap-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            car.status === 'متاحة'
                              ? 'bg-emerald-900/90 text-emerald-200'
                              : 'bg-rose-900/90 text-rose-200'
                          }`}>
                            {car.status}
                          </span>

                          {car.isFeatured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-black" />
                              مميزة
                            </span>
                          )}
                        </div>

                        {car.isDemo && (
                          <div className="absolute bottom-2 right-2 left-2 px-2 py-1 rounded bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[10px] font-bold text-center">
                            سيارة تجريبية – بيانات توضيحية
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                        <span>{car.brand}</span>
                        <span className="font-mono">موديل {car.year}</span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 line-clamp-1">{car.name}</h3>

                      <div className="text-lg font-black text-amber-400 font-mono mb-2">
                        {formatCurrencyEGP(car.price)}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-neutral-300 font-mono mb-4">
                        <span>{formatMileage(car.mileage)}</span>
                        <span>•</span>
                        <span>{car.transmission}</span>
                        <span>•</span>
                        <span>{car.engineCapacity}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-3 border-t border-neutral-800">
                      
                      {/* Demo conversion action */}
                      {car.isDemo && (
                        <button
                          onClick={() => handleConvertDemoToReal(car.id)}
                          className="w-full py-1.5 px-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>تحويل إلى سيارة حقيقية</span>
                        </button>
                      )}

                      <div className="grid grid-cols-4 gap-1.5">
                        {/* Edit */}
                        <button
                          onClick={() => handleEditCar(car)}
                          className="col-span-2 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-400" />
                          <span>تعديل</span>
                        </button>

                        {/* Toggle Sold */}
                        <button
                          onClick={() => handleToggleSold(car.id, car.status)}
                          className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                            car.status === 'مباعة'
                              ? 'bg-neutral-800 hover:bg-emerald-950 text-emerald-400'
                              : 'bg-neutral-800 hover:bg-rose-950 text-neutral-300'
                          }`}
                          title={car.status === 'مباعة' ? 'استعادة كمتاحة' : 'تعليم كمباعة'}
                        >
                          {car.status === 'مباعة' ? 'إتاحة' : 'بيع'}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDeleteVehicleId(car.id)}
                          className="py-2 rounded-lg bg-neutral-800 hover:bg-rose-900/60 text-neutral-400 hover:text-rose-400 text-xs transition flex items-center justify-center"
                          title="حذف السيارة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Featured toggle */}
                      <button
                        onClick={() => handleToggleFeatured(car.id)}
                        className={`w-full py-1 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1 ${
                          car.isFeatured
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${car.isFeatured ? 'fill-amber-400 text-amber-400' : ''}`} />
                        <span>{car.isFeatured ? 'إلغاء التمييز' : 'تمييز في الرئيسية'}</span>
                      </button>

                    </div>

                  </div>
                ))}
              </div>

              {filteredInventory.length === 0 && (
                <div className="text-center py-12 bg-[#12141c] rounded-2xl border border-neutral-800">
                  <p className="text-neutral-400 text-sm">لا توجد سيارات مطابقة لخيارات الفلترة الحالية.</p>
                </div>
              )}

            </div>
          )}

          {/* ==================== 3. TAB: INQUIRIES ==================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    طلبات العملاء (اطلب سيارتك)
                  </h2>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    قاعدة بيانات استفسارات العملاء والسيارات المطلوبة مع إمكانية التواصل الفوري عبر واتساب
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={inquiriesFilterStatus}
                    onChange={(e) => setInquiriesFilterStatus(e.target.value)}
                    className="bg-[#171924] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="all">كل الطلبات ({inquiries.length})</option>
                    <option value="جديد">جديد فقط ({newInquiriesCount})</option>
                    <option value="تم التواصل">تم التواصل</option>
                    <option value="مكتمل">مكتمل</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const replyUrl = getCustomerResponseWhatsAppLink(
                    inq.phone,
                    inq.customerName,
                    `${inq.requestedBrand} ${inq.requestedModel}`
                  );

                  return (
                    <div
                      key={inq.id}
                      className={`p-5 rounded-2xl bg-[#12141c] border transition ${
                        inq.status === 'جديد'
                          ? 'border-amber-500/50 bg-[#141624]'
                          : 'border-neutral-800'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Customer details */}
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-bold text-white">{inq.customerName}</h3>
                            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                              inq.status === 'جديد'
                                ? 'bg-amber-500 text-black'
                                : inq.status === 'تم التواصل'
                                ? 'bg-blue-900 text-blue-200'
                                : 'bg-emerald-900 text-emerald-200'
                            }`}>
                              {inq.status}
                            </span>
                            <span className="text-xs text-neutral-500">{formatArabicDate(inq.createdAt)}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-neutral-400 block">رقم الهاتف:</span>
                              <a href={`tel:${inq.phone}`} className="text-amber-400 font-mono font-bold" dir="ltr">
                                {inq.phone}
                              </a>
                            </div>

                            <div>
                              <span className="text-neutral-400 block">السيارة المطلوبة:</span>
                              <span className="text-white font-bold">{inq.requestedBrand} - {inq.requestedModel} (موديل {inq.requestedYear})</span>
                            </div>

                            <div>
                              <span className="text-neutral-400 block">الميزانية المرصودة:</span>
                              <span className="text-emerald-400 font-mono font-bold">{formatCurrencyEGP(inq.budget)}</span>
                            </div>
                          </div>

                          {inq.notes && (
                            <div className="p-3 rounded-xl bg-neutral-900 text-neutral-300 text-xs">
                              <span className="text-neutral-400 font-semibold">ملاحظات العميل: </span>
                              <span>{inq.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Direct WhatsApp Response */}
                          <a
                            href={replyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>مراسلة واتساب</span>
                          </a>

                          {/* Direct Call */}
                          <a
                            href={`tel:${inq.phone}`}
                            className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>اتصال</span>
                          </a>

                          {/* Status Select */}
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400"
                          >
                            <option value="جديد">جديد</option>
                            <option value="تم التواصل">تم التواصل</option>
                            <option value="مكتمل">مكتمل</option>
                          </select>

                          {/* Delete */}
                          <button
                            onClick={() => setConfirmDeleteInquiryId(inq.id)}
                            className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-400"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}

                {filteredInquiries.length === 0 && (
                  <div className="text-center py-12 bg-[#12141c] rounded-2xl border border-neutral-800">
                    <p className="text-neutral-400 text-sm">لا توجد طلبات عملاء مطابقة للفترة المحددة.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== 4. TAB: SETTINGS ==================== */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-6 animate-fadeIn">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">إعدادات المعرض</h2>
                  <p className="text-neutral-400 text-xs sm:text-sm">
                    تعديل اسم المعرض، أرقام الهواتف، الواتساب، ورابط خرائط جوجل الرسمي
                  </p>
                </div>

                <button
                  onClick={handleResetSettings}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الإعدادات الأولية</span>
                </button>
              </div>

              {settingsSavedSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>تم حفظ وتحديث إعدادات المعرض بنجاح وستظهر فوراً لكافة الزوار!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6 bg-[#11131c] p-6 rounded-2xl border border-neutral-800 text-right">
                
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">اسم المعرض (بالعربية)</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.name}
                      onChange={(e) => setEditableSettings({ ...editableSettings, name: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">الاسم التجاري بالإنجليزية (Subtitle)</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.subtitleEn}
                      onChange={(e) => setEditableSettings({ ...editableSettings, subtitleEn: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Contact numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">رقم هاتف المعرض الرسمي</label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={editableSettings.phone}
                      onChange={(e) => setEditableSettings({ ...editableSettings, phone: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-right font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">رقم خدمة واتساب</label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={editableSettings.whatsapp}
                      onChange={(e) => setEditableSettings({ ...editableSettings, whatsapp: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-right font-mono"
                    />
                  </div>
                </div>

                {/* Address & Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">عنوان المعرض الفعلي</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.address}
                      onChange={(e) => setEditableSettings({ ...editableSettings, address: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">مواعيد العمل الرسمية</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.openingHours}
                      onChange={(e) => setEditableSettings({ ...editableSettings, openingHours: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Google Maps link */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    رابط الموقع الجغرافي على خرائط جوجل (Google Maps Link)
                  </label>
                  <input
                    type="url"
                    required
                    dir="ltr"
                    value={editableSettings.googleMapsUrl}
                    onChange={(e) => setEditableSettings({ ...editableSettings, googleMapsUrl: e.target.value })}
                    className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400 text-left font-mono"
                  />
                </div>

                {/* Homepage Headlines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">عنوان الصفحة الرئيسية (Headline)</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.heroHeadline}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroHeadline: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5">وصف الصفحة الرئيسية (Subtitle)</label>
                    <input
                      type="text"
                      required
                      value={editableSettings.heroSubtitle}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroSubtitle: e.target.value })}
                      className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition cursor-pointer"
                  >
                    حفظ ونشر التعديلات فوراً
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ==================== 5. TAB: FIREBASE GUIDE ==================== */}
          {activeTab === 'firebase-guide' && (
            <div className="max-w-4xl space-y-6 animate-fadeIn text-right">
              
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-amber-400" />
                  <span>دليل ربط Firebase السحابي (Cloud Firestore & Auth)</span>
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  شرح كامل لربط المعرض بقاعدة بيانات سحابية وتفعيل مصادقة Firebase
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#11131c] border border-amber-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">حالة التخزين الحالية: محلي وسريع ومحمي بنجاح</h3>
                    <p className="text-neutral-400 text-xs">
                      جميع السيارات، طلبات العملاء، وإعدادات المعرض مخزنة محلياً بنظام آمن يستمر عبر إعادة تشغيل المتصفح.
                    </p>
                  </div>
                </div>

                <div className="border-t border-neutral-800 pt-4 space-y-3 text-xs text-neutral-300">
                  <h4 className="text-amber-400 font-bold text-sm">خطوات تفعيل Firebase لمالك المعرض:</h4>
                  
                  <ol className="list-decimal list-inside space-y-2 text-neutral-300 leading-relaxed">
                    <li>
                      الدخول إلى وحدة تحكم <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">Firebase Console</a> وإنشاء مشروع جديد باسم <strong className="text-white">elmasry-cars</strong>.
                    </li>
                    <li>
                      تفعيل خدمة <strong className="text-white">Cloud Firestore Database</strong> في وضع الإنتاج (Production Mode).
                    </li>
                    <li>
                      تفعيل خدمة <strong className="text-white">Authentication</strong> واختيار مزود <strong className="text-white">Email/Password</strong> و <strong className="text-white">Google</strong>.
                    </li>
                    <li>
                      نسخ ملف إعدادات التطبيق <code className="bg-neutral-900 px-2 py-0.5 rounded text-amber-400 font-mono">firebase-applet-config.json</code> ووضعه في جذر مجلد التطبيق.
                    </li>
                    <li>
                      سيقوم التطبيق تلقائياً بمزامنة مجموعات:
                      <ul className="list-disc list-inside pr-4 pt-1 text-neutral-400">
                        <li><code className="text-amber-400 font-mono">vehicles</code> (بيانات السيارات والمخزون)</li>
                        <li><code className="text-amber-400 font-mono">customer_inquiries</code> (طلبات العملاء الخاصة)</li>
                        <li><code className="text-amber-400 font-mono">showroom_settings</code> (إعدادات المعرض)</li>
                        <li><code className="text-amber-400 font-mono">administrators</code> (بيانات المشرفين المصرح لهم)</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                {/* Import / Export JSON tool */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-white font-bold block">تصدير بيانات المعرض كاملة:</span>
                    <span className="text-[11px] text-neutral-400">يمكنك استخدام ملف JSON للترحيل إلى أي خادم سحابي</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleExportBackup}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تصدير JSON</span>
                    </button>

                    <label className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>استيراد JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Vehicle Edit/Add Modal */}
      {isEditModalOpen && (
        <VehicleEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          vehicleToEdit={selectedVehicleToEdit}
          onSaveSuccess={(saved) => {
            onVehiclesChange(StorageService.getVehicles());
          }}
        />
      )}

      {/* Confirmation Modal: Delete Vehicle */}
      {confirmDeleteVehicleId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-neutral-700 rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-base">هل أنت متأكد من حذف هذه السيارة؟</h3>
            <p className="text-neutral-400 text-xs">
              سيتم مسح السيارة نهائياً من قاعدة بيانات المعرض ولن تظهر للزوار.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDeleteVehicleId(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteCar(confirmDeleteVehicleId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete All Demos */}
      {confirmDeleteAllDemos && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-amber-500/40 rounded-2xl p-6 max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-lg">حذف كافة السيارات التجريبية؟</h3>
            <p className="text-neutral-300 text-xs leading-relaxed">
              هذا الإجراء سيقوم بمسح كافة السيارات المحددة كـ (سيارة تجريبية) دفعة واحدة لإفساح المجال للمخزون الحقيقي للمعرض. (يمكنك استعادتها لاحقاً في أي وقت).
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDeleteAllDemos(false)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteAllDemos}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs"
              >
                نعم، احذف التجريبية الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Customer Inquiry */}
      {confirmDeleteInquiryId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12141c] border border-neutral-700 rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-base">حذف طلب العميل؟</h3>
            <p className="text-neutral-400 text-xs">
              سيتم حذف سجل طلب العميل من القائمة.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDeleteInquiryId(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteInquiry(confirmDeleteInquiryId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                حذف الطلب
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
