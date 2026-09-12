(()=>{'use strict';
let busy=false,history=[],ready=false,photo=null,photoVersion=0,preparing=false;
let currentSpeakingBtn=null;

const labels={
en:['Ask Rakshak','Crop questions & photo review','Ask about your crop…','Send','Close','Connecting…','● Online · AI Assistant','Assistant setup required','Unable to connect. Retry.','Thinking…','Retry','Add photo','Remove','New conversation','Choose a JPEG, PNG or WebP photo under 12 MB.','Photo could not be opened.','Photo attached for visual analysis','Describe this crop photo. What should I check next?','','Service unavailable or quota reached. Retry later.','Crop photo','Photo ready','No photo attached','Listen','Stop','Voice Advisory','Listening… speak now','Voice recognition is not supported in this browser. Please use Chrome or Edge.','Tap to speak','Stop listening'],
hi:['रक्षक से पूछें','फसल समाधान एवं फोटो समीक्षा','फसल के बारे में पूछें…','भेजें','बंद करें','जुड़ रहा है…','● ऑनलाइन · कृषक AI','सहायक का सेटअप जरूरी है','कनेक्शन नहीं हुआ। दोबारा कोशिश करें।','सोच रहा है…','दोबारा भेजें','फोटो जोड़ें','हटाएँ','नई बातचीत','12 MB से छोटा JPEG, PNG या WebP फोटो चुनें।','फोटो नहीं खुल सका।','फोटो जुड़ा हुआ है','इस फसल के फोटो को समझाएँ। आगे क्या जाँचें?','','सेवा अनुपलब्ध है या सीमा पूरी है। बाद में कोशिश करें।','फसल का फोटो','फोटो तैयार है','कोई फोटो नहीं जुड़ा','बोलकर सुनें','रोकें','बोलकर पूछें','सुन रहा हूँ… बोलिए','इस ब्राउज़र में वॉइस सपोर्ट नहीं है। कृपया Chrome या Edge का उपयोग करें।','बोलने के लिए दबाएँ','सुनना बंद करें'],
mr:['रक्षकला विचारा','पीक सल्ला आणि फोटो परीक्षण','पिकाबद्दल विचारा…','पाठवा','बंद करा','जोडत आहे…','● ऑनलाइन · शेती AI','सहाय्यकाचे सेटअप आवश्यक आहे','जोडणी झाली नाही. पुन्हा प्रयत्न करा.','विचार करत आहे…','पुन्हा पाठवा','फोटो जोडा','काढा','नवीन संभाषण','12 MB पेक्षा लहान JPEG, PNG किंवा WebP फोटो निवडा.','फोटो उघडता आला नाही.','फोटो जोडला आहे','या पिकाचा फोटो समजावून सांगा. पुढे काय तपासावे?','','सेवा अनुपलब्ध आहे किंवा मर्यादा संपली आहे. नंतर प्रयत्न करा.','पिकाचा फोटो','फोटो तयार आहे','फोटो जोडलेला नाही','ऐका','थांबवा','बोलून विचारा','ऐकत आहे… आता बोला','या ब्राउझरमध्ये व्हॉइस सपोर्ट नाही. कृपया Chrome किंवा Edge वापरा.','बोलण्यासाठी दाबा','ऐकणे थांबवा'],
};
const lang=()=>window.KrishiI18n?.getLanguage()||(['en','hi','mr'].includes(localStorage.getItem('krishiLanguage'))?localStorage.getItem('krishiLanguage'):'en'),L=()=>labels[lang()]||labels.en;

function stopSpeaking(){
  if('speechSynthesis' in window){
    try{speechSynthesis.cancel();}catch{}
  }
  if(currentSpeakingBtn){
    currentSpeakingBtn.classList.remove('speaking');
    const label=currentSpeakingBtn.querySelector('.speak-label');
    if(label)label.textContent=L()[23]||'Listen';
    const icon=currentSpeakingBtn.querySelector('.speak-icon');
    if(icon)icon.innerHTML='<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    currentSpeakingBtn=null;
  }
}

function cleanForSpeech(text){
  return text
    .replace(/\*\*(.*?)\*\*/g,'$1')
    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g,'$1')
    .replace(/`.*?`/g,'')
    .replace(/^[-*•]\s+/gm,'')
    .replace(/^\d+\.\s+/gm,'')
    .replace(/https?:\/\/\S+/g,'')
    .replace(/[#_~]/g,'')
    .replace(/\n+/g,'. ')
    .replace(/\s+/g,' ')
    .trim();
}

function speakText(text,btn){
  if(!('speechSynthesis' in window)){
    alert('Speech is not supported in this browser.');
    return;
  }
  if(currentSpeakingBtn===btn){
    stopSpeaking();
    return;
  }
  stopSpeaking();
  const clean=cleanForSpeech(text);
  if(!clean)return;

  const u=new SpeechSynthesisUtterance(clean);
  const hasDevanagari=/[\u0900-\u097F]/.test(clean);
  const langCode=hasDevanagari?(lang()==='mr'?'mr-IN':'hi-IN'):({en:'en-IN',hi:'hi-IN',mr:'mr-IN'}[lang()]||'hi-IN');
  u.lang=langCode;
  u.rate=0.92;

  try{
    const voices=speechSynthesis.getVoices();
    const voice=voices.find(v=>v.lang===langCode)||
                voices.find(v=>v.lang&&v.lang.startsWith(langCode.slice(0,2)))||
                voices.find(v=>v.lang&&v.lang.includes('IN'));
    if(voice)u.voice=voice;
  }catch{}

  currentSpeakingBtn=btn;
  btn.classList.add('speaking');
  const label=btn.querySelector('.speak-label');
  if(label)label.textContent=L()[24]||'Stop';
  const icon=btn.querySelector('.speak-icon');
  if(icon)icon.innerHTML='<rect x="6" y="6" width="12" height="12" rx="2"/>';

  u.onend=()=>stopSpeaking();
  u.onerror=()=>stopSpeaking();
  speechSynthesis.speak(u);
}

let recognition=null,isListening=false,autoSpeakNextAnswer=false;
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

function stopListening(){
  if(recognition&&isListening){
    try{recognition.stop();}catch{}
  }
  isListening=false;
  const micBtn=q('.rakshak-mic-btn');
  if(micBtn)micBtn.classList.remove('listening');
  const banner=q('.rakshak-listening-banner');
  if(banner)banner.hidden=true;
  if(input)input.placeholder=L()[2];
}

function startListening(){
  if(busy||preparing)return;
  if(!SpeechRecognition){
    alert(L()[27]||'Voice recognition is not supported in this browser. Please use Chrome or Edge.');
    return;
  }
  if(isListening){
    stopListening();
    return;
  }
  stopSpeaking();
  try{
    recognition=new SpeechRecognition();
    recognition.continuous=false;
    recognition.interimResults=true;
    recognition.maxAlternatives=1;
    const curLang=lang();
    recognition.lang=curLang==='mr'?'mr-IN':(curLang==='hi'?'hi-IN':'en-IN');
    const micBtn=q('.rakshak-mic-btn');
    const banner=q('.rakshak-listening-banner');
    let finalTranscript='';
    recognition.onstart=()=>{
      isListening=true;
      if(micBtn)micBtn.classList.add('listening');
      if(banner){
        banner.hidden=false;
        const textSpan=banner.querySelector('.rakshak-listening-text span:last-child');
        if(textSpan)textSpan.textContent=L()[26]||'Listening… speak now';
      }
      input.placeholder=L()[26]||'Listening… speak now';
      input.focus();
    };
    recognition.onresult=(e)=>{
      let interim='';
      for(let i=e.resultIndex;i<e.results.length;++i){
        if(e.results[i].isFinal)finalTranscript+=e.results[i][0].transcript;
        else interim+=e.results[i][0].transcript;
      }
      input.value=finalTranscript||interim;
    };
    recognition.onerror=(e)=>{
      console.warn('SpeechRecognition error:',e.error);
      stopListening();
      if(e.error==='not-allowed'){
        alert('Microphone access was denied. Please allow microphone permissions in browser.');
      }
    };
    recognition.onend=()=>{
      stopListening();
      const spokenText=input.value.trim();
      if(spokenText){
        autoSpeakNextAnswer=true;
        send(spokenText,photo);
        input.value='';
      }
    };
    recognition.start();
  }catch(e){
    console.error('Speech recognition failed to start:',e);
    stopListening();
  }
}

const root=document.createElement('div');
root.id='rakshak-widget';
root.dataset.noTranslate='';

root.innerHTML=`
<button class="rakshak-launch" type="button">
  <img class="rakshak-launch-logo" src="rakshak-logo.png" alt="Rakshak Logo" width="28" height="28">
  <span class="rakshak-launch-text"></span>
</button>
<section class="rakshak-panel" hidden aria-label="Rakshak">
  <div class="rakshak-head">
    <div class="rakshak-head-info">
      <div class="rakshak-avatar"><img class="rakshak-avatar-img" src="rakshak-logo.png" alt="Rakshak Logo" width="38" height="38"></div>
      <div>
        <div class="rakshak-head-title-row">
          <b></b>
          <span class="rakshak-head-tag">AI</span>
        </div>
        <small class="rakshak-status-pill"></small>
      </div>
    </div>
    <div class="rakshak-head-actions">
      <select class="rakshak-lang-select" title="भाषा चुनें / Select Language" aria-label="भाषा चुनें / Select Language">
        <option value="hi">हिन्दी</option>
        <option value="mr">मराठी</option>
        <option value="en">English</option>
      </select>
      <button type="button" class="new-chat" title="New conversation" aria-label="New conversation">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
      </button>
      <button class="rakshak-close" type="button" aria-label="Close">×</button>
    </div>
  </div>
  <p class="rakshak-status" role="status" hidden></p>
  <div class="rakshak-messages" role="log" aria-live="polite"></div>
  <div class="rakshak-attachment">
    <div class="rakshak-photo" hidden>
      <img><span></span><button type="button" class="remove-photo" title="Remove photo" aria-label="Remove photo">✕</button>
    </div>
    <div class="rakshak-tools" hidden>
      <button type="button" class="add-photo-btn"></button>
    </div>
    <input type="file" class="photo-input" accept="image/jpeg,image/png,image/webp" hidden>
    <small class="photo-notice" hidden></small>
  </div>
  <div class="rakshak-listening-banner" hidden>
    <span class="rakshak-listening-text"><span class="rakshak-listening-dot"></span> <span>Listening… speak now</span></span>
    <button type="button" class="rakshak-stop-listen-btn" title="Stop listening" aria-label="Stop listening" style="border:0;background:transparent;color:#b3381a;cursor:pointer;font-weight:700;font-size:13px;padding:2px 6px">✕ Stop</button>
  </div>
  <form class="rakshak-form">
    <div class="rakshak-input-box">
      <button type="button" class="add-photo" title="Add crop photo" aria-label="Add crop photo">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </button>
      <button type="button" class="rakshak-mic-btn" title="बोलकर पूछें / Voice Advisory" aria-label="बोलकर पूछें / Voice Advisory">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
        </svg>
      </button>
      <input maxlength="4000" autocomplete="off">
      <button type="submit" class="rakshak-send" title="Send message" aria-label="Send">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </form>
</section>`;
document.body.append(root);

const q=s=>root.querySelector(s),panel=q('section'),input=q('form input'),messages=q('.rakshak-messages'),fileInput=q('.photo-input');

function formatMarkdown(text){
  if(!text)return '';
  let h=text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  h=h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h=h.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g,'<em>$1</em>');
  h=h.replace(/`([^`]+?)`/g,'<code>$1</code>');
  const lines=h.split('\n');
  let inUl=false,inOl=false,res=[];
  for(let line of lines){
    const bMatch=line.match(/^(\s*)[*•-]\s+(.+)/);
    const nMatch=line.match(/^(\s*)\d+\.\s+(.+)/);
    if(bMatch){
      if(inOl){res.push('</ol>');inOl=false;}
      if(!inUl){res.push('<ul class="msg-list">');inUl=true;}
      res.push(`<li>${bMatch[2]}</li>`);
    }else if(nMatch){
      if(inUl){res.push('</ul>');inUl=false;}
      if(!inOl){res.push('<ol class="msg-list">');inOl=true;}
      res.push(`<li>${nMatch[2]}</li>`);
    }else{
      if(inUl){res.push('</ul>');inUl=false;}
      if(inOl){res.push('</ol>');inOl=false;}
      if(line.trim().length>0){
        res.push(`<p>${line}</p>`);
      }
    }
  }
  if(inUl)res.push('</ul>');
  if(inOl)res.push('</ol>');
  return res.join('');
}

function showWelcome(){
  if(history.length)return;
  const existing=messages.querySelector('.rakshak-welcome');
  if(existing)existing.remove();
  const w=document.createElement('div');
  w.className='rakshak-welcome';
  const welcomeTitles={en:'Namaste! I am Rakshak',hi:'नमस्ते! मैं कृषिरक्षक हूँ',mr:'नमस्ते! मी कृषिरक्षक आहे'};
  const welcomeSubs={
    en:'Your AI agriculture assistant for Maharashtra. Ask about crops, pests, soil, weather, or attach a leaf photo for visual diagnosis.',
    hi:'महाराष्ट्र के किसानों के लिए AI फसल सहायक। फसल, कीट, रोग, मौसम या पत्ती की फोटो भेजकर सलाह लें।',
    mr:'महाराष्ट्रातील शेतकऱ्यांसाठी AI पीक सहाय्यक. पीक, कीड, खते किंवा पानाचा फोटो पाठवून सल्ला मिळवा.'
  };
  const voiceAdvisoryText={
    en:'🎙️ Voice Advisory · Tap to speak',
    hi:'🎙️ बोलकर पूछें · बोलने के लिए दबाएँ',
    mr:'🎙️ बोलून विचारा · बोलण्यासाठी दाबा'
  }[lang()]||'🎙️ Voice Advisory · Tap to speak';
  const chips={
    en:['🌾 Rabi crops for winter','🐛 Cotton bollworm check','💧 Soybean irrigation schedule'],
    hi:['🌾 रबी मौसम की मुख्य फसलें','🐛 कपास की इल्ली के लक्षण','💧 सोयाबीन सिंचाई सलाह'],
    mr:['🌾 हिवाळ्यातील रब्बी पिके','🐛 कपाशीवरील बोंडअळी उपाय','💧 सोयाबीन पाणी नियोजन']
  }[lang()]||chips.en;

  w.innerHTML=`
    <div class="rakshak-welcome-avatar"><img class="rakshak-welcome-logo" src="rakshak-logo.png" alt="Rakshak Logo" width="56" height="56"></div>
    <h3>${welcomeTitles[lang()]||welcomeTitles.en}</h3>
    <p>${welcomeSubs[lang()]||welcomeSubs.en}</p>
    <div class="rakshak-chips">
      <button type="button" class="rakshak-chip voice-chip">${voiceAdvisoryText}</button>
      ${chips.map(c=>`<button type="button" class="rakshak-chip">${c}</button>`).join('')}
    </div>
  `;
  const voiceBtn=w.querySelector('.voice-chip');
  if(voiceBtn)voiceBtn.onclick=()=>startListening();
  w.querySelectorAll('.rakshak-chip:not(.voice-chip)').forEach(btn=>{
    btn.onclick=()=>{
      input.value=btn.textContent.replace(/^[^\w\s\u0900-\u097F]+/, '').trim();
      q('form').requestSubmit();
    };
  });
  messages.append(w);
}

function refresh(){
  q('.rakshak-launch-text').textContent=L()[0];
  q('b').textContent=L()[0];
  q('.rakshak-status-pill').textContent=ready?L()[6]:L()[7];
  input.placeholder=L()[2];
  input.setAttribute('aria-label',L()[2]);
  q('.rakshak-close').setAttribute('aria-label',L()[4]);
  q('.new-chat').setAttribute('title',L()[13]);
  q('.new-chat').setAttribute('aria-label',L()[13]);
  q('.add-photo').setAttribute('title',L()[11]);
  q('.add-photo').setAttribute('aria-label',L()[11]);
  const micBtn=q('.rakshak-mic-btn');
  if(micBtn){
    micBtn.setAttribute('title',L()[25]||'Voice Advisory');
    micBtn.setAttribute('aria-label',L()[25]||'Voice Advisory');
  }
  q('.remove-photo').setAttribute('title',L()[12]);
  q('.photo-notice').textContent=L()[16];
  q('.rakshak-photo img').alt=L()[20];
  q('.rakshak-photo span').textContent=L()[21];
  fileInput.setAttribute('aria-label',L()[11]);
  const langSelect=q('.rakshak-lang-select');
  if(langSelect&&langSelect.value!==lang()){
    langSelect.value=lang();
  }
  if(!messages.children.length)showWelcome();
}

function lock(){for(const s of ['form button','form input','.add-photo','.rakshak-mic-btn','.remove-photo','.new-chat'])q(s).disabled=busy||preparing;}

async function status(){
  q('.rakshak-status-pill').textContent=L()[5];
  try{
    const r=await window.KrishiAPI.request('/api/status',{signal:AbortSignal.timeout(8000)}),d=await r.json();
    ready=r.ok&&d.configured;
    q('.rakshak-status-pill').textContent=ready?L()[6]:window.KrishiAPI.message(d.code||'NOT_CONFIGURED');
    if(!ready){
      q('.rakshak-status').textContent=window.KrishiAPI.message(d.code||'NOT_CONFIGURED');
      q('.rakshak-status').hidden=false;
    }else{
      q('.rakshak-status').hidden=true;
    }
  }catch{
    ready=false;
    q('.rakshak-status-pill').textContent=L()[8];
    q('.rakshak-status').textContent=L()[8];
    q('.rakshak-status').hidden=false;
  }
}

q('.rakshak-launch').onclick=()=>{
  panel.hidden=!panel.hidden;
  if(!panel.hidden){
    input.focus();
    status();
    if(!messages.children.length)showWelcome();
  }
};
q('.rakshak-close').onclick=()=>{
  panel.hidden=true;
  stopSpeaking();
  stopListening();
};
q('.rakshak-mic-btn').onclick=()=>startListening();
const stopListenBtn=q('.rakshak-stop-listen-btn');
if(stopListenBtn)stopListenBtn.onclick=()=>stopListening();

const chatLangSelect=q('.rakshak-lang-select');
if(chatLangSelect){
  chatLangSelect.value=lang();
  chatLangSelect.onchange=e=>{
    const selected=e.target.value;
    try{
      localStorage.setItem('krishiLanguage',selected);
      localStorage.setItem('sentinel-language',selected);
      window.KrishiI18n?.setLanguage(selected);
    }catch{}
    const mainLang=document.querySelector('#lang');
    if(mainLang)mainLang.value=selected;
    refresh();
  };
}

function message(text,role){
  const welcome=messages.querySelector('.rakshak-welcome');
  if(welcome)welcome.remove();
  const p=document.createElement('div');
  p.className='rakshak-message '+role;
  if(role.includes('assistant')&&!role.includes('typing')){
    const sender=document.createElement('div');
    sender.className='rakshak-msg-sender';
    sender.innerHTML='<img src="rakshak-logo.png" class="rakshak-msg-avatar" alt="Rakshak" width="18" height="18"><span>Rakshak AI</span>';
    p.append(sender);
  }
  if(text){
    const span=document.createElement('span');
    span.textContent=text;
    p.append(span);
  }
  messages.append(p);
  messages.scrollTop=messages.scrollHeight;
  return p;
}

function clearPhoto(){
  photoVersion++;photo=null;fileInput.value='';
  q('.rakshak-photo').hidden=true;
  q('.rakshak-photo img').removeAttribute('src');
}

q('.remove-photo').onclick=()=>{if(!busy)clearPhoto();};
q('.add-photo').onclick=()=>fileInput.click();

fileInput.onchange=async()=>{
  const file=fileInput.files?.[0];if(!file)return;fileInput.value='';
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024){message(L()[14],'assistant error');return;}
  const version=++photoVersion;preparing=true;lock();const url=URL.createObjectURL(file);
  try{
    const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
    if(version!==photoVersion)return;if(!img.width||!img.height)throw Error();
    const scale=Math.min(1,1200/Math.max(img.width,img.height)),canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(img.width*scale));
    canvas.height=Math.max(1,Math.round(img.height*scale));
    canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
    const dataUrl=canvas.toDataURL('image/jpeg',.8);
    const data=dataUrl.split(',')[1];if(!data||data.length>4000000)throw Error();
    photo={mimeType:'image/jpeg',data};
    q('.rakshak-photo img').src=dataUrl;
    q('.rakshak-photo').hidden=false;
    input.focus();
  }catch{
    message(L()[15],'assistant error');
  }finally{
    URL.revokeObjectURL(url);preparing=false;lock();
  }
};

q('.new-chat').onclick=()=>{
  if(busy)return;
  stopSpeaking();
  clearPhoto();history=[];
  messages.replaceChildren();
  input.value='';
  showWelcome();
};

function context(){
  try{
    if(typeof state!=='undefined'&&state.lastResult)return JSON.stringify({crop:state.lastResult.crop,finding:state.lastResult.disease});
    const d=JSON.parse(localStorage.getItem('sentinel-v5')||'{}'),o=d.observations?.at(-1);
    return o?JSON.stringify({crop:o.crop,stage:o.stage,sampled:o.sampled,affected:o.affected}):'';
  }catch{return '';}
}

function showAnswer(node,d){
  node.replaceChildren();
  const sender=document.createElement('div');
  sender.className='rakshak-msg-sender';
  sender.innerHTML='<img src="rakshak-logo.png" class="rakshak-msg-avatar" alt="Rakshak" width="18" height="18"><span>Rakshak AI</span>';
  node.append(sender);
  let answer=String(d.answer||'');
  answer=answer.replace(/^\s*(?:Please note that )?(?:live )?(?:web )?search is (?:currently )?unavailable[^\n]*\n*/i,'').replace(/^\s*Sources were not verified[^\n]*\n*/i,'').trim();
  
  const contentDiv=document.createElement('div');
  contentDiv.className='rakshak-msg-content';
  contentDiv.innerHTML=formatMarkdown(answer);
  node.append(contentDiv);

  if(Array.isArray(d.citations)&&d.citations.length>0){
    const sourcesDiv=document.createElement('div');
    sourcesDiv.className='rakshak-sources';
    sourcesDiv.innerHTML='<span class="rakshak-sources-title">Verified sources:</span>';
    const seen=new Set();
    for(const c of d.citations){
      if(!/^https?:\/\//.test(c.url)||seen.has(c.url))continue;
      seen.add(c.url);
      const a=document.createElement('a');
      a.href=c.url;a.target='_blank';a.rel='noopener noreferrer';
      a.className='rakshak-source-pill';
      a.textContent=c.title||(new URL(c.url)).hostname;
      sourcesDiv.append(a);
    }
    if(seen.size>0)node.append(sourcesDiv);
  }

  if(d.searchSuggestions){
    const frame=document.createElement('iframe');
    frame.title='Google Search';
    frame.setAttribute('sandbox','allow-popups allow-popups-to-escape-sandbox');
    frame.setAttribute('referrerpolicy','no-referrer');
    frame.srcdoc=String(d.searchSuggestions);
    frame.style.cssText='width:100%;height:160px;border:0;margin-top:8px;border-radius:8px';
    node.append(frame);
  }

  // Voice playback button
  if('speechSynthesis' in window){
    const actions=document.createElement('div');
    actions.className='rakshak-msg-actions';
    const speakBtn=document.createElement('button');
    speakBtn.type='button';
    speakBtn.className='rakshak-speak-btn';
    speakBtn.setAttribute('aria-label',L()[23]||'Listen');
    speakBtn.innerHTML=`
      <svg class="speak-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
      <span class="speak-label">${L()[23]||'Listen'}</span>
      <span class="speaking-waves" aria-hidden="true"><span></span><span></span><span></span></span>
    `;
    speakBtn.onclick=()=>speakText(answer,speakBtn);
    actions.append(speakBtn);
    node.append(actions);

    if(autoSpeakNextAnswer){
      autoSpeakNextAnswer=false;
      setTimeout(()=>{
        try{speakText(answer,speakBtn);}catch{}
      },350);
    }
  }
}

async function send(text,attached,retry=false){
  if(busy||preparing)return;
  busy=true;lock();
  if(!retry){
    const p=message(text,'user');
    if(attached){
      const img=document.createElement('img');
      img.className='rakshak-sent-photo';
      img.alt=L()[20];
      img.src=`data:${attached.mimeType};base64,${attached.data}`;
      p.append(img);
    }
  }
  const pending=message('','assistant');
  pending.innerHTML='<div class="rakshak-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';

  try{
    const r=await window.KrishiAPI.request('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      signal:AbortSignal.timeout(55000),
      body:JSON.stringify({message:text,language:lang(),history,context:context(),...(attached?{image:attached}:{})})
    }),d=await r.json();
    if(!r.ok||!d.answer)throw Error(window.KrishiAPI.message(d.code));
    showAnswer(pending,d);
    history.push({role:'user',text},{role:'model',text:d.answer});
    history=history.slice(-6);
    ready=true;
    q('.rakshak-status-pill').textContent=L()[6];
    q('.rakshak-status').hidden=true;
  }catch(e){
    if(e.name==='TimeoutError'||(e.message&&e.message.includes('NETWORK'))){
      ready=false;
      q('.rakshak-status-pill').textContent=L()[8];
    }
    pending.textContent=e.name==='TimeoutError'?L()[8]:(e.message||L()[19]);
    pending.classList.add('error');
    const b=document.createElement('button');
    b.type='button';
    b.className='rakshak-retry-btn';
    b.textContent=L()[10];
    b.onclick=()=>{if(busy)return;b.remove();send(text,attached,true);};
    pending.append(document.createElement('br'),b);
  }finally{
    busy=false;lock();input.focus();
    messages.scrollTop=messages.scrollHeight;
  }
}

q('form').onsubmit=e=>{
  e.preventDefault();
  if(busy||preparing)return;
  const text=input.value.trim()||(photo?L()[17]:'');
  if(!text)return;
  input.value='';
  send(text,photo);
};

window.addEventListener('krishi-language',refresh);
root.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    panel.hidden=true;
    stopSpeaking();
    stopListening();
  }
});

window.KrishiRakshakVoice={
  openVoiceAdvisory:()=>{
    panel.hidden=false;
    input.focus();
    status();
    if(!messages.children.length)showWelcome();
    setTimeout(()=>startListening(),250);
  },
  startListening,
  stopListening
};

document.addEventListener('click',e=>{
  if(e.target.closest('#heroVoiceAdvisoryBtn')){
    if(window.KrishiRakshakVoice){
      window.KrishiRakshakVoice.openVoiceAdvisory();
    }
  }
});

refresh();
})();
