export interface Product {
  id: string
  slug: string
  category: 'swimwear' | 'equipment' | 'accessories' | 'maintenance' | 'safety'
  image: string
  gallery: string[]
  price: number
  oldPrice?: number
  inStock: boolean
  rating: number
  reviewsCount: number
  fa: {
    name: string
    brand: string
    description: string
    specifications: { label: string; value: string }[]
    features: string[]
  }
  en: {
    name: string
    brand: string
    description: string
    specifications: { label: string; value: string }[]
    features: string[]
  }
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'pro-swim-goggles',
    category: 'accessories',
    image: 'https://images.pexels.com/photos/13342399/pexels-photo-13342399.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/13342399/pexels-photo-13342399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/9786/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 850000,
    oldPrice: 1100000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 124,
    fa: {
      name: 'عینک شنا حرفه‌ای ضد مه',
      brand: 'آکوا ویژن',
      description: 'عینک شنا حرفه‌ای با شیشه ضد مه و ضد UV، مناسب شناگران حرفه‌ای و مبتدی. طراحی ارگونومیک با آب‌بندی کامل و راحتی بالا. شیشه‌های پلی‌کربنات با دید ۱۸۰ درجه.',
      specifications: [
        { label: 'نوع شیشه', value: 'پلی‌کربنات ضد مه' },
        { label: 'بند', value: 'سیلیکون با قابلیت تنظیم' },
        { label: 'وزن', value: '۸۰ گرم' },
        { label: 'گارانتی', value: '۱۲ ماه' },
      ],
      features: ['ضد مه', 'ضد UV', 'دید ۱۸۰ درجه', 'آب‌بندی کامل', 'بند سیلیکونی قابل تنظیم'],
    },
    en: {
      name: 'Professional Anti-Fog Swim Goggles',
      brand: 'AquaVision',
      description: 'Professional swimming goggles with anti-fog and UV-resistant lenses, suitable for both professional and beginner swimmers. Ergonomic design with full water seal and high comfort. Polycarbonate lenses with 180-degree vision.',
      specifications: [
        { label: 'Lens Type', value: 'Anti-fog Polycarbonate' },
        { label: 'Strap', value: 'Adjustable Silicone' },
        { label: 'Weight', value: '80g' },
        { label: 'Warranty', value: '12 months' },
      ],
      features: ['Anti-fog', 'UV Protection', '180° Vision', 'Full Water Seal', 'Adjustable Silicone Strap'],
    },
  },
  {
    id: '2',
    slug: 'silicone-swim-cap',
    category: 'accessories',
    image: 'https://images.pexels.com/photos/17373285/pexels-photo-17373285.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/17373285/pexels-photo-17373285.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/20523355/pexels-photo-20523355.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 320000,
    inStock: true,
    rating: 4.6,
    reviewsCount: 89,
    fa: {
      name: 'کلاه شنا سیلیکونی',
      brand: 'استخر‌بان',
      description: 'کلاه شنا از جنس سیلیکون مرغوب با کشسانی بالا و راحتی فوق‌العاده. محافظت کامل از مو در برابر کلر و آب استخر. مناسب تمام اندازه‌های سر.',
      specifications: [
        { label: 'جنس', value: 'سیلیکون طبی' },
        { label: 'سایز', value: 'فری سایز' },
        { label: 'رنگ‌ها', value: 'موجود در ۸ رنگ' },
        { label: 'گارانتی', value: '۶ ماه' },
      ],
      features: ['سیلیکون مرغوب', 'کشسانی بالا', 'ضد آب', 'مناسب همه اندازه‌ها', 'رنگ‌بندی متنوع'],
    },
    en: {
      name: 'Silicone Swimming Cap',
      brand: 'PoolHub',
      description: 'Premium silicone swim cap with high elasticity and superior comfort. Full hair protection against chlorine and pool water. Fits all head sizes.',
      specifications: [
        { label: 'Material', value: 'Medical Silicone' },
        { label: 'Size', value: 'One Size Fits All' },
        { label: 'Colors', value: 'Available in 8 colors' },
        { label: 'Warranty', value: '6 months' },
      ],
      features: ['Premium Silicone', 'High Elasticity', 'Waterproof', 'Universal Fit', 'Multiple Colors'],
    },
  },
  {
    id: '3',
    slug: 'pool-float-lounge',
    category: 'swimwear',
    image: 'https://images.pexels.com/photos/5077742/pexels-photo-5077742.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/5077742/pexels-photo-5077742.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/10191223/pexels-photo-10191223.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/887821/pexels-photo-887821.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 1250000,
    oldPrice: 1500000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 203,
    fa: {
      name: 'تشک شنا و شناور lounging',
      brand: 'آکوا‌لکس',
      description: 'تشک شنا و استراحت روی آب با طراحی ارگونومیک و ساختار بادار. مناسب استراحت و آبتنی در استخر و دریا. دارای نگهدارنده نوشیدنی و قسمت پشتی‌بندی.',
      specifications: [
        { label: 'جنس', value: 'PVC بدون ftalat' },
        { label: 'ابعاد', value: '۱۸۰ × ۸۰ سانتی‌متر' },
        { label: 'تحمل وزن', value: 'تا ۱۲۰ کیلوگرم' },
        { label: 'گارانتی', value: '۳ ماه' },
      ],
      features: ['طراحی ارگونومیک', 'جنس PVC ایمن', 'نگهدارنده نوشیدنی', 'قابل حمل', 'راحتی بالا'],
    },
    en: {
      name: 'Pool Float Lounge Mattress',
      brand: 'AquaLux',
      description: 'Inflatable pool lounge mattress with ergonomic design. Perfect for relaxation and swimming in pools and seas. Features a drink holder and back support.',
      specifications: [
        { label: 'Material', value: 'Phthalate-free PVC' },
        { label: 'Dimensions', value: '180 x 80 cm' },
        { label: 'Weight Capacity', value: 'Up to 120 kg' },
        { label: 'Warranty', value: '3 months' },
      ],
      features: ['Ergonomic Design', 'Safe PVC Material', 'Drink Holder', 'Portable', 'High Comfort'],
    },
  },
  {
    id: '4',
    slug: 'pool-filter-pump',
    category: 'equipment',
    image: 'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858624/pexels-photo-6858624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4726054/pexels-photo-4726054.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 8500000,
    inStock: true,
    rating: 4.7,
    reviewsCount: 56,
    fa: {
      name: 'پمپ فیلتر تصفیه استخر',
      brand: 'آکوا‌تک',
      description: 'پمپ تصفیه قدرتمند برای استخرهای خانگی و نیمه‌صنعتی با دبی ۱۵ متر مکعب در ساعت. موتور بی‌صدا و کم‌مصرف با فیلتر شنی چندلایه. تصفیه کامل ذرات معلق و آلاینده‌ها.',
      specifications: [
        { label: 'دبی', value: '۱۵ متر مکعب/ساعت' },
        { label: 'توان', value: '۱.۵ اسب بخار' },
        { label: 'ولتاژ', value: '۲۲۰ ولت' },
        { label: 'نوع فیلتر', value: 'شنی چندلایه' },
        { label: 'گارانتی', value: '۲۴ ماه' },
      ],
      features: ['موتور بی‌صدا', 'کم‌مصرف', 'فیلتر شنی', 'تصفیه کامل', 'نصب آسان'],
    },
    en: {
      name: 'Pool Filtration Pump System',
      brand: 'AquaTech',
      description: 'Powerful filtration pump for residential and semi-industrial pools with 15m³/h flow rate. Quiet, energy-efficient motor with multi-layer sand filter. Complete filtration of suspended particles and contaminants.',
      specifications: [
        { label: 'Flow Rate', value: '15 m³/h' },
        { label: 'Power', value: '1.5 HP' },
        { label: 'Voltage', value: '220V' },
        { label: 'Filter Type', value: 'Multi-layer Sand' },
        { label: 'Warranty', value: '24 months' },
      ],
      features: ['Quiet Motor', 'Energy Efficient', 'Sand Filter', 'Complete Filtration', 'Easy Installation'],
    },
  },
  {
    id: '5',
    slug: 'pool-cleaning-kit',
    category: 'maintenance',
    image: 'https://images.pexels.com/photos/6858624/pexels-photo-6858624.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/6858624/pexels-photo-6858624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 2200000,
    inStock: true,
    rating: 4.5,
    reviewsCount: 78,
    fa: {
      name: 'ست کامل نظافت استخر',
      brand: 'کلین‌پول',
      description: 'ست کامل ابزار نظافت استخر شامل تور جمع‌آوری برگ و زباله، برس دیواره، شلنگ تخلیه و میله تلسکوپی. تمامی قطعات از جنس فایبرگلاس و پلاستیک مقاوم.',
      specifications: [
        { label: 'تعداد قطعات', value: '۸ قطعه' },
        { label: 'طول میله', value: 'قابل تمدید تا ۴ متر' },
        { label: 'جنس', value: 'فایبرگلاس و پلاستیک مقاوم' },
        { label: 'گارانتی', value: '۱۲ ماه' },
      ],
      features: ['۸ قطعه کامل', 'میله تلسکوپی', 'تور جمع‌آوری برگ', 'برس دیواره', 'کیف حمل'],
    },
    en: {
      name: 'Complete Pool Cleaning Kit',
      brand: 'CleanPool',
      description: 'Complete pool cleaning tool set including leaf skimmer net, wall brush, drain hose, and telescopic pole. All parts made of durable fiberglass and plastic.',
      specifications: [
        { label: 'Pieces', value: '8 pieces' },
        { label: 'Pole Length', value: 'Extends to 4m' },
        { label: 'Material', value: 'Fiberglass & Durable Plastic' },
        { label: 'Warranty', value: '12 months' },
      ],
      features: ['8 Complete Pieces', 'Telescopic Pole', 'Leaf Skimmer', 'Wall Brush', 'Carrying Bag'],
    },
  },
  {
    id: '6',
    slug: 'swim-fins-pro',
    category: 'accessories',
    image: 'https://images.pexels.com/photos/1702804/pexels-photo-1702804.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1702804/pexels-photo-1702804.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8420725/pexels-photo-8420725.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 680000,
    inStock: true,
    rating: 4.4,
    reviewsCount: 67,
    fa: {
      name: 'باله شنا حرفه‌ای',
      brand: 'استخر‌بان',
      description: 'باله شنا حرفه‌ای با طراحی هیدرودینامیک برای افزایش سرعت و قدرت پا. مناسب تمرینات شنا و غواصی. جنس سیلیکون نرم با راحتی بالا.',
      specifications: [
        { label: 'جنس', value: 'سیلیکون نرم' },
        { label: 'سایز', value: '۳۸ تا ۴۶' },
        { label: 'وزن', value: '۴۵۰ گرم' },
        { label: 'گارانتی', value: '۶ ماه' },
      ],
      features: ['طراحی هیدرودینامیک', 'افزایش سرعت', 'سیلیکون نرم', 'راحتی بالا', 'مناسب غواصی'],
    },
    en: {
      name: 'Professional Swimming Fins',
      brand: 'PoolHub',
      description: 'Professional swimming fins with hydrodynamic design for increased speed and leg power. Suitable for swimming and diving training. Soft silicone material for high comfort.',
      specifications: [
        { label: 'Material', value: 'Soft Silicone' },
        { label: 'Sizes', value: '38 to 46' },
        { label: 'Weight', value: '450g' },
        { label: 'Warranty', value: '6 months' },
      ],
      features: ['Hydrodynamic Design', 'Speed Boost', 'Soft Silicone', 'High Comfort', 'Diving Compatible'],
    },
  },
  {
    id: '7',
    slug: 'pool-chemical-kit',
    category: 'maintenance',
    image: 'https://images.pexels.com/photos/4726054/pexels-photo-4726054.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/4726054/pexels-photo-4726054.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 1850000,
    inStock: true,
    rating: 4.6,
    reviewsCount: 45,
    fa: {
      name: 'ست مواد شیمیایی تعادل آب',
      brand: 'آکوا‌کم',
      description: 'ست کامل مواد شیمیایی برای تنظیم pH و ضدعفونی آب استخر شامل کلر، تنظیم‌کننده pH و تستر دیجیتال. راهنمای استفاده فارسی همراه محصول.',
      specifications: [
        { label: 'محتویات', value: 'کلر، تنظیم pH، تستر' },
        { label: 'ظرفیت', value: 'برای استخر تا ۵۰ متر مکعب' },
        { label: 'نوع تستر', value: 'دیجیتال' },
        { label: 'گارانتی', value: 'تستر ۱۲ ماه' },
      ],
      features: ['تنظیم pH', 'ضدعفونی کامل', 'تستر دیجیتال', 'راهنمای فارسی', 'ایمن و استاندارد'],
    },
    en: {
      name: 'Pool Water Chemical Balance Kit',
      brand: 'AquaChem',
      description: 'Complete chemical kit for pH balance and pool water disinfection including chlorine, pH adjuster, and digital tester. Includes English instruction guide.',
      specifications: [
        { label: 'Contents', value: 'Chlorine, pH adjuster, tester' },
        { label: 'Capacity', value: 'For pools up to 50m³' },
        { label: 'Tester Type', value: 'Digital' },
        { label: 'Warranty', value: 'Tester 12 months' },
      ],
      features: ['pH Balance', 'Full Disinfection', 'Digital Tester', 'Instruction Guide', 'Safe & Standard'],
    },
  },
  {
    id: '8',
    slug: 'rescue-ring',
    category: 'safety',
    image: 'https://images.pexels.com/photos/5077742/pexels-photo-5077742.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/5077742/pexels-photo-5077742.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/887821/pexels-photo-887821.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 950000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 112,
    fa: {
      name: 'حلقه نجات و جلیقه ایمنی',
      brand: 'سیف‌گارد',
      description: 'حلقه نجات استاندارد با طناب ۱۵ متری و جلیقه ایمنی کودکان. مناسب استخرهای خانگی و عمومی. جنس PVC مقاوم با رنگ نارنجی برای دید بالا.',
      specifications: [
        { label: 'قطر حلقه', value: '۷۰ سانتی‌متر' },
        { label: 'طول طناب', value: '۱۵ متر' },
        { label: 'جنس', value: 'PVC مقاوم' },
        { label: 'استاندارد', value: 'ISO 12402' },
      ],
      features: ['استاندارد ISO', 'طناب ۱۵ متری', 'رنگ نارنجی', 'جلیقه کودکان', 'پایداری بالا'],
    },
    en: {
      name: 'Rescue Ring & Safety Vest',
      brand: 'SafeGuard',
      description: 'Standard rescue ring with 15m rope and children safety vest. Suitable for home and public pools. Durable PVC material in high-visibility orange.',
      specifications: [
        { label: 'Ring Diameter', value: '70 cm' },
        { label: 'Rope Length', value: '15 meters' },
        { label: 'Material', value: 'Durable PVC' },
        { label: 'Standard', value: 'ISO 12402' },
      ],
      features: ['ISO Standard', '15m Rope', 'High Visibility', 'Child Vest', 'High Stability'],
    },
  },
  {
    id: '9',
    slug: 'pool-heater',
    category: 'equipment',
    image: 'https://images.pexels.com/photos/17650007/pexels-photo-17650007.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/17650007/pexels-photo-17650007.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 12500000,
    oldPrice: 14000000,
    inStock: true,
    rating: 4.7,
    reviewsCount: 34,
    fa: {
      name: 'گرم‌کن آب استخر (Heat Pump)',
      brand: 'آکوا‌هیت',
      description: 'پمپ حرارتی برای گرم کردن آب استخر با راندمان بالا و مصرف بهینه انرژی. قابلیت گرم کردن آب تا ۴۰ درجه سانتی‌گراد. مناسب استخرهای خانگی و نیمه‌صنعتی.',
      specifications: [
        { label: 'توان گرمایی', value: '۹ کیلووات' },
        { label: 'حداکثر دما', value: '۴۰ درجه' },
        { label: 'ولتاژ', value: '۲۲۰ ولت' },
        { label: 'گارانتی', value: '۳۶ ماه' },
      ],
      features: ['راندمان بالا', 'مصرف بهینه', 'گرم تا ۴۰ درجه', 'نصب آسان', 'بی‌صدا'],
    },
    en: {
      name: 'Pool Water Heat Pump',
      brand: 'AquaHeat',
      description: 'Heat pump for warming pool water with high efficiency and optimal energy consumption. Can heat water up to 40°C. Suitable for residential and semi-industrial pools.',
      specifications: [
        { label: 'Heating Power', value: '9 kW' },
        { label: 'Max Temperature', value: '40°C' },
        { label: 'Voltage', value: '220V' },
        { label: 'Warranty', value: '36 months' },
      ],
      features: ['High Efficiency', 'Energy Saving', 'Heats to 40°C', 'Easy Install', 'Quiet Operation'],
    },
  },
  {
    id: '10',
    slug: 'swimwear-pro',
    category: 'swimwear',
    image: 'https://images.pexels.com/photos/11781297/pexels-photo-11781297.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/11781297/pexels-photo-11781297.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4995738/pexels-photo-4995738.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 540000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 156,
    fa: {
      name: 'مایو حرفه‌ای مسابقاتی',
      brand: 'آکوا‌ویر',
      description: 'مایو حرفه‌ای مسابقاتی با طراحی کاملاً هیدرودینامیک و پارچه ضد کلر. کاهش اصطکاک آب و افزایش سرعت شناگر. مناسب مسابقات حرفه‌ای و تمرینات.',
      specifications: [
        { label: 'جنس', value: 'پلی‌استر/اسپاندکس ضد کلر' },
        { label: 'سایز', value: 'XS تا XXL' },
        { label: 'وزن', value: '۲۲۰ گرم' },
        { label: 'گارانتی', value: '۶ ماه' },
      ],
      features: ['ضد کلر', 'هیدرودینامیک', 'کاهش اصطکاک', 'راحتی بالا', 'سایزبندی کامل'],
    },
    en: {
      name: 'Professional Competition Swimwear',
      brand: 'AquaWear',
      description: 'Professional competition swimwear with fully hydrodynamic design and chlorine-resistant fabric. Reduces water friction and increases swimmer speed. Suitable for competitions and training.',
      specifications: [
        { label: 'Material', value: 'Chlorine-resistant Polyester/Spandex' },
        { label: 'Size Range', value: 'XS to XXL' },
        { label: 'Weight', value: '220g' },
        { label: 'Warranty', value: '6 months' },
      ],
      features: ['Chlorine Resistant', 'Hydrodynamic', 'Friction Reduction', 'High Comfort', 'Full Size Range'],
    },
  },
  {
    id: '11',
    slug: 'pool-light-led',
    category: 'equipment',
    image: 'https://images.pexels.com/photos/4726054/pexels-photo-4726054.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/4726054/pexels-photo-4726054.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 3200000,
    inStock: true,
    rating: 4.6,
    reviewsCount: 41,
    fa: {
      name: 'چراغ زیرآبی LED استخر',
      brand: 'آکوا‌لایت',
      description: 'چراغ زیرآبی LED با ۱۶ رنگ قابل تغییر و کنترل از راه دور. مصرف بهینه انرژی و عمر طولانی. ضدآب IP68 و مناسب تمام استخرها.',
      specifications: [
        { label: 'توان', value: '۳۰ وات' },
        { label: 'تعداد رنگ', value: '۱۶ رنگ' },
        { label: 'استاندارد', value: 'IP68' },
        { label: 'گارانتی', value: '۲۴ ماه' },
      ],
      features: ['۱۶ رنگ', 'کنترل از راه دور', 'IP68', 'کم‌مصرف', 'عمر طولانی'],
    },
    en: {
      name: 'LED Underwater Pool Light',
      brand: 'AquaLight',
      description: 'Underwater LED light with 16 changeable colors and remote control. Optimal energy consumption and long lifespan. IP68 waterproof, suitable for all pools.',
      specifications: [
        { label: 'Power', value: '30W' },
        { label: 'Colors', value: '16 colors' },
        { label: 'Standard', value: 'IP68' },
        { label: 'Warranty', value: '24 months' },
      ],
      features: ['16 Colors', 'Remote Control', 'IP68', 'Low Power', 'Long Lifespan'],
    },
  },
  {
    id: '12',
    slug: 'pool-cover-solar',
    category: 'maintenance',
    image: 'https://images.pexels.com/photos/6858624/pexels-photo-6858624.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/6858624/pexels-photo-6858624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    price: 1750000,
    inStock: false,
    rating: 4.5,
    reviewsCount: 38,
    fa: {
      name: 'روکش خورشیدی استخر',
      brand: 'کلین‌پول',
      description: 'روکش خورشیدی برای حفظ گرمای آب و کاهش تبخیر. جنس پلی‌اتیلن حباب‌دار با قابلیت جذب انرژی خورشید. کاهش هزینه گرمایش تا ۷۰ درصد.',
      specifications: [
        { label: 'جنس', value: 'پلی‌اتیلن حباب‌دار' },
        { label: 'ضخامت', value: '۴۰۰ میکرون' },
        { label: 'رنگ', value: 'آبی تیره' },
        { label: 'گارانتی', value: '۱۲ ماه' },
      ],
      features: ['حفظ گرما', 'کاهش تبخیر', 'جذب انرژی خورشید', 'صرفه‌جویی ۷۰٪', 'نصب آسان'],
    },
    en: {
      name: 'Solar Pool Cover',
      brand: 'CleanPool',
      description: 'Solar cover to retain water heat and reduce evaporation. Bubble polyethylene material that absorbs solar energy. Reduces heating costs by up to 70%.',
      specifications: [
        { label: 'Material', value: 'Bubble Polyethylene' },
        { label: 'Thickness', value: '400 microns' },
        { label: 'Color', value: 'Dark Blue' },
        { label: 'Warranty', value: '12 months' },
      ],
      features: ['Heat Retention', 'Reduces Evaporation', 'Solar Absorption', '70% Savings', 'Easy Install'],
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
