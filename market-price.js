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
    viewMode: 'table', // 'table' | 'cards'
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
    const tbody = document.getElementById('mandiTableBody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding:40px; color:var(--muted);">
            <div style="font-size:24px; margin-bottom:8px;">⏳</div>
            <strong data-i18n="loadingMarket">Loading live APMC Mandi rates…</strong>
          </td>
        </tr>
      `;
    }
    const grid = document.getElementById('mandiGrid');
    if (grid) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--muted);">
          <div style="font-size:24px; margin-bottom:8px;">⏳</div>
          <strong data-i18n="loadingMarket">Loading live APMC Mandi rates…</strong>
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
        <span data-i18n="monitoredMandis">MONITORED MANDIS</span>
        <strong>${state.states.length > 1 ? state.states.length - 1 : 1}+ <small>${lang === 'hi' ? 'राज्य' : lang === 'mr' ? 'राज्ये' : 'States'}</small></strong>
        <p>${lang === 'hi' ? '25+ आधिकारिक APMC मंडियां जुड़ी हैं' : lang === 'mr' ? '25+ अधिकृत APMC बाजार जोडले आहेत' : '25+ APMC Mandis connected'}</p>
      </div>
      <div class="metric">
        <span data-i18n="trackedCommodities">ACTIVE COMMODITIES</span>
        <strong>${totalCrops} <small>${lang === 'hi' ? 'फसलें' : lang === 'mr' ? 'पिके' : 'Crops'}</small></strong>
        <p>${lang === 'hi' ? 'दैनिक आवक व औसत भाव दर्ज' : lang === 'mr' ? 'दैनंदिन आवक व सरासरी दर नोंद' : 'Daily modal arrivals recorded'}</p>
      </div>
      <div class="metric">
        <span data-i18n="topGainer">TOP GAINER TODAY</span>
        <strong class="text-gain">${topGainerName} <small>${topGainer ? `(+₹${topGainer.change})` : ''}</small></strong>
        <p>${topGainer ? `${topGainer.market} (${topGainer.changePct})` : 'Stable trading'}</p>
      </div>
      <div class="metric weather">
        <span data-i18n="mspStatus">MSP COMPLIANCE</span>
        <strong>${aboveMspCount}/${mspEligibleCount || 14}</strong>
        <p>${lang === 'hi' ? 'सरकारी MSP से ऊपर व्यापार' : lang === 'mr' ? 'शासकीय हमीभावापेक्षा जास्त दर' : 'Trading comfortably above Govt MSP'}</p>
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
      { id: "cereals", labelEn: "Cereals / Grain", labelHi: "अनाज", labelMr: "धान्य" },
      { id: "pulses", labelEn: "Pulses", labelHi: "दालें", labelMr: "कडधान्ये" },
      { id: "oilseeds", labelEn: "Oilseeds", labelHi: "तिलहन", labelMr: "गळीत धान्य" },
      { id: "cash_crops", labelEn: "Cash Crops", labelHi: "नकदी फसलें", labelMr: "नगदी पिके" }
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

  function renderTable() {
    const tbody = document.getElementById('mandiTableBody');
    if (!tbody) return;

    if (state.records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding:35px; color:var(--muted);">
            <p data-i18n="noMarketRecords">No Mandi rates match your search</p>
            <small data-i18n="tryClearFilter">Try selecting 'All Crops' or clearing the search box.</small>
          </td>
        </tr>
      `;
      return;
    }

    const lang = getLang();

    tbody.innerHTML = state.records.map(r => {
      const name = lang === 'hi' ? (r.commodityHi || r.commodity) : lang === 'mr' ? (r.commodityMr || r.commodity) : r.commodity;
      const subName = lang === 'en' ? (r.commodityHi || '') : r.commodity;
      const advisory = lang === 'hi' ? (r.advisoryHi || r.advisoryEn) : lang === 'mr' ? (r.advisoryMr || r.advisoryEn) : r.advisoryEn;

      const priceKg = (r.modalPrice / 100).toFixed(1);

      let trendClass = 'trend-flat';
      let trendSymbol = '● ';
      if (r.trend === 'up') {
        trendClass = 'trend-gain';
        trendSymbol = '▲ +';
      } else if (r.trend === 'down') {
        trendClass = 'trend-loss';
        trendSymbol = '▼ -';
      }

      const diffVal = r.change !== 0 ? Math.abs(r.change) : 0;
      const trendText = `${trendSymbol}₹${diffVal} (${r.changePct})`;

      let mspHtml = '';
      if (r.msp) {
        const diff = r.modalPrice - r.msp;
        if (diff >= 0) {
          mspHtml = `<small class="text-gain" style="font-weight:700;">+₹${diff} > MSP</small>`;
        } else {
          mspHtml = `<small style="color:var(--danger); font-weight:700;">-₹${Math.abs(diff)} < MSP</small>`;
        }
      }

      return `
        <tr>
          <td>
            <div class="tbl-crop-cell">
              <span class="tbl-crop-icon">${r.icon || '🌾'}</span>
              <div class="tbl-crop-info">
                <strong>${name}</strong>
                <small>${subName}</small>
              </div>
            </div>
          </td>
          <td>
            <div class="tbl-mandi-cell">
              <strong>${r.market}</strong>
              <small>${r.district}</small>
            </div>
          </td>
          <td>
            <span class="mini-pill">${r.state}</span>
          </td>
          <td class="text-right">
            <span class="tbl-price">₹${r.modalPrice.toLocaleString('en-IN')}</span>
            ${mspHtml ? `<div>${mspHtml}</div>` : ''}
          </td>
          <td class="text-right">
            <span class="tbl-kg">₹${priceKg}</span>
          </td>
          <td class="text-center">
            <span class="tbl-range">₹${r.minPrice} — ₹${r.maxPrice}</span>
          </td>
          <td class="text-center">
            <span class="trend-pill ${trendClass}">${trendText}</span>
          </td>
          <td>
            <small class="muted">${r.arrival}</small>
          </td>
          <td>
            <div class="tbl-advisory">${advisory}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderCards() {
    const grid = document.getElementById('mandiGrid');
    if (!grid) return;

    if (state.records.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:35px; color:var(--muted);">
          <p data-i18n="noMarketRecords">No Mandi rates match your search</p>
          <small data-i18n="tryClearFilter">Try selecting 'All Crops' or clearing the search box.</small>
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

      let trendClass = 'trend-flat';
      let trendSymbol = '● ';
      if (r.trend === 'up') {
        trendClass = 'trend-gain';
        trendSymbol = '▲ +';
      } else if (r.trend === 'down') {
        trendClass = 'trend-loss';
        trendSymbol = '▼ -';
      }
      const trendText = `${trendSymbol}₹${Math.abs(r.change)} (${r.changePct})`;

      return `
        <article class="mandi-crop-card">
          <div class="mandi-card-top">
            <div class="tbl-crop-cell">
              <span class="tbl-crop-icon">${r.icon || '🌾'}</span>
              <div class="tbl-crop-info">
                <strong>${name}</strong>
                <small>${subName} · ${r.market}</small>
              </div>
            </div>
            <span class="trend-pill ${trendClass}">${trendText}</span>
          </div>

          <div class="mandi-card-rate-box">
            <strong>₹${r.modalPrice.toLocaleString('en-IN')}</strong>
            <span>₹${priceKg} / kg (प्रति किलो)</span>
          </div>

          <div class="mandi-card-meta">
            <span><b>न्यूनतम:</b> ₹${r.minPrice}</span>
            <span><b>अधिकतम:</b> ₹${r.maxPrice}</span>
            <span>📦 ${r.arrival}</span>
          </div>

          <p class="muted" style="font-size:12px; margin:0; line-height:1.4;">${advisory}</p>
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
        <div class="msp-item">
          <small>Govt MSP 2024-25</small>
          <b>${name}</b>
          <strong>₹${item.msp.toLocaleString('en-IN')}</strong>
          <span class="muted" style="font-size:11px;">₹${(item.msp / 100).toFixed(1)} / kg</span>
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

    const viewTableBtn = document.getElementById('viewTableBtn');
    const viewGridBtn = document.getElementById('viewGridBtn');
    const tableWrap = document.getElementById('mandiTableWrap');
    const gridWrap = document.getElementById('mandiGrid');

    if (viewTableBtn && viewGridBtn) {
      viewTableBtn.onclick = () => {
        state.viewMode = 'table';
        viewTableBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        if (tableWrap) tableWrap.classList.remove('hidden');
        if (gridWrap) gridWrap.classList.add('hidden');
      };

      viewGridBtn.onclick = () => {
        state.viewMode = 'cards';
        viewGridBtn.classList.add('active');
        viewTableBtn.classList.remove('active');
        if (tableWrap) tableWrap.classList.add('hidden');
        if (gridWrap) gridWrap.classList.remove('hidden');
      };
    }
  }

  function render() {
    renderStats();
    renderCategoryPills();
    renderTable();
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
