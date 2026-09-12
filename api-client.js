(()=>{
const base=window.KRISHI_CONFIG?.API_BASE_URL?.replace(/\/$/,'')||'';
const error=(code,status=503)=>({ok:false,status,json:async()=>({code,configured:false})});
window.KrishiAPI={async request(path,options={}){
if(location.protocol==='file:'&&!base)return error('LOCAL_FILE');
try{const r=await fetch(base?base+path:new URL('.'+path,document.baseURI),options);
if(!(r.headers.get('content-type')||'').includes('application/json'))return error(r.status===404?'BACKEND_MISSING':'BACKEND_RESPONSE',r.status||503);
return r;
}catch(e){if(e.name==='TimeoutError'||e.name==='AbortError')throw e;return error('NETWORK_ERROR');}
}};
})();
(()=>{
const messages={
LOCAL_FILE:['Open this project through its server or hosted URL; opening the HTML file cannot run AI.','AI चलाने के लिए वेबसाइट या सर्वर से खोलें; HTML फ़ाइल सीधे खोलने से AI नहीं चलता।','AI साठी वेबसाइट किंवा सर्व्हरवरून उघडा; थेट HTML फाइलने AI चालत नाही.'],
BACKEND_MISSING:['AI backend is not deployed at this website address. The site owner must deploy the server/function.','इस वेबसाइट पर AI सर्वर उपलब्ध नहीं है। वेबसाइट मालिक को सर्वर तैनात करना होगा।','या वेबसाइटवर AI सर्व्हर उपलब्ध नाही. मालकाने सर्व्हर तैनात करणे आवश्यक आहे.'],
BACKEND_RESPONSE:['The website returned a page instead of an API response. Check the backend deployment.','वेबसाइट ने API जवाब की जगह पेज लौटाया। सर्वर की तैनाती जाँचें।','वेबसाइटने API प्रतिसादाऐवजी पान दिले. सर्व्हरची तैनाती तपासा.'],
NETWORK_ERROR:['Cannot reach the AI server. Check internet and the server address.','AI सर्वर से संपर्क नहीं हो रहा। इंटरनेट और सर्वर पता जाँचें।','AI सर्व्हरशी संपर्क होत नाही. इंटरनेट व सर्व्हर पत्ता तपासा.'],
NOT_CONFIGURED:['Required API key is missing on the server. The site owner must configure it.','सर्वर पर जरूरी API key नहीं है। वेबसाइट मालिक को इसे सेट करना होगा।','सर्व्हरवर आवश्यक API key नाही. वेबसाइट मालकाने ती सेट करावी.'],
AUTH:['API key rejected. The site owner must replace the server key.','API key अस्वीकार हुई। वेबसाइट मालिक को सर्वर key बदलनी होगी।','API key नाकारली. वेबसाइट मालकाने सर्व्हर key बदलावी.'],
ACCESS:['API account lacks access to this service. Contact the site owner.','API खाते को इस सेवा की अनुमति नहीं है। वेबसाइट मालिक से संपर्क करें।','API खात्याला या सेवेची परवानगी नाही. वेबसाइट मालकाशी संपर्क करा.'],
BILLING:['API provider credits/billing need attention. Repeated retries will not fix this.','API प्रदाता के क्रेडिट या बिलिंग की जाँच जरूरी है। बार-बार कोशिश से यह ठीक नहीं होगा।','API प्रदात्याचे क्रेडिट किंवा बिलिंग तपासावे. वारंवार प्रयत्नाने हे सुटणार नाही.'],
RATE_LIMIT:['Request limit reached. Wait one minute and try again.','अनुरोध सीमा पूरी हुई। एक मिनट बाद कोशिश करें।','विनंती मर्यादा गाठली. एक मिनिटानंतर प्रयत्न करा.'],
MODEL:['Configured AI model is unavailable. The site owner must update the model setting.','सेट किया गया AI मॉडल उपलब्ध नहीं है। वेबसाइट मालिक को मॉडल सेटिंग बदलनी होगी।','सेट केलेले AI मॉडेल उपलब्ध नाही. वेबसाइट मालकाने मॉडेल सेटिंग बदलावी.'],
REQUEST:['AI provider rejected this request. The site owner must check the API configuration.','AI प्रदाता ने अनुरोध अस्वीकार किया। वेबसाइट मालिक को API सेटिंग जाँचनी होगी।','AI प्रदात्याने विनंती नाकारली. वेबसाइट मालकाने API सेटिंग तपासावी.'],
NON_LEAF:['This is not a suitable leaf photo. Upload a clear close-up of one real leaf.','यह उपयुक्त पत्ती की फोटो नहीं है। एक असली पत्ती की साफ नज़दीकी फोटो डालें।','हा योग्य पानाचा फोटो नाही. एका खऱ्या पानाचा स्पष्ट जवळचा फोटो द्या.'],
LEAF_UNCERTAIN:['A clear leaf could not be verified. Retake the photo in daylight.','साफ पत्ती की पुष्टि नहीं हो सकी। दिन की रोशनी में दोबारा फोटो लें।','स्पष्ट पानाची खात्री झाली नाही. दिवसाच्या प्रकाशात पुन्हा फोटो घ्या.'],
TIMEOUT:['AI service took too long. Please retry once your connection is stable.','AI सेवा ने अधिक समय लिया। कनेक्शन ठीक होने पर दोबारा कोशिश करें।','AI सेवेला जास्त वेळ लागला. जोडणी स्थिर झाल्यावर पुन्हा प्रयत्न करा.'],
INCOMPLETE:['Could not complete the response. Please retry or rephrase.','जवाब पूरा नहीं हो सका। कृपया दोबारा पूछें।','उत्तर पूर्ण झाले नाही. कृपया पुन्हा विचारा.'],
SAFETY:['Question or photo triggered safety filter. Please rephrase.','सामग्री फ़िल्टर हुआ। कृपया दोबारा पूछें।','सामग्री फिल्टर झाली. कृपया पुन्हा विचारा.'],
UNAVAILABLE:['AI service is unavailable. No diagnosis was issued.','AI सेवा उपलब्ध नहीं है। कोई निदान नहीं दिया गया।','AI सेवा उपलब्ध नाही. निदान दिलेले नाही.']};
window.KrishiAPI.message=code=>{let key=String(code||'UNAVAILABLE').replace(/^(GEMINI|KINDWISE)_/,'');if(key==='LEAF_CHECK_UNAVAILABLE')key='NOT_CONFIGURED';const n={en:0,hi:1,mr:2}[window.KrishiI18n?.getLanguage()||'en']||0;return (messages[key]||messages.UNAVAILABLE)[n]+(code?' ['+String(code).replace(/[^A-Z_]/g,'')+']':'');};
})();
