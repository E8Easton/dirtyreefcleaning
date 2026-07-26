/** @typedef {{ path: string; title: string; description: string; keywords: string; h1: string; intro: string; breadcrumb: string }} SeoPage */

const SITE = {
  name: "Reef Cleaning",
  legalName: "Reef Cleaning",
  url: "https://dirtyreefcleaning.com",
  phone: "+1-402-235-6046",
  phoneDisplay: "(402) 235-6046",
  email: "lincoln@dirtyreefcleaning.com",
  logo: "/assets/0_Logo_sobre_asesor_financiero_abstracto_verde_y_negro_(1)_1785021540239-DavXeRxF.webp",
  ogImage: "/assets/1_reef_cleaning_truck_1785021570012-DQ92KwYj.webp",
  tagline: "Lincoln & Kearney's trusted residential and commercial cleaning company",
  locales: {
    lincoln: {
      city: "Lincoln",
      state: "Nebraska",
      stateCode: "NE",
      lat: 40.8136,
      lng: -96.7026,
      neighborhoods: [
        "South Lincoln",
        "North Lincoln",
        "East Lincoln",
        "West Lincoln",
        "Air Park",
        "Country Club",
        "Havelock",
        "Edenton",
      ],
    },
    kearney: {
      city: "Kearney",
      state: "Nebraska",
      stateCode: "NE",
      lat: 40.6993,
      lng: -99.0817,
      neighborhoods: [
        "Central Kearney",
        "North Kearney",
        "South Kearney",
        "East Kearney",
        "West Kearney",
        "Downtown Kearney",
      ],
    },
  },
};

const SERVICES = [
  {
    name: "Residential House Cleaning",
    description:
      "Standard recurring home cleans — weekly, bi-weekly, or monthly. Keep your living space consistently spotless.",
  },
  {
    name: "Commercial Office Cleaning",
    description:
      "Professional cleaning for offices and business spaces. Reliable service that impresses clients and supports your team.",
  },
  {
    name: "Move-In Cleaning",
    description:
      "Meticulous deep clean before you settle in — cabinets, baseboards, appliances, and every corner.",
  },
  {
    name: "Move-Out Cleaning",
    description:
      "Thorough move-out cleans for renters and homeowners. Help protect deposits and prepare properties for showings.",
  },
  {
    name: "Deep Cleaning",
    description:
      "Top-to-bottom intensive cleaning for spring cleaning, post-renovation, or when your home needs a reset.",
  },
  {
    name: "Recurring Subscription Plans",
    description:
      "Lock in regular cleanings and save on every visit. Flexible rescheduling; cancel anytime.",
  },
  {
    name: "Window & Track Cleaning",
    description: "Windows and tracks cleaned for a brighter home or office.",
  },
  {
    name: "Patio Cleaning",
    description: "Outdoor patio cleaning to refresh your exterior living spaces.",
  },
];

const FAQ = [
  {
    q: "What areas does Reef Cleaning serve in Nebraska?",
    a: "Reef Cleaning provides residential and commercial cleaning throughout Lincoln, NE and Kearney, NE, including surrounding neighborhoods. Request a free quote for your address.",
  },
  {
    q: "What types of cleaning services do you offer?",
    a: "We offer standard and deep house cleaning, recurring subscription plans, move-in and move-out cleaning, commercial office cleaning, window and track cleaning, and patio cleaning.",
  },
  {
    q: "How do I get a free cleaning quote?",
    a: "Call (402) 235-6046 or use the quote form on our Lincoln or Kearney page. Tell us your home size, service type, and preferred schedule — we respond quickly with pricing.",
  },
  {
    q: "Do you offer weekly or bi-weekly house cleaning?",
    a: "Yes. Recurring plans include weekly, every two weeks, and monthly options — our most popular plan keeps your home consistently fresh with the same trusted team.",
  },
  {
    q: "Do you clean offices and commercial spaces in Kearney and Lincoln?",
    a: "Yes. Our commercial cleaning service keeps offices spotless on a reliable schedule — ideal for small businesses and professional teams.",
  },
];

/** @type {SeoPage[]} */
const PAGES = [
  {
    path: "/",
    title: "House & Office Cleaning Lincoln & Kearney NE | Reef Cleaning",
    description:
      "Reef Cleaning — Lincoln & Kearney's trusted cleaners. Residential, commercial, deep, move-in/out cleaning & subscription plans. Call (402) 235-6046 for a free quote.",
    keywords:
      "house cleaning Lincoln NE, house cleaning Kearney NE, commercial cleaning Lincoln, office cleaning Kearney, deep cleaning Nebraska, move out cleaning Lincoln, maid service Lincoln NE, cleaning service Kearney NE, Reef Cleaning",
    h1: "Professional House & Office Cleaning in Lincoln and Kearney, Nebraska",
    intro:
      "Reef Cleaning is Lincoln and Kearney's choice for reliable residential and commercial cleaning — recurring home plans, deep cleans, move-in/move-out service, and office cleaning with the same trusted team every visit.",
    breadcrumb: "Home",
  },
  {
    path: "/lincoln",
    title: "House Cleaning Lincoln NE | Commercial & Deep Clean | Reef Cleaning",
    description:
      "Top-rated house & office cleaning in Lincoln, Nebraska — South, North, East & West Lincoln. Deep clean, move-out, subscriptions. Free quote: (402) 235-6046.",
    keywords:
      "house cleaning Lincoln NE, maid service Lincoln, deep cleaning Lincoln Nebraska, move out cleaning Lincoln, office cleaning Lincoln NE, residential cleaning Lincoln, apartment cleaning Lincoln, Reef Cleaning Lincoln",
    h1: "House Cleaning & Office Cleaning in Lincoln, Nebraska",
    intro:
      "From South Lincoln to Havelock and Country Club, Reef Cleaning delivers meticulous home cleaning, deep cleans, move-in/move-out service, and commercial office cleaning across Lincoln, NE.",
    breadcrumb: "Lincoln",
  },
  {
    path: "/kearney",
    title: "House Cleaning Kearney NE | Office & Move-Out Clean | Reef Cleaning",
    description:
      "Professional cleaning in Kearney, NE — Central, Downtown & all neighborhoods. Residential, commercial, move-out & subscription plans. Free quote: (402) 235-6046.",
    keywords:
      "house cleaning Kearney NE, maid service Kearney, commercial cleaning Kearney Nebraska, move out cleaning Kearney, office cleaning Kearney NE, deep cleaning Kearney, residential cleaning Kearney, Reef Cleaning Kearney",
    h1: "House Cleaning & Office Cleaning in Kearney, Nebraska",
    intro:
      "Serving Central Kearney, Downtown, and surrounding areas, Reef Cleaning offers dependable residential cleaning, office commercial service, move-out cleans, and money-saving subscription plans.",
    breadcrumb: "Kearney",
  },
];

module.exports = { SITE, SERVICES, FAQ, PAGES };
