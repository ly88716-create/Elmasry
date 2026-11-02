import React from 'react';
import { ShowroomSettings } from '../types';
import { ShieldCheck, Award, Users, Car, Target, CheckCircle2, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  settings: ShowroomSettings;
  onBrowseCars: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onBrowseCars }) => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
          ريادة وتميز في عالم السيارات
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
          عن معرض <span className="gold-text-gradient">{settings.name}</span>
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          وجهتك الأولى في جمهورية مصر العربية لاقتناء أفضل السيارات المستعملة المضمونة والمفحوصة فحصاً شاملاً.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        
        <div className="space-y-6 text-right">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            رؤيتنا: الارتقاء بسوق السيارات المستعملة إلى مستوى العالمية
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-[1.85] mb-4">
            تأسس معرض <strong className="text-amber-400 font-bold">{settings.name} ({settings.subtitleEn})</strong> ليكون علامة فارقة في تجارة واقتناء السيارات الفاخرة والمعتمدة في مصر. نؤمن بأن شراء واقتناء سيارة يجب أن يكون تجربة استثنائية تمنح العميل راحة البال والاطمئنان التام.
          </p>
          <p className="text-neutral-300 text-sm sm:text-base leading-[1.85] mb-6">
            نعتمد في المعرض سياسة فحص صارمة، فلا نقبل إلا السيارات الخالية من الحوادث الجسيمة، ذات الصيانة الدورية المعتمدة بالتوكيلات، مع التحقق القانوني الدقيق من كافة أوراق الملكية في الإدارات العامة للمرور.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-neutral-200 text-sm font-medium">كشف أجهزة قياس سماكة الطلاء والشاسيه الإلكترونية</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-neutral-200 text-sm font-medium">فحص كمبيوتر المحرك ونواقل الحركة وأجهزة الأمان المتطورة</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-neutral-200 text-sm font-medium">سجل عداد الكيلومترات الشرعي والمثبت بسجلات الصيانة الرسمية</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-neutral-200 text-sm font-medium">مساعدة العميل ومرافقته في إجراءات التسجيل والترخيص بالمرور</span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onBrowseCars}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition cursor-pointer"
            >
              تصفح سيارات المعرض الآن
            </button>
          </div>
        </div>

        {/* Visual Showcase Box with uploaded building photo */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-neutral-900 aspect-[9/16] sm:aspect-[4/5] max-h-[580px]">
            <img
              src={settings.heroImage || '/assets/aistudio/IMG_4165_d6d8ca93.jpeg'}
              alt="صالة عرض المصري موتورز الرسمية"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-6 right-6 left-6 p-5 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-500/30 text-right">
              <div className="text-amber-400 text-xs font-bold mb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{settings.name} • المقر وصالة العرض الرئيسية</span>
              </div>
              <div className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
                مقر فاخر ومجهز بأحدث التجهيزات لاستقبالكم وتجربة أحدث السيارات
              </div>
            </div>
          </div>

          {/* Floating Gold Experience Tag */}
          <div className="absolute -top-4 -right-4 p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-950 font-black shadow-xl hidden sm:block">
            <div className="text-3xl font-mono">100%</div>
            <div className="text-xs">ضمان فحص وشفافية</div>
          </div>
        </div>

      </div>

      {/* Showroom Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-800">
        <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">الأمانة أولاً</h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            نوضح للعميل حالة السيارة بالتفصيل الممل قبل دفع أي مبلغ عربون أو حجز.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">أعلى جودة بالجمهورية</h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            سياراتنا تشبه الزيرو بحالة الصالون والمحرك ونظافة الفرش والدهانات.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">علاقة مستدامة</h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            عملاؤنا يعودون إلينا كلما رغبوا في الترقية أو استبدال سياراتهم بسيارات أحدث.
          </p>
        </div>
      </div>

    </div>
  );
};
