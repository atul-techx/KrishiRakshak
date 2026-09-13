/**
 * KrishiRakshak Machinery Hub · Farm Equipment Rental & P2P Sharing
 * Enables fleet owners and individual farmers to share & rent agricultural machinery locally.
 */
(function (root) {
  'use strict';

  const STORAGE_KEY = 'krishi_machinery_listings';

  // Authentic initial seed listings for common farming districts in Maharashtra, UP, and India
  const DEFAULT_LISTINGS = [
    {
      id: 'eq-1',
      name: 'Mahindra 575 DI (45 HP Tractor) + Trolley',
      category: 'tractors',
      categoryName: 'Tractors & Tillage',
      icon: '🚜',
      pricePerDay: 1400,
      pricePerHour: 250,
      ownerName: 'Ramesh Patil',
      ownerType: 'fleet', // 'fleet' | 'farmer'
      ownerBadge: 'Progressive Fleet Owner',
      village: 'Dindori',
      district: 'Nashik',
      state: 'Maharashtra',
      lat: 20.201,
      lng: 73.834,
      distanceKm: 3.8,
      phone: '9822014523',
      whatsapp: '9822014523',
      operatorIncluded: true,
      operatorNotes: 'Experienced driver included · Diesel by renter',
      condition: 'Excellent',
      securityDeposit: 'Aadhaar / Voter ID copy',
      specs: '45 HP · Dual Clutch · High torque · Suitable for heavy ploughing & transport',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 3
    },
    {
      id: 'eq-2',
      name: 'Shaktiman 7-Foot Rotavator (Rotary Tiller)',
      category: 'tillage',
      categoryName: 'Tractors & Tillage',
      icon: '⚙️',
      pricePerDay: 800,
      pricePerHour: 150,
      ownerName: 'Vikas Deshmukh',
      ownerType: 'farmer',
      ownerBadge: 'Fellow Farmer (P2P Share)',
      village: 'Niphad',
      district: 'Nashik',
      state: 'Maharashtra',
      lat: 20.091,
      lng: 74.112,
      distanceKm: 6.2,
      phone: '9423187654',
      whatsapp: '9423187654',
      operatorIncluded: false,
      operatorNotes: 'Attachment only · Compatible with 40-55 HP tractor PTO',
      condition: 'Like New',
      securityDeposit: 'Neighbor agreement / ID copy',
      specs: '48 L-type blades · Heavy-duty side gear drive · Perfect soil pulverisation',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 5
    },
    {
      id: 'eq-3',
      name: 'Agri Drone 16L Precision Sprayer + Pilot',
      category: 'spraying',
      categoryName: 'Spraying & Drones',
      icon: '🛸',
      pricePerDay: 2800,
      pricePerHour: 500,
      ownerName: 'Krishi Drone Seva Kendra',
      ownerType: 'fleet',
      ownerBadge: 'Certified Agri Hub',
      village: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      lat: 18.151,
      lng: 74.577,
      distanceKm: 11.5,
      phone: '9890451278',
      whatsapp: '9890451278',
      operatorIncluded: true,
      operatorNotes: 'DGCA certified pilot & battery generator included · 1 acre sprayed in 7 mins',
      condition: 'Excellent',
      securityDeposit: 'No deposit required (Pilot operated)',
      specs: '16-Litre tank · Centrifugal atomizing nozzles · GPS terrain-following radar',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 2
    },
    {
      id: 'eq-4',
      name: 'Multi-Crop High-Speed Thresher (Wheat/Paddy/Gram)',
      category: 'harvesting',
      categoryName: 'Harvesting & Threshing',
      icon: '🌾',
      pricePerDay: 1600,
      pricePerHour: 300,
      ownerName: 'Suresh Gangwar',
      ownerType: 'fleet',
      ownerBadge: 'Progressive Fleet Owner',
      village: 'Nawabganj',
      district: 'Bareilly',
      state: 'Uttar Pradesh',
      lat: 28.539,
      lng: 79.632,
      distanceKm: 4.5,
      phone: '9837123490',
      whatsapp: '9837123490',
      operatorIncluded: true,
      operatorNotes: 'Includes 1 machine operator · High grain recovery',
      condition: 'Good Condition',
      securityDeposit: '₹500 refundable deposit or ID proof',
      specs: 'Output 15-25 quintal/hr · Triple blower dust cleaner · Handles wheat, mustard, gram',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 6
    },
    {
      id: 'eq-5',
      name: 'Honda 5.5 HP Portable Kerosene/Petrol Water Pump',
      category: 'irrigation',
      categoryName: 'Pumps & Irrigation',
      icon: '💧',
      pricePerDay: 400,
      pricePerHour: 80,
      ownerName: 'Anil Jadhav',
      ownerType: 'farmer',
      ownerBadge: 'Fellow Farmer (P2P Share)',
      village: 'Sinnar',
      district: 'Nashik',
      state: 'Maharashtra',
      lat: 19.845,
      lng: 74.001,
      distanceKm: 8.0,
      phone: '9763524180',
      whatsapp: '9763524180',
      operatorIncluded: false,
      operatorNotes: 'Comes with 100ft suction & delivery pipe · Easy pull start',
      condition: 'Good Condition',
      securityDeposit: 'Local farmer guarantee / ID',
      specs: '3-inch suction & discharge · 1000 LPM flow rate · Low fuel consumption',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 1
    },
    {
      id: 'eq-6',
      name: 'Super Seeder / Zero-Till Seed-cum-Fertilizer Drill',
      category: 'seeding',
      categoryName: 'Seeding & Planting',
      icon: '🌱',
      pricePerDay: 1200,
      pricePerHour: 220,
      ownerName: 'Balwant Singh & Sons',
      ownerType: 'fleet',
      ownerBadge: 'Progressive Fleet Owner',
      village: 'Partapur',
      district: 'Meerut',
      state: 'Uttar Pradesh',
      lat: 28.922,
      lng: 77.632,
      distanceKm: 7.3,
      phone: '9839871234',
      whatsapp: '9839871234',
      operatorIncluded: false,
      operatorNotes: 'Simultaneous residue mulching & precision seed sowing in one pass',
      condition: 'Like New',
      securityDeposit: 'ID Card & advance rent',
      specs: '11-tine spacing · Suitable for direct sowing in paddy stubble · Saves 40% fuel',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 4
    },
    {
      id: 'eq-7',
      name: 'Battery Knapsack Sprayer 16L (Double Motor)',
      category: 'spraying',
      categoryName: 'Spraying & Drones',
      icon: '🎒',
      pricePerDay: 150,
      pricePerHour: 35,
      ownerName: 'Ganesh Kadam',
      ownerType: 'farmer',
      ownerBadge: 'Fellow Farmer (P2P Share)',
      village: 'Yeola',
      district: 'Nashik',
      state: 'Maharashtra',
      lat: 20.042,
      lng: 74.489,
      distanceKm: 12.0,
      phone: '9860341256',
      whatsapp: '9860341256',
      operatorIncluded: false,
      operatorNotes: 'Fully charged battery + charger provided · 3 nozzles included',
      condition: 'Good Condition',
      securityDeposit: 'Zero deposit for neighborhood farmers',
      specs: '12V 12Ah battery · Up to 25 tanks on single charge · Telescopic SS lance',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 7
    },
    {
      id: 'eq-8',
      name: '5-Tonne Hydraulic Tipping Farm Trolley / Trailer',
      category: 'haulage',
      categoryName: 'Haulage & Trolleys',
      icon: '🚛',
      pricePerDay: 750,
      pricePerHour: 140,
      ownerName: 'Pravin Shinde',
      ownerType: 'farmer',
      ownerBadge: 'Fellow Farmer (P2P Share)',
      village: 'Katol',
      district: 'Nagpur',
      state: 'Maharashtra',
      lat: 21.267,
      lng: 78.583,
      distanceKm: 9.4,
      phone: '9422890123',
      whatsapp: '9422890123',
      operatorIncluded: false,
      operatorNotes: 'Equipped with heavy hydraulic jack and tractor hitch pin',
      condition: 'Maintained',
      securityDeposit: 'Aadhaar copy',
      specs: 'Double tyre rear axle · High-side removable panels for grain & sugarcane',
      isAvailable: true,
      createdAt: Date.now() - 86400000 * 8
    }
  ];

  const state = {
    listings: [],
    searchQuery: '',
    selectedCategory: 'all',
    selectedRadius: 'all', // 'all' | '5' | '15' | '30'
    ownerFilter: 'all', // 'all' | 'fleet' | 'farmer' | 'my'
    selectedListing: null
  };

  function loadListings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.listings = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read machinery listings from localStorage', e);
    }
    // Fallback to defaults
    state.listings = [...DEFAULT_LISTINGS];
    saveListings();
  }

  function saveListings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.listings));
    } catch (e) {
      console.error('Failed to save machinery listings', e);
    }
  }

  function getLang() {
    return window.KrishiI18n?.getLanguage() || localStorage.getItem('krishiLanguage') || 'en';
  }

  function formatPrice(num) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num || 0);
  }

  function generateWhatsAppUrl(listing) {
    const lang = getLang();
    const cleanPhone = (listing.whatsapp || listing.phone || '').replace(/[^\d]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;

    let greeting = 'Namaste';
    let text = '';

    if (lang === 'hi') {
      greeting = `नमस्ते ${listing.ownerName} जी!`;
      text = `${greeting} मैंने कृषिरक्षक (KrishiRakshak) पर आपका कृषि यंत्र "${listing.name}" ₹${listing.pricePerDay}/दिन पर देखा। मुझे इसे किराए पर लेना है। क्या यह इस सप्ताह उपलब्ध है?`;
    } else if (lang === 'mr') {
      greeting = `नमस्कार ${listing.ownerName} जी!`;
      text = `${greeting} मी कृषिरक्षकवर (KrishiRakshak) तुमचे कृषी यंत्र "${listing.name}" ₹${listing.pricePerDay}/दिवस दराने पाहिले. मला हे भाडेतत्त्वावर हवे आहे. हे या आठवड्यात उपलब्ध आहे का?`;
    } else {
      greeting = `Namaste ${listing.ownerName} ji!`;
      text = `${greeting} I saw your farm equipment "${listing.name}" listed on KrishiRakshak for ₹${listing.pricePerDay}/day. I would like to rent it. Is it available this week?`;
    }

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  }

  function filterListings() {
    const q = state.searchQuery.trim().toLowerCase();
    const currentUserId = getCurrentUserId();

    return state.listings.filter(item => {
      // Search match
      if (q) {
        const hay = [
          item.name,
          item.categoryName,
          item.ownerName,
          item.village,
          item.district,
          item.specs,
          item.ownerBadge
        ].filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // Category filter
      if (state.selectedCategory !== 'all') {
        if (item.category !== state.selectedCategory) return false;
      }

      // Radius filter
      if (state.selectedRadius !== 'all') {
        const maxKm = parseFloat(state.selectedRadius);
        if (typeof item.distanceKm === 'number' && item.distanceKm > maxKm) return false;
      }

      // Owner filter / My listings
      if (state.ownerFilter === 'fleet' && item.ownerType !== 'fleet') return false;
      if (state.ownerFilter === 'farmer' && item.ownerType !== 'farmer') return false;
      if (state.ownerFilter === 'my') {
        if (!item.createdBy || item.createdBy !== currentUserId) return false;
      }

      return true;
    });
  }

  function getCurrentUserId() {
    try {
      const sess = JSON.parse(localStorage.getItem('krishi_session') || '{}');
      return sess.id || 'current_user';
    } catch {
      return 'current_user';
    }
  }

  function getCurrentUserName() {
    try {
      const sess = JSON.parse(localStorage.getItem('krishi_session') || '{}');
      return sess.name || 'Farmer';
    } catch {
      return 'Farmer';
    }
  }

  function getCurrentUserLocation() {
    try {
      const sess = JSON.parse(localStorage.getItem('krishi_session') || '{}');
      return sess.location || 'Local Area';
    } catch {
      return 'Local Area';
    }
  }

  function renderMetrics() {
    const metricsEl = document.getElementById('machineryMetricsRow');
    if (!metricsEl) return;

    const total = state.listings.length;
    const available = state.listings.filter(l => l.isAvailable).length;
    const p2pCount = state.listings.filter(l => l.ownerType === 'farmer').length;
    const fleetCount = state.listings.filter(l => l.ownerType === 'fleet').length;

    const lang = getLang();
    const l1 = lang === 'hi' ? 'कुल उपलब्ध यंत्र' : lang === 'mr' ? 'एकूण उपलब्ध यंत्रे' : 'Available Equipment';
    const l2 = lang === 'hi' ? 'किसान-से-किसान (P2P)' : lang === 'mr' ? 'शेतकरी-ते-शेतकरी' : 'Fellow Farmers (P2P)';
    const l3 = lang === 'hi' ? 'बड़े फ्लीट / सेवा केंद्र' : lang === 'mr' ? 'मोठे फ्लीट / सेवा केंद्र' : 'Farm Fleet Owners';
    const l4 = lang === 'hi' ? 'न्यूनतम दैनिक किराया' : lang === 'mr' ? 'किमान दैनिक भाडे' : 'Lowest Daily Rent';

    const minRent = Math.min(...state.listings.map(l => l.pricePerDay || 9999));

    metricsEl.innerHTML = `
      <div class="metric">
        <span>${l1.toUpperCase()}</span>
        <strong>${available} <small>/ ${total}</small></strong>
        <p>${lang === 'hi' ? 'तत्काल बुकिंग के लिए तैयार' : lang === 'mr' ? 'तात्काळ वापरासाठी तयार' : 'Ready for immediate booking'}</p>
      </div>
      <div class="metric">
        <span>${l2.toUpperCase()}</span>
        <strong>${p2pCount}</strong>
        <p>${lang === 'hi' ? 'कम लागत में आपसी शेयरिंग' : lang === 'mr' ? 'कमी खर्चात परस्पर देवाणघेवाण' : 'Local mutual equipment sharing'}</p>
      </div>
      <div class="metric">
        <span>${l3.toUpperCase()}</span>
        <strong>${fleetCount}</strong>
        <p>${lang === 'hi' ? 'ट्रैक्टर, ड्रोन, हार्वेस्टर फ्लीट' : lang === 'mr' ? 'ट्रॅक्टर, ड्रोन, कापणी यंत्र' : 'Tractors, drones & harvesters'}</p>
      </div>
      <div class="metric weather">
        <span>${l4.toUpperCase()}</span>
        <strong>${formatPrice(minRent)} <small>/day</small></strong>
        <p>${lang === 'hi' ? 'पारदर्शी दैनिक व प्रति-घंटे दर' : lang === 'mr' ? 'पारदर्शक दैनिक व प्रति तास दर' : 'Transparent daily & hourly rates'}</p>
      </div>
    `;
  }

  function renderCategoryPills() {
    const wrap = document.getElementById('machineryCategoryPills');
    if (!wrap) return;

    const lang = getLang();
    const categories = [
      { id: 'all', icon: '🌐', en: 'All Machinery', hi: 'सभी यंत्र', mr: 'सर्व यंत्रे' },
      { id: 'tractors', icon: '🚜', en: 'Tractors & Tillage', hi: 'ट्रैक्टर और जुताई', mr: 'ट्रॅक्टर व नांगरणी' },
      { id: 'spraying', icon: '🛸', en: 'Sprayers & Drones', hi: 'स्प्रेयर और ड्रोन', mr: 'फवारणी व ड्रोन' },
      { id: 'harvesting', icon: '🌾', en: 'Harvest & Threshers', hi: 'कटाई और थ्रेशर', mr: 'कापणी व मळणी यंत्र' },
      { id: 'seeding', icon: '🌱', en: 'Seeding & Planting', hi: 'बुवाई और प्लांटिंग', mr: 'पेरणी व लागवड' },
      { id: 'irrigation', icon: '💧', en: 'Pumps & Irrigation', hi: 'पंप और सिंचाई', mr: 'पंप व सिंचन' },
      { id: 'haulage', icon: '🚛', en: 'Trolley & Haulage', hi: 'ट्रॉली और ढुलाई', mr: 'ट्रॉली व वाहतूक' }
    ];

    wrap.innerHTML = categories.map(cat => {
      const active = state.selectedCategory === cat.id ? 'active' : '';
      const label = lang === 'hi' ? cat.hi : lang === 'mr' ? cat.mr : cat.en;
      return `
        <button type="button" class="category-pill ${active}" data-cat="${cat.id}">
          <span>${cat.icon}</span> ${label}
        </button>
      `;
    }).join('');

    wrap.querySelectorAll('.category-pill').forEach(btn => {
      btn.onclick = () => {
        state.selectedCategory = btn.dataset.cat;
        renderCategoryPills();
        renderListings();
      };
    });
  }

  function renderListings() {
    const grid = document.getElementById('machineryGrid');
    if (!grid) return;

    const items = filterListings();
    const lang = getLang();

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-machinery-state card">
          <div style="font-size:48px; margin-bottom:12px;">🚜</div>
          <h3>${lang === 'hi' ? 'कोई कृषि यंत्र नहीं मिला' : lang === 'mr' ? 'कोणतेही कृषी यंत्र आढळले नाही' : 'No machinery found'}</h3>
          <p class="muted">${lang === 'hi' ? 'कृपया अपनी सर्च या फ़िल्टर बदलें, या अपना उपकरण खुद लिस्ट करें।' : lang === 'mr' ? 'कृपया शोध किंवा फिल्टर बदला, किंवा तुमचे यंत्र स्वतः नोंदवा.' : 'Try changing your search filters or be the first to list your equipment.'}</p>
          <button type="button" class="btn btn-primary" id="emptyListBtn" style="margin-top:14px;">
            ＋ ${lang === 'hi' ? 'अपना यंत्र लिस्ट करें' : lang === 'mr' ? 'आपले यंत्र नोंदवा' : 'List My Equipment'}
          </button>
        </div>
      `;
      const btn = document.getElementById('emptyListBtn');
      if (btn) btn.onclick = openListModal;
      return;
    }

    grid.innerHTML = items.map(item => {
      const isMy = item.createdBy && item.createdBy === getCurrentUserId();
      const whatsappUrl = generateWhatsAppUrl(item);
      const phoneCallUrl = `tel:${item.phone || item.whatsapp}`;
      const distanceText = item.distanceKm ? `📍 ~${item.distanceKm} km away · ${item.village}, ${item.district}` : `📍 ${item.village}, ${item.district}`;
      const isFleet = item.ownerType === 'fleet';

      const typeBadge = isFleet
        ? `<span class="owner-pill fleet">🚜 ${lang === 'hi' ? 'फ्लीट / सेवा केंद्र' : lang === 'mr' ? 'मोठे फ्लीट केंद्र' : 'Fleet Owner'}</span>`
        : `<span class="owner-pill farmer">🌾 ${lang === 'hi' ? 'किसान शेयरिंग' : lang === 'mr' ? 'शेतकरी देवाणघेवाण' : 'Fellow Farmer P2P'}</span>`;

      const operatorBadge = item.operatorIncluded
        ? `<span class="sub-pill ok">✓ ${lang === 'hi' ? 'चालक / ऑपरेटर सहित' : lang === 'mr' ? 'चालकासह' : 'Operator Included'}</span>`
        : `<span class="sub-pill warn">${lang === 'hi' ? 'स्व-संचालित (Self)' : lang === 'mr' ? 'स्वतः चालवा' : 'Self Operated'}</span>`;

      return `
        <div class="card machinery-card ${!item.isAvailable ? 'unavailable' : ''}" data-id="${item.id}">
          <div class="machinery-card-top">
            <div class="machinery-avatar">${item.icon || '🚜'}</div>
            <div class="machinery-header-info">
              <div class="machinery-pill-row">
                ${typeBadge}
                ${item.isAvailable ? `<span class="status-badge available">● ${lang === 'hi' ? 'उपलब्ध' : lang === 'mr' ? 'उपलब्ध' : 'Available'}</span>` : `<span class="status-badge in-use">✕ ${lang === 'hi' ? 'किराए पर है' : lang === 'mr' ? 'वापरात आहे' : 'In Use'}</span>`}
              </div>
              <h3 class="machinery-title">${item.name}</h3>
              <p class="machinery-location">${distanceText}</p>
            </div>
          </div>

          <div class="machinery-price-box">
            <div class="price-primary">
              <span class="price-amount">${formatPrice(item.pricePerDay)}</span>
              <span class="price-unit">/ ${lang === 'hi' ? 'दिन' : lang === 'mr' ? 'दिवस' : 'day'}</span>
            </div>
            ${item.pricePerHour ? `<div class="price-secondary">${formatPrice(item.pricePerHour)} / hr</div>` : ''}
          </div>

          <div class="machinery-specs-box">
            <div class="spec-row">
              <span class="spec-label">👤 ${lang === 'hi' ? 'मालिक' : lang === 'mr' ? 'मालक' : 'Owner'}:</span>
              <strong class="spec-value">${item.ownerName}</strong>
            </div>
            <div class="spec-row">
              <span class="spec-label">⚙️ ${lang === 'hi' ? 'सुविधा' : lang === 'mr' ? 'सुविधा' : 'Terms'}:</span>
              <span class="spec-value">${operatorBadge}</span>
            </div>
            <p class="machinery-desc">${item.specs || item.operatorNotes || ''}</p>
          </div>

          <div class="machinery-actions-row">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" title="Chat on WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.068-1.109-.065-.246-.079-.569-.187-1.026-.385-1.933-.84-3.197-2.79-3.294-2.921-.097-.13-.787-1.047-.787-1.996 0-.949.499-1.416.677-1.611.178-.195.389-.244.519-.244.13 0 .26.002.373.007.12.006.279-.046.438.336.162.39.553 1.349.6 1.447.049.098.081.211.016.341-.065.13-.098.211-.195.325-.098.114-.206.255-.294.343-.099.098-.202.204-.087.401.114.195.508.838 1.09 1.358.749.667 1.381.874 1.576.972.195.097.309.081.423-.049.114-.13.487-.568.617-.763.13-.195.26-.162.438-.097.179.065 1.136.536 1.331.633.195.098.325.146.373.228.049.081.049.471-.095.876z"/></svg>
              <span>WhatsApp</span>
            </a>
            <a href="${phoneCallUrl}" class="btn-call" title="Call Owner">
              <span>📞</span> <span>${lang === 'hi' ? 'कॉल करें' : lang === 'mr' ? 'कॉल करा' : 'Call'}</span>
            </a>
            <button type="button" class="btn-detail-more" data-detail="${item.id}" title="View details">
              <span>ℹ️</span>
            </button>
          </div>

          ${isMy ? `
            <div class="my-listing-bar">
              <span class="my-badge">★ ${lang === 'hi' ? 'मेरी लिस्टिंग' : lang === 'mr' ? 'माझी नोंदणी' : 'My Listing'}</span>
              <button type="button" class="toggle-avail-btn" data-toggle="${item.id}">
                ${item.isAvailable ? (lang === 'hi' ? 'मार्क इन-यूज़' : lang === 'mr' ? 'वापरात नोंदवा' : 'Mark In-Use') : (lang === 'hi' ? 'मार्क उपलब्ध' : lang === 'mr' ? 'उपलब्ध करा' : 'Mark Available')}
              </button>
              <button type="button" class="delete-listing-btn" data-delete="${item.id}">🗑️</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Attach detail modal listeners
    grid.querySelectorAll('[data-detail]').forEach(btn => {
      btn.onclick = () => openDetailModal(btn.dataset.detail);
    });

    // Attach toggle availability listeners
    grid.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.onclick = () => toggleAvailability(btn.dataset.toggle);
    });

    // Attach delete listeners
    grid.querySelectorAll('[data-delete]').forEach(btn => {
      btn.onclick = () => deleteListing(btn.dataset.delete);
    });
  }

  function toggleAvailability(id) {
    const item = state.listings.find(x => x.id === id);
    if (!item) return;
    item.isAvailable = !item.isAvailable;
    saveListings();
    renderMetrics();
    renderListings();
    if (window.toast) {
      window.toast(item.isAvailable ? 'Marked as Available.' : 'Marked as In Use.');
    }
  }

  function deleteListing(id) {
    const lang = getLang();
    const msg = lang === 'hi' ? 'क्या आप इस यंत्र को हटाना चाहते हैं?' : lang === 'mr' ? 'तुम्ही हे यंत्र काढू इच्छिता का?' : 'Remove this equipment listing?';
    if (!confirm(msg)) return;

    state.listings = state.listings.filter(x => x.id !== id);
    saveListings();
    renderMetrics();
    renderListings();
    if (window.toast) window.toast('Listing removed.');
  }

  function openDetailModal(id) {
    const item = state.listings.find(x => x.id === id);
    if (!item) return;

    state.selectedListing = item;
    const modal = document.getElementById('equipmentDetailModal');
    if (!modal) return;

    const lang = getLang();
    const whatsappUrl = generateWhatsAppUrl(item);
    const callUrl = `tel:${item.phone || item.whatsapp}`;

    document.getElementById('detailIcon').textContent = item.icon || '🚜';
    document.getElementById('detailTitle').textContent = item.name;
    document.getElementById('detailCategory').textContent = item.categoryName || 'Farm Machinery';
    document.getElementById('detailPriceDay').textContent = `${formatPrice(item.pricePerDay)} / day`;
    document.getElementById('detailPriceHour').textContent = item.pricePerHour ? `${formatPrice(item.pricePerHour)} / hr` : 'On Request';
    document.getElementById('detailOwnerName').textContent = item.ownerName;
    document.getElementById('detailOwnerType').textContent = item.ownerBadge || (item.ownerType === 'fleet' ? 'Fleet Owner' : 'Fellow Farmer');
    document.getElementById('detailLocation').textContent = `${item.village}, ${item.district} (${item.state || 'India'}) · ~${item.distanceKm || 5} km away`;
    document.getElementById('detailPhone').textContent = item.phone || item.whatsapp || 'Not provided';
    document.getElementById('detailOperator').textContent = item.operatorIncluded ? 'Yes · Driver/Operator included with machine' : 'No · Self-operated by renter';
    document.getElementById('detailDeposit').textContent = item.securityDeposit || 'Standard ID proof';
    document.getElementById('detailSpecs').textContent = item.specs || 'N/A';
    document.getElementById('detailNotes').textContent = item.operatorNotes || 'Contact owner for schedule and terms.';

    const waBtn = document.getElementById('detailWhatsAppBtn');
    if (waBtn) waBtn.href = whatsappUrl;

    const callBtn = document.getElementById('detailCallBtn');
    if (callBtn) callBtn.href = callUrl;

    modal.classList.remove('hidden');
  }

  function closeDetailModal() {
    const modal = document.getElementById('equipmentDetailModal');
    if (modal) modal.classList.add('hidden');
  }

  function openListModal() {
    const modal = document.getElementById('listEquipmentModal');
    if (!modal) return;

    // Prefill with current logged in farmer's info if available
    const nameInput = document.getElementById('listOwnerName');
    const locInput = document.getElementById('listVillage');
    if (nameInput && !nameInput.value) nameInput.value = getCurrentUserName();
    if (locInput && !locInput.value) locInput.value = getCurrentUserLocation();

    modal.classList.remove('hidden');
  }

  function closeListModal() {
    const modal = document.getElementById('listEquipmentModal');
    if (modal) modal.classList.add('hidden');
  }

  function handleListingSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('listEquipmentName')?.value.trim();
    const category = document.getElementById('listCategory')?.value || 'tractors';
    const priceDay = parseFloat(document.getElementById('listPriceDay')?.value) || 500;
    const priceHour = parseFloat(document.getElementById('listPriceHour')?.value) || 0;
    const ownerName = document.getElementById('listOwnerName')?.value.trim() || getCurrentUserName();
    const ownerType = document.getElementById('listOwnerType')?.value || 'farmer';
    const village = document.getElementById('listVillage')?.value.trim() || 'Local Area';
    const district = document.getElementById('listDistrict')?.value.trim() || 'Nashik';
    const phone = document.getElementById('listPhone')?.value.trim();
    const whatsapp = document.getElementById('listWhatsApp')?.value.trim() || phone;
    const operatorIncluded = document.getElementById('listOperatorIncluded')?.checked || false;
    const specs = document.getElementById('listSpecs')?.value.trim() || '';
    const securityDeposit = document.getElementById('listDeposit')?.value.trim() || 'Aadhaar / Voter ID proof';

    if (!name || !phone) {
      if (window.toast) window.toast('Please provide equipment name and phone number.');
      return;
    }

    const iconMap = {
      tractors: '🚜',
      tillage: '⚙️',
      spraying: '🛸',
      harvesting: '🌾',
      seeding: '🌱',
      irrigation: '💧',
      haulage: '🚛'
    };

    const categoryNames = {
      tractors: 'Tractors & Tillage',
      tillage: 'Tractors & Tillage',
      spraying: 'Spraying & Drones',
      harvesting: 'Harvesting & Threshing',
      seeding: 'Seeding & Planting',
      irrigation: 'Pumps & Irrigation',
      haulage: 'Haulage & Trolleys'
    };

    const newListing = {
      id: 'eq-' + Date.now(),
      name,
      category,
      categoryName: categoryNames[category] || 'Farm Equipment',
      icon: iconMap[category] || '🚜',
      pricePerDay: priceDay,
      pricePerHour: priceHour,
      ownerName,
      ownerType,
      ownerBadge: ownerType === 'fleet' ? 'Progressive Fleet Owner' : 'Fellow Farmer (P2P Share)',
      village,
      district,
      state: 'India',
      distanceKm: (Math.random() * 4 + 1.2).toFixed(1) * 1, // nearby mock distance
      phone,
      whatsapp,
      operatorIncluded,
      operatorNotes: operatorIncluded ? 'Operator/driver included' : 'Self-operated',
      condition: 'Good Condition',
      securityDeposit,
      specs,
      isAvailable: true,
      createdBy: getCurrentUserId(),
      createdAt: Date.now()
    };

    state.listings.unshift(newListing);
    saveListings();

    closeListModal();
    e.target.reset();

    renderMetrics();
    renderListings();

    if (window.toast) {
      window.toast('🎉 Equipment listed successfully! Neighbors can now contact you on WhatsApp.');
    }
  }

  function setupEvents() {
    // Search input
    const searchInput = document.getElementById('machinerySearchInput');
    if (searchInput) {
      searchInput.oninput = () => {
        state.searchQuery = searchInput.value;
        renderListings();
      };
    }

    // Radius filter
    const radiusFilter = document.getElementById('machineryRadiusFilter');
    if (radiusFilter) {
      radiusFilter.onchange = () => {
        state.selectedRadius = radiusFilter.value;
        renderListings();
      };
    }

    // Owner type filter
    const ownerFilter = document.getElementById('machineryOwnerFilter');
    if (ownerFilter) {
      ownerFilter.onchange = () => {
        state.ownerFilter = ownerFilter.value;
        renderListings();
      };
    }

    // Open list modal buttons
    const listBtn = document.getElementById('openAddMachineryBtn');
    if (listBtn) listBtn.onclick = openListModal;

    const listBtnHero = document.getElementById('heroRentMachineryBtn');
    if (listBtnHero) {
      listBtnHero.onclick = () => {
        if (window.showPage) window.showPage('machinery');
      };
    }

    // Close modals
    const closeDetail = document.getElementById('closeDetailModal');
    if (closeDetail) closeDetail.onclick = closeDetailModal;

    const closeList = document.getElementById('closeListModal');
    if (closeList) closeList.onclick = closeListModal;

    // Form submit
    const form = document.getElementById('addEquipmentForm');
    if (form) form.onsubmit = handleListingSubmit;
  }

  function init() {
    loadListings();
    renderMetrics();
    renderCategoryPills();
    renderListings();
    setupEvents();
  }

  // Expose global API
  root.KrishiMachinery = {
    init,
    loadListings,
    openListModal,
    closeListModal,
    openDetailModal,
    closeDetailModal
  };

})(window);
