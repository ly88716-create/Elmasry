import React from 'react';
import { ShieldCheck, Award, FileCheck2, WalletCards, Wrench, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'فحص فني شامل 120 نقطة',
      description: 'جميع سيارات المعرض تخضع لكشف دقيق للمحرك، الفتيس، الشاسيه، وطلاء الهيكل عبر أجهزة قياس دهان إلكترونية حديثة مع شهادة فحص معتمدة.'
    },
    {
      icon: FileCheck2,
      title: 'أوراق مرورية سليمة ونقل فوري',
      description: 'نضمن لك سلامة الملف المروري، خلو السيارة من أي حظر بيع أو مخالفات، مع استخراج شهادة بيانات سارية ومرافقتك في إجراءات نقل الملكية.'
    },
    {
      icon: Award,
      title: 'تسعير عادل دون وسيط',
      description: 'نقدم تسعيراً واقعياً مطابقاً لمتغيرات سوق السيارات المصري بدقة وشفافية تامة ودون أي رسوم خفية أو مبالغات سعرية.'
    },
    {
      icon: WalletCards,
      title: 'أنظمة تقسيط وتسهيلات بنكية',
      description: 'شراكات مع كبرى البنوك وشركات التمويل الاستهلاكي في مصر بمقدمات تبدأ من 20% وفترات سداد مرنة تصل إلى 7 سنوات وبأقل فائدة.'
    },
    {
      icon: Wrench,
      title: 'ضمان ما بعد الاستلام',
      description: 'نمنح عملاءنا مهلة فحص في أي مركز معتمد يختاره العميل للتأكد من مطابقة السيارة لكافة المواصفات المذكورة في تقرير الحالة.'
    },
    {
      icon: Clock,
      title: 'سرعة التسليم والاستبدال',
      description: 'إمكانية تسليم السيارة في نفس اليوم مع إمكانية استبدال سيارتك القديمة بسيارة أحدث مع دفع الفارق بكل سهولة ويسر.'
    }
  ];

  return (
    <section className="py-20 bg-[#0a0b10] border-t border-neutral-900 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            معايير الجودة والشفافية
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 leading-tight">
            لماذا يختار العملاء <span className="gold-text-gradient">المصري موتورز</span>؟
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-[1.85] max-w-2xl mx-auto">
            نحن لا نبيع السيارات فحسب، بل نبني علاقات ثقة مستمرة مع عملائنا عبر تقديم تجربة شراء آمنة ومضمونة كلياً.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-[#12141c] border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-neutral-400 text-sm leading-[1.85]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-amber-400/80 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>معتمد ومضمون لدى المعرض</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
