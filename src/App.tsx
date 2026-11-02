import React, { useState, useEffect } from 'react';
import { ActiveTab, Vehicle, ShowroomSettings } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCard } from './components/VehicleCard';
import { VehicleCatalog } from './components/VehicleCatalog';
import { VehicleDetailsModal } from './components/VehicleDetailsModal';
import { RequestCarModal } from './components/RequestCarModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { LocationAndContact } from './components/LocationAndContact';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  Car,
  Sparkles,
  ChevronLeft,
  Flame
} from 'lucide-react';

export default function App() {
  // Routing: determine if current URL is for public website (/) or private admin (/admin)
  const getInitialRoute = (): '/' | '/admin' => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (
      path === '/admin' ||
      path.startsWith('/admin/') ||
      hash === '#admin' ||
      hash === '#/admin' ||
      hash.startsWith('#/admin/')
    ) {
      return '/admin';
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<'/' | '/admin'>(getInitialRoute);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [settings, setSettings] = useState<ShowroomSettings>(() => StorageService.getSettings());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => StorageService.isAdminAuthenticated());

  // Public modals state
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [preselectedVehicleForRequest, setPreselectedVehicleForRequest] = useState<Vehicle | null>(null);

  // Quick search filter bridge from Hero to Catalog
  const [quickFilterBrand, setQuickFilterBrand] = useState('');
  const [quickFilterMaxPrice, setQuickFilterMaxPrice] = useState(0);
  const [quickFilterYear, setQuickFilterYear] = useState(0);

  // Sync route and auth on mount & on popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        hash === '#/admin' ||
        hash.startsWith('#/admin/')
      ) {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
      setIsAdminLoggedIn(StorageService.isAdminAuthenticated());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        navigateTo('/admin');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (route: '/' | '/admin') => {
    setCurrentRoute(route);
    if (route === '/admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    StorageService.logoutAdmin();
    setIsAdminLoggedIn(false);
  };

  const handleQuickSearch = (brand: string, maxPrice: number, year: number) => {
    setQuickFilterBrand(brand);
    setQuickFilterMaxPrice(maxPrice);
    setQuickFilterYear(year);
    setActiveTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestViewing = (vehicle: Vehicle) => {
    setPreselectedVehicleForRequest(vehicle);
    setIsRequestModalOpen(true);
  };

  const handleOpenGeneralRequestCar = () => {
    setPreselectedVehicleForRequest(null);
    setIsRequestModalOpen(true);
  };

  // =========================================================================
  // 1. PRIVATE ADMINISTRATION PANEL (Route: /admin)
  // Completely separate layout, authentication gate, and private control interface.
  // =========================================================================
  if (currentRoute === '/admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLoginPage
          settings={settings}
          onLoginSuccess={handleAdminLoginSuccess}
          onGoToPublicSite={() => navigateTo('/')}
        />
      );
    }

    return (
      <AdminDashboard
        onClose={() => navigateTo('/')}
        onLogout={handleAdminLogout}
        vehicles={vehicles}
        onVehiclesChange={(updated) => setVehicles(updated)}
        settings={settings}
        onSettingsChange={(updatedSettings) => setSettings(updatedSettings)}
      />
    );
  }

  // =========================================================================
  // 2. PUBLIC CUSTOMER WEBSITE (Route: /)
  // Dedicated customer-facing interface.
  // ZERO admin controls, zero admin links, zero dashboard buttons displayed.
  // =========================================================================
  const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
  const featuredVehicles = vehicles.filter((v) => v.isFeatured && v.status === 'متاحة');
  const latestArrivals = [...vehicles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-['Cairo',sans-serif] selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Public Navbar (No admin links) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        onOpenRequestCar={handleOpenGeneralRequestCar}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            
            {/* Hero Section */}
            <Hero
              settings={settings}
              brands={uniqueBrands}
              onBrowseCars={() => {
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContactClick={() => {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('contact');
              }}
              onQuickSearch={handleQuickSearch}
            />

            {/* Featured Vehicles (سيارات مميزة) */}
            {featuredVehicles.length > 0 && (
              <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>اختيارات المعرض الحصرية</span>
                    </div>
                    <h2 className="text-3xl font-black text-white">
                      السيارات المميزة لدى المعرض
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('catalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
                  >
                    <span>عرض كافة السيارات المتاحة</span>
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredVehicles.slice(0, 4).map((car) => (
                    <VehicleCard
                      key={car.id}
                      vehicle={car}
                      onViewDetails={(v) => setSelectedVehicleForDetails(v)}
                      whatsappNumber={settings.whatsapp}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Arrivals (أحدث الإضافات) */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-900">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                    <Flame className="w-4 h-4" />
                    <span>وصل حديثاً للمعرض</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">
                    أحدث السيارات المضافة
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span>استكشف المخزون بالكامل ({vehicles.length})</span>
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestArrivals.map((car) => (
                  <VehicleCard
                    key={car.id}
                    vehicle={car}
                    onViewDetails={(v) => setSelectedVehicleForDetails(v)}
                    whatsappNumber={settings.whatsapp}
                  />
                ))}
              </div>
            </section>

            {/* Custom Order Callout ("اطلب سيارتك") */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171a25] via-[#232737] to-[#171a25] border border-amber-500/30 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl text-right">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    خدمة توريد وفحص خاصة
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white">
                    لم تجد السيارة التي تبحث عنها بعد؟
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-[1.85] pt-1">
                    من خلال خدمة <strong className="text-amber-400 font-bold">"اطلب سيارتك"</strong>، حدد مواصفات وميزانية السيارة المطلوبة وسيقوم خبراء معرض <strong className="text-white font-bold">{settings.name}</strong> بالبحث عنها، وفحصها بدقة، وتوفيرها لك بأفضل سعر وسرعة فائقة.
                  </p>
                </div>

                <button
                  onClick={handleOpenGeneralRequestCar}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Car className="w-5 h-5 stroke-[2.5]" />
                  <span>اطلب سيارتك الآن</span>
                </button>
              </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Customer Testimonials */}
            <Testimonials />

            {/* Location & Contact Section */}
            <LocationAndContact settings={settings} />

          </div>
        )}

        {/* TAB: CATALOG */}
        {activeTab === 'catalog' && (
          <div className="py-6">
            <VehicleCatalog
              vehicles={vehicles}
              onViewDetails={(v) => setSelectedVehicleForDetails(v)}
              whatsappNumber={settings.whatsapp}
              initialBrand={quickFilterBrand}
              initialMaxPrice={quickFilterMaxPrice}
              initialYear={quickFilterYear}
            />
          </div>
        )}

        {/* TAB: REQUEST CAR */}
        {activeTab === 'request-car' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-right">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-amber-400 text-xs font-bold uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
                خدمة العملاء المميزة
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-3">
                اطلب سيارتك بمواصفاتك
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">
                سجل بيانات السيارة المطلوبة وسيتواصل معك مستشار المبيعات فوراً لتوفير أفضل العروض
              </p>
            </div>

            <div className="bg-[#11131c] rounded-3xl border border-amber-500/30 p-6 sm:p-10 shadow-2xl text-center">
              <button
                onClick={handleOpenGeneralRequestCar}
                className="w-full max-w-md mx-auto py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-base shadow-xl hover:scale-[1.01] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Car className="w-5 h-5" />
                <span>فتح نموذج طلب السيارة وتحديد الميزانية</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: ABOUT */}
        {activeTab === 'about' && (
          <AboutSection
            settings={settings}
            onBrowseCars={() => {
              setActiveTab('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB: CONTACT */}
        {activeTab === 'contact' && (
          <div className="py-6">
            <LocationAndContact settings={settings} />
          </div>
        )}

      </main>

      {/* Public Footer (No public admin controls) */}
      <Footer
        settings={settings}
        setActiveTab={setActiveTab}
        onOpenRequestCar={handleOpenGeneralRequestCar}
        onNavigateAdmin={() => navigateTo('/admin')}
      />

      {/* Floating WhatsApp and Phone Buttons */}
      <FloatingContact
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      {/* Public Modals */}
      {selectedVehicleForDetails && (
        <VehicleDetailsModal
          vehicle={selectedVehicleForDetails}
          onClose={() => setSelectedVehicleForDetails(null)}
          allVehicles={vehicles}
          onSelectVehicle={(sim) => setSelectedVehicleForDetails(sim)}
          whatsappNumber={settings.whatsapp}
          phone={settings.phone}
          onRequestViewing={handleRequestViewing}
        />
      )}

      {isRequestModalOpen && (
        <RequestCarModal
          isOpen={isRequestModalOpen}
          onClose={() => {
            setIsRequestModalOpen(false);
            setPreselectedVehicleForRequest(null);
          }}
          preselectedVehicle={preselectedVehicleForRequest}
        />
      )}

    </div>
  );
}
