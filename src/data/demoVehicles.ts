import { Vehicle } from '../types';

export const INITIAL_DEMO_VEHICLES: Vehicle[] = [
  {
    id: 'demo-elantra-2022',
    name: 'هيونداي إلنترا CN7 فئة ثانية',
    brand: 'هيونداي',
    model: 'إلنترا CN7',
    year: 2022,
    price: 890000,
    mileage: 42000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1600 CC',
    condition: 'فابريكا بالكامل دواخل وخوارج بدون أي رش',
    color: 'رمادي فيراني ميتالك',
    status: 'متاحة',
    isFeatured: true,
    isDemo: true,
    description: 'سيارة هيونداي إلنترا CN7 موديل 2022 بحالة نادرة جداً كالزيرو تماماً، صيانة منتظمة بالتوكيل بالفواتير، رخصة سارية لمدة سنتين، كاوتش جديد وبطارية جديدة، كماليات الفئة الكاملة.',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'فتحة سقف كهربائية',
      'شاشة ترفيه 8 بوصة تدعم Apple CarPlay و Android Auto',
      'كاميرا خلفية وحساسات ركن 360',
      'بصمة تشغيل ودخول ذكي بدون مفتاح',
      'مثبت سرعة وتحكم طارة مالتي فانكشن',
      'نظام فرامل مانع للانغلاق ABS وتوزيع إلكتروني EBD',
      'جنوط رياضية أصلية قياس 16 بوصة'
    ],
    createdAt: '2026-10-25T10:00:00.000Z',
    updatedAt: '2026-10-25T10:00:00.000Z'
  },
  {
    id: 'demo-cerato-2021',
    name: 'كيا سيراتو جراند فئة توب لاين',
    brand: 'كيا',
    model: 'سيراتو جراند',
    year: 2021,
    price: 820000,
    mileage: 51000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1600 CC',
    condition: 'فابريكا دواخل وسقف، رشة حزام نظافة جانبي فقط',
    color: 'أبيض لؤلؤي',
    status: 'متاحة',
    isFeatured: true,
    isDemo: true,
    description: 'كيا سيراتو جراند توب لاين أعلى فئة، فرش جلد أسود مطرز، تكييف تاتش مزدوج، فتحة سقف، شاشة تاتش، حالة الموتور والفتيس ممتازة بنسبة 95% بعد فحص المركز المعتمد.',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'صالون جلد طبيعي فاخر',
      'تكييف هواء أوتوماتيكي ثنائي المناطق',
      'مصابيح ليد LED أمامية وخلفية',
      'طارة قيادة جلد متعددة المهام',
      'مرايات ضم كهرباء مع إشارات ليد',
      'نظام أمان متكامل وسائد هوائية Airbags'
    ],
    createdAt: '2026-10-26T12:30:00.000Z',
    updatedAt: '2026-10-26T12:30:00.000Z'
  },
  {
    id: 'demo-corolla-2023',
    name: 'تويوتا كورولا Comfort Plus ياباني',
    brand: 'تويوتا',
    model: 'كورولا',
    year: 2023,
    price: 1180000,
    mileage: 26000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1600 CC Dual VVT-i',
    condition: 'فابريكا بالكامل بحالة المصنع - زيرو خدوش',
    color: 'فضي بلاتينيوم ميتالك',
    status: 'متاحة',
    isFeatured: true,
    isDemo: true,
    description: 'أيقونة الاعتمادية تويوتا كورولا 2023 فئة كمفورت بلس، مالك أول من الزيرو، عداد شرعي 26 ألف كم فقط، جميع الصيانات الدورية داخل توكيل تويوتا إيجيبت، مع كتيب الضمان والمفتاحين الأصليين.',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891988-f778047831d6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'فتحة سقف بانوراما جزئية',
      'شاشة عدادات رقمية ديجيتال 7 بوصة',
      'نظام فرامل يد إلكترونية EPB مع خاصية Auto Hold',
      'أنظمة ثبات إلكتروني VSC و TRC و HAC للمرتفعات',
      'زجاج فاميه ملون جانبي وخلفي مثبت بالرخصة',
      'جنوط ألمنيوم ثنائية اللون مقاس 17'
    ],
    createdAt: '2026-10-27T09:15:00.000Z',
    updatedAt: '2026-10-27T09:15:00.000Z'
  },
  {
    id: 'demo-sunny-2022',
    name: 'نيسان صني فئة Super Saloon',
    brand: 'نيسان',
    model: 'صني N17',
    year: 2022,
    price: 495000,
    mileage: 38000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1500 CC',
    condition: 'فابريكا دواخل وخوارج بالكامل، صيانات معتمدة',
    color: 'ذهبي برونزي شامبين',
    status: 'متاحة',
    isFeatured: false,
    isDemo: true,
    description: 'نيسان صني سوبر صالون أعلى فئة، استهلاك بنزين اقتصادي جداً، صالون رحب ومريح للعائلة، تكييف ثلاجة ممتاز مع فتحات تكييف خلفية ومروحة لصالون الركاب، رخصة سنة مرور التجمع.',
    images: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'خاصية البصمة ودخول بدون مفتاح',
      'شاشة وسطية تعمل باللمس تدعم البلوتوث',
      'سبويلر خلفي رياضي أصلي ومصابيح شبورة',
      'مروحة توزيع تكييف خلفية للركاب',
      'حساسات ركن خلفية مع إنذار صوتي',
      'مرايات كهربائية مع تحكم كامل في الزجاج'
    ],
    createdAt: '2026-10-28T14:40:00.000Z',
    updatedAt: '2026-10-28T14:40:00.000Z'
  },
  {
    id: 'demo-optra-2020',
    name: 'شيفروليه أوبترا هاي لاين فتحة سقف',
    brand: 'شيفروليه',
    model: 'أوبترا',
    year: 2020,
    price: 410000,
    mileage: 78000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1500 CC',
    condition: 'فابريكا دواخل وسقف وشنطة، رش رفرفين وباب نظافة',
    color: 'أسود ملوكي لامع',
    status: 'متاحة',
    isFeatured: false,
    isDemo: true,
    description: 'شيفروليه أوبترا فئة هاي لاين بفتحة سقف، سيارة اقتصادية جداً وقطع غيار متوفرة في كل مكان بمصر بأسعار مناسبة، كراسي جلد أصلية، بطارية جديدة، جاهزة للاستخدام الفوري ولا تحتاج أي مصروف.',
    images: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'فتحة سقف كهربائية',
      'صالون جلد أسود بيج شيك وأنيق',
      'حساسات ركن خلفية',
      'نظام صوتي ستيريو 4 سماعات مع USB و AUX',
      'فرامل ABS مانعة للانغلاق ووسائد هوائية'
    ],
    createdAt: '2026-10-29T11:20:00.000Z',
    updatedAt: '2026-10-29T11:20:00.000Z'
  },
  {
    id: 'demo-mg5-2022',
    name: 'إم جي 5 (MG 5) فئة Luxury الأعلى',
    brand: 'إم جي',
    model: 'MG 5 Luxury',
    year: 2022,
    price: 670000,
    mileage: 34000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1500 CC',
    condition: 'فابريكا بالكامل بدون أي رش قطرة دهان',
    color: 'أزرق كحلي داكن نايت شيد',
    status: 'متاحة',
    isFeatured: true,
    isDemo: true,
    description: 'إم جي 5 فئة لكجري أعلى فئة كماليات وأمان، تتميز بكاميرات 360 درجة، فتحة سقف، شاشة عملاقة 10.1 بوصة، كراسي كهرباء مزودة بسخانات، وفرامل يد كهرباء مع أوتو هولد. حالة شاذة كالمعرض.',
    images: [
      'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'نظام رؤية محيطية 360 درجة بـ 4 كاميرات فائقة الوضوح',
      'شاشة ترفيهية ذكية 10.1 بوصة',
      'مقعد السائق بتحكم كهربائي كامل وسخانات مقاعد',
      'فتحة سقف كهربائية ومصابيح Full LED',
      '6 وسائد هوائية كاملة لحماية الركاب',
      'نظام مراقبة ضغط الإطارات TPMS'
    ],
    createdAt: '2026-10-29T16:00:00.000Z',
    updatedAt: '2026-10-29T16:00:00.000Z'
  },
  {
    id: 'demo-octavia-2022',
    name: 'سكودا أوكتافيا A8 فئة Ambition',
    brand: 'سكودا',
    model: 'أوكتافيا A8',
    year: 2022,
    price: 1480000,
    mileage: 39000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1400 CC TSI Turbo',
    condition: 'فابريكا بالكامل - وارد الوكيل الرسمي مع الضمان',
    color: 'رمادي غرافيتي ميتاليك',
    status: 'متاحة',
    isFeatured: true,
    isDemo: true,
    description: 'الفخامة والأداء الألماني المتكامل في سكودا أوكتافيا A8 الجديدة كلياً، محرك تيربو فائق القوة مع ناقل حركة 8 سرعات Shift-by-wire حديث، شاحن لاسلكي للهواتف، إضاءة محيطية داخلية Ambient Light متعددة الألوان.',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'ناقل حركة إلكتروني ذكي Shift-by-wire',
      'إضاءة محيطية داخلية بـ 30 لون مختلف Ambient Lighting',
      'شاحن هاتف لاسلكي سريع Wireless Charger',
      'لوحة عدادات رقمية افتراضية Virtual Cockpit',
      'نظام صوتي فاخر بتقنية الصوت المجسم',
      'شنطة خلفية هائلة سعة 600 لتر تفتح كهربائياً'
    ],
    createdAt: '2026-10-30T08:00:00.000Z',
    updatedAt: '2026-10-30T08:00:00.000Z'
  },
  {
    id: 'demo-logan-2021',
    name: 'رينو لوجان فئة E3 أعلى فئة أوتوماتيك',
    brand: 'رينو',
    model: 'لوجان',
    year: 2021,
    price: 435000,
    mileage: 58000,
    transmission: 'أوتوماتيك',
    fuelType: 'بنزين',
    engineCapacity: '1600 CC',
    condition: 'فابريكا دواخل وسقف، حزام خارجي نظافة',
    color: 'أبيض ناصع',
    status: 'متاحة',
    isFeatured: false,
    isDemo: true,
    description: 'رينو لوجان فئة E3 كاملة أوتوماتيك، شاشة ملاحة وكاميرا خلفية أصلية Media Nav، تكييف تاتش أوتوماتيك، طارة مالتي مثبت سرعة ومحدد سرعة، ارتفاع ممتاز عن الأرض وعفشة مريحة جداً تناسب الشوارع المصرية.',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'شاشة تاتش ملاحة أصلية Media Nav مع خرائط مصر',
      'كاميرا خلفية وحساسات ركن أصلية',
      'تكييف أوتوماتيكي ديجيتال فائق التبريد',
      'مثبت ومحدد سرعة Cruise Control على الطارة',
      'جنوط سبور أصلية ذات لونين مقاس 15 بوصة',
      'فرامل ABS ومساعد فرامل للطوارئ EBA'
    ],
    createdAt: '2026-10-30T14:10:00.000Z',
    updatedAt: '2026-10-30T14:10:00.000Z'
  }
];

export const INITIAL_SHOWROOM_SETTINGS = {
  name: 'المصري موتورز',
  subtitleEn: 'EL MASRY MOTORS',
  phone: '01004247770',
  whatsapp: '+201004247770',
  address: 'جمهورية مصر العربية - القاهرة الجديدة / التجمع الخامس - محور المشير طنطاوي',
  openingHours: 'يومياً من 12:00 ظهراً حتى 11:30 مساءً (الجمعة من 2:00 ظهراً)',
  googleMapsUrl: 'https://maps.app.goo.gl/f22XCqF2LKoY71JC7',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  heroHeadline: 'سيارتك القادمة تبدأ من هنا',
  heroSubtitle: 'اكتشف أرقى تشكيلة من السيارات المتميزة مع المصري موتورز',
  heroImage: '/assets/aistudio/IMG_4165_d6d8ca93.jpeg',
  logoUrl: ''
};

