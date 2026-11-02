import React, { useState } from 'react';
import { Vehicle } from '../types';
import { formatCurrencyEGP, formatMileage, getWhatsAppCarInquiryLink } from '../utils/formatters';
import {
  X,
  MessageCircle,
  Phone,
  Share2,
  Calendar,
  Gauge,
  Cog,
  Fuel,
  Cpu,
  ShieldCheck,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Palette
} from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  allVehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  whatsappNumber: string;
  phone: string;
  onRequestViewing: (vehicle: Vehicle) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  allVehicles,
  onSelectVehicle,
  whatsappNumber,
  phone,
  onRequestViewing
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!vehicle) return null;

  const images = vehicle.images.length > 0 ? vehicle.images : [
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
  ];

  const currentImage = images[activeImageIndex] || images[0];

  const whatsappLink = getWhatsAppCarInquiryLink(
    whatsappNumber,
    vehicle.name,
    vehicle.year,
    vehicle.price
  );

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Find similar vehicles
  const similarVehicles = allVehicles
    .filter((v) => v.id !== vehicle.id && (v.brand === vehicle.brand || Math.abs(v.price - vehicle.price) < 300000))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#10121a] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0e14]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {vehicle.brand}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white truncate max-w-md">
              {vehicle.name} (موديل {vehicle.year})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
              title="مشاركة رابط السيارة"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-900/60 text-neutral-300 hover:text-rose-400 transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Demo Notice Banner */}
          {vehicle.isDemo && (
            <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs sm:text-sm flex items-center gap-3 shadow-md">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="block font-bold">سيارة تجريبية – بيانات توضيحية</strong>
                <span className="text-amber-200/80 text-xs">
                  هذه السيارة معروضة كنموذج استرشادي للمواصفات والأسعار ضمن النظام التجريبي للمعرض.
                </span>
              </div>
            </div>
          )}

          {/* Interactive Image Gallery */}
          <div className="space-y-3">
            {/* Main Image with Carousel Controls */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
              <img
                src={currentImage}
                alt={vehicle.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              
              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition backdrop-blur-sm z-10"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition backdrop-blur-sm z-10"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-mono">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-amber-400 scale-102 shadow-lg' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA Quick Bar */}
          <div className="bg-gradient-to-r from-[#171924] via-[#1f2230] to-[#171924] p-5 sm:p-6 rounded-2xl border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-neutral-400 mb-1 font-semibold">السعر المطلوب لدى المعرض:</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                {formatCurrencyEGP(vehicle.price)}
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>إمكانية التفاوض البسيط بعد المعاينة والفحص الفني</span>
              </div>
            </div>

            {/* Contact Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب فوراً</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm border border-neutral-700 transition flex items-center justify-center gap-2"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{phone}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onRequestViewing(vehicle);
                }}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>طلب حجز موعد معاينة</span>
              </button>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>المواصفات الفنية للسيارة</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>سنة الصنع</span>
                </div>
                <div className="text-base font-bold text-white font-mono">{vehicle.year}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span>المسافة المقطوعة</span>
                </div>
                <div className="text-base font-bold text-white font-mono">{formatMileage(vehicle.mileage)}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Cog className="w-4 h-4 text-amber-400" />
                  <span>ناقل الحركة</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.transmission}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>سعة المحرك</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.engineCapacity}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Fuel className="w-4 h-4 text-amber-400" />
                  <span>نوع الوقود</span>
                </div>
                <div className="text-base font-bold text-white">{vehicle.fuelType}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span>لون السيارة</span>
                </div>
                <div className="text-base font-bold text-white truncate">{vehicle.color}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#141620] border border-neutral-800 col-span-2">
                <div className="flex items-center gap-2 text-neutral-400 text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>حالة الهيكل والدهان</span>
                </div>
                <div className="text-sm font-bold text-emerald-300">{vehicle.condition}</div>
              </div>
            </div>
          </div>

          {/* Detailed Arabic Description with comfortable reading rhythm */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">تفاصيل وحالة السيارة</h3>
            <div className="p-6 sm:p-7 rounded-2xl bg-[#141620] border border-neutral-800 text-neutral-200 text-sm sm:text-base leading-[2] whitespace-pre-line tracking-wide">
              {vehicle.description}
            </div>
          </div>

          {/* Key Features List */}
          {vehicle.features && vehicle.features.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">الكماليات وتجهيزات الأمان</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicle.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/70 border border-neutral-800/80 text-xs sm:text-sm text-neutral-200"
                  >
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Vehicles Suggestions */}
          {similarVehicles.length > 0 && (
            <div className="pt-6 border-t border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4">سيارات مشابهة متوفرة في المعرض</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarVehicles.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      onSelectVehicle(sim);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition flex items-center gap-3 group"
                  >
                    <img
                      src={sim.images[0]}
                      alt={sim.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition"
                    />
                    <div className="truncate">
                      <div className="text-white text-xs font-bold truncate group-hover:text-amber-400 transition">
                        {sim.name}
                      </div>
                      <div className="text-amber-400 text-xs font-mono font-bold mt-0.5">
                        {formatCurrencyEGP(sim.price)}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        موديل {sim.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
