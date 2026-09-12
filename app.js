function safeText(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const CFG = Object.assign({
  
  KINDWISE_ENABLED:false, KINDWISE_API_KEY:"",
  USE_SERVER_PROXY:true
}, window.KRISHI_CONFIG || {});

const translations = {
  en:{home:"Home",scan:"Scan",dashboard:"Dashboard",expert:"Expert",eyebrow:"FOR THE FIELDS OF INDIA",
    heroTitle:"Worry less.<br><span>Grow wiser.</span>",heroLead:"One photo, one weather signal and one clear next step. KrishiRakshak brings crop health intelligence closer to the farmer.",
    startScan:" Scan my crop",openDashboard:"Open dashboard →",scanTitle:"Show us the leaf.",scanSub:"Upload a clear photo of one affected leaf. We analyse the image and show practical next steps.",
    upload:"Upload crop image",diagnose:"Run diagnosis",goodMorning:"Good morning"},
  hi:{home:"होम",scan:"स्कैन",dashboard:"डैशबोर्ड",expert:"विशेषज्ञ",eyebrow:"भारत के खेतों के लिए",
    heroTitle:"कम चिंता करें।<br><span>समझदारी से उगाएँ।</span>",heroLead:"एक फोटो, एक मौसम संकेत और एक स्पष्ट अगला कदम। KrishiRakshak फसल की जानकारी किसान के करीब लाता है.",
    startScan:" फसल स्कैन करें",openDashboard:"डैशबोर्ड खोलें →",scanTitle:"पत्ता दिखाएँ।",scanSub:"एक साफ प्रभावित पत्ते की फोटो अपलोड करें। पहले हम इसे आपके ब्राउज़र में analyse करेंगे.",
    upload:"फसल की तस्वीर अपलोड करें",diagnose:"जांच शुरू करें",goodMorning:"सुप्रभात"},
  hinglish:{home:"Home",scan:"Scan",dashboard:"Dashboard",expert:"Expert",eyebrow:"INDIA KE FIELDS KE LIYE",
    heroTitle:"Kam tension.<br><span>Samajhdari se ugao.</span>",heroLead:"Ek photo, ek weather signal aur ek clear next step. KrishiRakshak farmer ke liye crop intelligence ko simple banata hai.",
    startScan:" Crop scan karo",openDashboard:"Dashboard kholo →",scanTitle:"Leaf dikhayein.",scanSub:"Affected leaf ki clear photo upload karo. Image ko analyse karke practical next steps dikhenge.",
    upload:"Crop ki photo upload karo",diagnose:"Diagnosis start karo",goodMorning:"Good morning"},
  mr:{home:"होम",scan:"स्कॅन",dashboard:"डॅशबोर्ड",expert:"तज्ञ",eyebrow:"भारताच्या शेतांसाठी",
    heroTitle:"कमी चिंता.<br><span>शहाणपणाने पिकवा.</span>",heroLead:"एक फोटो, एक हवामान संकेत आणि एक स्पष्ट पुढचे पाऊल. KrishiRakshak शेतकऱ्यांसाठी पीक आरोग्य माहिती सोपी करते.",
    startScan:" पीक स्कॅन करा",openDashboard:"डॅशबोर्ड उघडा →",scanTitle:"पान दाखवा.",scanSub:"प्रभावित पानाचा स्वच्छ फोटो अपलोड करा. फोटोचे विश्लेषण करून पुढील उपयोगी सूचना दिल्या जातील.",
    upload:"पिकाचा फोटो अपलोड करा",diagnose:"तपासणी सुरू करा",goodMorning:"सुप्रभात"}
};

const state = {
  user:null, language:localStorage.getItem("krishiLanguage")||"en",
  selectedImage:null, chatImage:null, model:null, classes:[], modelReady:false,
  weather:null, currentCaseId:null, map:null, mapLayer:null, fieldInputs:{}, riskForecast:null, weatherLoading:false, modelPromise:null
};

const diseaseInfo = {
  "Apple___Apple_scab":["Apple","Apple Scab","Fungal lesions may appear olive or brown.","Remove badly affected leaves, improve airflow and avoid prolonged leaf wetness."],
  "Apple___Black_rot":["Apple","Black Rot","Dark lesions can occur on leaves and fruit.","Remove infected material and maintain orchard sanitation."],
  "Apple___Cedar_apple_rust":["Apple","Cedar Apple Rust","Yellow-orange spots can occur on apple leaves.","Remove infected material and maintain airflow."],
  "Apple___healthy":["Apple","Healthy","No major disease pattern was detected.","Continue regular monitoring and balanced nutrition."],
  "Blueberry___healthy":["Blueberry","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Cherry_(including_sour)___Powdery_mildew":["Cherry","Powdery Mildew","White powder-like fungal growth can cover leaves.","Improve airflow and avoid prolonged humidity."],
  "Cherry_(including_sour)___healthy":["Cherry","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot":["Maize","Cercospora / Gray Leaf Spot","Gray or brown lesions may develop on maize leaves.","Remove heavily infected material and improve field sanitation."],
  "Corn_(maize)___Common_rust_":["Maize","Common Rust","Reddish-brown rust pustules can occur on maize leaves.","Monitor spread and maintain balanced crop nutrition."],
  "Corn_(maize)___Northern_Leaf_Blight":["Maize","Northern Leaf Blight","Long gray-green or brown lesions can develop.","Scout the field and improve sanitation."],
  "Corn_(maize)___healthy":["Maize","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Grape___Black_rot":["Grape","Black Rot","Dark lesions can occur on grape leaves.","Remove infected material and improve canopy airflow."],
  "Grape___Esca_(Black_Measles)":["Grape","Esca / Black Measles","A complex grapevine disease can affect leaves and fruit.","Seek local expert confirmation."],
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)":["Grape","Grape Leaf Blight","Leaf spots can reduce healthy leaf area.","Improve airflow and remove severely affected leaves."],
  "Grape___healthy":["Grape","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Orange___Haunglongbing_(Citrus_greening)":["Orange","Citrus Greening","Uneven yellowing and reduced productivity can occur.","Seek local agricultural expert confirmation promptly."],
  "Peach___Bacterial_spot":["Peach","Bacterial Spot","Small dark spots may develop on leaves and fruit.","Remove severely affected material and maintain sanitation."],
  "Peach___healthy":["Peach","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Pepper,_bell___Bacterial_spot":["Bell Pepper","Bacterial Spot","Dark spots may appear on pepper leaves and fruit.","Remove severely affected leaves and avoid unnecessary leaf wetness."],
  "Pepper,_bell___healthy":["Bell Pepper","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Potato___Early_blight":["Potato","Early Blight","Dark concentric lesions can develop on potato leaves.","Remove affected foliage and improve sanitation."],
  "Potato___Late_blight":["Potato","Late Blight","Rapidly spreading dark lesions can occur under favorable conditions.","Isolate affected plants and seek agricultural guidance quickly."],
  "Potato___healthy":["Potato","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Raspberry___healthy":["Raspberry","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Soybean___healthy":["Soybean","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Squash___Powdery_mildew":["Squash","Powdery Mildew","White powder-like fungal growth can cover leaf surfaces.","Improve airflow and reduce prolonged leaf wetness."],
  "Strawberry___Leaf_scorch":["Strawberry","Leaf Scorch","Leaf surfaces or margins may develop brown scorched areas.","Maintain proper irrigation and remove severely affected leaves."],
  "Strawberry___healthy":["Strawberry","Healthy","No major disease pattern was detected.","Continue regular monitoring."],
  "Tomato___Bacterial_spot":["Tomato","Bacterial Spot","Small dark lesions can develop on tomato leaves and fruit.","Remove heavily infected leaves and avoid unnecessary leaf wetness."],
  "Tomato___Early_blight":["Tomato","Early Blight","Dark concentric-ring lesions can develop on tomato leaves.","Remove affected leaves, improve airflow and avoid prolonged leaf wetness."],
  "Tomato___Late_blight":["Tomato","Late Blight","Dark water-soaked lesions can spread rapidly under cool, wet conditions.","Remove severely affected material and seek agricultural guidance quickly."],
  "Tomato___Leaf_Mold":["Tomato","Tomato Leaf Mold","Yellow areas and leaf-surface mold can occur under high humidity.","Improve ventilation and reduce prolonged humidity."],
  "Tomato___Septoria_leaf_spot":["Tomato","Septoria Leaf Spot","Small circular leaf spots can reduce healthy foliage.","Remove infected leaves and improve airflow."],
  "Tomato___Spider_mites Two-spotted_spider_mite":["Tomato","Two-Spotted Spider Mites","Mites can cause stippling, yellowing and reduced vigor.","Inspect leaf undersides and use integrated pest management."],
  "Tomato___Target_Spot":["Tomato","Target Spot","Circular target-like lesions may develop on leaves.","Remove severely infected foliage and improve airflow."],
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus":["Tomato","Tomato Yellow Leaf Curl Virus","Leaves may curl and yellow with reduced growth.","Inspect for whitefly vectors and seek local guidance."],
  "Tomato___Tomato_mosaic_virus":["Tomato","Tomato Mosaic Virus","Mosaic patterns and abnormal leaf development may occur.","Remove severely affected plants and maintain field hygiene."],
  "Tomato___healthy":["Tomato","Healthy","No major disease pattern was detected.","Continue regular monitoring."]
};

function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.remove("hidden");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.add("hidden"),3000)}
function storageKey(k){return `krishi_${state.user?.id||"guest"}_${k}`}
function getScans(){try{return JSON.parse(localStorage.getItem(storageKey("scans"))||"[]")}catch{return[]}}
function saveScans(x){localStorage.setItem(storageKey("scans"),JSON.stringify(x.slice(0,30)))}
function getCrops(){try{return JSON.parse(localStorage.getItem(storageKey("crops"))||"[]")}catch{return[]}}
function saveCrops(x){localStorage.setItem(storageKey("crops"),JSON.stringify(x))}
function getCases(){try{return JSON.parse(localStorage.getItem(storageKey("cases"))||"[]")}catch{return[]}}
function saveCases(x){localStorage.setItem(storageKey("cases"),JSON.stringify(x))}

function updateLanguage(){
  document.body.classList.toggle("lang-hi",state.language==="hi"||state.language==="mr");
  $("#languageSelector").value=state.language;
  window.KrishiI18n?.setLanguage(state.language);
}
function showPage(page){
  $$(".page").forEach(p=>p.classList.toggle("active",p.id===`${page}Page`));
  $$(".nav-btn[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  if(page==="dashboard")renderDashboard();
  if(page==="expert")renderCases();if(page==="official")setTimeout(()=>{renderOfficialDashboard();state.map?.invalidateSize(true)},120);
  if(page==="market")window.KrishiMarket?.loadPrices();
  window.scrollTo({top:0,behavior:"smooth"});
}
function userFromStore(){try{const s=localStorage.getItem("krishi_session");return s?JSON.parse(s):null}catch{return null}}
function allUsers(){try{return JSON.parse(localStorage.getItem("krishi_users")||"[]")}catch{return[]}}
function saveUsers(x){localStorage.setItem("krishi_users",JSON.stringify(x))}
function enterApp(user){
  state.user=user;localStorage.setItem("krishi_session",JSON.stringify(user));
  $("#authScreen").classList.add("hidden");$("#app").classList.remove("hidden");
  $("#profileName").textContent=user.name?.split(" ")[0]||"Farmer";$("#dashName").textContent=user.name||"Farmer";
  $("#dashLocation").textContent=user.location||"Add your village/district in profile.";
  renderDashboard();loadWeather();
}
function logout(){localStorage.removeItem("krishi_session");location.reload()}

let registering=false;
function setAuthMode(mode){
  registering=mode==="register";
  $("#loginTab").classList.toggle("active",!registering);$("#registerTab").classList.toggle("active",registering);
  $("#authTitle").textContent=registering?"Create your farmer account":"Welcome back";
  $("#authSubtitle").textContent=registering?"Save scans, crops and expert cases to this browser.":"Sign in to your farmer workspace.";
  $("#authSubmit").textContent=registering?"Create account →":"Login →";
  $("#authScreen").classList.toggle("registering",registering);
  $("#authName").required=registering;
}
$("#loginTab").onclick=()=>setAuthMode("login");$("#registerTab").onclick=()=>setAuthMode("register");
$("#authForm").addEventListener("submit",e=>{
  e.preventDefault();const id=$("#authId").value.trim().toLowerCase(),pass=$("#authPassword").value;
  if(registering){
    if(pass.length<4)return toast("Password should be at least 4 characters.");
    const users=allUsers();if(users.some(u=>u.id===id))return toast("Account already exists. Please login.");
    const user={id,name:$("#authName").value.trim(),location:$("#authLocation").value.trim(),crop:"",createdAt:Date.now()};
    users.push({...user,password:pass});saveUsers(users);enterApp(user);toast("Farmer account created.");
  }else{
    const u=allUsers().find(x=>x.id===id&&x.password===pass);if(!u)return toast("Invalid login details.");
    const {password,...safe}=u;enterApp(safe);
  }
});
$("#logoutBtn").onclick=logout;
$("#brandHome").onclick=()=>showPage("home");
$$(".nav-btn[data-page]").forEach(b=>b.onclick=()=>showPage(b.dataset.page));
$$("[data-go]").forEach(b=>b.onclick=()=>showPage(b.dataset.go));
$("#languageSelector").onchange=e=>{state.language=e.target.value;localStorage.setItem("krishiLanguage",state.language);updateLanguage()};

$("#profileBtn").onclick=()=>{
  $("#profileEditName").value=state.user.name||"";$("#profileEditLocation").value=state.user.location||"";$("#profileEditCrop").value=state.user.crop||"";$("#profileModal").classList.remove("hidden")
};
$$("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).classList.add("hidden"));
$("#saveProfileBtn").onclick=()=>{
  state.user.name=$("#profileEditName").value.trim()||"Farmer";state.user.location=$("#profileEditLocation").value.trim();state.user.crop=$("#profileEditCrop").value.trim();
  const users=allUsers().map(u=>u.id===state.user.id?{...u,...state.user}:u);saveUsers(users);localStorage.setItem("krishi_session",JSON.stringify(state.user));
  $("#profileName").textContent=state.user.name.split(" ")[0];$("#dashName").textContent=state.user.name;$("#dashLocation").textContent=state.user.location||"Add your village/district in profile.";$("#profileModal").classList.add("hidden");renderDashboard();toast("Profile updated.");
};

async function loadModel(){window.KrishiDual?.warm();}
async function runCNN(file){return window.KrishiDual.run(file);}
async function fileBase64(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file)})}

async function runKindwise(file){
 const r=await window.KrishiAPI.request('/api/diagnose',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:{mimeType:file.type,data:await fileBase64(file)},language:state.language})});
 if(!r.ok)throw Error('Kindwise unavailable');const {assessment:a}=await r.json();return {crop:a.crop,disease:a.finding,description:a.reason,treatment:a.nextSteps,confidence:null,source:'Kindwise crop.health'};
}

function combineResults(onnx,kind){
  if(!onnx&&!kind)throw new Error("No assessment result.");
  if(!kind)return {...onnx,agreement:"Primary assessment"};
  if(!onnx)return {className:null,confidence:kind.confidence,crop:kind.crop,disease:kind.disease,problem:kind.description,action:kind.treatment,source:"Second opinion"};
  const local=diseaseInfo[onnx.className]||[onnx.className?.split("___")[0]||"Unknown",onnx.className?.split("___")[1]||"Unknown","A visual crop-health pattern was detected.","Consult an agriculture expert before treatment."];
  const localDisease=local[1].toLowerCase(),kw=kind.disease.toLowerCase();
  const same=kw.includes(localDisease.split(" ")[0])||localDisease.includes(kw.split(" ")[0]);
  const conf=same?Math.max(onnx.confidence,kind.confidence):Math.min(onnx.confidence,kind.confidence)*.8;
  return {className:onnx.className,confidence:conf,crop:kind.crop||local[0],disease:kind.disease||local[1],problem:kind.description||local[2],action:kind.treatment||local[3],source:same?"Image analysis + second opinion":"Image analysis + review recommended",agreement:same?"Agreement":"Review recommended",local,kind};
}

function displayDiagnosis(result){
  const box=$("#diagnosisResult"), low=result.confidence<.55||result.agreement==="Review recommended";
  box.className="diagnosis-result"+(low?" warn":"");
  const conf=(result.confidence*100).toFixed(1);
  const safeDisease=result.disease||(diseaseInfo[result.className]?.[1]||"Uncertain condition");
  const safeCrop=result.crop||(diseaseInfo[result.className]?.[0]||"Unknown crop");
  const problem=result.problem||(diseaseInfo[result.className]?.[2]||"A visual crop-health pattern was found, but confidence is limited.");
  const action=result.action||(diseaseInfo[result.className]?.[3]||"Capture another clear image and seek local expert confirmation.");
  box.innerHTML=`
    <div class="diagnosis-top"><div><small>${low?"REVIEW RECOMMENDED":"CROP HEALTH ANALYSIS"}</small><h3>${safeText(safeCrop)} — ${safeText(safeDisease)}</h3></div><div class="confidence">${conf}%</div></div>
    <div class="diagnosis-meta"><span class="mini-pill">${safeText(result.source||"Crop health")}</span><span class="mini-pill">${safeText(result.agreement||"Confidence gated")}</span></div>
    ${result.top3?.length?`<details class="top3"><summary>Other visual matches</summary>${result.top3.slice(1).map(x=>`<div><span>${(diseaseInfo[x.className]?.[1]||x.className)}</span><b>${(x.confidence*100).toFixed(1)}%</b></div>`).join("")}</details>`:""}
    <p>${low?"The system is not confident enough to treat this as a confirmed diagnosis. ":""}${safeText(problem)}</p>
    <div class="recommendation"><b>Recommended next step</b>${safeText(action)}</div>
    <div class="advisory-grid"><div><b>Scout</b><p>Re-check the same plot within 24–48 hours and photograph a fresh symptom area.</p></div><div><b>IPM first</b><p>Remove/contain severely affected material where practical and improve field hygiene/airflow.</p></div><div><b>Spray decision</b><p>Use the product label and local agriculture guidance before applying any treatment.</p></div></div>
    ${low?`<button id="inlineExpert" class="btn btn-amber" style="margin-top:10px"> Request expert review</button>`:""}
  `;
  box.classList.remove("hidden");
  if($("#inlineExpert"))$("#inlineExpert").onclick=()=>createExpertCase(result);
}


function assessImageQuality(file){
  return new Promise(resolve=>{
    const u=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{
      const minSide=Math.min(img.naturalWidth,img.naturalHeight);
      const canvas=document.createElement("canvas");canvas.width=64;canvas.height=64;
      const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.drawImage(img,0,0,64,64);
      const d=ctx.getImageData(0,0,64,64).data;let sum=0,sum2=0,count=64*64;
      for(let i=0;i<d.length;i+=4){const y=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2];sum+=y;sum2+=y*y}
      const mean=sum/count,variance=Math.max(0,sum2/count-mean*mean);
      const lowLight=mean<55, overexposed=mean>235, lowDetail=variance<180;
      const ok=minSide>=224&&!lowLight&&!overexposed&&!lowDetail;
      const reasons=[];
      if(minSide<224)reasons.push("image is too small");
      if(lowLight)reasons.push("lighting is low");
      if(overexposed)reasons.push("image is overexposed");
      if(lowDetail)reasons.push("image may be blurry/plain");
      const box=$("#imageQuality");
      if(box){box.className="quality-box "+(ok?"good":"warn");box.classList.remove("hidden");box.innerHTML=ok?"✓ Photo quality looks suitable for analysis.":`⚠ ${reasons.join(", ")}. Retake in daylight with the affected area sharp.`}
      URL.revokeObjectURL(u);resolve(ok);
    };
    img.onerror=()=>{URL.revokeObjectURL(u);resolve(true)};img.src=u;
  });
}
function setSelectedImage(file){
  if(!file||!file.type.startsWith("image/"))return toast("Please select an image.");
  state.lastResult=null;state.lastScan=null;state.selectedImage=file;const r=new FileReader();
  r.onload=async ev=>{$("#previewImage").src=ev.target.result;$("#uploadBox").classList.add("has-image");await assessImageQuality(file)};
  r.readAsDataURL(file);
}

$("#uploadBox").onclick=()=>$("#imageInput").click();
$("#imageInput").onchange=e=>setSelectedImage(e.target.files[0]);
$("#cameraBtn").onclick=()=>$("#cameraInput").click();
$("#cameraInput").onchange=e=>setSelectedImage(e.target.files[0]);
$("#clearImageBtn").onclick=()=>{state.lastResult=null;state.lastScan=null;state.selectedImage=null;$("#imageInput").value="";$("#previewImage").src="";$("#uploadBox").classList.remove("has-image");$("#diagnosisResult").classList.add("hidden");$("#imageQuality").classList.add("hidden")};

$("#diagnoseBtn").onclick=async()=>{
  if(!state.selectedImage)return toast("Upload a clear leaf photo first.");
  const capturedImage=state.selectedImage;const b=$("#diagnoseBtn");b.disabled=true;b.textContent="⏳ Analysing image…";
  try{
    const onnx=await runCNN(state.selectedImage);
    const primaryResult=combineResults(onnx,null);
    primaryResult.crop=primaryResult.crop||diseaseInfo[onnx.className]?.[0]||$("#cropSelector").value||"Unknown";
    primaryResult.disease=primaryResult.disease||diseaseInfo[onnx.className]?.[1]||"Uncertain condition";
    primaryResult.problem=diseaseInfo[onnx.className]?.[2]||"Visual pattern detected.";
    primaryResult.action=diseaseInfo[onnx.className]?.[3]||"Repeat with a clearer image or request expert review.";
    const forecast=calculateRiskForecast(primaryResult.crop,primaryResult.disease);primaryResult.riskForecast=forecast;
    displayDiagnosis(primaryResult);
    saveScan(primaryResult,onnx);const capturedScanId=state.lastScan.id;
    state.lastResult=primaryResult;
    b.innerHTML=` <span>${translations[state.language].diagnose}</span>`;
    toast("Image analysis result ready. A second opinion may follow in the background.");
    // Never block the farmer on network AI.
    if(CFG.KINDWISE_ENABLED||CFG.KINDWISE_API_KEY){
      setTimeout(async()=>{
        try{
          const kind=await runKindwise(capturedImage);
          if(!kind)return;
          const merged=combineResults(onnx,kind);merged.riskForecast=forecast;
          if(state.selectedImage===capturedImage){displayDiagnosis(merged);state.lastResult=merged;}
          const scans=getScans();const saved=scans.find(s=>s.id===capturedScanId);if(saved){Object.assign(saved,{disease:merged.disease,crop:merged.crop,confidence:merged.confidence,source:merged.source,agreement:merged.agreement});saveScans(scans);renderDashboard();}
          toast(merged.agreement==="Agreement"?"Second opinion agrees with the local model.":"Second opinion differs — expert review recommended.");
        }catch(e){console.warn("Background second opinion failed",e)}
      },40);
    }
  }catch(e){console.error(e);toast(e.message||"Diagnosis failed.")}
  finally{b.disabled=false;b.innerHTML=` <span>${translations[state.language].diagnose}</span>`}
};

function saveScan(result,onnx){
  const scans=getScans();
  const info=diseaseInfo[onnx.className]||[result.crop,result.disease,result.problem,result.action];
  const scan={id:crypto.randomUUID(),crop:result.crop||info[0],disease:result.disease||info[1],confidence:result.confidence,source:result.source||"Image analysis",agreement:result.agreement||"Local result",timestamp:Date.now(),image:$("#previewImage").src,weather:state.weather,lat:state.weather?.lat??null,lon:state.weather?.lon??null,stage:$("#cropStage")?.value||"Vegetative",variety:$("#cropVariety")?.value.trim()||"",problem:result.problem,action:[result.action,...(result.precautions||[]),...(result.management||[]),...(result.followUp||[])].filter(Boolean).join("\n"),precautions:result.precautions,management:result.management,followUp:result.followUp,risk:result.riskForecast,top3:result.top3||[]};
  scans.unshift(scan);saveScans(scans);state.lastScan=scan;renderDashboard();
}

async function loadWeather(force=false){
  if(!navigator.geolocation)return setWeatherFallback("Location permission unavailable.");
  navigator.geolocation.getCurrentPosition(async pos=>{
    try{
      const {latitude,longitude}=pos.coords;
      const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,dew_point_2m,wind_speed_10m,soil_moisture_0_to_1cm&forecast_days=3&timezone=auto`;
      const r=await fetch(url,{cache:"no-store",headers:{"Accept":"application/json"}});if(!r.ok)throw new Error("Weather API error");
      const d=await r.json();state.weather={lat:latitude,lon:longitude,...d.current,hourly:KrishiWorkflow.futureHours(d.hourly,d.current.time),timezone:d.timezone,updatedAt:Date.now()};
      const text=`${Math.round(d.current.temperature_2m)}°C · feels ${Math.round(d.current.apparent_temperature)}°C · humidity ${d.current.relative_humidity_2m}% · rain ${d.current.precipitation} mm`;
      $("#homeTemp").textContent=`${Math.round(d.current.temperature_2m)}°`;$("#homeWeatherText").textContent=text;$("#dashTemp").textContent=`${Math.round(d.current.temperature_2m)}°C`;$("#dashWeather").textContent=text;$("#homeLocation").textContent=`GPS ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      updateRisk();renderWeatherForecast();renderDashboard();
    }catch(e){console.warn(e);setWeatherFallback("Live weather unavailable.")}
  },()=>setWeatherFallback("Allow location for live weather."),{enableHighAccuracy:true,maximumAge:force?0:120000,timeout:10000});
}
function setWeatherFallback(text){state.weather=null;state.riskForecast=null;$("#dashRiskText").textContent=text;renderRiskForecast();$("#homeTemp").textContent="--°";$("#dashTemp").textContent="--°";$("#homeWeatherText").textContent=text;$("#dashWeather").textContent=text;$("#weatherForecast").innerHTML="";updateRisk()}
function renderWeatherForecast(){
  const box=$("#weatherForecast"),h=state.weather?.hourly;if(!box||!h?.time?.length)return;
  const rows=h.time.slice(0,6).map((t,i)=>({t,i,temp:h.temperature_2m?.[i],pop:h.precipitation_probability?.[i]}));
  box.innerHTML=rows.map(x=>`<div class="weather-hour"><small>${new Date(x.t).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</small><b>${Math.round(x.temp)}°C</b><span>Rain ${x.pop??0}%</span></div>`).join("");
}
$("#refreshWeatherBtn")?.addEventListener("click",()=>loadWeather(true));
function calculateRiskForecast(crop="Unknown", disease=""){
  const w=state.weather; if(!w)return {score:null,label:"No weather",reason:"Weather unavailable",factors:[]};
  const h=w.hourly||{}; const rh=w.relative_humidity_2m||0, temp=w.temperature_2m||0, rain=w.precipitation||0;
  const next24=(h.precipitation_probability||[]).slice(0,24); const rainProb=next24.length?Math.max(...next24):0;
  const wetHours=(h.relative_humidity_2m||[]).slice(0,24).filter(v=>v>=80).length;
  const recentScans=getScans().slice(0,12); const cropCases=recentScans.filter(x=>(x.crop||"").toLowerCase()===(crop||"").toLowerCase());
  let score=10,factors=[];
  if(rh>=80){score+=18;factors.push("High humidity")} if(rain>=2){score+=18;factors.push("Recent rain")} if(rainProb>=60){score+=18;factors.push("High rain probability")}
  if(wetHours>=8){score+=15;factors.push("Long humid window")} if(temp>=18&&temp<=30&&rh>=75){score+=10;factors.push("Favorable fungal weather")}
  const dn=(disease||"").toLowerCase();
  if(/late blight|downy mildew|leaf mold|bacterial spot/.test(dn) && rh>=80 && rainProb>=50){score+=10;factors.push("Disease-specific wet-weather trigger")}
  if(/powdery mildew/.test(dn) && rh>=70 && rainProb<40){score+=7;factors.push("Warm humid mildew window")}
  if(/rust|gray leaf spot|septoria|early blight/.test(dn) && wetHours>=6){score+=7;factors.push("Extended leaf-wetness window")}
  if(cropCases.length>=2) {score+=8;factors.push("Recent field history")}
  const fi=state.fieldInputs||{};
  if(Number.isFinite(fi.trapCount)&&fi.trapCount>=5){score+=Math.min(15,fi.trapCount);factors.push("Trap activity reported")}
  if(Number.isFinite(fi.soilMoisture)&&fi.soilMoisture>=80){score+=6;factors.push("High soil moisture")}
  score=Math.min(95,score); const label=score>=70?"High":score>=45?"Watch":"Low";
  const action=label==="High"?"Scout affected rows today; avoid unnecessary leaf wetting and request expert help if symptoms expand.":label==="Watch"?"Scout within 24 hours and repeat a photo from the same plot.":"Continue routine scouting and avoid preventive pesticide use without a clear need.";
  return {score,label,reason:factors[0]||"No strong weather trigger",factors,action,crop,rainProb,wetHours};
}
function updateRisk(){
  const f=calculateRiskForecast(state.user?.crop||$("#cropSelector")?.value||"Unknown",state.lastResult?.disease||"");
  if(!f.score){$("#homeRisk").textContent="--";$("#dashRisk").textContent="--";$("#homeRiskReason").textContent="Waiting for weather";return}
  $("#homeRisk").textContent=f.label;$("#dashRisk").textContent=f.label;$("#homeRiskReason").textContent=f.reason;$("#dashRiskText").textContent=`${f.score}/100 · ${f.reason}`;
}
function renderRiskForecast(){
  const box=$("#riskForecast"); if(!box)return; const f=calculateRiskForecast(state.user?.crop||$("#cropSelector")?.value||"Unknown",state.lastResult?.disease||"");
  if(!f.score){box.innerHTML='<div class="empty">Allow location access to build the field forecast.</div>';return}
  box.innerHTML=`<div class="risk-head"><strong>${f.label} risk</strong><b>${f.score}/100</b></div><div class="risk-meter"><i style="width:${f.score}%"></i></div><p>${f.action}</p><div class="factor-list">${(f.factors.length?f.factors:["No strong trigger detected"]).map(x=>`<span>• ${x}</span>`).join("")}</div><small>Supporting forecast — not a disease diagnosis.</small>`;
  state.riskForecast=f;
}

function renderDashboard(){
  if(!state.user)return;
  const scans=getScans();const crops=getCrops();
  $("#dashScans").textContent=scans.length;$("#homeScanCount").textContent=scans.length;$("#dashName").textContent=state.user.name||"Farmer";$("#profileName").textContent=(state.user.name||"Farmer").split(" ")[0];
  const avg=scans.length?Math.round(scans.reduce((a,s)=>a+s.confidence*100,0)/scans.length):null;$("#healthScore").innerHTML=avg===null?`--`:`${Math.max(0,Math.min(100,avg))}<small>/100</small>`;$("#healthText").textContent=scans.length?"Mean model confidence; not a measure of crop health.":"No scans yet — start by checking a leaf.";
  $("#recentScans").innerHTML=scans.length?scans.slice(0,8).map(s=>`<div class="scan-row"><div><strong>${safeText(s.crop)} · ${safeText(s.disease)}</strong><p><span class="scan-badge">${(s.confidence*100).toFixed(1)}% confidence</span> · ${safeText(s.source)}</p></div><small>${new Date(s.timestamp).toLocaleString()}</small></div>`).join(""):`<div class="empty">No scans yet. Start with a clear leaf photo.</div>`;
  const watch=[];if(state.weather?.relative_humidity_2m>=80)watch.push(["","High humidity","Scout leaves for fungal symptoms and keep foliage dry where practical."]);if(state.weather?.precipitation>0)watch.push(["","Rain signal","Avoid unnecessary overhead irrigation and re-check affected areas after rain."]);if(!watch.length)watch.push(["","Regular scouting","Take a weekly leaf photo from the same plot to catch changes early."]);$("#fieldWatch").innerHTML=watch.map(x=>`<div class="watch-item"><span>${x[0]}</span><div><b>${x[1]}</b><p>${x[2]}</p></div></div>`).join("");
  renderRiskForecast();renderWeatherForecast();renderScanTrend();renderOfficialDashboard();
  $("#myCrops").innerHTML=(crops.length?crops:[{name:state.user.crop||"Add your crop",area:"Use profile or add a plot"}]).map(c=>`<div class="crop-item"><div class="crop-icon"></div><h4>${safeText(c.name)}</h4><p>${safeText(c.area)}</p></div>`).join("");
}
$("#addCropBtn").onclick=()=>$("#cropModal").classList.remove("hidden");
$("#saveCropBtn").onclick=()=>{const name=$("#cropNameInput").value.trim();if(!name)return toast("Enter a crop name.");const crops=getCrops();crops.push({name,area:$("#cropAreaInput").value.trim()||"Area not set"});saveCrops(crops);$("#cropModal").classList.add("hidden");$("#cropNameInput").value="";$("#cropAreaInput").value="";renderDashboard();toast("Crop added.")};

function createExpertCase(result){
  if(!state.lastScan&&state.selectedImage)state.lastScan={id:crypto.randomUUID(),crop:result.crop,disease:result.disease,confidence:result.confidence,image:$("#previewImage").src,timestamp:Date.now(),weather:state.weather};
  const scan=state.lastScan||{id:crypto.randomUUID(),crop:result.crop,disease:result.disease,confidence:result.confidence,image:$("#previewImage").src,timestamp:Date.now(),weather:state.weather};
  const cases=getCases();const c={id:"KR-"+crypto.randomUUID().slice(0,8),farmer:state.user.name,location:state.user.location||"Location not set",crop:result.crop||"Unknown",disease:result.disease||"Uncertain",confidence:result.confidence??null,image:scan.image,source:result.source||"Crop health",problem:result.problem||"",createdAt:Date.now(),status:"Pending",response:"",weather:state.weather};cases.unshift(c);saveCases(cases);renderCases();showPage("expert");toast("Case saved in the local expert queue.");
}
$("#expertBtn").onclick=()=>{if(!state.lastResult)return toast("Run a diagnosis first.");createExpertCase(state.lastResult)};

function renderCases(){
  const cases=getCases();$("#caseCount").textContent=cases.length;const q=($("#caseSearch")?.value||"").toLowerCase();const filtered=cases.filter(c=>(`${safeText(c.farmer)} ${safeText(c.crop)} ${safeText(c.disease)}`).toLowerCase().includes(q));
  $("#caseList").innerHTML=filtered.length?filtered.map(c=>`<div class="caseitem ${state.currentCaseId===c.id?"active":""}" data-case="${c.id}"><div class="case-avatar"></div><div style="flex:1;min-width:0"><h4>${safeText(c.farmer)}</h4><p>${safeText(c.crop)} · ${safeText(c.disease)}</p><small>${new Date(c.createdAt).toLocaleString()}</small></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px"><span class="priority">${safeText(c.status)}</span><button class="case-del-btn" data-delete-case="${c.id}" title="Remove case / मामला हटाएं" aria-label="Remove case" type="button">✕</button></div></div>`).join(""):`<div class="empty">No expert cases yet.</div>`;
  $$(".caseitem").forEach(el=>el.onclick=e=>{if(e.target.closest('.case-del-btn'))return;state.currentCaseId=el.dataset.case;renderCases();renderCaseDetail(el.dataset.case)});
  $$(".case-del-btn").forEach(btn=>btn.onclick=e=>{e.stopPropagation();const id=btn.dataset.deleteCase;if(!confirm(window.KrishiI18n?.t('Delete this case from the queue? This cannot be undone.')||'Delete this case from the queue? This cannot be undone.'))return;const remaining=getCases().filter(x=>x.id!==id);saveCases(remaining);if(state.currentCaseId===id){state.currentCaseId=remaining[0]?.id||null;}renderCases();if(typeof renderDashboard==='function')renderDashboard();toast(window.KrishiI18n?.t('Case removed from queue.')||'Case removed from queue.');});
  if(state.currentCaseId&&filtered.some(c=>c.id===state.currentCaseId))renderCaseDetail(state.currentCaseId);else if(filtered[0]){state.currentCaseId=filtered[0].id;renderCaseDetail(filtered[0].id)}
}
$("#caseSearch").oninput=renderCases;
function renderCaseDetail(id){
  const c=getCases().find(x=>x.id===id);if(!c)return;$("#caseDetail").innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px"><p class="eyebrow" style="margin:0">${c.id} · ${safeText(c.status)}</p><button class="btn btn-light danger-btn" id="deleteCaseTop" type="button" style="padding:6px 14px;font-size:12px;font-weight:600">🗑 Delete case</button></div><h2>${safeText(c.disease)}</h2><p class="case-meta">${safeText(c.farmer)} · ${safeText(c.crop)} · ${safeText(c.location)}</p>
    ${c.image?`<img class="case-image" src="${c.image}" alt="Farmer crop">`:""}
    <div class="ai-block"><b>AI first read</b><br>Confidence: ${(c.confidence*100).toFixed(1)}% · Source: ${safeText(c.source)}<br>${safeText(c.problem||"Review the image and farmer context before responding.")}</div>
    <p class="muted" style="font-size:12px">Weather at scan: ${c.weather?`${Math.round(c.weather.temperature_2m)}°C · humidity ${c.weather.relative_humidity_2m}% · rain ${c.weather.precipitation} mm`:"not available"}</p>
    <label class="field"><span>Expert recommendation</span><textarea id="expertResponse" class="response-box" placeholder="Write a practical, farmer-friendly response…">${safeText(c.response||"")}</textarea></label>
    <div class="case-actions"><button id="saveExpert" class="btn btn-primary">Send recommendation</button><button id="reportExpert" class="btn btn-light">Download report</button><button id="closeCase" class="btn btn-light">Mark reviewed</button><button id="deleteCase" class="btn btn-light danger-btn" type="button">🗑 Delete case</button></div>
  `;
  const remove=()=>{if(!confirm(window.KrishiI18n?.t('Delete this case from the queue? This cannot be undone.')||'Delete this case from the queue? This cannot be undone.'))return;const remaining=getCases().filter(x=>x.id!==id);saveCases(remaining);state.currentCaseId=remaining[0]?.id||null;renderCases();if(typeof renderDashboard==='function')renderDashboard();toast(window.KrishiI18n?.t('Case removed from queue.')||'Case removed from queue.');};
  $("#deleteCase")?.addEventListener('click',remove);
  $("#deleteCaseTop")?.addEventListener('click',remove);
  $("#saveExpert").onclick=()=>{const cases=getCases().map(x=>x.id===id?{...x,response:$("#expertResponse").value,status:"Responded"}:x);saveCases(cases);renderCases();toast("Expert response saved.");};
  $("#closeCase").onclick=()=>{const cases=getCases().map(x=>x.id===id?{...x,status:"Reviewed"}:x);saveCases(cases);renderCases();toast("Case marked reviewed.");};
  $("#reportExpert").onclick=()=>downloadReport(c);
}
function downloadReport(c){
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>KrishiRakshak Report ${c.id}</title><style>body{font-family:Arial;padding:40px;color:#2e2a25}h1{color:#6b4f3a}section{border:1px solid #ddd;padding:18px;border-radius:12px;margin:15px 0}img{max-width:500px;max-height:350px}</style></head><body><h1> KrishiRakshak</h1><p>Crop Health & Expert Review Report</p><section><b>Case:</b> ${c.id}<br><b>Farmer:</b> ${safeText(c.farmer)}<br><b>Location:</b> ${safeText(c.location)}<br><b>Crop:</b> ${safeText(c.crop)}<br><b>Crop finding:</b> ${safeText(c.disease)}<br><b>Confidence:</b> ${(c.confidence*100).toFixed(1)}%<br><b>Status:</b> ${safeText(c.status)}</section>${c.image?`<section><img src="${c.image}"></section>`:""}<section><b>Weather context</b><p>${c.weather?`${Math.round(c.weather.temperature_2m)}°C · humidity ${c.weather.relative_humidity_2m}% · rain ${c.weather.precipitation} mm`:"Not available"}</p></section><section><b>Expert recommendation</b><p>${safeText(c.response||"Pending expert review.")}</p></section><p>When the result is uncertain, confirm it with a qualified local agriculture expert.</p></body></html>`;
  const blob=new Blob([html],{type:"text/html"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`KrishiRakshak-${c.id}.html`;a.click();URL.revokeObjectURL(a.href);
}
$("#downloadLatestReport").onclick=()=>{const c=getCases()[0];if(c)downloadReport(c);else toast("No expert case/report yet.")};

const chatWindow=$("#chatWindow"),chatMessages=$("#chatMessages");
$("#chatToggle").onclick=()=>chatWindow.classList.remove("hidden");$("#closeChat").onclick=()=>chatWindow.classList.add("hidden");
$("#chatImageBtn").onclick=()=>$("#chatImageInput").click();
$("#chatImageInput").onchange=e=>{const f=e.target.files[0];if(!f)return;state.chatImage=f;const r=new FileReader();r.onload=ev=>{$("#chatPreviewImg").src=ev.target.result;$("#chatImagePreview").classList.remove("hidden")};r.readAsDataURL(f)};
$("#removeChatImage").onclick=()=>{state.chatImage=null;$("#chatImageInput").value="";$("#chatPreviewImg").src="";$("#chatImagePreview").classList.add("hidden")};
$("#sendChat").onclick=sendMessage;$("#chatInput").onkeydown=e=>{if(e.key==="Enter")sendMessage()};

function addMsg(text,type){const d=document.createElement("div");d.className=`msg ${type}`;d.textContent=text;chatMessages.appendChild(d);chatMessages.scrollTop=chatMessages.scrollHeight}
function fallbackChat(q){
  const l=q.toLowerCase();let answer;
  if(/weather|rain|mausam|barish|मौसम|बारिश|हवामान|पाऊस/.test(l))answer=state.weather?"Use weather as a scouting signal, not a diagnosis.":"Live weather unavailable.";
  else if(/water|irrigat|paani|sinchai|पानी|सिंचाई|पाणी|सिंचन/.test(l))answer="Check root-zone soil moisture before irrigation. If rain is expected, avoid unnecessary watering.";
  else if(/pest|insect|keet|कीट|कीड|किड/.test(l))answer="Inspect leaf undersides and new growth for insects or eggs before choosing a control method.";
  else if(state.lastResult)answer="Request expert review"+": "+state.lastResult.disease;
  else answer="Upload a clear leaf photo and run a scan. I can then explain the AI result and weather context.";
  return window.KrishiI18n?.t(answer)||answer;
}
async function sendMessage(){document.querySelector('.rakshak-launch')?.click();}


function getFieldInputs(){try{return JSON.parse(localStorage.getItem(storageKey("fieldInputs"))||"{}")}catch{return{}}}
function saveFieldInputs(){
  const x={trapCount:$("#trapCount")?.value===""?null:Number($("#trapCount")?.value),soilMoisture:$("#soilMoisture")?.value===""?null:Number($("#soilMoisture").value),updatedAt:Date.now()};
  if(x.trapCount!==null&&(!Number.isInteger(x.trapCount)||x.trapCount<0)||x.soilMoisture!==null&&(!Number.isFinite(x.soilMoisture)||x.soilMoisture<0||x.soilMoisture>100))return toast("Check trap count and soil moisture values.");localStorage.setItem(storageKey("fieldInputs"),JSON.stringify(x));state.fieldInputs=x;toast("Field inputs saved.");renderRiskForecast();
}
function getDefaultDistrictSignals(centerLat, centerLon) {
  const cLat = Number.isFinite(centerLat) ? centerLat : 28.3670;
  const cLon = Number.isFinite(centerLon) ? centerLon : 79.4304;

  return [
    {
      id: "LOC-01",
      lat: cLat - 0.007,
      lon: cLon + 0.006,
      crop: "Potato (आलू)",
      disease: "Late Blight (पछेती झुलसा)",
      risk: { score: 88, label: "High" },
      status: "High risk",
      farmer: "Ram Lal (राम लाल)",
      location: "Mohanpur Sector 4 · Bareilly",
      advisory: "Foliar fungicide spray recommended immediately. Restrict flood irrigation."
    },
    {
      id: "LOC-02",
      lat: cLat + 0.042,
      lon: cLon + 0.048,
      crop: "Wheat (गेहूं)",
      disease: "Yellow Rust (पीला रतुआ)",
      risk: { score: 82, label: "High" },
      status: "High risk",
      farmer: "Jagdish Prasad (जगदीश प्रसाद)",
      location: "Nawabganj Rural Belt · Bareilly",
      advisory: "Propiconazole 25 EC preventative spray. Monitor field borders closely."
    },
    {
      id: "LOC-03",
      lat: cLat + 0.068,
      lon: cLon - 0.035,
      crop: "Tomato (टमाटर)",
      disease: "Early Blight & Fruit Borer (अगेती झुलसा)",
      risk: { score: 76, label: "High" },
      status: "High risk",
      farmer: "Devendra Singh (देवेंद्र सिंह)",
      location: "Baheri Sector 2",
      advisory: "Apply Mancozeb + install pheromone lure traps."
    },
    {
      id: "LOC-04",
      lat: cLat - 0.058,
      lon: cLon + 0.042,
      crop: "Mustard (सरसों)",
      disease: "Aphid Infestation (माहू कीट)",
      risk: { score: 85, label: "High" },
      status: "High risk",
      farmer: "Virender Kumar (वीरेंद्र कुमार)",
      location: "Faridpur Cluster · Bareilly",
      advisory: "Dimethoate 30 EC or neem oil 10,000 ppm spray in the morning."
    },
    {
      id: "LOC-05",
      lat: cLat + 0.025,
      lon: cLon - 0.055,
      crop: "Chili (मिर्च)",
      disease: "Chili Leaf Curl (पर्ण कुंचन विषाणु)",
      risk: { score: 64, label: "Moderate" },
      status: "Pending",
      farmer: "Ramesh Patel (रमेश पटेल)",
      location: "Mirganj East",
      advisory: "Under KVK Scientist Review. Yellow sticky traps installed."
    },
    {
      id: "LOC-06",
      lat: cLat - 0.032,
      lon: cLon - 0.041,
      crop: "Paddy (धान)",
      disease: "Bacterial Leaf Blight (जीवाणु झुलसा)",
      risk: { score: 68, label: "Moderate" },
      status: "Pending",
      farmer: "Suraj Verma (सूरज वर्मा)",
      location: "Bhadpura Village Cluster",
      advisory: "Awaiting expert confirmation on Streptocycline bactericide dosage."
    },
    {
      id: "LOC-07",
      lat: cLat - 0.015,
      lon: cLon - 0.012,
      crop: "Maize (मक्का)",
      disease: "Fall Armyworm (सैनिक कीट)",
      risk: { score: 45, label: "Controlled" },
      status: "Reviewed",
      farmer: "KVK Demonstration Plot",
      location: "Bareilly Cantt Farm Zone",
      advisory: "Reviewed & Resolved: Trichogramma parasitoid cards successfully released."
    },
    {
      id: "LOC-08",
      lat: cLat - 0.022,
      lon: cLon + 0.065,
      crop: "Sugarcane (गन्ना)",
      disease: "Red Rot (लाल सड़न)",
      risk: { score: 52, label: "Managed" },
      status: "Reviewed",
      farmer: "Anil Gangwar (अनिल गंगवार)",
      location: "Bithri Chainpur Block",
      advisory: "Reviewed by Extension Officer: Disease-free certified sets distributed."
    },
    {
      id: "LOC-09",
      lat: cLat,
      lon: cLon,
      crop: state.user?.crop || "Wheat / Mustard (किसान का खेत)",
      disease: "Active GPS Field Monitoring",
      risk: state.riskForecast || { score: 35, label: "Low" },
      status: "Live GPS",
      farmer: state.user?.name || "Vijay Kumar (वर्तमान किसान)",
      location: state.user?.location || "Mohanpur, Bareilly (Your Field)",
      advisory: "Active surveillance on your field. No immediate epidemic outbreak."
    }
  ];
}

function renderOfficialDashboard(){
  const centerLat = Number.isFinite(state.weather?.lat) ? state.weather.lat : 28.3670;
  const centerLon = Number.isFinite(state.weather?.lon) ? state.weather.lon : 79.4304;
  const defaultSignals = getDefaultDistrictSignals(centerLat, centerLon);
  const cases = getCases();
  const scans = getScans();

  const userItems = [
    ...cases.map(c => ({
      ...c,
      lat: Number.isFinite(c.weather?.lat) ? c.weather.lat : (centerLat + 0.003),
      lon: Number.isFinite(c.weather?.lon) ? c.weather.lon : (centerLon + 0.003),
      risk: { score: c.confidence ? Math.round(c.confidence * 85) : 60, label: c.status === "Reviewed" ? "Controlled" : "Pending" },
      status: c.status || "Pending",
      advisory: c.response || "Expert case in queue for agronomist review."
    })),
    ...scans.filter(s => s.lat || s.weather?.lat).map(s => ({
      ...s,
      status: "AI signal",
      createdAt: s.timestamp,
      location: s.location || state.user?.location || "Field Scan",
      lat: s.lat ?? s.weather?.lat ?? centerLat,
      lon: s.lon ?? s.weather?.lon ?? centerLon,
      risk: s.riskForecast || calculateRiskForecast(s.crop, s.disease),
      advisory: s.action || "Routine field scan recorded."
    }))
  ];

  const all = [...defaultSignals, ...userItems];

  const highCount = all.filter(x => (x.risk?.score || 0) >= 70 || x.status === "High risk").length;
  const pendingCount = all.filter(x => x.status === "Pending" || x.status === "Awaiting expert").length;
  const reviewedCount = all.filter(x => x.status === "Reviewed" || x.status === "Responded").length;
  const totalCount = all.length;

  if ($("#officialCases")) $("#officialCases").textContent = totalCount;
  if ($("#officialHighRisk")) $("#officialHighRisk").textContent = highCount;
  if ($("#officialPending")) $("#officialPending").textContent = pendingCount;
  if ($("#officialReviewed")) $("#officialReviewed").textContent = reviewedCount;

  if ($("#learningConfirmed")) $("#learningConfirmed").textContent = reviewedCount;
  if ($("#learningPending")) $("#learningPending").textContent = pendingCount;
  if ($("#learningRate")) $("#learningRate").textContent = (reviewedCount + pendingCount > 0 ? Math.round((reviewedCount / (reviewedCount + pendingCount)) * 100) : 50) + "%";

  const mapEl = $("#hotspotMap");
  if (!mapEl) return;
  if (typeof L === "undefined") {
    mapEl.innerHTML = '<div class="map-error">Map library could not load. Check internet connection and reload.</div>';
    return;
  }
  if (!state.map) {
    state.map = L.map(mapEl, { zoomControl: true, preferCanvas: false }).setView([centerLat, centerLon], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(state.map);
    state.mapLayer = L.layerGroup().addTo(state.map);
    setTimeout(() => state.map.invalidateSize(true), 150);
  }
  setTimeout(() => state.map?.invalidateSize(true), 50);
  state.mapLayer.clearLayers();

  const filter = $("#hotspotFilter")?.value || "all";
  let filtered = all;
  if (filter === "high") {
    filtered = all.filter(x => (x.risk?.score || 0) >= 70 || x.status === "High risk");
  } else if (filter === "pending") {
    filtered = all.filter(x => x.status === "Pending" || x.status === "Awaiting expert");
  } else if (filter === "reviewed") {
    filtered = all.filter(x => x.status === "Reviewed" || x.status === "Responded");
  }

  const points = filtered.filter(x => Number.isFinite(x.lat) && Number.isFinite(x.lon) && Math.abs(x.lat) <= 90 && Math.abs(x.lon) <= 180);

  if (!points.length) {
    if ($("#mapLoading")) $("#mapLoading").textContent = "No locations match this filter.";
    state.map.setView([centerLat, centerLon], 11);
    return;
  }
  $("#mapLoading")?.remove();

  points.forEach(x => {
    const score = x.risk?.score || 0;
    const isHigh = score >= 70 || x.status === "High risk";
    const isPending = x.status === "Pending" || x.status === "Awaiting expert";
    const isReviewed = x.status === "Reviewed" || x.status === "Responded";
    const isLiveGPS = x.status === "Live GPS";

    let haloColor = "#6b4f3a";
    let fillColor = "#a57c54";
    let statusBadge = "ℹ️ Field Signal";
    let statusClass = "status-normal";

    if (isHigh) {
      haloColor = "#d32f2f";
      fillColor = "#e53935";
      statusBadge = "🚨 High Risk Alert (उच्च जोखिम)";
      statusClass = "status-high";
    } else if (isPending) {
      haloColor = "#ed6c02";
      fillColor = "#ff9800";
      statusBadge = "⏳ Awaiting Expert (समीक्षा प्रतीक्षारत)";
      statusClass = "status-pending";
    } else if (isReviewed) {
      haloColor = "#2e7d32";
      fillColor = "#43a047";
      statusBadge = "✓ Expert Reviewed (समीक्षा संपन्न)";
      statusClass = "status-reviewed";
    } else if (isLiveGPS) {
      haloColor = "#6b4f3a";
      fillColor = "#8c684f";
      statusBadge = "📍 Live Field GPS (आपका खेत)";
      statusClass = "status-gps";
    }

    const halo = L.circle([x.lat, x.lon], {
      radius: isHigh ? 750 : isLiveGPS ? 550 : 420,
      color: haloColor,
      fillColor: haloColor,
      weight: 2,
      fillOpacity: isHigh ? 0.22 : 0.12
    }).addTo(state.mapLayer);

    const marker = L.circleMarker([x.lat, x.lon], {
      radius: isHigh ? 10 : 8,
      color: "#ffffff",
      fillColor: fillColor,
      weight: 2.5,
      fillOpacity: 0.95
    }).addTo(state.mapLayer);

    const popupHtml = `
      <div class="loc-map-popup">
        <div class="loc-popup-tag ${statusClass}">
          <b>${statusBadge}</b>
          <span>Risk: ${score}/100</span>
        </div>
        <h4 class="loc-popup-title">${safeText(x.crop)}</h4>
        <p class="loc-popup-finding"><b>लक्षण / Condition:</b> ${safeText(x.disease)}</p>
        <p class="loc-popup-loc">📍 ${safeText(x.location)}</p>
        <div class="loc-popup-advisory">
          <span>💡</span> <div><b>सलाह / Advisory:</b> ${safeText(x.advisory || "Inspect affected leaves promptly.")}</div>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml, { maxWidth: 280 });
    halo.bindPopup(popupHtml, { maxWidth: 280 });
  });

  const bounds = L.latLngBounds(points.map(p => [Number(p.lat), Number(p.lon)]));
  if (bounds.isValid()) {
    state.map.fitBounds(bounds, { padding: [35, 35], maxZoom: 13, animate: false });
  }
}

function exportLearning(){
 const rows=[["case_id","farmer","crop","ai_finding","ai_confidence","expert_status","expert_response","created_at"]];
 getCases().forEach(c=>rows.push([c.id,c.farmer,c.crop,c.disease,c.confidence,c.status,c.response||"",new Date(c.createdAt).toISOString()]));
 const csv=rows.map(row=>row.map(v=>{let s=String(v??"");if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}).join(',')).join('\r\n');
 const a=document.createElement("a"),url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.href=url;a.download="krishirakshak-learning-loop.csv";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function bindFieldInputs(){const x=getFieldInputs();state.fieldInputs=x;if($("#trapCount"))$("#trapCount").value=x.trapCount??"";if($("#soilMoisture"))$("#soilMoisture").value=x.soilMoisture??"";$("#saveFieldInputs")?.addEventListener("click",saveFieldInputs);$("#exportLearning")?.addEventListener("click",exportLearning)}

document.addEventListener("DOMContentLoaded",()=>{
  updateLanguage();
  const session=userFromStore();
  if(session){enterApp(session);}else $("#authScreen").classList.remove("hidden");
  bindFieldInputs();
  $("#modelStatus").textContent="Load on scan";$("#aiBadge").textContent="Image assessment on demand";
});

function renderScanTrend(){
  const box=$("#scanTrend"),scans=getScans().slice(0,8).reverse();if(!box)return;
  if(scans.length<2){box.classList.add("hidden");return}
  box.classList.remove("hidden");const max=Math.max(...scans.map(s=>s.confidence||0),.01);
  box.innerHTML=scans.map((s,i)=>`<div class="trend-bar" style="height:${Math.max(12,((s.confidence||0)/max)*48)}px" title="${safeText(s.disease)} ${(s.confidence*100).toFixed(0)}%"><small>${i+1}</small></div>`).join("");
}
$("#compareScansBtn")?.addEventListener("click",()=>{
  const s=getScans().slice(0,2);if(s.length<2)return toast("Need at least two scans to compare.");
  const delta=((s[0].confidence||0)-(s[1].confidence||0))*100;
  toast(`${s[0].disease} vs ${s[1].disease}: confidence ${delta>=0?"+":""}${delta.toFixed(1)} points.`);
});

$("#hotspotFilter")?.addEventListener("change",renderOfficialDashboard);
$$(".clickable-stat, .legend-pill").forEach(el=>{
  el.addEventListener("click",()=>{
    const f=el.dataset.filter;
    const sel=$("#hotspotFilter");
    if(f&&sel){
      sel.value=f;
      renderOfficialDashboard();
    }
  });
});

window.addEventListener("krishi-language",e=>{state.language=e.detail;$("#languageSelector").value=e.detail;});
