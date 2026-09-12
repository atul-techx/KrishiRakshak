// Public settings only. Never put API keys here.
window.KRISHI_CONFIG = { API_BASE_URL: "", USE_SERVER_PROXY: true, KINDWISE_ENABLED: false };

try{for(const k of ['krishiLanguage','sentinel-language'])if(localStorage.getItem(k)==='hinglish')localStorage.setItem(k,'en');const session=JSON.parse(localStorage.getItem('krishi_session')||'null');if(session?.language==='hinglish'){session.language='en';localStorage.setItem('krishi_session',JSON.stringify(session));}}catch{}
