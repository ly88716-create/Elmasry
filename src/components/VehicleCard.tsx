import React from 'react';
import { Vehicle } from '../types';
import { formatCurrencyEGP, formatMileage, getWhatsAppCarInquiryLink } from '../utils/formatters';
import { Gauge, Cog, Fuel, Eye, MessageCircle, Star, AlertCircle, Images } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  whatsappNumber: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onViewDetails,
  whatsappNumber
}) => {
  const whatsappLink = getWhatsAppCarInquiryLink(
    whatsappNumber,
    vehicle.name,
    vehicle.year,
    vehicle.price
  );

  const mainImage = vehicle.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative bg-[#12141c] rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-amber-500/10">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 cursor-pointer" onClick={() => onViewDetails(vehicle)}>
        <img
          src={mainImage}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-black/30"></div>

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 z-10 max-w-[85%]">
          {/* Status Badge */}
          {vehicle.status === 'متاحة' && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 backdrop-blur-sm">
              متاحة للبيع
            </span>
          )}
          {vehicle.status === 'مباعة' && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-900/90 text-rose-200 border border-rose-500/40 backdrop-blur-sm">
              تم البيع
            </span>
          )}
          {vehicle.status === 'محجوزة' && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-900/90 text-amber-200 border border-amber-500/40 backdrop-blur-sm">
              قيد الحجز
            </span>
          )}

          {/* Featured Badge */}
          {vehicle.isFeatured && (
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-amber-500/90 text-black flex items-center gap-1 shadow-md">
              <Star className="w-3 h-3 fill-black text-black" />
              مميزة
            </span>
          )}
        </div>

        {/* Images count indicator */}
        {vehicle.images.length > 1 && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-neutral-300 text-xs flex items-center gap-1 font-mono">
            <Images className="w-3 h-3 text-amber-400" />
            <span>{vehicle.images.length} صور</span>
          </div>
        )}

        {/* Mandatory Demo Vehicle Disclaimer Badge */}
        {vehicle.isDemo && (
          <div className="absolute bottom-2 right-2 left-2 px-2.5 py-1 rounded-lg bg-amber-950/90 border border-amber-500/60 text-amber-300 text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-md">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">سيارة تجريبية – بيانات توضيحية</span>
          </div>
        )}
      </div>

      {/* Vehicle Info & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Year Header */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1 font-medium">
            <span className="text-amber-400/90 font-bold">{vehicle.brand}</span>
            <span className="bg-neutral-800/80 px-2 py-0.5 rounded text-neutral-300 font-mono">موديل {vehicle.year}</span>
          </div>

          {/* Vehicle Name */}
          <h3
            onClick={() => onViewDetails(vehicle)}
            className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition cursor-pointer line-clamp-1 mb-2"
          >
            {vehicle.name}
          </h3>

          {/* Price Tag */}
          <div className="mb-4">
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight">
              {formatCurrencyEGP(vehicle.price)}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 px-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs mb-4 text-center">
            
            {/* Mileage */}
            <div className="flex flex-col items-center">
              <span className="text-neutral-400 flex items-center gap-1 text-[11px] mb-0.5">
                <Gauge className="w-3 h-3 text-amber-400" />
                المسافة
              </span>
              <span className="font-semibold text-neutral-200">{formatMileage(vehicle.mileage)}</span>
            </div>

            {/* Transmission */}
            <div className="flex flex-col items-center border-r border-l border-neutral-800 px-1">
              <span className="text-neutral-400 flex items-center gap-1 text-[11px] mb-0.5">
                <Cog className="w-3 h-3 text-amber-400" />
                الناقل
              </span>
              <span className="font-semibold text-neutral-200 truncate">{vehicle.transmission}</span>
            </div>

            {/* Engine CC / Fuel */}
            <div className="flex flex-col items-center">
              <span className="text-neutral-400 flex items-center gap-1 text-[11px] mb-0.5">
                <Fuel className="w-3 h-3 text-amber-400" />
                المحرك
              </span>
              <span className="font-semibold text-neutral-200 truncate">{vehicle.engineCapacity}</span>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
          {/* Details button */}
          <button
            onClick={() => onViewDetails(vehicle)}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:border hover:border-amber-500/30"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-300" />
            <span>عرض التفاصيل</span>
          </button>

          {/* WhatsApp Direct Inquiry button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition flex items-center justify-center gap-1.5 text-center shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>استفسر واتساب</span>
          </a>
        </div>

      </div>

    </div>
  );
};
