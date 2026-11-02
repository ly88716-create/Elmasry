import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface FloatingContactProps {
  phone: string;
  whatsapp: string;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ phone, whatsapp }) => {
  const whatsappUrl = getGeneralWhatsAppLink(whatsapp);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3 animate-fadeIn">
      
      {/* Floating Phone Button */}
      <a
        href={`tel:${phone}`}
        className="group relative w-13 h-13 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-neutral-950 flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
        title="اتصل بنا هاتفياً الآن"
        aria-label="اتصل بنا هاتفياً"
      >
        <Phone className="w-6 h-6 stroke-[2.3]" />
        
        {/* Tooltip on hover */}
        <span className="absolute left-16 bg-[#12141c] text-white border border-amber-500/40 text-xs px-3 py-1.5 rounded-lg shadow-xl font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
          اتصل بالمعرض: {phone}
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all duration-300"
        title="تواصل معنا عبر واتساب فوراً"
        aria-label="تواصل معنا عبر واتساب"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white stroke-[1.5]" />

        {/* Tooltip on hover */}
        <span className="absolute left-16 bg-[#12141c] text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-lg shadow-xl font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
          محادثة واتساب فورية
        </span>
      </a>

    </div>
  );
};
