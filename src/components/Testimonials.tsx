import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'المهندس كريم الشناوي',
      location: 'التجمع الخامس - القاهرة',
      car: 'اشترى هيونداي إلنترا 2022',
      comment: 'أمانة لا توصف وشفافية كاملة في تقرير الفحص. السيارة كانت بحالة الوكالة تماماً كما ذُكر، وإجراءات نقل الملكية تمت في المرور بسلاسة شديدة بمرافقة مسؤول المعرض.',
      rating: 5,
      date: 'منذ أسبوعين'
    },
    {
      name: 'د. طارق السعيد',
      location: 'المعادي - القاهرة',
      car: 'اشترى تويوتا كورولا 2023',
      comment: 'تجربة ممتازة تختلف تماماً عن السوق المعتاد. المعرض راقٍ جداً، والتعامل في قمة الاحترافية، والسيارة كشفت عليها في التوكيل وطلعت خالية من أي ملاحظة.',
      rating: 5,
      date: 'منذ شهر'
    },
    {
      name: 'أ. محمود عبد الباسط',
      location: 'مدينة نصر - القاهرة',
      car: 'اشترى كيا سيراتو 2021',
      comment: 'استفدت من نظام الاستبدال عندهم وبدلت سيارتي القديمة ودفع الفارق بتسهيل مريح، أسعارهم واقعية ومحترمة بدون مغالاة.',
      rating: 5,
      date: 'منذ شهر ونصف'
    }
  ];

  return (
    <section className="py-20 bg-[#07080c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            تجارب حقيقية
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 leading-tight">
            ماذا يقول عملاء <span className="gold-text-gradient">المصري موتورز</span>؟
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-[1.8] max-w-xl mx-auto">
            ثقة عملائنا هي رأس مالنا الحقيقي، نسعى دائماً لتقديم أعلى مستويات الرضا والاطمئنان.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#10121a] border border-neutral-800 relative flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 left-6" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-neutral-300 text-sm leading-[1.9] mb-8 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-base flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-neutral-400 text-xs">{rev.location}</p>
                  </div>
                  <span className="text-[11px] text-neutral-500">{rev.date}</span>
                </div>

                <div className="mt-2 text-xs font-semibold text-amber-400/90 bg-amber-500/5 px-2.5 py-1 rounded-md inline-block">
                  {rev.car}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
