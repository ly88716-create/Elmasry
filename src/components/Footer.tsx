import React from 'react';
import { ActiveTab, ShowroomSettings } from '../types';
import { Car, MapPin, Phone, MessageCircle, Clock, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface FooterProps {
  settings: ShowroomSettings;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenRequestCar: () => void;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  setActiveTab,
  onOpenRequestCar,
  onNavigateAdmin
}) => {
  return (
    <footer className="bg-[#06070a] text-neutral-300 border-t border-amber-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Car className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-black text-white leading-snug">{settings.name}</h3>
                <span className="text-[10px] font-bold text-amber-400/90 tracking-[0.2em] font-sans uppercase mt-1.5 pt-0.5">
                  {settings.subtitleEn}
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              المعرض الرائد في مصر المتخصص في بيع وشراء واستبدال السيارات المستعملة المضمونة، بأعلى معايير الشفافية والفحص الفني المعتمد.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getGeneralWhatsAppLink(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-950/40 text-emerald-400 flex items-center justify-center transition"
                title="واتساب المعرض"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-950/40 text-amber-400 flex items-center justify-center transition"
                title="اتصال هاتفي"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:bg-amber-950/40 text-amber-400 flex items-center justify-center transition"
                title="موقع المعرض على خرائط جوجل"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-amber-400 pr-2">
              أقسام الموقع
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  السيارات المتاحة
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRequestCar}
                  className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1.5"
                >
                  <span>اطلب سيارتك (طلب خاص)</span>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">جديد</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  من نحن ومعايير الفحص
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition"
                >
                  تواصل معنا
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-amber-400 pr-2">
              بيانات التواصل المباشر
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-neutral-500">رقم الهاتف:</span>
                  <a href={`tel:${settings.phone}`} className="text-white font-mono hover:text-amber-400" dir="ltr">
                    {settings.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-neutral-500">خدمة واتساب:</span>
                  <a href={getGeneralWhatsAppLink(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-white font-mono hover:text-emerald-400" dir="ltr">
                    {settings.whatsapp}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] text-neutral-500">موقع المعرض:</span>
                  <a href={settings.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <span>الاتجاهات على خرائط جوجل</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Showroom Working Hours & Guarantee */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-r-2 border-amber-400 pr-2">
              أوقات الزيارة والضمان
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {settings.openingHours}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ضمان فحص وشفافية</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  نرحب بمعاينة سياراتنا في أي مركز فحص معتمد يختاره العميل لضمان حق الشراء.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Demo Inventory Notice */}
        <div className="p-4 rounded-xl bg-[#0e1017] border border-amber-500/20 mb-8 text-neutral-400 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="text-amber-400 font-bold">تنويه قانوني وفني:</span> جميع السيارات الأولية المعروضة والمميزة بعلامة (سيارة تجريبية – بيانات توضيحية) هي نماذج عرض افتراضية لتوضيح وظائف النظام وليست مخزوناً مؤكداً. يتحكم مالك المعرض بشكل كامل في إضافة وحذف السيارات الحقيقية من لوحة الإدارة.
          </div>
        </div>

        {/* Bottom Copyright Bar with discreet admin shortcut */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {settings.name} ({settings.subtitleEn})</span>
            {onNavigateAdmin && (
              <button
                onClick={onNavigateAdmin}
                className="text-neutral-700 hover:text-amber-500/80 transition p-0.5 rounded cursor-pointer"
                title="بوابة إدارة المعرض المحمية"
                aria-label="بوابة الإدارة"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="text-[11px]">
            تصميم وتطوير بأعلى معايير الفخامة والسرعة
          </div>
        </div>

      </div>
    </footer>
  );
};
