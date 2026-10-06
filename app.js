/**
 * KASARE_Demo - Core Application Logic
 * Supports bilingual (English / Marathi), client-side routing,
 * advisory filtering, reference farm modal, and simulated admin auth.
 */

// Application State
const state = {
  lang: 'en', // 'en' | 'mr'
  currentPage: 'home', // 'home' | 'advisories' | 'admin'
  advisoryFilter: 'all',
  selectedFarmId: null,
  isAdminLoggedIn: false,
  adminMode: 'login' // 'login' | 'signup'
};

// Translations Dictionary
const i18nData = {
  en: {
    // Header & Nav
    portal_name: 'KASARE_Demo',
    tagline: 'Agricultural Advisory Prototype',
    nav_home: 'Home',
    nav_advisories: 'Advisories',
    nav_admin: 'Admin / R&D',
    sensor_notice: 'Advisories are generated using information from soil, water and weather sensors.',
    
    // Page 1: Home - Advisories
    heading_current_advisories: 'Current Advisories',
    subheading_current_advisories: 'Live action points for crop clusters',
    btn_view_all_advisories: 'View All Advisories →',
    ref_farm: 'Reference Farm',
    
    // Visual indicators
    badge_normal: 'Normal',
    badge_attention: 'Attention',
    badge_important: 'Important',
    status_active: 'Active',
    
    // Weather
    heading_weather: 'Weather',
    subheading_weather: 'Cluster local forecast',
    weather_partly_cloudy: 'Partly Cloudy',
    weather_humidity: 'Humidity',
    weather_rainfall: 'Rainfall',
    weather_rain_prob: 'Rain Probability',
    weather_wind: 'Wind Speed',
    heading_forecast: '5-Day Forecast',
    
    // Days
    day_today: 'Today',
    day_tue: 'Tue',
    day_wed: 'Wed',
    day_thu: 'Thu',
    day_fri: 'Fri',
    
    // Reference Farms
    heading_reference_farms: 'Reference Farms',
    subheading_reference_farms: '10 active reference farms monitoring regional crops',
    badge_farms_total: 'Total: 10 Farms',
    label_crop: 'Crop',
    label_sowing_date: 'Sowing Date',
    label_followers: 'Followers',
    label_status: 'Status',
    btn_view_details: 'View Details',
    
    // Modal
    modal_title: 'Reference Farm Details',
    label_farm_code: 'Farm Code',
    label_crop_stage: 'Crop Stage',
    label_latest_advisory: 'Latest Advisory',
    modal_disclaimer: 'Advisories are generated using information from soil, water and weather sensors.',
    btn_close: 'Close',
    
    // Page 2: Advisories
    heading_all_advisories: 'Advisories',
    subheading_all_advisories: 'Comprehensive list of cluster recommendations',
    filter_label: 'Filter by type:',
    filter_all: 'All',
    filter_irrigation: '💧 Irrigation',
    filter_weather: '🌧️ Weather',
    filter_pest: '🐛 Pest',
    filter_nutrient: '🌱 Nutrient',
    filter_water: '🌊 Water',
    label_date: 'Date',
    no_advisories_found: 'No advisories found for the selected category.',
    
    // Page 3: Admin / R&D
    heading_admin: 'Admin / R&D',
    desc_admin: 'Restricted access for research and development',
    tab_login: 'Login',
    tab_signup: 'New Admin? Create Account',
    label_email_username: 'Email / Username',
    label_password: 'Password',
    label_name: 'Full Name',
    label_email: 'Email',
    label_confirm_password: 'Confirm Password',
    btn_login: 'Login',
    btn_create_account: 'Create Account',
    note_new_admin: 'New Admin?',
    link_create_account: 'Create Account',
    note_have_account: 'Already registered?',
    link_login_here: 'Login here',
    auth_welcome_title: 'Welcome to KASARE_Demo R&D Portal',
    auth_welcome_desc: 'Prototype authentication confirmed. The R&D research dashboard is currently under development.',
    btn_logout: 'Sign Out',
    
    // Footer
    footer_platform_desc: 'Agricultural Advisory Platform'
  },
  
  mr: {
    // Header & Nav
    portal_name: 'KASARE_Demo',
    tagline: 'कृषी सल्लागार प्रोटोटाइप',
    nav_home: 'मुख्यपृष्ठ',
    nav_advisories: 'कृषी सल्ले',
    nav_admin: 'प्रशासक / R&D',
    sensor_notice: 'माती, पाणी आणि हवामान सेन्सर्समधील माहितीच्या आधारे सल्ले तयार केले जातात.',
    
    // Page 1: Home - Advisories
    heading_current_advisories: 'चालू सल्ले',
    subheading_current_advisories: 'पीक समूहांसाठी थेट कृती सूचना',
    btn_view_all_advisories: 'सर्व सल्ले पहा →',
    ref_farm: 'संदर्भ शेत',
    
    // Visual indicators
    badge_normal: 'सामान्य',
    badge_attention: 'लक्ष द्या',
    badge_important: 'महत्त्वाचे',
    status_active: 'सक्रिय',
    
    // Weather
    heading_weather: 'हवामान',
    subheading_weather: 'स्थानिक हवामान अंदाज',
    weather_partly_cloudy: 'अंशतः ढगाळ',
    weather_humidity: 'आर्द्रता',
    weather_rainfall: 'पाऊस',
    weather_rain_prob: 'पावसाची शक्यता',
    weather_wind: 'वाऱ्याचा वेग',
    heading_forecast: '५ दिवसांचा अंदाज',
    
    // Days
    day_today: 'आज',
    day_tue: 'मंगळ',
    day_wed: 'बुध',
    day_thu: 'गुरु',
    day_fri: 'शुक्र',
    
    // Reference Farms
    heading_reference_farms: 'संदर्भ शेतं',
    subheading_reference_farms: 'प्रादेशिक पिकांवर देखरेख ठेवणारी १० सक्रिय संदर्भ शेतं',
    badge_farms_total: 'एकूण: १० शेतं',
    label_crop: 'पीक',
    label_sowing_date: 'पेरणी दिनांक',
    label_followers: 'अनुयायी शेतकरी',
    label_status: 'स्थिती',
    btn_view_details: 'तपशील पहा',
    
    // Modal
    modal_title: 'संदर्भ शेत तपशील',
    label_farm_code: 'शेत कोड',
    label_crop_stage: 'पीक वाढीची अवस्था',
    label_latest_advisory: 'नवीनतम सल्ला',
    modal_disclaimer: 'माती, पाणी आणि हवामान सेन्सर्समधील माहितीच्या आधारे सल्ले तयार केले जातात.',
    btn_close: 'बंद करा',
    
    // Page 2: Advisories
    heading_all_advisories: 'कृषी सल्ले',
    subheading_all_advisories: 'पीक समूहासाठी सर्व मार्गदर्शक शिफारसींची यादी',
    filter_label: 'प्रकारानुसार निवडा:',
    filter_all: 'सर्व',
    filter_irrigation: '💧 सिंचन',
    filter_weather: '🌧️ हवामान',
    filter_pest: '🐛 कीड',
    filter_nutrient: '🌱 पोषण',
    filter_water: '🌊 पाणी',
    label_date: 'दिनांक',
    no_advisories_found: 'निवडलेल्या प्रकारासाठी सल्ले उपलब्ध नाहीत.',
    
    // Page 3: Admin / R&D
    heading_admin: 'प्रशासक / R&D',
    desc_admin: 'संशोधन आणि विकासासाठी मर्यादित प्रवेश',
    tab_login: 'लॉगिन',
    tab_signup: 'नवीन प्रशासक? खाते तयार करा',
    label_email_username: 'ईमेल / वापरकर्ता नाव',
    label_password: 'पासवर्ड',
    label_name: 'पूर्ण नाव',
    label_email: 'ईमेल',
    label_confirm_password: 'पासवर्ड पुष्टी करा',
    btn_login: 'लॉगिन करा',
    btn_create_account: 'खाते तयार करा',
    note_new_admin: 'नवीन प्रशासक?',
    link_create_account: 'खाते तयार करा',
    note_have_account: 'आधीच नोंदणीकृत आहात?',
    link_login_here: 'येथे लॉगिन करा',
    auth_welcome_title: 'KASARE_Demo R&D पोर्टलवर आपले स्वागत आहे',
    auth_welcome_desc: 'प्रोटोटाइप प्रमाणीकरण यशस्वी झाले. R&D संशोधन डॅशबोर्ड सध्या विकासाधीन आहे.',
    btn_logout: 'लॉगआउट',
    
    // Footer
    footer_platform_desc: 'कृषी सल्लागार व्यासपीठ'
  }
};

// 10 Exact Reference Farms
const referenceFarms = [
  {
    code: 'A1',
    crop: { en: 'Paddy', mr: 'भात' },
    sowingDate: { en: '18 June 2026', mr: '१८ जून २०२६' },
    stage: { en: 'Vegetative', mr: 'शाकीय वाढ' },
    followers: 27,
    status: 'active',
    advisory: {
      en: 'Soil moisture is low. Irrigation is recommended.',
      mr: 'मातीतील ओलावा कमी आहे. सिंचन करण्याची शिफारस केली जाते.'
    }
  },
  {
    code: 'A2',
    crop: { en: 'Cotton', mr: 'कापूस' },
    sowingDate: { en: '22 June 2026', mr: '२२ जून २०२६' },
    stage: { en: 'Flowering', mr: 'फुलोरा अवस्था' },
    followers: 34,
    status: 'active',
    advisory: {
      en: 'Inspect for sucking pests on lower leaf surfaces.',
      mr: 'पानांच्या खालच्या बाजूला रसशोषक किडींचे निरीक्षण करा.'
    }
  },
  {
    code: 'B1',
    crop: { en: 'Soybean', mr: 'सोयाबीन' },
    sowingDate: { en: '25 June 2026', mr: '२५ जून २०२६' },
    stage: { en: 'Pod Formation', mr: 'शेंगा भरणे अवस्था' },
    followers: 42,
    status: 'active',
    advisory: {
      en: 'Rain is expected. Avoid irrigation today.',
      mr: 'पावसाची शक्यता आहे. आज सिंचन टाळावे.'
    }
  },
  {
    code: 'B2',
    crop: { en: 'Paddy', mr: 'भात' },
    sowingDate: { en: '20 June 2026', mr: '२० जून २०२६' },
    stage: { en: 'Tillering', mr: 'फुटवे येणे अवस्था' },
    followers: 19,
    status: 'active',
    advisory: {
      en: 'Maintain standing water level of 2–3 cm in plots.',
      mr: 'वाफ्यांमध्ये २-३ सेमी पाणी साठवून ठेवा.'
    }
  },
  {
    code: 'C1',
    crop: { en: 'Sugarcane', mr: 'ऊस' },
    sowingDate: { en: '10 March 2026', mr: '१० मार्च २०२६' },
    stage: { en: 'Grand Growth', mr: 'जोमदार वाढ' },
    followers: 53,
    status: 'active',
    advisory: {
      en: 'Weather conditions are favourable for pest development. Monitor the crop.',
      mr: 'हवामान किडींच्या वाढीसाठी अनुकूल आहे. पिकाचे नियमित निरीक्षण करा.'
    }
  },
  {
    code: 'C2',
    crop: { en: 'Onion', mr: 'कांदा' },
    sowingDate: { en: '05 August 2026', mr: '०५ ऑगस्ट २०२६' },
    stage: { en: 'Bulb Development', mr: 'कंद वाढ अवस्था' },
    followers: 31,
    status: 'active',
    advisory: {
      en: 'Apply light irrigation in late evening to support bulb expansion.',
      mr: 'कंदाच्या चांगल्या पोषणासाठी सायंकाळी हलके पाणी द्यावे.'
    }
  },
  {
    code: 'D1',
    crop: { en: 'Wheat', mr: 'गहू' },
    sowingDate: { en: '15 November 2025', mr: '१५ नोव्हेंबर २०२५' },
    stage: { en: 'Grain Filling', mr: 'दाणे भरणे अवस्था' },
    followers: 22,
    status: 'active',
    advisory: {
      en: 'Current crop conditions indicate that nutrient management should be monitored.',
      mr: 'पिकाची सद्यस्थिती पाहता पोषण व्यवस्थापनावर लक्ष ठेवणे आवश्यक आहे.'
    }
  },
  {
    code: 'D2',
    crop: { en: 'Paddy', mr: 'भात' },
    sowingDate: { en: '16 June 2026', mr: '१६ जून २०२६' },
    stage: { en: 'Panicle Initiation', mr: 'लोंबी फुटणे अवस्था' },
    followers: 38,
    status: 'active',
    advisory: {
      en: 'Top dressing of nitrogen fertilizer advised under moist soil.',
      mr: 'मातीत ओल असताना युरियाची दुसरी मात्रा देण्याचा सल्ला आहे.'
    }
  },
  {
    code: 'E1',
    crop: { en: 'Cotton', mr: 'कापूस' },
    sowingDate: { en: '28 June 2026', mr: '२८ जून २०२६' },
    stage: { en: 'Square Formation', mr: 'पात्या लागणे अवस्था' },
    followers: 29,
    status: 'active',
    advisory: {
      en: 'Soil moisture adequate. Postpone watering by 3 days.',
      mr: 'मातीमध्ये पुरेसा ओलावा आहे. पुढील ३ दिवस पाणी देणे लांबणीवर टाका.'
    }
  },
  {
    code: 'E2',
    crop: { en: 'Soybean', mr: 'सोयाबीन' },
    sowingDate: { en: '02 July 2026', mr: '०२ जुलै २०२६' },
    stage: { en: 'Vegetative', mr: 'शाकीय वाढ' },
    followers: 25,
    status: 'active',
    advisory: {
      en: 'Weeding recommended before incoming light showers.',
      mr: 'पुढील हलक्या पावसापूर्वी खुरपणी करून शेत स्वच्छ ठेवावे.'
    }
  }
];

// Sample Advisories Data
const allAdvisoriesData = [
  {
    id: 1,
    type: 'irrigation',
    title: { en: '💧 Irrigation Advisory', mr: '💧 सिंचन सल्ला' },
    farmCode: 'A1',
    date: { en: '05 October 2026', mr: '०५ ऑक्टोबर २०२६' },
    level: 'attention', // yellow
    message: {
      en: 'Soil moisture is low. Irrigation is recommended.',
      mr: 'मातीतील ओलावा कमी आहे. सिंचन करण्याची शिफारस केली जाते.'
    },
    status: 'active',
    showOnHome: true
  },
  {
    id: 2,
    type: 'weather',
    title: { en: '🌧️ Rain Advisory', mr: '🌧️ पाऊस सल्ला' },
    farmCode: 'B1',
    date: { en: '05 October 2026', mr: '०५ ऑक्टोबर २०२६' },
    level: 'normal', // green
    message: {
      en: 'Rain is expected. Avoid irrigation today.',
      mr: 'पावसाची शक्यता आहे. आज सिंचन टाळावे.'
    },
    status: 'active',
    showOnHome: true
  },
  {
    id: 3,
    type: 'pest',
    title: { en: '🐛 Pest Advisory', mr: '🐛 कीड सल्ला' },
    farmCode: 'C1',
    date: { en: '04 October 2026', mr: '०४ ऑक्टोबर २०२६' },
    level: 'important', // red
    message: {
      en: 'Weather conditions are favourable for pest development. Monitor the crop.',
      mr: 'हवामान किडींच्या वाढीसाठी अनुकूल आहे. पिकाचे नियमित निरीक्षण करा.'
    },
    status: 'active',
    showOnHome: true
  },
  {
    id: 4,
    type: 'nutrient',
    title: { en: '🌱 Crop Advisory', mr: '🌱 पीक सल्ला' },
    farmCode: 'D1',
    date: { en: '03 October 2026', mr: '०३ ऑक्टोबर २०२६' },
    level: 'normal', // green
    message: {
      en: 'Current crop conditions indicate that nutrient management should be monitored.',
      mr: 'पिकाची सद्यस्थिती पाहता पोषण व्यवस्थापनावर लक्ष ठेवणे आवश्यक आहे.'
    },
    status: 'active',
    showOnHome: true
  },
  {
    id: 5,
    type: 'water',
    title: { en: '🌊 Water Drainage Advisory', mr: '🌊 निचरा सल्ला' },
    farmCode: 'B2',
    date: { en: '02 October 2026', mr: '०२ ऑक्टोबर २०२६' },
    level: 'attention',
    message: {
      en: 'Ensure water drainage channels in low-lying bunds are unclogged before showers.',
      mr: 'पावसापूर्वी सखल बांधांमधील पाणी निचरा मार्ग मोकळे ठेवा.'
    },
    status: 'active',
    showOnHome: false
  },
  {
    id: 6,
    type: 'pest',
    title: { en: '🐛 Pest Advisory', mr: '🐛 कीड सल्ला' },
    farmCode: 'A2',
    date: { en: '01 October 2026', mr: '०१ ऑक्टोबर २०२६' },
    level: 'attention',
    message: {
      en: 'Early signs of whitefly detected on border rows. Keep yellow sticky traps.',
      mr: 'काठच्या ओळींवर पांढरी माशी आढळली आहे. पिवळे चिकट सापळे लावावेत.'
    },
    status: 'active',
    showOnHome: false
  },
  {
    id: 7,
    type: 'irrigation',
    title: { en: '💧 Irrigation Advisory', mr: '💧 सिंचन सल्ला' },
    farmCode: 'C2',
    date: { en: '30 September 2026', mr: '३० सप्टेंबर २०२६' },
    level: 'normal',
    message: {
      en: 'Soil tension in root zone optimal. Drip irrigation can run on default cycle.',
      mr: 'मुळांच्या भागातील ओलावा योग्य आहे. ठिबक सिंचन नियमित वेळापत्रकानुसार सुरू ठेवा.'
    },
    status: 'active',
    showOnHome: false
  },
  {
    id: 8,
    type: 'nutrient',
    title: { en: '🌱 Nutrient Advisory', mr: '🌱 पोषण सल्ला' },
    farmCode: 'D2',
    date: { en: '29 September 2026', mr: '२९ सप्टेंबर २०२६' },
    level: 'attention',
    message: {
      en: 'Apply micronutrient spray (Zinc Sulphate) during calm morning hours.',
      mr: 'सकाळच्या शांत वेळेत सूक्ष्म अन्नद्रव्यांची (झिंक सल्फेट) फवारणी करा.'
    },
    status: 'active',
    showOnHome: false
  }
];

// 5-Day Forecast Data
const forecastData = [
  { dayKey: 'day_today', icon: '☀️', temp: '28°C', rain: '20%', isToday: true },
  { dayKey: 'day_tue', icon: '🌤️', temp: '29°C', rain: '30%', isToday: false },
  { dayKey: 'day_wed', icon: '🌧️', temp: '27°C', rain: '70%', isToday: false },
  { dayKey: 'day_thu', icon: '🌧️', temp: '26°C', rain: '80%', isToday: false },
  { dayKey: 'day_fri', icon: '🌤️', temp: '28°C', rain: '40%', isToday: false }
];

/* ==========================================================================
   Navigation & Page Routing
   ========================================================================== */

function navigateTo(pageId) {
  state.currentPage = pageId;
  
  // Update view containers
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update nav buttons
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile menu if opened
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    mainNav.classList.remove('open');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL hash without reload
  if (window.location.hash !== `#${pageId}`) {
    history.replaceState(null, '', `#${pageId}`);
  }
}

// Listen to browser hash change
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'advisories', 'admin'].includes(hash)) {
    navigateTo(hash);
  }
});

/* ==========================================================================
   Language Switching
   ========================================================================== */

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'mr') return;
  state.lang = lang;

  // Toggle active class on language switcher
  const btnEn = document.getElementById('btn-lang-en');
  const btnMr = document.getElementById('btn-lang-mr');
  if (lang === 'en') {
    btnEn.classList.add('active');
    btnMr.classList.remove('active');
    document.documentElement.lang = 'en';
  } else {
    btnMr.classList.add('active');
    btnEn.classList.remove('active');
    document.documentElement.lang = 'mr';
  }

  // Update static elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang] && i18nData[lang][key]) {
      el.textContent = i18nData[lang][key];
    }
  });

  // Re-render dynamic sections
  renderHomeAdvisories();
  renderForecast();
  renderReferenceFarms();
  renderAdvisoriesList();
  
  // If modal is open, re-render modal
  if (state.selectedFarmId) {
    populateModalData(state.selectedFarmId);
  }
}

/* ==========================================================================
   Render Current Advisories (Home Page)
   ========================================================================== */

function renderHomeAdvisories() {
  const container = document.getElementById('home-advisory-cards');
  if (!container) return;

  const t = i18nData[state.lang];
  const homeItems = allAdvisoriesData.filter(item => item.showOnHome);

  container.innerHTML = homeItems.map(item => {
    let pillClass = 'pill-normal';
    let pillText = t.badge_normal;
    if (item.level === 'attention') {
      pillClass = 'pill-attention';
      pillText = t.badge_attention;
    } else if (item.level === 'important') {
      pillClass = 'pill-important';
      pillText = t.badge_important;
    }

    return `
      <article class="advisory-card level-${item.level}">
        <div class="advisory-header-row">
          <div class="advisory-title-wrap">
            <span>${item.title[state.lang]}</span>
          </div>
          <span class="advisory-pill ${pillClass}">${pillText}</span>
        </div>
        <p class="advisory-body-text">${item.message[state.lang]}</p>
        <div class="advisory-footer-row">
          <span>${t.ref_farm}: <strong class="farm-badge">${item.farmCode}</strong></span>
          <span>${item.date[state.lang]}</span>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   Render 5-Day Forecast
   ========================================================================== */

function renderForecast() {
  const container = document.getElementById('forecast-grid');
  if (!container) return;

  const t = i18nData[state.lang];

  container.innerHTML = forecastData.map(item => {
    const dayLabel = t[item.dayKey];
    return `
      <div class="forecast-card ${item.isToday ? 'is-today' : ''}">
        <span class="forecast-day">${dayLabel}</span>
        <span class="forecast-icon">${item.icon}</span>
        <span class="forecast-temp">${item.temp}</span>
        <span class="forecast-rain">💧 ${item.rain}</span>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Render Reference Farms
   ========================================================================== */

function renderReferenceFarms() {
  const container = document.getElementById('farms-grid');
  if (!container) return;

  const t = i18nData[state.lang];

  container.innerHTML = referenceFarms.map(farm => {
    return `
      <div class="farm-card">
        <div>
          <div class="farm-card-top">
            <span class="farm-card-code">${farm.code}</span>
            <span class="farm-status-pill">${t.status_active}</span>
          </div>
          <div class="farm-card-meta" style="margin-top: 10px;">
            <div class="farm-meta-row">
              <span class="farm-meta-label">${t.label_crop}:</span>
              <span class="farm-meta-val">${farm.crop[state.lang]}</span>
            </div>
            <div class="farm-meta-row">
              <span class="farm-meta-label">${t.label_sowing_date}:</span>
              <span class="farm-meta-val">${farm.sowingDate[state.lang]}</span>
            </div>
            <div class="farm-meta-row">
              <span class="farm-meta-label">${t.label_followers}:</span>
              <span class="farm-meta-val">${farm.followers}</span>
            </div>
          </div>
        </div>
        <button type="button" class="btn-secondary farm-btn-details" onclick="openFarmModal('${farm.code}')">
          ${t.btn_view_details}
        </button>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   Modal: Reference Farm Details
   ========================================================================== */

function populateModalData(farmCode) {
  const farm = referenceFarms.find(f => f.code === farmCode);
  if (!farm) return;

  const t = i18nData[state.lang];

  document.getElementById('modal-farm-code').textContent = farm.code;
  document.getElementById('modal-code-val').textContent = farm.code;
  document.getElementById('modal-crop-val').textContent = farm.crop[state.lang];
  document.getElementById('modal-sowing-val').textContent = farm.sowingDate[state.lang];
  document.getElementById('modal-stage-val').textContent = farm.stage[state.lang];
  document.getElementById('modal-followers-val').textContent = farm.followers;
  document.getElementById('modal-status-val').textContent = t.status_active;
  document.getElementById('modal-advisory-val').textContent = farm.advisory[state.lang];
}

function openFarmModal(farmCode) {
  state.selectedFarmId = farmCode;
  populateModalData(farmCode);
  const modal = document.getElementById('farm-detail-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeFarmModal(event) {
  if (event.target.id === 'farm-detail-modal') {
    closeFarmModalDirect();
  }
}

function closeFarmModalDirect() {
  state.selectedFarmId = null;
  const modal = document.getElementById('farm-detail-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.selectedFarmId) {
    closeFarmModalDirect();
  }
});

/* ==========================================================================
   Page 2: Advisories List & Filtering
   ========================================================================== */

function filterAdvisories(filterCategory) {
  state.advisoryFilter = filterCategory;

  // Update button active state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === filterCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderAdvisoriesList();
}

function renderAdvisoriesList() {
  const container = document.getElementById('advisories-full-list');
  if (!container) return;

  const t = i18nData[state.lang];

  let filtered = allAdvisoriesData;
  if (state.advisoryFilter !== 'all') {
    filtered = allAdvisoriesData.filter(item => item.type === state.advisoryFilter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted); font-size: 1rem;">
        ${t.no_advisories_found}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    let pillClass = 'pill-normal';
    let pillText = t.badge_normal;
    if (item.level === 'attention') {
      pillClass = 'pill-attention';
      pillText = t.badge_attention;
    } else if (item.level === 'important') {
      pillClass = 'pill-important';
      pillText = t.badge_important;
    }

    return `
      <article class="advisory-item-card level-${item.level}">
        <div class="advisory-item-top">
          <div class="advisory-item-title">
            <span>${item.title[state.lang]}</span>
          </div>
          <div class="advisory-item-meta">
            <span>${t.ref_farm}: <strong class="farm-badge">${item.farmCode}</strong></span>
            <span>•</span>
            <span>${t.label_date}: ${item.date[state.lang]}</span>
            <span class="advisory-pill ${pillClass}">${pillText}</span>
          </div>
        </div>

        <p class="advisory-item-text">${item.message[state.lang]}</p>

        <div class="advisory-item-footer">
          <span>${t.label_status}: <strong style="color: var(--primary-green);">${t.status_active}</strong></span>
          <small style="color: var(--text-muted);">${t.modal_disclaimer}</small>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   Page 3: Admin / R&D Simulated Authentication
   ========================================================================== */

function toggleAuthMode(mode) {
  state.adminMode = mode;
  const loginForm = document.getElementById('form-admin-login');
  const signupForm = document.getElementById('form-admin-signup');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');

  if (mode === 'login') {
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    tabLogin.classList.remove('active');
    tabSignup.classList.add('active');
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  state.isAdminLoggedIn = true;
  showAdminSuccessView();
}

function handleSignupSubmit(event) {
  event.preventDefault();
  state.isAdminLoggedIn = true;
  showAdminSuccessView();
}

function showAdminSuccessView() {
  const formsBox = document.getElementById('admin-forms-box');
  const successAlert = document.getElementById('admin-auth-success');
  if (formsBox) formsBox.style.display = 'none';
  if (successAlert) successAlert.style.display = 'flex';
}

function handleAdminLogout() {
  state.isAdminLoggedIn = false;
  const formsBox = document.getElementById('admin-forms-box');
  const successAlert = document.getElementById('admin-auth-success');
  if (formsBox) formsBox.style.display = 'block';
  if (successAlert) successAlert.style.display = 'none';
  toggleAuthMode('login');
}

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */

function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Navigation button listeners
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.getAttribute('data-page');
      navigateTo(pageId);
    });
  });

  // Brand link
  const brandLink = document.getElementById('brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('home');
    });
  }
}

/* ==========================================================================
   Initialization
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();

  // Check initial hash
  const initialHash = window.location.hash.replace('#', '');
  if (['home', 'advisories', 'admin'].includes(initialHash)) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }

  // Set default language (English) and render
  setLanguage('en');
});
