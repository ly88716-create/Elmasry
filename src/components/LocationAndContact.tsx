import React from 'react';
import { ShowroomSettings } from '../types';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation, ShieldCheck } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface LocationAndContactProps {
  settings: ShowroomSettings;
}

export const LocationAndContact: React.FC<LocationAndContactProps> = ({ settings }) => {
  return (
    <section id="contact-section" className="py-20 bg-[#0a0b10] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            موقع المعرض والتواصل
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            تفضل بزيارة صالة عرض <span className="gold-text-gradient">{settings.name}</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            فريقنا جاهز لاستقبالك، وتقديم استشارة شراء متخصصة وتجربة قيادة لكافة السيارات المتاحة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address & Google Maps CTA Card */}
            <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 hover:border-amber-500/30 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">موقع المعرض</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    {settings.address}
                  </p>

                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs shadow-md hover:scale-102 transition"
                  >
                    <Navigation className="w-4 h-4 stroke-[2.5]" />
                    <span>الاتجاهات عبر خرائط جوجل (Google Maps)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Direct Calling */}
            <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 hover:border-amber-500/30 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">الهاتف المباشر</h3>
                  <p className="text-neutral-400 text-xs mb-3">
                    متاح للاتصال والاستفسار المباشر وحجز مواعيد المعاينة
                  </p>
                  <a
                    href={`tel:${settings.phone}`}
                    className="inline-flex items-center gap-2 text-xl font-black text-amber-400 font-mono tracking-wider hover:text-amber-300 transition"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{settings.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Support */}
            <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800 hover:border-emerald-500/30 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">خدمة واتساب المعرض</h3>
                  <p className="text-neutral-400 text-xs mb-3">
                    لإرسال صور وتقارير فحص السيارات والموقع الجغرافي المباشر
                  </p>
                  <a
                    href={getGeneralWhatsAppLink(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span dir="ltr">{settings.whatsapp}</span>
                    <span>(محادثة فورية)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-2xl bg-[#12141c] border border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">مواعيد العمل الرسمية</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {settings.openingHours}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Map Preview Container */}
          <div className="lg:col-span-7 bg-[#12141c] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
            <div className="p-4 bg-[#0e1017] border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>موقع المعرض على خرائط جوجل</span>
              </div>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <span>فتح في تطبيق الخرائط</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative flex-1 bg-neutral-900 w-full h-full">
              {/* Google Maps Embed iframe */}
              <iframe
                title="موقع معرض المصري موتورز"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110543.83404415849!2d31.332308967916568!3d30.015488426021614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c21c7c10b77%3A0x6b107e3b33dbd842!2z2KfZhNmC2KfZh9ix2Kkg2KfZhNis2K_Zparent!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg"
                className="w-full h-full border-0 filter grayscale-[40%] contrast-110"
                loading="lazy"
                allowFullScreen
              ></iframe>

              {/* Map Floating Card */}
              <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:max-w-xs p-4 rounded-xl bg-[#0c0d13]/95 backdrop-blur-md border border-amber-500/30 shadow-2xl text-right">
                <div className="text-white text-xs font-black mb-1">{settings.name}</div>
                <div className="text-[11px] text-neutral-300 mb-2">{settings.address}</div>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>الاتجاهات</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
