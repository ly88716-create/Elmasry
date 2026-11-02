import React, { useState, useMemo } from 'react';
import { Vehicle } from '../types';
import { VehicleCard } from './VehicleCard';
import { Search, SlidersHorizontal, RotateCcw, AlertCircle, ArrowUpDown } from 'lucide-react';

interface VehicleCatalogProps {
  vehicles: Vehicle[];
  onViewDetails: (vehicle: Vehicle) => void;
  whatsappNumber: string;
  initialBrand?: string;
  initialMaxPrice?: number;
  initialYear?: number;
}

export const VehicleCatalog: React.FC<VehicleCatalogProps> = ({
  vehicles,
  onViewDetails,
  whatsappNumber,
  initialBrand = '',
  initialMaxPrice = 0,
  initialYear = 0
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'mileage-asc'>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract unique brands from inventory
  const uniqueBrands = useMemo(() => {
    const brandsSet = new Set(vehicles.map((v) => v.brand));
    return Array.from(brandsSet).sort();
  }, [vehicles]);

  // Extract unique years
  const uniqueYears = useMemo(() => {
    const yearsSet = new Set(vehicles.map((v) => v.year));
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [vehicles]);

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Search text
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = v.name.toLowerCase().includes(term);
          const matchBrand = v.brand.toLowerCase().includes(term);
          const matchModel = v.model.toLowerCase().includes(term);
          const matchDesc = v.description.toLowerCase().includes(term);
          if (!matchName && !matchBrand && !matchModel && !matchDesc) return false;
        }

        // Brand
        if (selectedBrand && v.brand !== selectedBrand) return false;

        // Transmission
        if (selectedTransmission !== 'all' && v.transmission !== selectedTransmission) return false;

        // Fuel
        if (selectedFuelType !== 'all' && v.fuelType !== selectedFuelType) return false;

        // Max price
        if (maxPrice > 0 && v.price > maxPrice) return false;

        // Year
        if (selectedYear > 0 && v.year !== selectedYear) return false;

        // Availability
        if (availabilityFilter === 'available' && v.status !== 'متاحة') return false;
        if (availabilityFilter === 'sold' && v.status !== 'مباعة') return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'mileage-asc') {
          return a.mileage - b.mileage;
        }
        return 0;
      });
  }, [
    vehicles,
    searchTerm,
    selectedBrand,
    selectedTransmission,
    selectedFuelType,
    maxPrice,
    selectedYear,
    availabilityFilter,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedTransmission('all');
    setSelectedFuelType('all');
    setMaxPrice(0);
    setSelectedYear(0);
    setAvailabilityFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(selectedBrand) ||
    selectedTransmission !== 'all' ||
    selectedFuelType !== 'all' ||
    maxPrice > 0 ||
    selectedYear > 0 ||
    availabilityFilter !== 'all';

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header with Title and Demo Disclaimer */}
      <div className="mb-8 text-center sm:text-right">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
              <span>السيارات المتاحة في المعرض</span>
              <span className="text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                {filteredVehicles.length} سيارة
              </span>
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              اختر سيارتك المفضلة وتواصل معنا فوراً للمعاينة وتحديد موعد الفحص
            </p>
          </div>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              ترتيب حسب:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#151722] text-white border border-neutral-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="newest">الأحدث وصولاً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="mileage-asc">الكيلومترات: الأقل أولاً</option>
            </select>
          </div>
        </div>

        {/* Demo Notice Banner with comfortable reading spacing */}
        <div className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm flex items-start sm:items-center gap-3 leading-[1.85]">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>تنويه للعملاء:</strong> السيارات المميزة بعلامة (سيارة تجريبية – بيانات توضيحية) هي نماذج عرض استرشادية لبيان مواصفات وتجهيزات السيارات. يقوم مسؤولو معرض المصري موتورز بإدراج السيارات المتوفرة بشكل دوري ومستمر.
          </span>
        </div>
      </div>

      {/* Main Filter Control Box */}
      <div className="bg-[#12141d] border border-neutral-800 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl">
        
        {/* Top Search input & Mobile Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم، الماركة (مثال: إلنترا، كورولا، سيراتو)..."
              className="w-full bg-[#181a24] text-white border border-neutral-700/80 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-3 top-2.5 text-xs text-neutral-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 text-white text-sm font-semibold border border-neutral-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>{showMobileFilters ? 'إخفاء الفلاتر' : 'تصفية وبحث متقدم'}</span>
          </button>
        </div>

        {/* Detailed Filters (Always visible on desktop, toggleable on mobile) */}
        <div className={`${showMobileFilters ? 'block' : 'hidden sm:block'} pt-2 border-t border-neutral-800/80`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Brand Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">الماركة</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">جميع الماركات</option>
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">سنة الصنع</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="0">كل السنوات</option>
                {uniqueYears.map((yr) => (
                  <option key={yr} value={yr}>
                    موديل {yr}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">الحد الأقصى للسعر</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="0">أي ميزانية</option>
                <option value="450000">حتى 450 ألف ج.م</option>
                <option value="700000">حتى 700 ألف ج.م</option>
                <option value="900000">حتى 900 ألف ج.م</option>
                <option value="1200000">حتى 1.2 مليون ج.م</option>
                <option value="1600000">حتى 1.6 مليون ج.م</option>
              </select>
            </div>

            {/* Transmission Filter */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">ناقل الحركة</label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">الكل</option>
                <option value="أوتوماتيك">أوتوماتيك فقط</option>
                <option value="مانيوال">مانيوال فقط</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">نوع الوقود</label>
              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">كل الأنواع</option>
                <option value="بنزين">بنزين</option>
                <option value="هايبرد">هايبرد</option>
                <option value="ديزل">ديزل</option>
                <option value="غاز طبيعي">غاز طبيعي</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 mb-1">حالة المعرض</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full bg-[#181a24] text-white border border-neutral-700 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">الكل (المتاح والمباع)</option>
                <option value="available">المتاحة للبيع فقط</option>
                <option value="sold">تم بيعها مؤخراً</option>
              </select>
            </div>

          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 py-1 px-3 rounded-lg hover:bg-neutral-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط وتصفير الفلاتر</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={onViewDetails}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#12141c] rounded-2xl border border-neutral-800">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto mb-4 text-neutral-500">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">لا توجد سيارات مطابقة لخيارات البحث الحالية</h3>
          <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
            جرب تعديل الميزانية أو اختيار ماركة أخرى، أو اطلب منا البحث عن السيارة التي ترغب بها وسنوفرها لك.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm transition"
          >
            عرض كافة السيارات المتاحة
          </button>
        </div>
      )}

    </section>
  );
};
