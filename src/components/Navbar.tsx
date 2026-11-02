import React, { useState } from 'react';
import { ActiveTab, ShowroomSettings } from '../types';
import { Phone, Menu, X, Car, MessageCircle, Sparkles } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/formatters';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  settings: ShowroomSettings;
  onOpenRequestCar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  settings,
  onOpenRequestCar
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home' as ActiveTab, label: 'الرئيسية' },
    { id: 'catalog' as ActiveTab, label: 'السيارات المتاحة' },
    { id: 'request-car' as ActiveTab, label: 'اطلب سيارتك' },
    { id: 'about' as ActiveTab, label: 'من نحن' },
    { id: 'contact' as ActiveTab, label: 'تواصل معنا' }
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl transition-all">
      {/* Top micro bar for phone & opening hours */}
      <div className="bg-gradient-to-r from-[#12141c] via-[#1a1710] to-[#12141c] border-b border-amber-500/10 text-xs py-1.5 px-4 sm:px-8 text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400/90 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              المعرض مفتوح لاستقبالكم
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline">{settings.openingHours}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1 text-neutral-300 hover:text-amber-400 transition"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-neutral-500">|</span>
            <a
              href={getGeneralWhatsAppLink(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-right group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition duration-300">
              <div className="w-full h-full bg-[#0a0b10] rounded-[10px] flex items-center justify-center">
                <Car className="w-7 h-7 text-amber-400 group-hover:scale-110 transition duration-300" />
              </div>
            </div>

            <div className="flex flex-col justify-center text-right">
              <span className="text-xl sm:text-2xl font-black tracking-normal text-white group-hover:text-amber-400 transition leading-snug">
                {settings.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-amber-400/95 uppercase font-sans mt-1.5 pt-0.5">
                {settings.subtitleEn}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const isRequest = link.id === 'request-car';

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-inner'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isRequest && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                  )}
                  {link.label}
                  {isRequest && (
                    <span className="text-[10px] bg-gradient-to-r from-amber-500 to-amber-600 text-black px-1.5 py-0.5 rounded-full font-bold">
                      جديد
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Request Car, Admin Button & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Quick Request Car button for CTA */}
            <button
              onClick={onOpenRequestCar}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition"
            >
              <Car className="w-4 h-4" />
              <span>اطلب سيارتك</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-amber-500/20 px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-right px-4 py-2.5 rounded-lg text-base font-semibold flex items-center justify-between transition ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'request-car' && (
                  <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">
                    خدمة خاصة
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRequestCar();
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-center flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              <span>اطلب سيارة بمواصفاتك الآن</span>
            </button>

            <a
              href={`tel:${settings.phone}`}
              className="w-full py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-medium text-center flex items-center justify-center gap-2"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
