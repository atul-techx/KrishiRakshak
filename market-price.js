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
    if (!grid) return;
    grid.innerHTML = `
      <div class="market-loading-box">
        <div class="market-spinner"></div>
        <p data-i18n="loadingMarket">Loading live APMC Mandi rates…</p>
      </div>
    `;
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

    statsContainer.innerHTML = `
      <div class="market-stat-card">
        <span class="mstat-icon">🏛️</span>
        <div class="mstat-info">
          <small data-i18n="monitoredMandis">Monitored Mandis</small>
          <strong>${state.states.length > 1 ? state.states.length - 1 : 1} ${lang === 'hi' ? 'राज्य' : lang === 'mr' ? 'राज्ये' : 'States'} · 25+ ${lang === 'hi' ? 'मंडियां' : lang === 'mr' ? 'बाजार' : 'APMCs'}</strong>
        </div>
      </div>
      <div class="market-stat-card">
        <span class="mstat-icon">🌾</span>
        <div class="mstat-info">
          <small data-i18n="trackedCommodities">Active Commodities</small>
          <strong>${totalCrops} ${lang === 'hi' ? 'फसलें दर्ज' : lang === 'mr' ? 'पिके नोंदणीकृत' : 'Commodities'}</strong>
        </div>
      </div>
      <div class="market-stat-card">
        <span class="mstat-icon">📈</span>
        <div class="mstat-info">
          <small data-i18n="topGainer">Top Mandi Gainer</small>
          <strong class="text-success">${topGainer ? `${lang === 'hi' ? topGainer.commodityHi : lang === 'mr' ? topGainer.commodityMr : topGainer.commodity} (+₹${topGainer.change})` : '--'}</strong>
        </div>
      </div>
      <div class="market-stat-card">
        <span class="mstat-icon">⚖️</span>
        <div class="mstat-info">
          <small data-i18n="mspStatus">MSP Benchmark</small>
          <strong class="text-amber">${mspEligibleCount ? `${aboveMspCount}/${mspEligibleCount} ${lang === 'hi' ? 'MSP से ऊपर' : lang === 'mr' ? 'हमीभावापेक्षा जास्त' : 'Above MSP'}` : '100% Verified'}</strong>
        </div>
      </div>
    `;
  }

  function renderCategoryPills() {
    const container = document.getElementById('marketCategoryPills');
    if (!container) return;

    const lang = getLang();
    const categories = state.categories.length > 0 ? state.categories : [
      { id: "all", labelEn: "All Crops", labelHi: "सभी फसलें", labelMr: "सर्व पिके" },
      { id: "vegetables", labelEn: "Vegetables", labelHi: "सब्जियां", labelMr: "भाज्या" },
      { id: "cereals", labelEn: "Cereals", labelHi: "अनाज", labelMr: "धान्य" },
      { id: "pulses", labelEn: "Pulses", labelHi: "दालें", labelMr: "कडधान्ये" },
      { id: "oilseeds", labelEn: "Oilseeds", labelHi: "तिलहन", labelMr: "गळीत धान्य" },
      { id: "cash_crops", labelEn: "Cash Crops", labelHi: "नकदी फसलें", labelMr: "नगदी पिके" }
    ];

    container.innerHTML = categories.map(cat => {
      const active = state.currentCategory === cat.id ? 'active' : '';
      const label = lang === 'hi' ? cat.labelHi : lang === 'mr' ? cat.labelMr : cat.labelEn;
      return `<button type="button" class="market-pill-btn ${active}" data-cat="${cat.id}">${label}</button>`;
    }).join('');

    container.querySelectorAll('.market-pill-btn').forEach(btn => {
      btn.onclick = () => {
        state.currentCategory = btn.dataset.cat;
        container.querySelectorAll('.market-pill-btn').forEach(b => b.classList.toggle('active', b === btn));
        fetchMarketPrices();
      };
    });
  }

  function renderCards() {
    const grid = document.getElementById('mandiGrid');
    if (!grid) return;

    if (state.records.length === 0) {
      grid.innerHTML = `
        <div class="market-empty-box">
          <span style="font-size:2.5rem;">🔍</span>
          <h3 data-i18n="noMarketRecords">No Mandi rates match your search</h3>
          <p data-i18n="tryClearFilter">Try selecting 'All Crops' or clearing the search box.</p>
        </div>
      `;
      return;
    }

    const lang = getLang();

    grid.innerHTML = state.records.map(r => {
      const name = lang === 'hi' ? (r.commodityHi || r.commodity) : lang === 'mr' ? (r.commodityMr || r.commodity) : r.commodity;
      const subName = lang === 'en' ? (r.commodityHi || '') : r.commodity;
      const advisory = lang === 'hi' ? (r.advisoryHi || r.advisoryEn) : lang === 'mr' ? (r.advisoryMr || r.advisoryEn) : r.advisoryEn;

      const priceKg = (r.modalPrice / 100).toFixed(1);
      const minKg = (r.minPrice / 100).toFixed(1);
      const maxKg = (r.maxPrice / 100).toFixed(1);

      const spread = r.maxPrice - r.minPrice;
      const pct = spread > 0 ? Math.min(100, Math.max(0, Math.round(((r.modalPrice - r.minPrice) / spread) * 100))) : 50;

      let trendBadge = '';
      if (r.trend === 'up') {
        trendBadge = `<span class="trend-badge trend-up">▲ +₹${r.change} (${r.changePct})</span>`;
      } else if (r.trend === 'down') {
        trendBadge = `<span class="trend-badge trend-down">▼ ₹${Math.abs(r.change)} (${r.changePct})</span>`;
      } else {
        trendBadge = `<span class="trend-badge trend-stable">● ${lang === 'hi' ? 'स्थिर' : lang === 'mr' ? 'स्थिर' : 'Stable'}</span>`;
      }

      let mspBadge = '';
      if (r.msp) {
        const diff = r.modalPrice - r.msp;
        if (diff >= 0) {
          mspBadge = `<span class="mandi-msp-tag msp-above">✓ +₹${diff} > MSP (₹${r.msp})</span>`;
        } else {
          mspBadge = `<span class="mandi-msp-tag msp-below">⚠ ₹${Math.abs(diff)} < MSP (₹${r.msp})</span>`;
        }
      }

      return `
        <article class="mandi-card" data-id="${r.id}">
          <div class="mandi-card-header">
            <div class="mandi-crop-id">
              <span class="mandi-icon">${r.icon || '🌾'}</span>
              <div>
                <h3 class="mandi-crop-name">${name}</h3>
                <small class="mandi-crop-sub">${subName}</small>
              </div>
            </div>
            ${trendBadge}
          </div>

          <div class="mandi-location-badge">
            <span>📍 ${r.market}</span>
            <span class="mandi-state-tag">${r.state}</span>
          </div>

          <div class="mandi-price-box">
            <div class="mandi-modal-wrap">
              <span class="mandi-price-label" data-i18n="modalPrice">Modal Price (औसत भाव)</span>
              <div class="mandi-modal-rate">
                <span class="mandi-rupee">₹</span>
                <span class="mandi-amount">${r.modalPrice.toLocaleString('en-IN')}</span>
                <span class="mandi-unit">/ क्विंटल</span>
              </div>
              <div class="mandi-kg-rate">₹${priceKg} / कि.ग्रा. (kg)</div>
            </div>
          </div>

          <div class="mandi-range-wrap">
            <div class="mandi-range-labels">
              <span><b>न्यूनतम:</b> ₹${r.minPrice} <small>(₹${minKg}/kg)</small></span>
              <span><b>अधिकतम:</b> ₹${r.maxPrice} <small>(₹${maxKg}/kg)</small></span>
            </div>
            <div class="mandi-range-track">
              <div class="mandi-range-fill" style="width:${pct}%"></div>
              <div class="mandi-range-marker" style="left:${pct}%" title="Modal Price: ₹${r.modalPrice}"></div>
            </div>
          </div>

          <div class="mandi-card-footer">
            <div class="mandi-meta-row">
              <span>📦 <b>आवक:</b> ${r.arrival}</span>
              <span>📅 ${r.updatedAt}</span>
            </div>
            ${mspBadge}
            <div class="mandi-advisory-pill">
              <span>💡</span>
              <p>${advisory}</p>
            </div>
          </div>
        </article>
      `;
    }).join('');
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
        <div class="msp-card">
          <div class="msp-head">
            <span class="msp-crop-title">${name}</span>
            <span class="msp-govt-tag">Govt MSP 2024-25</span>
          </div>
          <div class="msp-rate-display">
            <strong>₹${item.msp.toLocaleString('en-IN')}</strong>
            <small>/ क्विंटल (₹${(item.msp / 100).toFixed(1)}/kg)</small>
          </div>
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
        }, 300);
      };
    }

    const refreshBtn = document.getElementById('marketRefreshBtn');
    if (refreshBtn) {
      refreshBtn.onclick = () => {
        refreshBtn.classList.add('spinning');
        fetchMarketPrices(true).then(() => {
          setTimeout(() => refreshBtn.classList.remove('spinning'), 600);
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
