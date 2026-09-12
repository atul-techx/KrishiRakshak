(function () {
  'use strict';

  const state = {
    records: [],
    categories: [],
    states: [],
    mspBenchmarks: [],
    currentCategory: 'all',
    currentState: 'all',
    searchQuery: '',
    loading: false,
    updatedAt: '',
    source: ''
  };

  function getLang() {
    return window.KrishiI18n?.getLanguage() || 'en';
  }

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num || 0);
  }

  async function fetchMarketPrices(force = false) {
    state.loading = true;
    renderLoading();

    try {
      const params = new URLSearchParams();
      if (state.currentState && state.currentState !== 'all') params.append('state', state.currentState);
      if (state.currentCategory && state.currentCategory !== 'all') params.append('category', state.currentCategory);
      if (state.searchQuery) params.append('search', state.searchQuery);

      const res = await window.KrishiAPI.request('/api/market-prices' + (params.toString() ? '?' + params.toString() : ''));
      if (!res.ok) throw new Error('Failed to load market prices');

      const data = await res.json();
      state.records = data.records || [];
      state.categories = data.categories || [];
      state.states = data.states || [];
      state.mspBenchmarks = data.mspBenchmarks || [];
      state.updatedAt = data.updatedAt || 'Today';
      state.source = data.source || 'Agmarknet';
    } catch (err) {
      console.warn('Market price fetch failed, using offline fallback', err);
    } finally {
      state.loading = false;
      render();
    }
  }

  function renderLoading() {
    const grid = document.getElementById('mandiGrid');
    if (grid) {
      const lang = getLang();
      const msg = lang === 'hi' ? 'ताज़ा मंडी भाव लोड हो रहे हैं…' : lang === 'mr' ? 'थेट बाजार भाव लोड होत आहेत…' : 'Loading live APMC Mandi rates…';
      grid.innerHTML = `
        <div class="mandi-loading-state">
          <div style="font-size:32px; margin-bottom:10px;">🌾</div>
          <strong>${msg}</strong>
          <p style="color:var(--muted); font-size:13px; margin-top:4px;">APMC सर्वर से संपर्क किया जा रहा है...</p>
        </div>
      `;
    }
  }

  function renderStats() {
    const statsContainer = document.getElementById('marketStatsRow');
    if (!statsContainer) return;

    const totalCrops = state.records.length;
    const gainers = state.records.filter(r => r.trend === 'up');
    const topGainer = gainers.length > 0 ? gainers.reduce((max, r) => (r.change > max.change ? r : max), gainers[0]) : null;
    const aboveMspCount = state.records.filter(r => r.msp && r.modalPrice >= r.msp).length;
    const mspEligibleCount = state.records.filter(r => r.msp).length;

    const lang = getLang();
    const topGainerName = topGainer ? (lang === 'hi' ? topGainer.commodityHi : lang === 'mr' ? topGainer.commodityMr : topGainer.commodity) : '--';

    statsContainer.innerHTML = `
      <div class="metric">
        <span>${lang === 'hi' ? 'जुड़ी हुई मंडियां' : lang === 'mr' ? 'जोडलेले बाजार' : 'MONITORED MANDIS'}</span>
        <strong>25+ <small>${lang === 'hi' ? 'मंडियां' : lang === 'mr' ? 'बाजार' : 'Mandis'}</small></strong>
        <p>${lang === 'hi' ? '7 प्रमुख राज्यों के आधिकारिक APMC केंद्र' : lang === 'mr' ? '7 प्रमुख राज्यांमधील अधिकृत बाजार' : 'Active APMC centers across 7 states'}</p>
      </div>
      <div class="metric">
        <span>${lang === 'hi' ? 'सक्रिय फसलें' : lang === 'mr' ? 'नोंदणीकृत पिके' : 'ACTIVE COMMODITIES'}</span>
        <strong>${totalCrops} <small>${lang === 'hi' ? 'फसलें' : lang === 'mr' ? 'पिके' : 'Crops'}</small></strong>
        <p>${lang === 'hi' ? 'सब्जियां, अनाज, दलहन, तिलहन व नकदी फसलें' : lang === 'mr' ? 'भाज्या, धान्य, कडधान्ये व नगदी पिके' : 'Vegetables, grains, pulses & oilseeds'}</p>
      </div>
      <div class="metric">
        <span>${lang === 'hi' ? 'आज की सबसे बड़ी तेजी' : lang === 'mr' ? 'आजची मोठी तेजी' : 'TOP GAINER TODAY'}</span>
        <strong class="text-gain">${topGainerName} <small>${topGainer ? `(+₹${topGainer.change})` : ''}</small></strong>
        <p>${topGainer ? `${topGainer.market} (${topGainer.changePct} बढ़त)` : 'स्थिर व्यापार'}</p>
      </div>
      <div class="metric weather">
        <span>${lang === 'hi' ? 'MSP समर्थन भाव स्थिति' : lang === 'mr' ? 'हमीभाव तुलना' : 'MSP BENCHMARK'}</span>
        <strong>${aboveMspCount}/${mspEligibleCount || 14} <small>${lang === 'hi' ? 'फसलें' : lang === 'mr' ? 'पिके' : 'Crops'}</small></strong>
        <p>${lang === 'hi' ? 'सरकारी न्यूनतम समर्थन मूल्य से अधिक दर' : lang === 'mr' ? 'शासकीय हमीभावापेक्षा जास्त दर' : 'Trading higher than Govt MSP'}</p>
      </div>
    `;
  }

  function renderCategoryPills() {
    const container = document.getElementById('marketCategoryPills');
    if (!container) return;

    const lang = getLang();
    const categories = state.categories.length > 0 ? state.categories : [
      { id: "all", labelEn: "All Crops", labelHi: "🌾 सभी फसलें", labelMr: "🌾 सर्व पिके" },
      { id: "vegetables", labelEn: "Vegetables", labelHi: "🥦 सब्जियां", labelMr: "🥦 भाज्या" },
      { id: "cereals", labelEn: "Cereals / Grain", labelHi: "🌾 अनाज", labelMr: "🌾 धान्य" },
      { id: "pulses", labelEn: "Pulses", labelHi: "🫘 दालें", labelMr: "🫘 कडधान्ये" },
      { id: "oilseeds", labelEn: "Oilseeds", labelHi: "🌻 तिलहन", labelMr: "🌻 गळीत धान्य" },
      { id: "cash_crops", labelEn: "Cash Crops", labelHi: "💰 नकदी फसलें", labelMr: "💰 नगदी पिके" }
    ];

    container.innerHTML = categories.map(cat => {
      const active = state.currentCategory === cat.id ? 'active' : '';
      const label = lang === 'hi' ? cat.labelHi : lang === 'mr' ? cat.labelMr : cat.labelEn;
      return `<button type="button" class="market-cat-pill ${active}" data-cat="${cat.id}">${label}</button>`;
    }).join('');

    container.querySelectorAll('.market-cat-pill').forEach(btn => {
      btn.onclick = () => {
        state.currentCategory = btn.dataset.cat;
        container.querySelectorAll('.market-cat-pill').forEach(b => b.classList.toggle('active', b === btn));
        fetchMarketPrices();
      };
    });
  }

  function renderCards() {
    const grid = document.getElementById('mandiGrid');
    if (!grid) return;

    if (state.records.length === 0) {
      const lang = getLang();
      const emptyMsg = lang === 'hi' ? 'आपकी खोज के अनुसार कोई भाव नहीं मिला।' : lang === 'mr' ? 'कोणतेही भाव आढळले नाहीत.' : 'No Mandi rates match your search';
      const hint = lang === 'hi' ? "'सभी फसलें' चुनें या खोज शब्द बदलें।" : lang === 'mr' ? "'सर्व पिके' निवडा किंवा शोध बदला." : "Try selecting 'All Crops' or clearing the search.";
      grid.innerHTML = `
        <div class="mandi-empty-card">
          <div style="font-size:36px; margin-bottom:8px;">🔍</div>
          <strong>${emptyMsg}</strong>
          <p style="color:var(--muted); font-size:13px; margin:4px 0 0;">${hint}</p>
        </div>
      `;
      return;
    }

    const lang = getLang();

    grid.innerHTML = state.records.map(r => {
      // Primary name should be friendly Hindi first if hindi/marathi, or bilingual
      const hiName = r.commodityHi || r.commodity;
      const enName = r.commodity;
      const mrName = r.commodityMr || r.commodity;
      
      const displayName = lang === 'hi' ? hiName : lang === 'mr' ? mrName : enName;
      const subName = lang === 'hi' ? enName : (lang === 'mr' ? enName : hiName);

      const advisory = lang === 'hi' ? (r.advisoryHi || r.advisoryEn) : lang === 'mr' ? (r.advisoryMr || r.advisoryEn) : r.advisoryEn;
      const pricePerKg = (r.modalPrice / 100).toFixed(1);

      // Trend Calculation
      let trendClass = 'farmer-trend-flat';
      let trendLabel = '● भाव स्थिर';
      if (r.trend === 'up') {
        trendClass = 'farmer-trend-up';
        trendLabel = `▲ +₹${Math.abs(r.change)} तेजी (${r.changePct})`;
      } else if (r.trend === 'down') {
        trendClass = 'farmer-trend-down';
        trendLabel = `▼ -₹${Math.abs(r.change)} मंदी (${r.changePct})`;
      }

      // Range Progress percentage
      let rangePercent = 50;
      if (r.maxPrice > r.minPrice) {
        rangePercent = Math.min(100, Math.max(0, Math.round(((r.modalPrice - r.minPrice) / (r.maxPrice - r.minPrice)) * 100)));
      }

      // MSP comparison tag
      let mspBadge = '';
      if (r.msp) {
        const diff = r.modalPrice - r.msp;
        if (diff >= 0) {
          const mspDiffText = lang === 'hi' 
            ? `✓ MSP (₹${r.msp}) से ₹${diff} अधिक` 
            : lang === 'mr' 
            ? `✓ हमीभावापेक्षा ₹${diff} जास्त` 
            : `✓ ₹${diff} above MSP (₹${r.msp})`;
          mspBadge = `<span class="farmer-msp-tag gain" title="Govt MSP Comparison">${mspDiffText}</span>`;
        } else {
          const mspLossText = lang === 'hi'
            ? `⚠️ MSP (₹${r.msp}) से ₹${Math.abs(diff)} कम`
            : lang === 'mr'
            ? `⚠️ हमीभावापेक्षा ₹${Math.abs(diff)} कमी`
            : `⚠️ ₹${Math.abs(diff)} below MSP`;
          mspBadge = `<span class="farmer-msp-tag alert" title="Govt MSP Comparison">${mspLossText}</span>`;
        }
      }

      const mandiLocation = `${r.market} · ${r.district} (${r.state})`;

      return `
        <article class="farmer-mandi-card" data-crop="${r.commodity}" data-rate="${r.modalPrice}">
          <!-- Top Row: Icon, Crop Name, Mandi & Trend -->
          <div class="farmer-card-header">
            <div class="farmer-crop-identity">
              <div class="farmer-crop-avatar">${r.icon || '🌾'}</div>
              <div>
                <h4 class="farmer-crop-name">${displayName} <span translate="no" class="notranslate farmer-crop-subname">(${subName})</span></h4>
                <p class="farmer-mandi-location">📍 ${mandiLocation}</p>
              </div>
            </div>
            <span class="farmer-trend-badge ${trendClass}">${trendLabel}</span>
          </div>

          <!-- Main Rate Highlight -->
          <div class="farmer-price-box">
            <div class="farmer-price-main">
              <span class="farmer-rate-label">${lang === 'hi' ? 'आज का औसत मंडी भाव (Modal Rate)' : lang === 'mr' ? 'आजचा सरासरी बाजार भाव' : "Today's Modal Rate"}</span>
              <div class="farmer-price-value">
                <span class="currency">₹</span><span class="num">${r.modalPrice.toLocaleString('en-IN')}</span>
                <span class="unit">/ ${lang === 'hi' ? 'क्विंटल' : lang === 'mr' ? 'क्विंटल' : 'Quintal'}</span>
              </div>
            </div>
            <div class="farmer-kg-badge">
              <span class="kg-icon">⚖️</span>
              <b>₹${pricePerKg}</b>
              <small>${lang === 'hi' ? 'प्रति किलो' : lang === 'mr' ? 'प्रति किलो' : 'per kg'}</small>
            </div>
          </div>

          <!-- Price Range Slider / Indicator -->
          <div class="farmer-range-box">
            <div class="farmer-range-values">
              <span><b>${lang === 'hi' ? 'न्यूनतम:' : 'Min:'}</b> ₹${r.minPrice.toLocaleString('en-IN')}</span>
              <span class="farmer-range-mid">${lang === 'hi' ? 'रेंज' : 'Range'}</span>
              <span><b>${lang === 'hi' ? 'अधिकतम:' : 'Max:'}</b> ₹${r.maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <div class="farmer-range-track">
              <div class="farmer-range-fill" style="width:${rangePercent}%;"></div>
              <div class="farmer-range-pin" style="left:${rangePercent}%;" title="Modal Rate: ₹${r.modalPrice}"></div>
            </div>
          </div>

          <!-- Extra details: Arrivals & MSP -->
          <div class="farmer-details-row">
            <div class="farmer-arrival-pill">
              <span>🚜</span>
              <span>${lang === 'hi' ? 'आवक:' : 'Arrival:'} <b>${r.arrival}</b></span>
            </div>
            ${mspBadge}
          </div>

          <!-- Farmer Selling Advisory -->
          <div class="farmer-advisory-box">
            <span class="advisory-icon">💡</span>
            <p><b>${lang === 'hi' ? 'किसान सलाह:' : lang === 'mr' ? 'शेतकरी सल्ला:' : 'Selling Advisory:'}</b> ${advisory}</p>
          </div>

          <!-- Card Bottom Action: Auto calculate earnings -->
          <div class="farmer-card-footer">
            <button type="button" class="btn-use-mandi-rate" data-rate="${r.modalPrice}" data-crop="${displayName}">
              <span>💰</span> <span>${lang === 'hi' ? 'इस भाव पर कुल कमाई निकालें' : lang === 'mr' ? 'या दराने एकूण उत्पन्न काढा' : 'Calculate my income at this rate'}</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click events for "Calculate income at this rate"
    grid.querySelectorAll('.btn-use-mandi-rate').forEach(btn => {
      btn.onclick = () => {
        const rate = btn.dataset.rate;
        const cropName = btn.dataset.crop;
        const rateInput = document.getElementById('calcRate');
        if (rateInput) {
          rateInput.value = rate;
          rateInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const calcCard = document.querySelector('.calc-container-card');
        if (calcCard) {
          calcCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          calcCard.classList.add('calc-highlight-pulse');
          setTimeout(() => calcCard.classList.remove('calc-highlight-pulse'), 1500);
        }

        if (window.toast) {
          const lang = getLang();
          const msg = lang === 'hi' 
            ? `${cropName} का भाव (₹${rate}/क्विंटल) गणक में भर दिया गया है।` 
            : `${cropName} rate (₹${rate}/Qtl) applied to income calculator.`;
          window.toast(msg);
        }
      };
    });
  }

  function renderMspComparison() {
    const container = document.getElementById('mspComparisonGrid');
    if (!container) return;

    const lang = getLang();
    const benchmarks = state.mspBenchmarks.length > 0 ? state.mspBenchmarks : [
      { crop: "Paddy (Common)", cropHi: "धान (सामान्य)", msp: 2300, unit: "₹/Quintal" },
      { crop: "Wheat", cropHi: "गेहूं", msp: 2275, unit: "₹/Quintal" },
      { crop: "Soybean", cropHi: "सोयाबीन", msp: 4892, unit: "₹/Quintal" },
      { crop: "Cotton (Medium)", cropHi: "कपास (मध्यम)", msp: 7121, unit: "₹/Quintal" },
      { crop: "Mustard", cropHi: "सरसों", msp: 5650, unit: "₹/Quintal" },
      { crop: "Gram (Chana)", cropHi: "चना", msp: 5440, unit: "₹/Quintal" },
      { crop: "Maize", cropHi: "मक्का", msp: 2090, unit: "₹/Quintal" }
    ];

    container.innerHTML = benchmarks.map(item => {
      const name = lang === 'hi' ? item.cropHi : item.crop;
      return `
        <div class="msp-item">
          <small>${lang === 'hi' ? 'सरकारी MSP 2024-25' : 'Govt MSP 2024-25'}</small>
          <b>${name}</b>
          <strong>₹${item.msp.toLocaleString('en-IN')}</strong>
          <span class="muted" style="font-size:11.5px;">₹${(item.msp / 100).toFixed(1)} / kg (प्रति किलो)</span>
        </div>
      `;
    }).join('');
  }

  function initCalculator() {
    const qtyInput = document.getElementById('calcQty');
    const unitSelect = document.getElementById('calcUnit');
    const rateInput = document.getElementById('calcRate');
    const totalDisplay = document.getElementById('calcTotalResult');
    const kgDisplay = document.getElementById('calcKgResult');
    const netDisplay = document.getElementById('calcNetResult');

    function calculate() {
      if (!qtyInput || !rateInput || !totalDisplay) return;
      const qty = parseFloat(qtyInput.value) || 0;
      const unit = unitSelect ? unitSelect.value : 'quintal';
      const rate = parseFloat(rateInput.value) || 0;

      let totalKg = 0;
      if (unit === 'quintal') totalKg = qty * 100;
      else if (unit === 'bag50') totalKg = qty * 50;
      else if (unit === 'kg') totalKg = qty;
      else if (unit === 'ton') totalKg = qty * 1000;

      const ratePerKg = rate / 100;
      const totalAmount = totalKg * ratePerKg;
      const mandiFeeEstimate = totalAmount * 0.015;
      const netAmount = Math.max(0, totalAmount - mandiFeeEstimate);

      totalDisplay.textContent = formatCurrency(totalAmount);
      if (kgDisplay) kgDisplay.textContent = `₹${ratePerKg.toFixed(2)} / kg`;
      if (netDisplay) netDisplay.textContent = formatCurrency(netAmount);
    }

    if (qtyInput) qtyInput.oninput = calculate;
    if (unitSelect) unitSelect.onchange = calculate;
    if (rateInput) rateInput.oninput = calculate;
    calculate();
  }

  function setupFilterEvents() {
    const stateSelect = document.getElementById('marketStateFilter');
    if (stateSelect) {
      stateSelect.onchange = (e) => {
        state.currentState = e.target.value;
        fetchMarketPrices();
      };
    }

    const searchInput = document.getElementById('marketSearchInput');
    if (searchInput) {
      let debounceTimer;
      searchInput.oninput = (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.searchQuery = e.target.value.trim();
          fetchMarketPrices();
        }, 250);
      };
    }

    const refreshBtn = document.getElementById('marketRefreshBtn');
    if (refreshBtn) {
      refreshBtn.onclick = () => {
        fetchMarketPrices(true).then(() => {
          if (window.toast) {
            const lang = getLang();
            window.toast(lang === 'hi' ? 'ताज़ा मंडी भाव अपडेट हो गए हैं।' : lang === 'mr' ? 'बाजार भाव अपडेट झाले.' : 'Mandi rates refreshed.');
          }
        });
      };
    }
  }

  function render() {
    renderStats();
    renderCategoryPills();
    renderCards();
    renderMspComparison();
    window.KrishiI18n?.translate();
  }

  function init() {
    setupFilterEvents();
    initCalculator();

    window.addEventListener('krishi-language', () => {
      render();
    });
  }

  window.KrishiMarket = {
    loadPrices: () => {
      if (state.records.length === 0) {
        fetchMarketPrices();
      } else {
        render();
      }
    },
    refresh: () => fetchMarketPrices(true)
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
