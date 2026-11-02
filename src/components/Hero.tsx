import React, { useState } from 'react';
import { ShowroomSettings } from '../types';
import { Search, ChevronDown, CheckCircle2, ShieldCheck, PhoneCall, Sparkles, Car } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface HeroProps {
  settings: ShowroomSettings;
  onBrowseCars: () => void;
  onContactClick: () => void;
  onQuickSearch: (brand: string, maxPrice: number, year: number) => void;
  brands: string[];
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onBrowseCars,
  onContactClick,
  onQuickSearch,
  brands
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(selectedBrand, selectedMaxPrice, selectedYear);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-[#07080b]">
      {/* Background Automotive Imagery with Luxury Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroImage || '/assets/aistudio/IMG_4165_d6d8ca93.jpeg'}
          alt="المصري موتورز - صالة العرض الرسمية"
          className="w-full h-full object-cover object-center brightness-[0.35] contrast-115 scale-105 transform animate-pulse"
          style={{ animationDuration: '14s' }}
        />
        {/* Deep Matte Black Gradients for optimal text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-[#090a0f]/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f]/90 via-transparent to-[#090a0f]/90"></div>
        {/* Subtle Gold Accent Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[140px] pointer-events-none rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        
        {/* Top Badge with comfortable padding and spacing */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-8 shadow-lg shadow-amber-500/5 animate-fadeIn tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>المعرض الرائد لتجارة أرقى السيارات المعتمدة والمضمونة</span>
        </div>

        {/* Main Headline with generous line-height and letter-spacing */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-[1.3] sm:leading-[1.2]">
          <span className="block mb-3">سيارتك القادمة</span>
          <span className="gold-text-gradient inline-block font-black pb-2">تبدأ من هنا</span>
        </h1>

        {/* Subtitle with relaxed leading and balanced width */}
        <p className="text-lg sm:text-2xl text-neutral-200 font-normal max-w-3xl mb-12 leading-[1.8] sm:leading-[1.9] px-2">
          {settings.heroSubtitle}
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onBrowseCars}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Car className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            <span>تصفح السيارات</span>
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-white font-bold text-lg border border-amber-500/30 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg"
          >
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span>تواصل معنا</span>
          </button>
        </div>

        {/* Quick Search Floating Bar */}
        <div className="w-full max-w-4xl bg-[#11131a]/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80">
          <div className="text-right text-xs font-bold text-amber-400/90 mb-3 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" />
            <span>بحث سريع في مخزون المعرض</span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Brand Select */}
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#181b24] text-white border border-neutral-700/80 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-amber-400 appearance-none text-right cursor-pointer"
              >
                <option value="">جميع الماركات</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 pointer-events-none" />
            </div>

            {/* Max Price Select */}
            <div className="relative">
              <select
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="w-full bg-[#181b24] text-white border border-neutral-700/80 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-amber-400 appearance-none text-right cursor-pointer"
              >
                <option value="0">أقصى ميزانية (الكل)</option>
                <option value="500000">حتى 500,000 ج.م</option>
                <option value="750000">حتى 750,000 ج.م</option>
                <option value="1000000">حتى 1,000,000 ج.م</option>
                <option value="1500000">حتى 1,500,000 ج.م</option>
                <option value="2000000">أكثر من 1,500,000 ج.م</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 pointer-events-none" />
            </div>

            {/* Year Select */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-[#181b24] text-white border border-neutral-700/80 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-amber-400 appearance-none text-right cursor-pointer"
              >
                <option value="0">سنة الصنع (الكل)</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019 فأقدم</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>بحث في المخزون</span>
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full text-right">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">فحص فني 120 نقطة</div>
              <div className="text-neutral-400 text-[11px]">تقرير حالة معتمد وموثق</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">تسعير واقعي وشفاف</div>
              <div className="text-neutral-400 text-[11px]">أفضل قيمة لسوق السيارات</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <Car className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">نقل ملكية فوري</div>
              <div className="text-neutral-400 text-[11px]">شهادة بيانات ورخصة سليمة</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">تسهيلات وتقسيط</div>
              <div className="text-neutral-400 text-[11px]">أنظمة دفع مرنة تناسبك</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
