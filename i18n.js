(function(root){'use strict';
const languages=['en','hi','mr'];let current;try{current=localStorage.getItem('krishiLanguage')||'en'}catch{current='en'}if(!languages.includes(current))current='en';
const entries={},reverse={hi:new Map(),mr:new Map(),hinglish:new Map()};
function add(source,hi,mr,hinglish){entries[source]={hi,mr,hinglish};for(const l of ['hi','mr','hinglish'])if(entries[source][l])reverse[l].set(entries[source][l],source);}
function load(rows){rows.trim().split('\n').forEach(row=>{const a=row.split('|');if(a.length===4)add(...a);});}
load(`
Field overview|खेत का अवलोकन|शेताचा आढावा|Khet ka overview
Record observation|अवलोकन दर्ज करें|निरीक्षण नोंदवा|Observation record karein
Action & follow-up|कार्य और अगली जाँच|कृती आणि पुढील पाहणी|Action aur follow-up
Evidence & impact|प्रमाण और प्रभाव|पुरावे आणि परिणाम|Evidence aur impact
Leaf scan & expert portal|पत्ती स्कैन और विशेषज्ञ पोर्टल|पान स्कॅन आणि तज्ञ पोर्टल|Leaf scan aur expert portal
FIELD SENTINEL / V6|खेत निगरानी / V6|शेत निरीक्षण / V6|FIELD SENTINEL / V6
FIELD WORKSPACE|खेत कार्यक्षेत्र|शेत कार्यक्षेत्र|KHET WORKSPACE
Your fields, today.|आज आपके खेत।|आज तुमची शेते.|Aaj aapke khet.
MAHARASHTRA FOCUS|महाराष्ट्र केंद्रित|महाराष्ट्र केंद्रित|MAHARASHTRA FOCUS
Observe early.|समय पर देखें।|वेळीच निरीक्षण करा.|Jaldi observe karein.
Act with evidence.|प्रमाण के आधार पर कार्य करें।|पुराव्यानुसार कृती करा.|Evidence se action lein.
Follow through.|अगली जाँच पूरी करें।|पुढील पाहणी पूर्ण करा.|Follow-up poora karein.
SIH working prototype|SIH कार्यशील नमूना|SIH कार्यरत नमुना|SIH working prototype
Records stay on this device.|रिकॉर्ड इसी उपकरण पर रहते हैं।|नोंदी याच उपकरणावर राहतात.|Records isi device par rahenge.
Device workspace|उपकरण कार्यक्षेत्र|उपकरण कार्यक्षेत्र|Device workspace
Offline · local records|ऑफलाइन · स्थानीय रिकॉर्ड|ऑफलाइन · स्थानिक नोंदी|Offline · local records
Your field records|आपके खेत के रिकॉर्ड|तुमच्या शेताच्या नोंदी|Aapke field records
Synthetic SIH demo|काल्पनिक SIH डेमो|काल्पनिक SIH डेमो|Synthetic SIH demo
Explore SIH demo|SIH डेमो देखें|SIH डेमो पाहा|SIH demo dekhein
Exit demo|डेमो से बाहर आएँ|डेमोमधून बाहेर पडा|Demo se bahar aayein
Reset demo|डेमो रीसेट करें|डेमो रीसेट करा|Demo reset karein
DEMO DATA|डेमो डेटा|डेमो डेटा|DEMO DATA
Synthetic observations for a presentation. Your own records are separate.|प्रस्तुति के लिए काल्पनिक अवलोकन। आपके रिकॉर्ड अलग हैं।|सादरीकरणासाठी काल्पनिक निरीक्षणे. तुमच्या नोंदी वेगळ्या आहेत.|Presentation ke liye synthetic observations. Aapke records alag hain.
Decision support · Not a diagnosis|निर्णय सहायता · निदान नहीं|निर्णय सहाय्य · निदान नाही|Decision support · Diagnosis nahi
KrishiRakshak Field Sentinel · Observations → triage → expert review → follow-up|कृषिरक्षक खेत निगरानी · अवलोकन → प्राथमिकता → विशेषज्ञ समीक्षा → अगली जाँच|कृषिरक्षक शेत निरीक्षण · निरीक्षण → प्राधान्य → तज्ञ समीक्षा → पुढील पाहणी|KrishiRakshak · Observation → priority → expert review → follow-up
Catch the change, understand the evidence and close the loop with a timely field visit.|बदलाव पहचानें, प्रमाण समझें और समय पर खेत की अगली जाँच करें।|बदल ओळखा, पुरावे समजून घ्या आणि वेळेवर शेताची पुन्हा पाहणी करा.|Badlav dekhein, evidence samjhein aur time par field visit karein.
Your next good decision starts in the field.|अगला सही निर्णय खेत से शुरू होता है।|पुढचा योग्य निर्णय शेतातून सुरू होतो.|Agla sahi decision khet se shuru hota hai.
Combine plant samples, trap trends and field observations. Every priority is explainable.|पौधों के नमूने, ट्रैप रुझान और खेत के अवलोकन जोड़ें। हर प्राथमिकता का कारण देखें।|रोपांचे नमुने, सापळ्यांतील कल आणि शेत निरीक्षणे जोडा. प्रत्येक प्राधान्याचे कारण पाहा.|Plant samples, trap trends aur observations jodein. Har priority ka reason dekhein.
Fields monitored|निगरानी वाले खेत|निरीक्षणातील शेते|Monitored fields
Unique fields on this device|इस उपकरण के अलग-अलग खेत|या उपकरणावरील स्वतंत्र शेते|Is device par unique fields
Need attention|ध्यान जरूरी|लक्ष आवश्यक|Attention chahiye
Heuristic scouting priority|नियम-आधारित जाँच प्राथमिकता|नियमाधारित पाहणी प्राधान्य|Rule-based scouting priority
Open action plans|खुली कार्य योजनाएँ|प्रलंबित कृती योजना|Open action plans
Track through follow-up|अगली जाँच तक निगरानी|पुढील पाहणीपर्यंत मागोवा|Follow-up tak track karein
Follow-ups overdue|अगली जाँच में देरी|पुढील पाहणी उशिरा|Overdue follow-ups
Due dates from saved plans|सहेजी योजनाओं की तारीखें|जतन केलेल्या योजनांच्या तारखा|Saved plans ki due dates
Field watchlist|खेत निगरानी सूची|शेत निरीक्षण सूची|Field watchlist
No field records yet.|अभी खेत के रिकॉर्ड नहीं हैं।|अद्याप शेताच्या नोंदी नाहीत.|Abhi field records nahi hain.
Add your first observation or explore the labelled SIH demo.|पहला अवलोकन जोड़ें या चिह्नित SIH डेमो देखें।|पहिले निरीक्षण नोंदवा किंवा चिन्हांकित SIH डेमो पाहा.|Pehla observation add karein ya SIH demo dekhein.
Start field scouting|खेत की जाँच शुरू करें|शेत पाहणी सुरू करा|Field scouting shuru karein
THE FOLLOW-THROUGH ADVANTAGE|अगली जाँच का लाभ|पुढील पाहणीचा फायदा|FOLLOW-UP KA FAYDA
A scan is a beginning.|स्कैन एक शुरुआत है।|स्कॅन ही सुरुवात आहे.|Scan ek shuruaat hai.
Recovery is the goal.|स्वस्थ फसल लक्ष्य है।|पीक सुधारणे हे ध्येय आहे.|Recovery goal hai.
Turn a signal into an action, revisit the same field and keep the evidence together.|संकेत पर कार्य करें, उसी खेत में लौटें और प्रमाण एक साथ रखें।|संकेतानुसार कृती करा, त्याच शेताला पुन्हा भेट द्या आणि पुरावे एकत्र ठेवा.|Signal par action lein, same field revisit karein aur evidence saath rakhein.
See action board|कार्य सूची देखें|कृती फलक पाहा|Action board dekhein
Your field routine|आपकी खेत जाँच प्रक्रिया|तुमची शेत पाहणी पद्धत|Aapka field routine
3 STEPS|3 चरण|3 टप्पे|3 STEPS
Observe consistently|एक जैसी विधि से देखें|सातत्याने निरीक्षण करा|Consistently observe karein
Use the same marked plants and comparable trap intervals.|उन्हीं चिह्नित पौधों और समान ट्रैप अवधि का उपयोग करें।|तीच चिन्हांकित रोपे आणि समान सापळा कालावधी वापरा.|Same marked plants aur comparable trap intervals use karein.
Prioritise with evidence|प्रमाण से प्राथमिकता तय करें|पुराव्यानुसार प्राधान्य ठरवा|Evidence se priority dein
Review the contributing signals and seek expert validation.|संकेतों के कारण देखें और विशेषज्ञ की पुष्टि लें।|कारणीभूत संकेत पाहा आणि तज्ञांची पडताळणी घ्या.|Signals review karein aur expert validation lein.
Return and record|वापस जाकर दर्ज करें|पुन्हा भेट देऊन नोंदवा|Wapas jaakar record karein
Compare symptom share before closing the action.|कार्य बंद करने से पहले लक्षण वाले पौधों का अनुपात तुलना करें।|कृती बंद करण्यापूर्वी लक्षणग्रस्त रोपांच्या प्रमाणाची तुलना करा.|Action close karne se pehle symptom share compare karein.
Take leaf photo|पत्ती का फोटो लें|पानाचा फोटो घ्या|Patti ka photo lein
Clear photo in daylight|दिन के उजाले में साफ फोटो|दिवसाच्या प्रकाशात स्पष्ट फोटो|Daylight me saaf photo
AI triage|एआई जाँच|एआय तपासणी|AI jaanch
Instant crop risk check|फसल जोखिम की तुरंत जाँच|पीक जोखीम त्वरित तपासणी|Fasal risk ki turant jaanch
Expert review|विशेषज्ञ समीक्षा|तज्ञ समीक्षा|Expert samiksha
Agronomist recommendations|कृषि विशेषज्ञ की सलाह|कृषी तज्ञांचा सल्ला|Agronomist ki salah
Device-local prototype. Expert portal records are not sent to a real extension service.|उपकरण-स्थानीय नमूना। रिकॉर्ड वास्तविक कृषि विस्तार सेवा को नहीं भेजे जाते।|उपकरणावरील नमुना. नोंदी प्रत्यक्ष कृषी विस्तार सेवेकडे पाठवल्या जात नाहीत.|Local prototype. Records real extension service ko send nahi hote.
sample symptomatic|नमूने में लक्षण|नमुन्यात लक्षणे|sample mein symptoms
trap catch|ट्रैप में कीट|सापळ्यातील कीटक|trap catch
/ 100 priority|/ 100 प्राथमिकता|/ 100 प्राधान्य|/ 100 priority
Why this priority?|यह प्राथमिकता क्यों?|हे प्राधान्य का?|Yeh priority kyun?
Repeat observation|दोबारा अवलोकन|पुन्हा निरीक्षण|Repeat observation
Create action plan|कार्य योजना बनाएँ|कृती योजना तयार करा|Action plan banayein
High|उच्च|उच्च|High
Watch|निगरानी|लक्ष ठेवा|Watch
Routine|नियमित|नियमित|Routine
HIGH|उच्च|उच्च|HIGH
WATCH|निगरानी|लक्ष ठेवा|WATCH
ROUTINE|नियमित|नियमित|ROUTINE
STALE|पुराना|जुने|PURANA
Prototype rules v1. This score is not disease probability or an economic treatment threshold. Field calibration is required.|नमूना नियम v1। यह स्कोर रोग की संभावना या उपचार की आर्थिक सीमा नहीं है। खेत में सत्यापन जरूरी है।|नमुना नियम v1. हे गुण रोगाची शक्यता किंवा उपचाराची आर्थिक मर्यादा नाहीत. क्षेत्रीय पडताळणी आवश्यक आहे.|Prototype rules v1. Score disease probability ya treatment threshold nahi hai. Field calibration chahiye.
STANDARDISED FIELD NOTES|मानकीकृत खेत विवरण|प्रमाणित शेत नोंदी|STANDARD FIELD NOTES
Observe. Don’t guess.|देखें। अनुमान न लगाएँ।|निरीक्षण करा. अंदाज लावू नका.|Observe karein. Guess nahi.
Record a comparable sample. Blank trap data means “not measured”, never zero.|तुलनीय नमूना दर्ज करें। खाली ट्रैप डेटा का अर्थ मापा नहीं गया है, शून्य नहीं।|तुलनीय नमुना नोंदवा. रिकामा सापळा डेटा म्हणजे मोजलेले नाही, शून्य नाही.|Comparable sample record karein. Blank trap data matlab measured nahi, zero nahi.
New field observation|नया खेत अवलोकन|नवीन शेत निरीक्षण|Naya field observation
Field name|खेत का नाम|शेताचे नाव|Khet ka naam
Village / district|गाँव / जिला|गाव / जिल्हा|Gaon / district
Crop|फसल|पीक|Crop
Crop stage|फसल की अवस्था|पिकाची अवस्था|Crop stage
Plants sampled|जाँचे गए पौधे|तपासलेली रोपे|Sampled plants
Plants showing symptoms|लक्षण वाले पौधे|लक्षणे असलेली रोपे|Symptoms wale plants
Trap catch (optional)|ट्रैप कीट संख्या (वैकल्पिक)|सापळ्यातील कीटक संख्या (ऐच्छिक)|Trap catch (optional)
Trap interval|ट्रैप की अवधि|सापळ्याचा कालावधी|Trap interval
24 hours|24 घंटे|24 तास|24 ghante
48 hours|48 घंटे|48 तास|48 ghante
7 days|7 दिन|7 दिवस|7 din
Trap / pest identifier|ट्रैप / कीट पहचान|सापळा / कीटक ओळख|Trap / pest identifier
Reuse the same identifier for comparable counts.|तुलना के लिए वही पहचान इस्तेमाल करें।|तुलनेसाठी तीच ओळख वापरा.|Comparable counts ke liye same identifier use karein.
Prolonged leaf wetness?|पत्ते लंबे समय तक गीले?|पाने बराच वेळ ओली?|Leaves zyada der wet?
Not observed|देखा नहीं गया|पाहिले नाही|Observe nahi kiya
Yes|हाँ|होय|Haan
No|नहीं|नाही|Nahi
Rapid spread since last visit?|पिछली जाँच से तेजी से फैलाव?|मागील भेटीपासून वेगाने प्रसार?|Last visit se rapid spread?
Not sure / first visit|निश्चित नहीं / पहली जाँच|निश्चित नाही / पहिली भेट|Not sure / pehli visit
Field notes|खेत विवरण|शेत नोंदी|Field notes
Save observation & calculate priority|अवलोकन सहेजें और प्राथमिकता निकालें|निरीक्षण जतन करा आणि प्राधान्य मोजा|Observation save karein aur priority calculate karein
This observation does not identify a disease. Use the leaf scan for an image assessment, then seek expert confirmation where needed. Sample percentages describe only the plants inspected.|यह अवलोकन रोग की पहचान नहीं करता। फोटो आकलन के लिए पत्ती स्कैन करें और जरूरत पर विशेषज्ञ की पुष्टि लें। प्रतिशत केवल जाँचे पौधों का है।|हे निरीक्षण रोग ओळखत नाही. फोटो मूल्यांकनासाठी पान स्कॅन करा आणि आवश्यक असल्यास तज्ञांची पुष्टी घ्या. टक्केवारी केवळ तपासलेल्या रोपांची आहे.|Observation disease identify nahi karta. Leaf scan karein aur zaroorat par expert confirmation lein. Percentage sirf sampled plants ka hai.
A repeatable scouting method|दोहराने योग्य जाँच विधि|पुन्हा वापरता येणारी पाहणी पद्धत|Repeatable scouting method
Choose marked sampling points|चिह्नित नमूना स्थान चुनें|चिन्हांकित नमुना ठिकाणे निवडा|Marked sampling points chunein
Include field edges and interior. Keep the sampling method consistent.|खेत के किनारे और अंदर के हिस्से शामिल करें। विधि समान रखें।|शेताच्या कडा आणि आतील भाग समाविष्ट करा. पद्धत समान ठेवा.|Field edges aur interior include karein. Same method rakhein.
Count before judging|निर्णय से पहले गिनें|निर्णयाआधी मोजा|Judge karne se pehle count karein
Record total plants inspected and plants with symptoms.|कुल जाँचे पौधे और लक्षण वाले पौधे दर्ज करें।|तपासलेली एकूण रोपे आणि लक्षणे असलेली रोपे नोंदवा.|Total inspected aur symptomatic plants record karein.
Keep traps comparable|ट्रैप तुलना योग्य रखें|सापळे तुलनीय ठेवा|Traps comparable rakhein
Use the same trap type, placement, pest identifier and exposure duration.|समान ट्रैप प्रकार, स्थान, कीट पहचान और अवधि रखें।|समान सापळा प्रकार, जागा, कीटक ओळख आणि कालावधी ठेवा.|Same trap type, placement, pest ID aur duration rakhein.
Return to the same field|उसी खेत में लौटें|त्याच शेताला पुन्हा भेट द्या|Same field par wapas aayein
Repeat observations link to the original field and its action plan.|अगले अवलोकन मूल खेत और उसकी योजना से जुड़ते हैं।|पुढील निरीक्षणे मूळ शेत आणि त्याच्या योजनेशी जोडली जातात.|Repeat observations original field aur action plan se link hote hain.
IMAGE + FIELD CONTEXT|फोटो + खेत संदर्भ|फोटो + शेत संदर्भ|IMAGE + FIELD CONTEXT
Need a leaf assessment?|पत्ती का आकलन चाहिए?|पानाचे मूल्यांकन हवे?|Leaf assessment chahiye?
The existing image and expert workspace remains available.|फोटो और विशेषज्ञ कार्यक्षेत्र उपलब्ध है।|फोटो आणि तज्ञ कार्यक्षेत्र उपलब्ध आहे.|Image aur expert workspace available hai.
Open crop scan|फसल स्कैन खोलें|पीक स्कॅन उघडा|Crop scan kholein
Not measured|मापा नहीं गया|मोजलेले नाही|Measure nahi kiya
Vegetative|वानस्पतिक|वाढीची अवस्था|Vegetative
Flowering|फूल आने की अवस्था|फुलोरा|Flowering
Fruiting|फल आने की अवस्था|फळधारणा|Fruiting
Harvest approaching|कटाई निकट|काढणी जवळ|Harvest paas hai
Tomato|टमाटर|टोमॅटो|Tamatar
Cotton|कपास|कापूस|Kapas
Soybean|सोयाबीन|सोयाबीन|Soybean
Grape|अंगूर|द्राक्ष|Angoor
Onion|प्याज|कांदा|Pyaaz
Pomegranate|अनार|डाळिंब|Anaar
Rice|धान|भात|Dhaan
Maize|मक्का|मका|Makka
Other|अन्य|इतर|Other
FROM ALERT TO ACCOUNTABILITY|चेतावनी से जिम्मेदारी तक|इशाऱ्यापासून जबाबदारीपर्यंत|ALERT SE ACCOUNTABILITY
Follow through in the field.|खेत में अगली जाँच पूरी करें।|शेतात पुढील पाहणी पूर्ण करा.|Field mein follow-up karein.
Each plan has a due date, a review trail and a follow-up observation. Closing a task is not proof of recovery.|हर योजना की तारीख, समीक्षा रिकॉर्ड और अगला अवलोकन है। कार्य बंद होना सुधार का प्रमाण नहीं है।|प्रत्येक योजनेला तारीख, समीक्षा नोंद आणि पुढील निरीक्षण आहे. कृती बंद होणे म्हणजे सुधारणा सिद्ध होत नाही.|Har plan mein due date, review aur follow-up hai. Task close hona recovery proof nahi hai.
Action board|कार्य सूची|कृती फलक|Action board
Open|खुला|प्रलंबित|Open
Reviewed|समीक्षित|समीक्षा झाली|Reviewed
Closed|बंद|बंद|Closed
Review:|समीक्षा:|समीक्षा:|Review:
Follow-up:|अगली जाँच:|पुढील पाहणी:|Follow-up:
No expert review recorded. This is a device-local queue.|विशेषज्ञ समीक्षा दर्ज नहीं है। यह स्थानीय सूची है।|तज्ञ समीक्षा नोंदवलेली नाही. ही स्थानिक रांग आहे.|Expert review nahi hai. Yeh local queue hai.
Record follow-up|अगली जाँच दर्ज करें|पुढील पाहणी नोंदवा|Follow-up record karein
Record expert / lab feedback|विशेषज्ञ / लैब प्रतिक्रिया दर्ज करें|तज्ञ / प्रयोगशाळा अभिप्राय नोंदवा|Expert / lab feedback record karein
Close with follow-up|अगली जाँच के साथ बंद करें|पुढील पाहणीसह बंद करा|Follow-up ke saath close karein
Download referral note|रेफरल नोट डाउनलोड करें|रेफरल नोंद डाउनलोड करा|Referral note download karein
Listen to advisory|सलाह सुनें|सल्ला ऐका|Advisory sunein
No action plans yet.|अभी कार्य योजनाएँ नहीं हैं।|अद्याप कृती योजना नाहीत.|Abhi action plans nahi hain.
Create a plan from a field in your watchlist.|निगरानी सूची के खेत से योजना बनाएँ।|निरीक्षण सूचीतील शेतासाठी योजना तयार करा.|Watchlist ke field se plan banayein.
Go to fields|खेत देखें|शेते पाहा|Fields par jaayein
Reviewer / laboratory name|समीक्षक / प्रयोगशाला का नाम|समीक्षक / प्रयोगशाळेचे नाव|Reviewer / lab ka naam
Assessment|आकलन|मूल्यांकन|Assessment
Needs field inspection|खेत की जाँच आवश्यक|शेत पाहणी आवश्यक|Field inspection chahiye
Lab referral recommended|लैब रेफरल की सलाह|प्रयोगशाळा रेफरलचा सल्ला|Lab referral recommended
Suspected disease / pest supported|संदिग्ध रोग / कीट का समर्थन|संशयित रोग / कीटकाला आधार|Suspected disease / pest supported
Alternative cause suspected|अन्य कारण का संदेह|दुसऱ्या कारणाचा संशय|Alternative cause suspected
Advice / lab reference|सलाह / लैब संदर्भ|सल्ला / प्रयोगशाळा संदर्भ|Advice / lab reference
Self-entered review; no expert identity verification or actual referral transmission.|स्वयं दर्ज समीक्षा; विशेषज्ञ पहचान सत्यापन या वास्तविक रेफरल नहीं।|स्वतः नोंदवलेली समीक्षा; तज्ञ ओळख पडताळणी किंवा प्रत्यक्ष रेफरल नाही.|Self-entered review; expert identity verified nahi aur referral send nahi hota.
Save review|समीक्षा सहेजें|समीक्षा जतन करा|Review save karein
TRACEABLE EVIDENCE|पता लगाने योग्य प्रमाण|मागोवा घेता येणारे पुरावे|TRACEABLE EVIDENCE
Measure what actually happened.|जो हुआ उसे मापें।|प्रत्यक्ष घडलेले मोजा.|Jo hua use measure karein.
Export observations and reviews for evaluation. Field confirmations are evidence for future training; this prototype does not retrain a model automatically.|मूल्यांकन के लिए अवलोकन और समीक्षा निर्यात करें। पुष्टि भविष्य के प्रशिक्षण का प्रमाण है; यह नमूना स्वतः मॉडल प्रशिक्षण नहीं करता।|मूल्यांकनासाठी निरीक्षणे आणि समीक्षा निर्यात करा. पुष्टी भविष्यातील प्रशिक्षणासाठी पुरावा आहे; हा नमुना आपोआप प्रशिक्षण करत नाही.|Evaluation ke liye observations aur reviews export karein. Prototype automatically model retrain nahi karta.
Export evidence CSV|प्रमाण CSV निर्यात करें|पुरावे CSV निर्यात करा|Evidence CSV export karein
Observations recorded|दर्ज अवलोकन|नोंदवलेली निरीक्षणे|Recorded observations
Synthetic demo records|काल्पनिक डेमो रिकॉर्ड|काल्पनिक डेमो नोंदी|Synthetic demo records
Device-local records|उपकरण-स्थानीय रिकॉर्ड|उपकरणावरील स्थानिक नोंदी|Device-local records
Reviews recorded|दर्ज समीक्षाएँ|नोंदवलेल्या समीक्षा|Recorded reviews
Self-entered; identity not verified|स्वयं दर्ज; पहचान सत्यापित नहीं|स्वतः नोंदवलेले; ओळख पडताळलेली नाही|Self-entered; identity verified nahi
Plans closed|बंद योजनाएँ|बंद योजना|Closed plans
Follow-up required for closure|बंद करने के लिए अगली जाँच जरूरी|बंद करण्यासाठी पुढील पाहणी आवश्यक|Close karne ke liye follow-up zaroori
Measured yield benefit|मापा गया उपज लाभ|मोजलेला उत्पादन लाभ|Measured yield benefit
Requires controlled field validation|नियंत्रित खेत सत्यापन जरूरी|नियंत्रित क्षेत्रीय पडताळणी आवश्यक|Controlled field validation chahiye
Field evidence register|खेत प्रमाण रजिस्टर|शेत पुरावा नोंदवही|Field evidence register
Field|खेत|शेत|Field
Observed|अवलोकन तारीख|निरीक्षण तारीख|Observed
Symptomatic / sampled|लक्षण वाले / जाँचे गए|लक्षणग्रस्त / तपासलेले|Symptomatic / sampled
Trap|ट्रैप|सापळा|Trap
Priority|प्राथमिकता|प्राधान्य|Priority
No observations recorded.|अवलोकन दर्ज नहीं हैं।|निरीक्षणे नोंदवलेली नाहीत.|Observations record nahi hue.
What makes this different?|इसमें अलग क्या है?|यात वेगळे काय आहे?|Isme alag kya hai?
Trend-aware triage|रुझान-आधारित प्राथमिकता|कलाधारित प्राधान्य|Trend-aware triage
Symptom change and comparable trap trends, with explicit reasons.|लक्षण बदलाव और तुलनीय ट्रैप रुझान, स्पष्ट कारणों के साथ।|लक्षणातील बदल आणि तुलनीय सापळा कल, स्पष्ट कारणांसह.|Symptom change aur trap trends, clear reasons ke saath.
Evidence before closure|बंद करने से पहले प्रमाण|बंद करण्याआधी पुरावा|Closure se pehle evidence
A fresh field observation is required to close an action.|कार्य बंद करने के लिए नया अवलोकन आवश्यक है।|कृती बंद करण्यासाठी नवीन निरीक्षण आवश्यक आहे.|Action close karne ke liye fresh observation chahiye.
Honest uncertainty|स्पष्ट अनिश्चितता|स्पष्ट अनिश्चितता|Clear uncertainty
Missing data, stale evidence and synthetic demos are visible.|गायब डेटा, पुराने प्रमाण और काल्पनिक डेमो स्पष्ट हैं।|गहाळ डेटा, जुने पुरावे आणि काल्पनिक डेमो स्पष्ट आहेत.|Missing data, old evidence aur synthetic demo visible hain.
Before a real field pilot|वास्तविक खेत परीक्षण से पहले|प्रत्यक्ष शेत चाचणीपूर्वी|Real field pilot se pehle
Activity trail|गतिविधि रिकॉर्ड|कृती नोंदी|Activity trail
Field photo (optional)|खेत की फोटो (वैकल्पिक)|शेताचा फोटो (ऐच्छिक)|Field photo (optional)
A compressed photo stays with this observation for expert review. It is not an automatic diagnosis.|समीक्षा के लिए छोटी की गई फोटो अवलोकन के साथ रहती है। यह स्वचालित निदान नहीं है।|समीक्षेसाठी संकुचित फोटो निरीक्षणासोबत राहतो. हे स्वयंचलित निदान नाही.|Compressed photo observation ke saath rahegi. Automatic diagnosis nahi hai.
Field history & linked evidence|खेत इतिहास और जुड़े प्रमाण|शेत इतिहास आणि जोडलेले पुरावे|Field history aur linked evidence
Exit demo to link a real crop scan.|वास्तविक स्कैन जोड़ने के लिए डेमो से बाहर आएँ।|प्रत्यक्ष स्कॅन जोडण्यासाठी डेमोमधून बाहेर पडा.|Real scan link karne ke liye demo exit karein.
Link a crop photo / scan|फसल की फोटो / स्कैन जोड़ें|पीक फोटो / स्कॅन जोडा|Crop photo / scan link karein
Scouting checklist & visit date|जाँच सूची और अगली तारीख|पाहणी सूची आणि भेट तारीख|Scouting checklist aur visit date
Inspect marked plants|चिह्नित पौधों की जाँच करें|चिन्हांकित रोपे तपासा|Marked plants inspect karein
Compare trap readings|ट्रैप रीडिंग की तुलना करें|सापळ्यांच्या नोंदींची तुलना करा|Trap readings compare karein
Record intervention or expert advice|कार्यवाही या विशेषज्ञ सलाह दर्ज करें|उपाय किंवा तज्ञ सल्ला नोंदवा|Intervention ya expert advice record karein
Next visit date|अगली जाँच की तारीख|पुढील भेटीची तारीख|Next visit date
Keep your field records safe|खेत के रिकॉर्ड सुरक्षित रखें|शेताच्या नोंदी सुरक्षित ठेवा|Field records safe rakhein
Download a backup with observations, photos and action plans. Restore merges new records and keeps existing records.|अवलोकन, फोटो और योजनाओं का बैकअप लें। बहाली नए रिकॉर्ड जोड़ती है और पुराने रखती है।|निरीक्षणे, फोटो आणि योजनांचा बॅकअप घ्या. पुनर्संचयन नवीन नोंदी जोडते आणि जुन्या ठेवते.|Observations, photos aur plans ka backup lein. Restore naye records merge karta hai, purane rakhta hai.
Download backup|बैकअप डाउनलोड करें|बॅकअप डाउनलोड करा|Backup download karein
Restore backup|बैकअप बहाल करें|बॅकअप पुनर्संचयित करा|Backup restore karein
Print workspace|कार्यक्षेत्र प्रिंट करें|कार्यक्षेत्र छापा|Workspace print karein
Connect this photo to your field|यह फोटो अपने खेत से जोड़ें|हा फोटो तुमच्या शेताशी जोडा|Photo ko field se connect karein
Choose a field to keep scans, observations and follow-up together.|स्कैन, अवलोकन और अगली जाँच साथ रखने के लिए खेत चुनें।|स्कॅन, निरीक्षणे आणि पुढील पाहणी एकत्र ठेवण्यासाठी शेत निवडा.|Scans, observations aur follow-up saath rakhne ke liye field chunein.
Choose a saved field|सहेजा हुआ खेत चुनें|जतन केलेले शेत निवडा|Saved field chunein
Open Field Sentinel|खेत निगरानी खोलें|शेत निरीक्षण उघडा|Field Sentinel kholein
Save photo for review without AI|AI के बिना समीक्षा के लिए फोटो सहेजें|AI शिवाय समीक्षेसाठी फोटो जतन करा|AI ke bina review ke liye photo save karein
If the image model is unavailable, the photo can still be recorded and reviewed. No diagnosis is fabricated.|मॉडल उपलब्ध न हो तो भी फोटो दर्ज और समीक्षा हो सकती है। निदान गढ़ा नहीं जाता।|मॉडेल उपलब्ध नसले तरी फोटो नोंदवता व तपासता येतो. निदान बनवले जात नाही.|Model unavailable ho tab bhi photo record aur review ho sakti hai. Diagnosis fabricate nahi hota.
Continue in local workspace|स्थानीय कार्यक्षेत्र में जारी रखें|स्थानिक कार्यक्षेत्रात पुढे जा|Local workspace mein continue karein
`);
load(`
FARMER-FIRST CROP INTELLIGENCE|किसान-केंद्रित फसल जानकारी|शेतकरी-केंद्रित पीक माहिती|FARMER-FIRST CROP INTELLIGENCE
Worry less.|कम चिंता करें।|कमी चिंता करा.|Kam chinta karein.
Grow wiser.|समझदारी से उगाएँ।|शहाणपणाने पिकवा.|Samajhdari se ugaayein.
Crop health, live weather, field risk and expert support — designed around the farmer.|फसल स्वास्थ्य, मौसम, खेत जोखिम और विशेषज्ञ सहायता — किसान के लिए।|पीक आरोग्य, हवामान, शेत जोखीम आणि तज्ञ सहाय्य — शेतकऱ्यांसाठी.|Crop health, weather, field risk aur expert support — farmer ke liye.
Leaf analysis|पत्ती विश्लेषण|पान विश्लेषण|Leaf analysis
Live local weather|स्थानीय मौसम|स्थानिक हवामान|Live local weather
Expert review|विशेषज्ञ समीक्षा|तज्ञ समीक्षा|Expert review
Login|लॉगिन|लॉगिन|Login
Create account|खाता बनाएँ|खाते तयार करा|Account banayein
Welcome back|स्वागत है|पुन्हा स्वागत|Welcome back
Sign in to your farmer workspace.|किसान कार्यक्षेत्र में प्रवेश करें।|शेतकरी कार्यक्षेत्रात प्रवेश करा.|Farmer workspace mein sign in karein.
Full name|पूरा नाम|पूर्ण नाव|Poora naam
Mobile / Email|मोबाइल / ईमेल|मोबाइल / ईमेल|Mobile / Email
Password|पासवर्ड|पासवर्ड|Password
Village / District|गाँव / जिला|गाव / जिल्हा|Gaon / district
Prototype accounts are stored locally in this browser. For production, connect Firebase/Supabase authentication.|नमूना खाते इस ब्राउज़र में रहते हैं। वास्तविक सेवा में सुरक्षित प्रमाणीकरण जरूरी है।|नमुना खाती या ब्राउझरमध्ये राहतात. प्रत्यक्ष सेवेसाठी सुरक्षित प्रमाणीकरण आवश्यक आहे.|Prototype accounts browser mein rehte hain. Production ke liye secure authentication chahiye.
Farmer intelligence|किसान जानकारी|शेतकरी माहिती|Farmer intelligence
Field Sentinel|खेत निगरानी|शेत निरीक्षण|Field Sentinel
Home|होम|मुख्यपृष्ठ|Home
Scan|स्कैन|स्कॅन|Scan
Dashboard|डैशबोर्ड|डॅशबोर्ड|Dashboard
Expert|विशेषज्ञ|तज्ञ|Expert
Hotspots|प्रभावित क्षेत्र|प्रभावित भाग|Hotspots
Farmer|किसान|शेतकरी|Farmer
FOR THE FIELDS OF INDIA|भारत के खेतों के लिए|भारताच्या शेतांसाठी|BHARAT KE KHETON KE LIYE
One photo, one weather signal and one clear next step. KrishiRakshak brings crop health intelligence closer to the farmer.|एक फोटो, मौसम का संकेत और स्पष्ट अगला कदम। कृषिरक्षक फसल की जानकारी किसान तक लाता है।|एक फोटो, हवामानाचा संकेत आणि स्पष्ट पुढचे पाऊल. कृषिरक्षक पीक माहिती शेतकऱ्यापर्यंत आणतो.|Ek photo, weather signal aur clear next step. KrishiRakshak crop information farmer tak laata hai.
Scan my crop|मेरी फसल स्कैन करें|माझे पीक स्कॅन करा|Meri crop scan karein
Open dashboard|डैशबोर्ड खोलें|डॅशबोर्ड उघडा|Dashboard kholein
Smart crop analysis|फसल विश्लेषण|पीक विश्लेषण|Smart crop analysis
Live weather|मौसम जानकारी|हवामान माहिती|Live weather
4 languages|4 भाषाएँ|4 भाषा|4 languages
Expert escalation|विशेषज्ञ को भेजें|तज्ञांकडे पाठवा|Expert escalation
FIELD PULSE|खेत की स्थिति|शेताची स्थिती|FIELD PULSE
Location pending|स्थान बाकी|स्थान प्रलंबित|Location pending
LIVE WEATHER|मौसम जानकारी|हवामान माहिती|LIVE WEATHER
Fetching local conditions…|स्थानीय स्थिति लोड हो रही है…|स्थानिक स्थिती मिळवत आहे…|Local conditions load ho rahi hain…
Field risk|खेत जोखिम|शेत जोखीम|Field risk
Waiting for weather|मौसम की प्रतीक्षा|हवामानाची प्रतीक्षा|Weather ka wait
Crop health check|फसल स्वास्थ्य जाँच|पीक आरोग्य तपासणी|Crop health check
Loading|लोड हो रहा है|लोड होत आहे|Loading
Ready for image analysis|फोटो विश्लेषण तैयार|फोटो विश्लेषण तयार|Image analysis ready
Scans|स्कैन|स्कॅन|Scans
Saved on this account|इस खाते में सहेजा गया|या खात्यात जतन केलेले|Is account mein saved
Farmer-first design|किसान-केंद्रित डिजाइन|शेतकरी-केंद्रित रचना|Farmer-first design
Low-confidence results are flagged instead of pretending certainty.|कम भरोसे वाले परिणाम स्पष्ट रूप से चिह्नित हैं।|कमी विश्वासाचे परिणाम स्पष्ट चिन्हांकित आहेत.|Low-confidence results clearly flagged hain.
Detect|पहचानें|ओळखा|Detect
Predict|जोखिम आँकें|जोखीम मोजा|Predict
Act|कार्य करें|कृती करा|Act
Image analysis identifies visible crop-health patterns. Optional Kindwise adds a broader crop-health second opinion.|फोटो विश्लेषण दिखने वाले पैटर्न पहचानता है। वैकल्पिक Kindwise दूसरी राय देता है।|फोटो विश्लेषण दिसणारे नमुने ओळखते. ऐच्छिक Kindwise दुसरे मत देते.|Image analysis visible patterns identify karta hai. Optional Kindwise second opinion deta hai.
Temperature, humidity and rainfall become supporting signals for crop-risk awareness.|तापमान, नमी और बारिश जोखिम समझने के सहायक संकेत हैं।|तापमान, आर्द्रता आणि पाऊस जोखीम समजण्यासाठी सहाय्यक संकेत आहेत.|Temperature, humidity aur rain risk awareness ke signals hain.
Simple next steps, safe guidance and expert escalation keep the farmer in control.|सरल अगले कदम और विशेषज्ञ सहायता किसान के निर्णय में मदद करते हैं।|सोपे पुढील टप्पे आणि तज्ञ सहाय्य शेतकऱ्यांच्या निर्णयास मदत करतात.|Simple next steps aur expert support farmer ko control dete hain.
CROP HEALTH CHECK|फसल स्वास्थ्य जाँच|पीक आरोग्य तपासणी|CROP HEALTH CHECK
Show us the leaf.|पत्ती दिखाएँ।|पान दाखवा.|Leaf dikhayein.
Upload a clear photo of one affected leaf. We analyse the image and show practical next steps.|प्रभावित पत्ती की साफ फोटो अपलोड करें। विश्लेषण के बाद अगले कदम दिखेंगे।|बाधित पानाचा स्वच्छ फोटो अपलोड करा. विश्लेषणानंतर पुढील पावले दिसतील.|Affected leaf ki clear photo upload karein. Analysis aur next steps dikhenge.
Crop check loading|फसल जाँच लोड हो रही है|पीक तपासणी लोड होत आहे|Crop check loading
Upload crop image|फसल की फोटो अपलोड करें|पिकाचा फोटो अपलोड करा|Crop photo upload karein
JPG, PNG, WEBP · daylight works best|JPG, PNG, WEBP · दिन का उजाला बेहतर|JPG, PNG, WEBP · दिवसाचा प्रकाश उत्तम|JPG, PNG, WEBP · daylight best hai
Auto detect crop|फसल स्वतः पहचानें|पीक आपोआप ओळखा|Auto detect crop
Apple|सेब|सफरचंद|Seb
Blueberry|ब्लूबेरी|ब्लूबेरी|Blueberry
Cherry|चेरी|चेरी|Cherry
Orange|संतरा|संत्रे|Santra
Peach|आड़ू|पीच|Aadu
Bell Pepper|शिमला मिर्च|ढोबळी मिरची|Shimla mirch
Potato|आलू|बटाटा|Aaloo
Raspberry|रास्पबेरी|रास्पबेरी|Raspberry
Squash|स्क्वैश|स्क्वॅश|Squash
Strawberry|स्ट्रॉबेरी|स्ट्रॉबेरी|Strawberry
Camera|कैमरा|कॅमेरा|Camera
Clear|हटाएँ|काढा|Clear
Run diagnosis|आकलन शुरू करें|मूल्यांकन सुरू करा|Assessment shuru karein
Send this case to expert|विशेषज्ञ समीक्षा में जोड़ें|तज्ञ समीक्षेत जोडा|Expert review mein add karein
Field context|खेत संदर्भ|शेत संदर्भ|Field context
Fruit/Grain filling|फल / दाना भरना|फळ / दाणे भरणे|Fruit / grain filling
Harvest|कटाई|काढणी|Harvest
Variety|किस्म|वाण|Variety
Photo tip|फोटो सुझाव|फोटो सूचना|Photo tip
Use daylight, keep one leaf sharp, and include the full symptom area.|दिन के उजाले में एक पत्ती की साफ फोटो लें, पूरा लक्षण क्षेत्र दिखाएँ।|दिवसा एका पानाचा स्पष्ट फोटो घ्या आणि पूर्ण लक्षण भाग समाविष्ट करा.|Daylight mein ek leaf sharp rakhein aur full symptom area include karein.
Fast image analysis|त्वरित फोटो विश्लेषण|जलद फोटो विश्लेषण|Fast image analysis
The crop image is analysed first so the initial result is not blocked by external APIs.|बाहरी सेवा के इंतजार से पहले फोटो का स्थानीय विश्लेषण होता है।|बाह्य सेवेची वाट पाहण्यापूर्वी फोटोचे स्थानिक विश्लेषण होते.|External service se pehle image ka local analysis hota hai.
Risk forecast|जोखिम पूर्वानुमान|जोखीम अंदाज|Risk forecast
Weather + crop stage + recent field history produce a scouting risk signal.|मौसम, फसल अवस्था और हाल के रिकॉर्ड जाँच का जोखिम संकेत देते हैं।|हवामान, पीक अवस्था आणि अलीकडील नोंदी पाहणीचा जोखीम संकेत देतात.|Weather, crop stage aur history scouting risk signal dete hain.
Human validation|विशेषज्ञ सत्यापन|तज्ञ पडताळणी|Human validation
Low confidence, disagreement or serious cases can be routed to an expert.|कम भरोसा, असहमति या गंभीर मामलों पर विशेषज्ञ समीक्षा लें।|कमी विश्वास, मतभेद किंवा गंभीर प्रकरणांवर तज्ञ समीक्षा घ्या.|Low confidence, disagreement ya serious cases expert ko dein.
Your photo is analysed in the browser first. External second-opinion services are optional and proxied server-side.|फोटो पहले ब्राउज़र में जाँची जाती है। बाहरी दूसरी राय वैकल्पिक है और सर्वर से जाती है।|फोटो प्रथम ब्राउझरमध्ये तपासला जातो. बाह्य दुसरे मत ऐच्छिक असून सर्व्हरमार्फत जाते.|Photo pehle browser mein analyse hoti hai. External second opinion optional hai.
FARMER WORKSPACE|किसान कार्यक्षेत्र|शेतकरी कार्यक्षेत्र|FARMER WORKSPACE
Good morning|सुप्रभात|सुप्रभात|Good morning
Your field pulse is ready.|खेत की स्थिति तैयार है।|शेताची स्थिती तयार आहे.|Field pulse ready hai.
New scan|नया स्कैन|नवीन स्कॅन|New scan
Fetching weather…|मौसम लोड हो रहा है…|हवामान मिळवत आहे…|Weather load ho raha hai…
FIELD HEALTH|मॉडल का भरोसा|मॉडेलचा विश्वास|MODEL CONFIDENCE
Based on recent scans and field signals.|मॉडल का भरोसा; फसल स्वास्थ्य का माप नहीं।|मॉडेलचा विश्वास; पीक आरोग्याचे माप नाही.|Model confidence; crop health ka measure nahi.
CURRENT RISK|वर्तमान जोखिम|सध्याची जोखीम|CURRENT RISK
Weather-aware risk estimate.|मौसम-आधारित जोखिम अनुमान।|हवामानाधारित जोखीम अंदाज.|Weather-based risk estimate.
TOTAL SCANS|कुल स्कैन|एकूण स्कॅन|TOTAL SCANS
Saved to your local farmer account.|स्थानीय किसान खाते में सहेजे गए।|स्थानिक शेतकरी खात्यात जतन केलेले.|Local farmer account mein saved.
Outbreak watch|फैलाव निगरानी|प्रसार निरीक्षण|Outbreak watch
Refresh weather|मौसम ताज़ा करें|हवामान ताजे करा|Weather refresh karein
LIVE|वर्तमान|सद्य|LIVE
Waiting for field weather and crop context.|खेत मौसम और फसल संदर्भ की प्रतीक्षा।|शेत हवामान आणि पीक संदर्भाची प्रतीक्षा.|Field weather aur crop context ka wait.
Field inputs|खेत इनपुट|शेत माहिती|Field inputs
IoT-ready|मैनुअल इनपुट|स्वहस्ते नोंद|Manual inputs
Trap count / 24h|ट्रैप संख्या / 24 घंटे|सापळा संख्या / 24 तास|Trap count / 24h
Soil moisture %|मिट्टी की नमी %|मातीतील ओलावा %|Soil moisture %
Save field inputs|खेत इनपुट सहेजें|शेत माहिती जतन करा|Field inputs save karein
These inputs mirror future pheromone-trap and soil-sensor feeds. Manual values are clearly marked as field inputs.|ये मैनुअल मान भविष्य के ट्रैप और मिट्टी सेंसर डेटा के लिए प्रारूप हैं।|ही स्वहस्ते मूल्ये भविष्यातील सापळा आणि माती सेन्सर डेटासाठी प्रारूप आहेत.|Yeh manual values future trap aur soil sensors ka format hain.
Recent crop scans|हाल के फसल स्कैन|अलीकडील पीक स्कॅन|Recent crop scans
Compare latest|हाल के स्कैन तुलना करें|अलीकडील स्कॅन तुलना करा|Latest compare karein
Download report|रिपोर्ट डाउनलोड करें|अहवाल डाउनलोड करा|Report download karein
No scans yet. Start with a clear leaf photo.|स्कैन नहीं हैं। साफ पत्ती की फोटो से शुरू करें।|स्कॅन नाहीत. स्वच्छ पानाच्या फोटोने सुरू करा.|Abhi scans nahi. Clear leaf photo se start karein.
Field watch|खेत निगरानी|शेत निरीक्षण|Field watch
My crops|मेरी फसलें|माझी पिके|Meri crops
Add crop|फसल जोड़ें|पीक जोडा|Crop add karein
EXTENSION / DEPARTMENT VIEW|कृषि विस्तार / विभाग दृश्य|कृषी विस्तार / विभाग दृश्य|EXTENSION / DEPARTMENT VIEW
Crop health hotspots|फसल प्रभावित क्षेत्र|पीक प्रभावित भाग|Crop health hotspots
Confirmed cases, field-risk signals and response status in one map.|स्थानीय मामले, जोखिम संकेत और समीक्षा स्थिति एक मानचित्र में।|स्थानिक प्रकरणे, जोखीम संकेत आणि समीक्षा स्थिती एका नकाशात.|Local cases, risk signals aur review status ek map mein.
District view|जिला दृश्य|जिल्हा दृश्य|District view
All signals|सभी संकेत|सर्व संकेत|All signals
High risk|उच्च जोखिम|उच्च जोखीम|High risk
Awaiting expert|विशेषज्ञ की प्रतीक्षा|तज्ञांची प्रतीक्षा|Expert ka wait
Loading field hotspot map…|खेत मानचित्र लोड हो रहा है…|शेत नकाशा लोड होत आहे…|Field map loading…
Cases logged|दर्ज मामले|नोंदवलेली प्रकरणे|Cases logged
High-risk cases|उच्च जोखिम मामले|उच्च जोखीम प्रकरणे|High-risk cases
Learning loop|सीखने का चक्र|शिकण्याचे चक्र|Learning loop
Expert confirmations are stored with the original assessment so future versions can be evaluated against real field outcomes.|समीक्षा मूल आकलन के साथ सहेजी जाती है, ताकि भविष्य में वास्तविक परिणामों पर मूल्यांकन हो।|समीक्षा मूळ मूल्यांकनासोबत जतन होते, जेणेकरून भविष्यात प्रत्यक्ष परिणामांवर मूल्यमापन करता येईल.|Reviews original assessment ke saath save hote hain, future evaluation ke liye.
reviewed|समीक्षित|समीक्षा झाली|reviewed
pending|बाकी|प्रलंबित|pending
review rate|समीक्षा दर|समीक्षा दर|review rate
Export feedback CSV|प्रतिक्रिया CSV निर्यात करें|अभिप्राय CSV निर्यात करा|Feedback CSV export karein
COMMUNITY CARE|सामुदायिक सहायता|समुदाय सहाय्य|COMMUNITY CARE
Expert portal|विशेषज्ञ पोर्टल|तज्ञ पोर्टल|Expert portal
Review uncertain farmer cases, add practical advice and generate a report.|अनिश्चित मामलों की समीक्षा करें, सलाह जोड़ें और रिपोर्ट बनाएँ।|अनिश्चित प्रकरणांची समीक्षा करा, सल्ला जोडा आणि अहवाल तयार करा.|Uncertain cases review karein, advice add karein aur report banayein.
Human-in-the-loop|विशेषज्ञ भागीदारी|तज्ञ सहभाग|Human-in-the-loop
Case queue|मामला सूची|प्रकरण रांग|Case queue
Select a case to review.|समीक्षा के लिए मामला चुनें।|समीक्षेसाठी प्रकरण निवडा.|Review ke liye case chunein.
Delete case|मामला हटाएं|प्रकरण हटवा|Delete case
Remove case|मामला हटाएं|प्रकरण काढा|Remove case
Delete this case from the queue? This cannot be undone.|क्या आप इस मामले को सूची से हटाना चाहते हैं? इसे वापस नहीं लाया जा सकेगा।|तुम्हाला हे प्रकरण रांगेतून काढायचे आहे का? ही कृती पूर्ववत केली जाऊ शकत नाही.|Delete this case from the queue? This cannot be undone.
Case removed from queue.|मामला सूची से हटा दिया गया।|प्रकरण रांगेतून काढण्यात आले.|Case removed from queue.
Ask Sirib Rakshak|रक्षक से पूछें|रक्षकला विचारा|Rakshak se poochein
Sirib Rakshak|रक्षक सहायक|रक्षक सहाय्यक|Rakshak assistant
Crop + weather assistant|फसल + मौसम सहायक|पीक + हवामान सहाय्यक|Crop + weather assistant
Namaste! Ask me about crop disease, irrigation, pests, weather or your latest scan.|नमस्ते! फसल रोग, सिंचाई, कीट, मौसम या हाल के स्कैन के बारे में पूछें।|नमस्कार! पीक रोग, सिंचन, कीटक, हवामान किंवा अलीकडील स्कॅनबद्दल विचारा.|Namaste! Crop disease, irrigation, pests, weather ya latest scan ke baare mein poochein.
FARMER PROFILE|किसान प्रोफाइल|शेतकरी प्रोफाइल|FARMER PROFILE
Your field identity|आपकी खेत पहचान|तुमच्या शेताची ओळख|Aapki field identity
Name|नाम|नाव|Naam
Primary crop|मुख्य फसल|मुख्य पीक|Primary crop
Save profile|प्रोफाइल सहेजें|प्रोफाइल जतन करा|Profile save karein
MY CROPS|मेरी फसलें|माझी पिके|MERI CROPS
Add a crop|फसल जोड़ें|पीक जोडा|Crop add karein
Area|क्षेत्रफल|क्षेत्रफळ|Area
KrishiRakshak · Farmer-first crop health platform|कृषिरक्षक · किसान-केंद्रित फसल स्वास्थ्य मंच|कृषिरक्षक · शेतकरी-केंद्रित पीक आरोग्य मंच|KrishiRakshak · Farmer-first crop health platform
`);
load(`
At least 20% of sampled plants show symptoms (+35).|कम से कम 20% जाँचे पौधों में लक्षण (+35)।|किमान 20% तपासलेल्या रोपांत लक्षणे (+35).|Kam se kam 20% sampled plants mein symptoms (+35).
Symptoms reported in the sample (+15).|नमूने में लक्षण दर्ज (+15)।|नमुन्यात लक्षणे नोंदवली (+15).|Sample mein symptoms reported (+15).
Observed symptom share increased by over 5 percentage points (+25).|लक्षणों का अनुपात 5 प्रतिशत अंक से अधिक बढ़ा (+25)।|लक्षणांचे प्रमाण 5 टक्के अंकांहून वाढले (+25).|Symptom share 5 percentage points se zyada badha (+25).
Same-pest catch rose ≥50% at the same trap and interval (+20).|समान ट्रैप और अवधि में उसी कीट की संख्या ≥50% बढ़ी (+20)।|समान सापळा व कालावधीत त्याच कीटकांची संख्या ≥50% वाढली (+20).|Same trap aur interval mein pest catch ≥50% badha (+20).
Prolonged leaf wetness reported (+10).|लंबे समय तक पत्ते गीले दर्ज (+10)।|बराच वेळ पाने ओली नोंदवली (+10).|Long leaf wetness reported (+10).
Farmer reports rapid spread (+25).|किसान ने तेजी से फैलाव बताया (+25)।|शेतकऱ्याने वेगाने प्रसार नोंदवला (+25).|Farmer ne rapid spread bataya (+25).
Observation is older than 72 hours; collect a fresh sample.|अवलोकन 72 घंटे से पुराना है; नया नमूना लें।|निरीक्षण 72 तासांपेक्षा जुने आहे; नवीन नमुना घ्या.|Observation 72 ghante se purana hai; fresh sample lein.
No configured escalation trigger. Continue scouting.|कोई तय उच्च-प्राथमिकता संकेत नहीं। जाँच जारी रखें।|ठरलेला उच्च प्राधान्य संकेत नाही. पाहणी सुरू ठेवा.|Escalation trigger nahi. Scouting jaari rakhein.
Choose a saved field first.|पहले सहेजा हुआ खेत चुनें।|प्रथम जतन केलेले शेत निवडा.|Pehle saved field chunein.
Upload a clear leaf photo first.|पहले पत्ती की साफ फोटो अपलोड करें।|प्रथम पानाचा स्वच्छ फोटो अपलोड करा.|Pehle clear leaf photo upload karein.
Photo saved. Review and follow-up are ready in Field Sentinel.|फोटो सहेजी गई। खेत निगरानी में समीक्षा और अगली जाँच तैयार हैं।|फोटो जतन केला. शेत निरीक्षणात समीक्षा आणि पुढील पाहणी तयार आहे.|Photo saved. Field Sentinel mein review aur follow-up ready hain.
Photo saved to your field action plan.|फोटो खेत की कार्य योजना में सहेजी गई।|फोटो शेताच्या कृती योजनेत जतन केला.|Photo field action plan mein saved.
Scan linked to this field.|स्कैन खेत से जुड़ गया।|स्कॅन शेताशी जोडला.|Scan field se linked.
Photo must be smaller than 12 MB.|फोटो 12 MB से छोटी होनी चाहिए।|फोटो 12 MB पेक्षा लहान हवा.|Photo 12 MB se chhoti honi chahiye.
Choose a JPEG, PNG or WebP photo.|JPEG, PNG या WebP फोटो चुनें।|JPEG, PNG किंवा WebP फोटो निवडा.|JPEG, PNG ya WebP photo chunein.
Photo could not be opened.|फोटो खुल नहीं सकी।|फोटो उघडता आला नाही.|Photo open nahi hui.
Enter a field name and village.|खेत का नाम और गाँव दर्ज करें।|शेताचे नाव आणि गाव नोंदवा.|Field name aur village enter karein.
Sample size must be a whole number from 1 to 10,000.|नमूना संख्या 1 से 10,000 तक पूर्णांक होनी चाहिए।|नमुना संख्या 1 ते 10,000 पूर्णांक हवी.|Sample size 1 se 10,000 whole number hona chahiye.
Affected plants must be between zero and sample size.|प्रभावित पौधे शून्य से कुल नमूने के बीच होने चाहिए।|बाधित रोपे शून्य ते एकूण नमुन्यादरम्यान हवीत.|Affected plants zero aur sample size ke beech hone chahiye.
Trap count must be a non-negative whole number.|ट्रैप संख्या शून्य या धनात्मक पूर्णांक होनी चाहिए।|सापळा संख्या शून्य किंवा धन पूर्णांक हवी.|Trap count non-negative whole number chahiye.
Add a trap / pest identifier when recording a catch.|कीट संख्या के साथ ट्रैप / कीट पहचान जोड़ें।|कीटक संख्या नोंदवताना सापळा / कीटक ओळख जोडा.|Catch ke saath trap / pest ID add karein.
Observation saved. Priority updated.|अवलोकन सहेजा गया। प्राथमिकता अपडेट हुई।|निरीक्षण जतन केले. प्राधान्य अद्ययावत झाले.|Observation saved. Priority updated.
Action plan saved on this device.|कार्य योजना इस उपकरण पर सहेजी गई।|कृती योजना या उपकरणावर जतन केली.|Action plan device par saved.
This field already has an open action plan.|इस खेत की खुली कार्य योजना पहले से है।|या शेताची प्रलंबित कृती योजना आधीच आहे.|Field ka open action plan pehle se hai.
Record a fresh follow-up before closing.|बंद करने से पहले नई अगली जाँच दर्ज करें।|बंद करण्याआधी नवीन पाहणी नोंदवा.|Close karne se pehle fresh follow-up karein.
Plan closed with its follow-up evidence.|अगली जाँच के प्रमाण के साथ योजना बंद हुई।|पुढील पाहणीच्या पुराव्यासह योजना बंद केली.|Follow-up evidence ke saath plan closed.
Review saved. Follow-up is still required.|समीक्षा सहेजी गई। अगली जाँच अभी जरूरी है।|समीक्षा जतन केली. पुढील पाहणी अजून आवश्यक आहे.|Review saved. Follow-up abhi chahiye.
Checklist updated.|जाँच सूची अपडेट हुई।|पाहणी सूची अद्ययावत झाली.|Checklist updated.
Choose a valid visit date.|सही जाँच तारीख चुनें।|वैध भेट तारीख निवडा.|Valid visit date chunein.
Visit date updated.|जाँच तारीख अपडेट हुई।|भेट तारीख अद्ययावत झाली.|Visit date updated.
Backup restored. Existing records were kept.|बैकअप बहाल हुआ। पुराने रिकॉर्ड रखे गए।|बॅकअप पुनर्संचयित झाला. जुन्या नोंदी ठेवल्या.|Backup restored. Existing records rakhe gaye.
Choose a KrishiRakshak backup.|कृषिरक्षक बैकअप चुनें।|कृषिरक्षक बॅकअप निवडा.|KrishiRakshak backup chunein.
Demo and real records cannot be mixed.|डेमो और वास्तविक रिकॉर्ड नहीं मिलाए जा सकते।|डेमो आणि वास्तविक नोंदी मिसळता येत नाहीत.|Demo aur real records mix nahi ho sakte.
Speech is not supported in this browser.|इस ब्राउज़र में आवाज उपलब्ध नहीं है।|या ब्राउझरमध्ये आवाज समर्थित नाही.|Browser speech support nahi karta.
Storage is full or unavailable. Export your records and free space; this change was not saved.|भंडारण भरा या अनुपलब्ध है। रिकॉर्ड निर्यात कर जगह खाली करें; बदलाव सहेजा नहीं गया।|साठवण भरली किंवा अनुपलब्ध आहे. नोंदी निर्यात करून जागा करा; बदल जतन झाला नाही.|Storage full ya unavailable hai. Records export karein; change save nahi hua.
No weather|मौसम नहीं|हवामान नाही|No weather
Weather unavailable|मौसम अनुपलब्ध|हवामान अनुपलब्ध|Weather unavailable
High humidity|अधिक नमी|जास्त आर्द्रता|High humidity
Recent rain|हाल की बारिश|अलीकडील पाऊस|Recent rain
High rain probability|बारिश की अधिक संभावना|पावसाची अधिक शक्यता|High rain chance
Long humid window|लंबी नम अवधि|दीर्घ दमट कालावधी|Long humid window
Favorable fungal weather|फफूँद-अनुकूल मौसम|बुरशीस अनुकूल हवामान|Fungal-friendly weather
Disease-specific wet-weather trigger|रोग-संबंधी गीले मौसम का संकेत|रोगसंबंधित ओल्या हवामानाचा संकेत|Disease-specific wet-weather trigger
Warm humid mildew window|गर्म नम फफूँद अवधि|उबदार दमट बुरशी कालावधी|Warm humid mildew window
Extended leaf-wetness window|पत्तों पर लंबी नमी|पानांवर दीर्घ ओलावा|Extended leaf-wetness window
Recent field history|हाल का खेत इतिहास|अलीकडील शेत इतिहास|Recent field history
Trap activity reported|ट्रैप गतिविधि दर्ज|सापळ्यात हालचाल नोंदवली|Trap activity reported
High soil moisture|मिट्टी में अधिक नमी|मातीत जास्त ओलावा|High soil moisture
Low|कम|कमी|Low
No strong weather trigger|मौसम का मजबूत संकेत नहीं|हवामानाचा ठळक संकेत नाही|Strong weather trigger nahi
No strong trigger detected|मजबूत संकेत नहीं मिला|ठळक संकेत आढळला नाही|Strong trigger nahi mila
Scout affected rows today; avoid unnecessary leaf wetting and request expert help if symptoms expand.|आज प्रभावित कतारें जाँचें; पत्ते अनावश्यक न भिगोएँ और फैलाव पर विशेषज्ञ सहायता लें।|आज बाधित रांगा तपासा; पाने अनावश्यक ओली करू नका आणि प्रसार झाल्यास तज्ञ मदत घ्या.|Aaj affected rows scout karein; extra wetting avoid karein aur spread par expert help lein.
Scout within 24 hours and repeat a photo from the same plot.|24 घंटे में जाँचें और उसी खेत की दोबारा फोटो लें।|24 तासांत पाहणी करा आणि त्याच शेताचा पुन्हा फोटो घ्या.|24 ghante mein scout karein aur same plot ka photo repeat karein.
Continue routine scouting and avoid preventive pesticide use without a clear need.|नियमित जाँच करें और स्पष्ट जरूरत बिना रोकथाम के लिए कीटनाशक न डालें।|नियमित पाहणी करा आणि स्पष्ट गरज नसताना प्रतिबंधात्मक कीटकनाशक वापरू नका.|Routine scouting karein; clear need bina preventive pesticide avoid karein.
Allow location access to build the field forecast.|खेत पूर्वानुमान के लिए स्थान की अनुमति दें।|शेत अंदाजासाठी स्थानाची परवानगी द्या.|Field forecast ke liye location allow karein.
Supporting forecast — not a disease diagnosis.|सहायक पूर्वानुमान — रोग निदान नहीं।|सहाय्यक अंदाज — रोग निदान नाही.|Supporting forecast — disease diagnosis nahi.
Location permission unavailable.|स्थान अनुमति अनुपलब्ध है।|स्थान परवानगी अनुपलब्ध आहे.|Location permission unavailable.
Live weather unavailable.|मौसम जानकारी अनुपलब्ध है।|हवामान माहिती अनुपलब्ध आहे.|Live weather unavailable.
Allow location for live weather.|मौसम के लिए स्थान अनुमति दें।|हवामानासाठी स्थान परवानगी द्या.|Live weather ke liye location allow karein.
Load on scan|स्कैन पर लोड होगा|स्कॅनवर लोड होईल|Scan par load hoga
Image assessment on demand|माँग पर फोटो आकलन|गरजेनुसार फोटो मूल्यांकन|On-demand image assessment
Mean model confidence; not a measure of crop health.|औसत मॉडल भरोसा; फसल स्वास्थ्य का माप नहीं।|सरासरी मॉडेल विश्वास; पीक आरोग्याचे माप नाही.|Mean model confidence; crop health ka measure nahi.
No scans yet — start by checking a leaf.|स्कैन नहीं हैं — पत्ती जाँच से शुरू करें।|स्कॅन नाहीत — पान तपासून सुरू करा.|Scans nahi — leaf check se start karein.
Regular scouting|नियमित जाँच|नियमित पाहणी|Regular scouting
Take a weekly leaf photo from the same plot to catch changes early.|बदलाव पहचानने के लिए हर सप्ताह उसी खेत की पत्ती फोटो लें।|बदल ओळखण्यासाठी दर आठवड्याला त्याच शेतातील पानाचा फोटो घ्या.|Changes ke liye weekly same plot ka leaf photo lein.
Add your crop|अपनी फसल जोड़ें|तुमचे पीक जोडा|Apni crop add karein
Use profile or add a plot|प्रोफाइल या खेत जोड़ें|प्रोफाइल किंवा शेत जोडा|Profile ya plot add karein
Enter a crop name.|फसल का नाम दर्ज करें।|पिकाचे नाव नोंदवा.|Crop name enter karein.
Area not set|क्षेत्रफल तय नहीं|क्षेत्रफळ नोंदलेले नाही|Area not set
Crop added.|फसल जुड़ गई।|पीक जोडले.|Crop added.
No expert cases yet.|विशेषज्ञ मामले अभी नहीं हैं।|अद्याप तज्ञ प्रकरणे नाहीत.|Expert cases abhi nahi hain.
AI first read|AI प्रारंभिक आकलन|AI प्रारंभिक मूल्यांकन|AI first read
Confidence:|भरोसा:|विश्वास:|Confidence:
Source:|स्रोत:|स्रोत:|Source:
Expert recommendation|विशेषज्ञ सलाह|तज्ञ शिफारस|Expert recommendation
Save recommendation|सलाह सहेजें|शिफारस जतन करा|Recommendation save karein
Send recommendation|सलाह सहेजें|शिफारस जतन करा|Recommendation save karein
Mark reviewed|समीक्षित चिह्नित करें|समीक्षा झाली असे नोंदवा|Mark reviewed
Expert response saved.|विशेषज्ञ जवाब सहेजा गया।|तज्ञ प्रतिसाद जतन केला.|Expert response saved.
Case marked reviewed.|मामला समीक्षित चिह्नित हुआ।|प्रकरणाची समीक्षा नोंदवली.|Case marked reviewed.
Case saved in the local expert queue.|मामला स्थानीय विशेषज्ञ सूची में सहेजा गया।|प्रकरण स्थानिक तज्ञ रांगेत जतन केले.|Case local expert queue mein saved.
Run a diagnosis first.|पहले आकलन चलाएँ।|प्रथम मूल्यांकन करा.|Pehle assessment run karein.
Field inputs saved.|खेत इनपुट सहेजे गए।|शेत माहिती जतन केली.|Field inputs saved.
Need at least two scans to compare.|तुलना के लिए कम से कम दो स्कैन चाहिए।|तुलनेसाठी किमान दोन स्कॅन हवेत.|Compare ke liye do scans chahiye.
No expert case/report yet.|अभी विशेषज्ञ मामला / रिपोर्ट नहीं है।|अद्याप तज्ञ प्रकरण / अहवाल नाही.|Abhi expert case / report nahi.
Crop health|फसल स्वास्थ्य|पीक आरोग्य|Crop health
Uncertain condition|अनिश्चित स्थिति|अनिश्चित स्थिती|Uncertain condition
Awaiting expert assessment|विशेषज्ञ आकलन बाकी|तज्ञ मूल्यांकन प्रलंबित|Expert assessment ka wait
Photo observation — no AI diagnosis|फोटो अवलोकन — AI निदान नहीं|फोटो निरीक्षण — AI निदान नाही|Photo observation — AI diagnosis nahi
Unknown crop|अज्ञात फसल|अज्ञात पीक|Unknown crop
REVIEW RECOMMENDED|समीक्षा जरूरी|समीक्षा आवश्यक|REVIEW RECOMMENDED
CROP HEALTH ANALYSIS|फसल स्वास्थ्य विश्लेषण|पीक आरोग्य विश्लेषण|CROP HEALTH ANALYSIS
Other visual matches|अन्य फोटो मिलान|इतर दृश्य जुळण्या|Other visual matches
Recommended next step|सुझाया अगला कदम|सुचवलेले पुढचे पाऊल|Recommended next step
Scout|खेत जाँचें|शेत पाहा|Scout
IPM first|एकीकृत प्रबंधन पहले|एकात्मिक व्यवस्थापन प्रथम|IPM first
Spray decision|छिड़काव निर्णय|फवारणी निर्णय|Spray decision
Request expert review|विशेषज्ञ समीक्षा लें|तज्ञ समीक्षा घ्या|Expert review lein
Re-check the same plot within 24–48 hours and photograph a fresh symptom area.|24–48 घंटे में वही खेत जाँचें और नए लक्षण की फोटो लें।|24–48 तासांत तेच शेत तपासा आणि नवीन लक्षणाचा फोटो घ्या.|24–48 ghante mein same plot check karein aur fresh symptom photo lein.
Use the product label and local agriculture guidance before applying any treatment.|उपचार से पहले उत्पाद लेबल और स्थानीय कृषि सलाह लें।|उपाय करण्यापूर्वी उत्पादन लेबल आणि स्थानिक कृषी सल्ला घ्या.|Treatment se pehle product label aur local agriculture guidance lein.
Check root-zone soil moisture before irrigation. If rain is expected, avoid unnecessary watering.|सिंचाई से पहले जड़ों की मिट्टी की नमी जाँचें। बारिश की संभावना हो तो अतिरिक्त पानी न दें।|सिंचनाआधी मुळांजवळील मातीचा ओलावा तपासा. पावसाची शक्यता असल्यास अतिरिक्त पाणी देऊ नका.|Irrigation se pehle root-zone moisture check karein. Rain expected ho to extra water avoid karein.
Inspect leaf undersides and new growth for insects or eggs before choosing a control method.|नियंत्रण विधि चुनने से पहले पत्तों के नीचे और नई वृद्धि पर कीट या अंडे जाँचें।|नियंत्रण पद्धत निवडण्याआधी पानांच्या खाली आणि नवीन वाढीवर कीटक किंवा अंडी तपासा.|Control se pehle leaf undersides aur new growth par insects aur eggs inspect karein.
Upload a clear leaf photo and run a scan. I can then explain the AI result and weather context.|साफ पत्ती की फोटो अपलोड कर स्कैन करें। फिर आकलन और मौसम संदर्भ समझ सकते हैं।|स्वच्छ पानाचा फोटो अपलोड करून स्कॅन करा. मग मूल्यांकन आणि हवामान संदर्भ समजू शकतो.|Clear leaf photo upload karke scan karein. Phir result aur weather context explain hoga.
e.g. Vijay Kumar|जैसे विजय कुमार|उदा. विजय कुमार|Jaise Vijay Kumar
Your mobile or email|आपका मोबाइल या ईमेल|तुमचा मोबाइल किंवा ईमेल|Aapka mobile ya email
At least 4 characters|कम से कम 4 अक्षर|किमान 4 अक्षरे|Kam se kam 4 characters
e.g. Dindori, Maharashtra|जैसे दिंडोरी, महाराष्ट्र|उदा. दिंडोरी, महाराष्ट्र|Jaise Dindori, Maharashtra
Optional variety|किस्म (वैकल्पिक)|वाण (ऐच्छिक)|Optional variety
Optional|वैकल्पिक|ऐच्छिक|Optional
Search farmer, crop, disease…|किसान, फसल, रोग खोजें…|शेतकरी, पीक, रोग शोधा…|Farmer, crop, disease search karein…
Ask about your crop…|अपनी फसल के बारे में पूछें…|तुमच्या पिकाबद्दल विचारा…|Apni crop ke baare mein poochein…
Tomato / Wheat / Soybean…|टमाटर / गेहूँ / सोयाबीन…|टोमॅटो / गहू / सोयाबीन…|Tamatar / Gehoon / Soybean…
e.g. Tomato|जैसे टमाटर|उदा. टोमॅटो|Jaise Tamatar
e.g. 2.5 acres|जैसे 2.5 एकड़|उदा. 2.5 एकर|Jaise 2.5 acres
e.g. East plot|जैसे पूर्वी खेत|उदा. पूर्वेकडील शेत|Jaise East plot
e.g. Dindori, Nashik|जैसे दिंडोरी, नाशिक|उदा. दिंडोरी, नाशिक|Jaise Dindori, Nashik
e.g. Trap A / suspected moth|जैसे ट्रैप A / संदिग्ध पतंगा|उदा. सापळा A / संशयित पतंग|Jaise Trap A / suspected moth
Where are symptoms? Any recent input use? Describe the pattern.|लक्षण कहाँ हैं? हाल में कोई उत्पाद इस्तेमाल? पैटर्न बताएँ।|लक्षणे कुठे आहेत? अलीकडे काही वापरले? नमुना वर्णन करा.|Symptoms kahan hain? Recent input use? Pattern batayein.
Write a practical, farmer-friendly response…|किसान के लिए सरल व्यावहारिक जवाब लिखें…|शेतकऱ्यांसाठी सोपा व्यावहारिक प्रतिसाद लिहा…|Practical farmer-friendly response likhein…
`);
load(`
FIELDS|खेत|शेते|FIELDS
PLANS|योजनाएँ|योजना|PLANS
Due|अगली तारीख|नियोजित तारीख|Due
Overdue|देरी|उशीर|Overdue
sample symptomatic. This is an observation comparison, not treatment efficacy.|नमूने में लक्षण। यह अवलोकन तुलना है, उपचार प्रभाव का प्रमाण नहीं।|नमुन्यात लक्षणे. ही निरीक्षण तुलना आहे, उपचार परिणामाचा पुरावा नाही.|sample symptomatic. Yeh observation comparison hai, treatment efficacy nahi.
field need priority scouting|खेत को प्राथमिक जाँच चाहिए|शेताला प्राधान्य पाहणी हवी|field ko priority scouting chahiye
fields need priority scouting|खेतों को प्राथमिक जाँच चाहिए|शेतांना प्राधान्य पाहणी हवी|fields ko priority scouting chahiye
Follow-up:|अगली जाँच:|पुढील पाहणी:|Follow-up:
Calibrate crop-specific thresholds with agricultural experts; validate on independent local field images; integrate secure shared records, verified expert identity, consent and sensor ingestion. Measure time to expert response, missed cases and unnecessary interventions.|कृषि विशेषज्ञों से फसल-विशिष्ट नियम सत्यापित करें; स्वतंत्र स्थानीय फोटो पर जाँचें; सुरक्षित साझा रिकॉर्ड, सत्यापित पहचान, सहमति और सेंसर जोड़ें। प्रतिक्रिया समय, छूटे मामले और अनावश्यक कार्यवाही मापें।|कृषी तज्ञांकडून पीकनिहाय नियम पडताळा; स्वतंत्र स्थानिक फोटोंवर तपासा; सुरक्षित सामायिक नोंदी, सत्यापित ओळख, संमती आणि सेन्सर जोडा. प्रतिसाद वेळ, सुटलेली प्रकरणे आणि अनावश्यक उपाय मोजा.|Experts se crop thresholds calibrate karein, local images par validate karein, secure records aur verified identity jodein. Response time aur missed cases measure karein.
Your activity will appear here. Local records are editable by the device owner and are not a tamper-proof audit.|गतिविधि यहाँ दिखेगी। उपकरण मालिक स्थानीय रिकॉर्ड बदल सकता है; यह अपरिवर्तनीय ऑडिट नहीं है।|कृती येथे दिसेल. उपकरण मालक स्थानिक नोंदी बदलू शकतो; हे अपरिवर्तनीय लेखापरीक्षण नाही.|Activity yahan dikhegi. Device owner local records edit kar sakta hai; tamper-proof audit nahi hai.
Synthetic SIH scenario loaded. No real farm records.|काल्पनिक SIH उदाहरण लोड हुआ। वास्तविक खेत रिकॉर्ड नहीं।|काल्पनिक SIH उदाहरण लोड झाले. वास्तविक शेत नोंदी नाहीत.|Synthetic SIH scenario loaded. Real farm records nahi.
Observation saved for|अवलोकन सहेजा गया:|निरीक्षण जतन केले:|Observation saved for
Action plan|कार्य योजना|कृती योजना|Action plan
created for|बनाई गई:|तयार केली:|created for
Self-entered expert / lab review recorded for|स्वयं दर्ज विशेषज्ञ / लैब समीक्षा:|स्वतः नोंदवलेली तज्ञ / प्रयोगशाळा समीक्षा:|Self-entered expert / lab review for
closed with follow-up; recovery not independently verified.|अगली जाँच के साथ बंद; सुधार स्वतंत्र रूप से सत्यापित नहीं।|पुढील पाहणीसह बंद; सुधारणा स्वतंत्रपणे पडताळलेली नाही.|follow-up ke saath closed; recovery independently verified nahi.
Visit date updated for|जाँच तारीख अपडेट:|भेट तारीख अद्ययावत:|Visit date updated for
Photo assessment linked to|फोटो आकलन जुड़ा:|फोटो मूल्यांकन जोडले:|Photo assessment linked to
Local expert response linked to|स्थानीय विशेषज्ञ जवाब जुड़ा:|स्थानिक तज्ञ प्रतिसाद जोडला:|Local expert response linked to
Backup merged; existing records retained.|बैकअप जुड़ा; पुराने रिकॉर्ड रखे गए।|बॅकअप जोडला; जुन्या नोंदी ठेवल्या.|Backup merged; existing records retained.
Action closed with follow-up evidence.|अगली जाँच के प्रमाण के साथ कार्य बंद।|पुढील पाहणीच्या पुराव्यासह कृती बंद.|Action follow-up evidence ke saath closed.
Backup must be smaller than 8 MB.|बैकअप 8 MB से छोटा होना चाहिए।|बॅकअप 8 MB पेक्षा लहान हवा.|Backup 8 MB se chhota hona chahiye.
Invalid backup format.|गलत बैकअप प्रारूप।|अवैध बॅकअप स्वरूप.|Invalid backup format.
Backup is too large.|बैकअप बहुत बड़ा है।|बॅकअप खूप मोठा आहे.|Backup bahut bada hai.
Invalid observation in backup.|बैकअप में गलत अवलोकन।|बॅकअपमध्ये अवैध निरीक्षण.|Backup mein invalid observation.
Invalid action in backup.|बैकअप में गलत कार्य योजना।|बॅकअपमध्ये अवैध कृती.|Backup mein invalid action.
Invalid photo in backup.|बैकअप में गलत फोटो।|बॅकअपमध्ये अवैध फोटो.|Backup mein invalid photo.
Invalid scan in backup.|बैकअप में गलत स्कैन।|बॅकअपमध्ये अवैध स्कॅन.|Backup mein invalid scan.
Invalid activity in backup.|बैकअप में गलत गतिविधि।|बॅकअपमध्ये अवैध कृती नोंद.|Backup mein invalid activity.
Saved data could not be loaded.|सहेजा डेटा लोड नहीं हुआ।|जतन केलेला डेटा लोड झाला नाही.|Saved data load nahi hua.
Model confidence|मॉडल का भरोसा|मॉडेलचा विश्वास|Model confidence
MODEL CONFIDENCE|मॉडल का भरोसा|मॉडेलचा विश्वास|MODEL CONFIDENCE
`);
load(`
Language|भाषा|भाषा|Language
Scout affected areas today and request expert review. Record a follow-up within 24 hours.|आज प्रभावित हिस्से की जाँच करें और विशेषज्ञ समीक्षा लें। 24 घंटे में अगली जाँच दर्ज करें।|आज बाधित भागाची पाहणी करा आणि तज्ञ समीक्षा घ्या. 24 तासांत पुढील पाहणी नोंदवा.|Aaj affected areas scout karein, expert review lein aur 24 ghante mein follow-up record karein.
Inspect the same marked plants within 24 hours. Record symptoms and trap counts consistently.|24 घंटे में उन्हीं चिह्नित पौधों की जाँच करें। लक्षण और ट्रैप संख्या समान विधि से दर्ज करें।|24 तासांत त्याच चिन्हांकित रोपांची पाहणी करा. लक्षणे आणि सापळा संख्या सातत्याने नोंदवा.|24 ghante mein same marked plants check karein. Symptoms aur trap counts consistently record karein.
Continue regular scouting. A low priority score does not confirm that the crop is disease-free.|नियमित जाँच जारी रखें। कम प्राथमिकता से फसल रोग-मुक्त होने की पुष्टि नहीं होती।|नियमित पाहणी सुरू ठेवा. कमी प्राधान्य म्हणजे पीक रोगमुक्त असल्याची पुष्टी नाही.|Regular scouting jaari rakhein. Low priority crop disease-free hone ka proof nahi.
Create your farmer account|किसान खाता बनाएँ|शेतकरी खाते तयार करा|Farmer account banayein
Save scans, crops and expert cases to this browser.|स्कैन, फसल और विशेषज्ञ मामले इस ब्राउज़र में सहेजें।|स्कॅन, पिके आणि तज्ञ प्रकरणे या ब्राउझरमध्ये जतन करा.|Scans, crops aur expert cases browser mein save karein.
Password should be at least 4 characters.|पासवर्ड कम से कम 4 अक्षर का हो।|पासवर्ड किमान 4 अक्षरांचा हवा.|Password kam se kam 4 characters ka ho.
Account already exists. Please login.|खाता मौजूद है। लॉगिन करें।|खाते आधीच आहे. लॉगिन करा.|Account exists. Login karein.
Farmer account created.|किसान खाता बन गया।|शेतकरी खाते तयार झाले.|Farmer account created.
Invalid login details.|लॉगिन जानकारी गलत है।|लॉगिन माहिती चुकीची आहे.|Login details invalid hain.
Add your village/district in profile.|प्रोफाइल में गाँव / जिला जोड़ें।|प्रोफाइलमध्ये गाव / जिल्हा जोडा.|Profile mein village / district add karein.
Profile updated.|प्रोफाइल अपडेट हुआ।|प्रोफाइल अद्ययावत झाली.|Profile updated.
Image analysis loading|फोटो विश्लेषण लोड हो रहा है|फोटो विश्लेषण लोड होत आहे|Image analysis loading
Ready|तैयार|तयार|Ready
Crop check ready|फसल जाँच तैयार|पीक तपासणी तयार|Crop check ready
Setup needed|सेटअप जरूरी|सेटअप आवश्यक|Setup needed
Image analysis setup needed|फोटो विश्लेषण सेटअप जरूरी|फोटो विश्लेषण सेटअप आवश्यक|Image analysis setup needed
Image analysis model is not available. Please add the required model files.|फोटो मॉडल उपलब्ध नहीं है। जरूरी मॉडल फाइलें जोड़ें या बिना AI फोटो समीक्षा इस्तेमाल करें।|फोटो मॉडेल उपलब्ध नाही. आवश्यक मॉडेल फायली जोडा किंवा AI शिवाय फोटो समीक्षा वापरा.|Image model available nahi. Model files add karein ya photo review without AI use karein.
Please select an image.|फोटो चुनें।|फोटो निवडा.|Image select karein.
Analysing image…|फोटो का विश्लेषण हो रहा है…|फोटोचे विश्लेषण होत आहे…|Image analyse ho rahi hai…
image is too small|फोटो बहुत छोटी है|फोटो खूप लहान आहे|image bahut chhoti hai
lighting is low|रोशनी कम है|प्रकाश कमी आहे|lighting kam hai
image is overexposed|फोटो में बहुत रोशनी है|फोटो अतिप्रकाशित आहे|image overexposed hai
image may be blurry/plain|फोटो धुंधली या कम विवरण वाली है|फोटो अस्पष्ट किंवा कमी तपशीलाचा असू शकतो|image blurry ya plain ho sakti hai
Photo quality looks suitable for analysis.|फोटो गुणवत्ता विश्लेषण के योग्य लगती है।|फोटो गुणवत्ता विश्लेषणासाठी योग्य दिसते.|Photo quality analysis ke liye suitable lagti hai.
Retake in daylight with the affected area sharp.|दिन के उजाले में प्रभावित हिस्सा साफ दिखाते हुए दोबारा लें।|दिवसा बाधित भाग स्पष्ट दिसेल असा पुन्हा फोटो घ्या.|Daylight mein affected area sharp rakhkar retake karein.
Image analysis result ready. A second opinion may follow in the background.|फोटो आकलन तैयार है। वैकल्पिक दूसरी राय बाद में आ सकती है।|फोटो मूल्यांकन तयार आहे. ऐच्छिक दुसरे मत नंतर येऊ शकते.|Image result ready. Optional second opinion baad mein aa sakta hai.
Second opinion agrees with the local model.|दूसरी राय स्थानीय मॉडल से सहमत है।|दुसरे मत स्थानिक मॉडेलशी सहमत आहे.|Second opinion local model se agree karta hai.
Second opinion differs — expert review recommended.|दूसरी राय अलग है — विशेषज्ञ समीक्षा लें।|दुसरे मत वेगळे आहे — तज्ञ समीक्षा घ्या.|Second opinion alag hai — expert review lein.
Diagnosis failed.|आकलन नहीं हो सका।|मूल्यांकन झाले नाही.|Assessment failed.
Check trap count and soil moisture values.|ट्रैप संख्या और मिट्टी की नमी जाँचें।|सापळा संख्या आणि मातीचा ओलावा तपासा.|Trap count aur soil moisture check karein.
Image analysis|फोटो विश्लेषण|फोटो विश्लेषण|Image analysis
Image assessment|फोटो आकलन|फोटो मूल्यांकन|Image assessment
Review recommended|समीक्षा जरूरी|समीक्षा आवश्यक|Review recommended
Confidence gated|भरोसे के अनुसार समीक्षा|विश्वासानुसार समीक्षा|Confidence-based review
Agreement|सहमति|सहमती|Agreement
Local result|स्थानीय परिणाम|स्थानिक निकाल|Local result
The system is not confident enough to treat this as a confirmed diagnosis.|इसे पुष्ट निदान मानने के लिए सिस्टम पर्याप्त आश्वस्त नहीं है।|हे पुष्ट निदान मानण्यासाठी प्रणाली पुरेशी खात्रीशीर नाही.|System isse confirmed diagnosis maanne jitna confident nahi hai.
A visual crop-health pattern was found, but confidence is limited.|फसल का दृश्य पैटर्न मिला, लेकिन भरोसा सीमित है।|पिकाचा दृश्य नमुना आढळला, पण विश्वास मर्यादित आहे.|Visual crop pattern mila, confidence limited hai.
Capture another clear image and seek local expert confirmation.|एक और साफ फोटो लें और स्थानीय विशेषज्ञ से पुष्टि लें।|आणखी स्पष्ट फोटो घ्या आणि स्थानिक तज्ञांची पुष्टी घ्या.|Clear photo dobara lein aur local expert confirmation lein.
Remove/contain severely affected material where practical and improve field hygiene/airflow.|जहाँ उचित हो गंभीर प्रभावित सामग्री नियंत्रित करें और खेत की स्वच्छता / हवा सुधारें।|योग्य ठिकाणी गंभीर बाधित सामग्री नियंत्रित करा आणि शेत स्वच्छता / हवा सुधारवा.|Jahan practical ho severe affected material contain karein, hygiene aur airflow improve karein.
Review the image and farmer context before responding.|जवाब से पहले फोटो और किसान संदर्भ देखें।|प्रतिसादाआधी फोटो आणि शेतकरी संदर्भ पाहा.|Response se pehle image aur farmer context review karein.
Weather at scan:|स्कैन के समय मौसम:|स्कॅनच्या वेळी हवामान:|Scan ke waqt weather:
not available|उपलब्ध नहीं|उपलब्ध नाही|available nahi
Not available|उपलब्ध नहीं|उपलब्ध नाही|Available nahi
No GPS-tagged reports yet. Allow location and run a crop scan.|GPS वाले रिकॉर्ड नहीं हैं। स्थान अनुमति दें और फसल स्कैन करें।|GPS असलेल्या नोंदी नाहीत. स्थान परवानगी द्या आणि पीक स्कॅन करा.|GPS reports nahi. Location allow karke crop scan karein.
Current field|वर्तमान खेत|सध्याचे शेत|Current field
AI signal|AI संकेत|AI संकेत|AI signal
Risk signal|जोखिम संकेत|जोखीम संकेत|Risk signal
Live GPS|वर्तमान GPS|सद्य GPS|Live GPS
Location not set|स्थान तय नहीं|स्थान नोंदवलेले नाही|Location not set
Use weather as a scouting signal, not a diagnosis.|मौसम को जाँच का संकेत मानें, निदान नहीं।|हवामानाला पाहणीचा संकेत माना, निदान नाही.|Weather ko scouting signal maanein, diagnosis nahi.
Sirib Sirib Rakshak is thinking…|रक्षक जवाब तैयार कर रहा है…|रक्षक उत्तर तयार करत आहे…|Rakshak jawab taiyar kar raha hai…
Please analyse this crop image.|फसल की फोटो का आकलन करें।|पिकाच्या फोटोचे मूल्यांकन करा.|Crop photo analyse karein.
Rain signal|बारिश संकेत|पावसाचा संकेत|Rain signal
Scout leaves for fungal symptoms and keep foliage dry where practical.|फफूँद लक्षणों के लिए पत्ते जाँचें और जहाँ संभव हो सूखा रखें।|बुरशी लक्षणांसाठी पाने तपासा आणि शक्य असेल तेथे कोरडी ठेवा.|Fungal symptoms ke liye leaves scout karein aur practical ho to dry rakhein.
Avoid unnecessary overhead irrigation and re-check affected areas after rain.|अनावश्यक ऊपरी सिंचाई से बचें और बारिश के बाद दोबारा जाँचें।|अनावश्यक वरून सिंचन टाळा आणि पावसानंतर पुन्हा तपासा.|Extra overhead irrigation avoid karein aur rain ke baad recheck karein.
Healthy|स्वस्थ|निरोगी|Healthy
Apple Scab|सेब स्कैब|सफरचंद स्कॅब|Apple scab
Black Rot|काला सड़न|काळी कुज|Black rot
Cedar Apple Rust|सीडर सेब रतुआ|सीडर सफरचंद तांबेरा|Cedar apple rust
Powdery Mildew|चूर्णिल आसिता|भुरी रोग|Powdery mildew
Common Rust|सामान्य रतुआ|सामान्य तांबेरा|Common rust
Northern Leaf Blight|उत्तरी पत्ती झुलसा|उत्तरी पान करपा|Northern leaf blight
Grape Leaf Blight|अंगूर पत्ती झुलसा|द्राक्ष पान करपा|Grape leaf blight
Citrus Greening|सिट्रस ग्रीनिंग|सिट्रस ग्रीनिंग|Citrus greening
Bacterial Spot|जीवाणु धब्बा|जिवाणू ठिपके|Bacterial spot
Early Blight|अगेती झुलसा|लवकर करपा|Early blight
Late Blight|पछेती झुलसा|उशिरा करपा|Late blight
Leaf Scorch|पत्ती झुलसन|पान जळणे|Leaf scorch
Tomato Leaf Mold|टमाटर पत्ती फफूँद|टोमॅटो पान बुरशी|Tomato leaf mold
Septoria Leaf Spot|सेप्टोरिया पत्ती धब्बा|सेप्टोरिया पान ठिपके|Septoria leaf spot
Two-Spotted Spider Mites|दो धब्बे वाली मकड़ी माइट|दोन ठिपक्यांची कोळी कीड|Two-spotted spider mites
Target Spot|लक्ष्याकार धब्बा|लक्ष्याकार ठिपके|Target spot
Tomato Yellow Leaf Curl Virus|टमाटर पीला पत्ती मरोड़ विषाणु|टोमॅटो पिवळा पान वाकडा विषाणू|Tomato yellow leaf curl virus
Tomato Mosaic Virus|टमाटर मोज़ेक विषाणु|टोमॅटो मोझॅक विषाणू|Tomato mosaic virus
Unknown|अज्ञात|अज्ञात|Unknown
Uncertain|अनिश्चित|अनिश्चित|Uncertain
Pending|बाकी|प्रलंबित|Pending
Responded|जवाब दिया|प्रतिसाद दिला|Responded
confidence|भरोसा|विश्वास|confidence
risk|जोखिम|जोखीम|risk
humidity|नमी|आर्द्रता|humidity
rain|बारिश|पाऊस|rain
Rain|बारिश|पाऊस|Rain
feels|महसूस|जाणवते|feels
points.|अंक।|गुण.|points.
`);
load(`
Fungal lesions may appear olive or brown.|फफूँद के धब्बे जैतूनी या भूरे दिख सकते हैं।|बुरशीचे डाग ऑलिव्ह किंवा तपकिरी दिसू शकतात.|Fungal lesions olive ya brown dikh sakte hain.
Remove badly affected leaves, improve airflow and avoid prolonged leaf wetness.|बहुत प्रभावित पत्ते हटाएँ, हवा बढ़ाएँ और लंबे समय पत्ते गीले न रखें।|जास्त बाधित पाने काढा, हवा खेळती ठेवा आणि दीर्घ ओलावा टाळा.|Affected leaves hatayein, airflow improve karein aur long wetness avoid karein.
Dark lesions can occur on leaves and fruit.|पत्तों और फलों पर गहरे धब्बे हो सकते हैं।|पाने व फळांवर गडद डाग येऊ शकतात.|Leaves aur fruit par dark lesions ho sakte hain.
Remove infected material and maintain orchard sanitation.|संक्रमित सामग्री हटाएँ और बाग साफ रखें।|संक्रमित सामग्री काढा आणि बाग स्वच्छ ठेवा.|Infected material remove karein aur orchard clean rakhein.
Yellow-orange spots can occur on apple leaves.|सेब के पत्तों पर पीले-नारंगी धब्बे हो सकते हैं।|सफरचंदाच्या पानांवर पिवळे-नारिंगी ठिपके येऊ शकतात.|Apple leaves par yellow-orange spots ho sakte hain.
Remove infected material and maintain airflow.|संक्रमित सामग्री हटाएँ और हवा आने दें।|संक्रमित सामग्री काढा आणि हवा खेळती ठेवा.|Infected material hatayein aur airflow rakhein.
No major disease pattern was detected.|कोई प्रमुख रोग पैटर्न नहीं मिला।|प्रमुख रोग नमुना आढळला नाही.|Major disease pattern detect nahi hua.
Continue regular monitoring and balanced nutrition.|नियमित निगरानी और संतुलित पोषण जारी रखें।|नियमित निरीक्षण व संतुलित पोषण सुरू ठेवा.|Regular monitoring aur balanced nutrition jaari rakhein.
Continue regular monitoring.|नियमित निगरानी जारी रखें।|नियमित निरीक्षण सुरू ठेवा.|Regular monitoring jaari rakhein.
White powder-like fungal growth can cover leaves.|सफेद चूर्ण जैसी फफूँद पत्तों को ढक सकती है।|पांढरी भुकटीसारखी बुरशी पाने झाकू शकते.|White powder-like fungus leaves cover kar sakta hai.
Improve airflow and avoid prolonged humidity.|हवा आने दें और लंबी नमी से बचें।|हवा खेळती ठेवा आणि दीर्घ आर्द्रता टाळा.|Airflow improve karein aur prolonged humidity avoid karein.
Gray or brown lesions may develop on maize leaves.|मक्के के पत्तों पर धूसर या भूरे धब्बे हो सकते हैं।|मक्याच्या पानांवर करडे किंवा तपकिरी डाग येऊ शकतात.|Maize leaves par gray ya brown lesions ho sakte hain.
Remove heavily infected material and improve field sanitation.|अधिक संक्रमित सामग्री हटाएँ और खेत साफ रखें।|जास्त संक्रमित सामग्री काढा आणि शेत स्वच्छ ठेवा.|Heavily infected material hatayein aur field sanitation improve karein.
Reddish-brown rust pustules can occur on maize leaves.|मक्के के पत्तों पर लाल-भूरे रतुआ फफोले हो सकते हैं।|मक्याच्या पानांवर लालसर तपकिरी तांबेरा फोड येऊ शकतात.|Maize leaves par reddish-brown rust pustules ho sakte hain.
Monitor spread and maintain balanced crop nutrition.|फैलाव देखें और संतुलित फसल पोषण रखें।|प्रसार पाहा आणि संतुलित पीक पोषण ठेवा.|Spread monitor karein aur balanced nutrition rakhein.
Long gray-green or brown lesions can develop.|लंबे धूसर-हरे या भूरे धब्बे हो सकते हैं।|लांब करडे-हिरवे किंवा तपकिरी डाग येऊ शकतात.|Long gray-green ya brown lesions ho sakte hain.
Scout the field and improve sanitation.|खेत जाँचें और सफाई सुधारें।|शेत पाहणी करा आणि स्वच्छता सुधारवा.|Field scout karein aur sanitation improve karein.
Dark lesions can occur on grape leaves.|अंगूर के पत्तों पर गहरे धब्बे हो सकते हैं।|द्राक्षाच्या पानांवर गडद डाग येऊ शकतात.|Grape leaves par dark lesions ho sakte hain.
Remove infected material and improve canopy airflow.|संक्रमित सामग्री हटाएँ और पत्तियों के बीच हवा बढ़ाएँ।|संक्रमित सामग्री काढा आणि पर्णसंभारात हवा वाढवा.|Infected material hatayein aur canopy airflow improve karein.
A complex grapevine disease can affect leaves and fruit.|अंगूर का जटिल रोग पत्तों और फलों को प्रभावित कर सकता है।|द्राक्षवेलीचा गुंतागुंतीचा रोग पाने व फळांवर परिणाम करू शकतो.|Complex grapevine disease leaves aur fruit affect kar sakta hai.
Seek local expert confirmation.|स्थानीय विशेषज्ञ से पुष्टि लें।|स्थानिक तज्ञांची पुष्टी घ्या.|Local expert confirmation lein.
Leaf spots can reduce healthy leaf area.|पत्ती के धब्बे स्वस्थ क्षेत्र घटा सकते हैं।|पानांवरील ठिपके निरोगी क्षेत्र कमी करू शकतात.|Leaf spots healthy leaf area reduce kar sakte hain.
Improve airflow and remove severely affected leaves.|हवा बढ़ाएँ और गंभीर प्रभावित पत्ते हटाएँ।|हवा वाढवा आणि गंभीर बाधित पाने काढा.|Airflow improve karein aur severely affected leaves remove karein.
Uneven yellowing and reduced productivity can occur.|असमान पीलापन और कम उत्पादकता हो सकती है।|असमान पिवळेपणा व कमी उत्पादकता येऊ शकते.|Uneven yellowing aur reduced productivity ho sakti hai.
Seek local agricultural expert confirmation promptly.|शीघ्र स्थानीय कृषि विशेषज्ञ से पुष्टि लें।|लवकर स्थानिक कृषी तज्ञांची पुष्टी घ्या.|Jaldi local agriculture expert confirmation lein.
Small dark spots may develop on leaves and fruit.|पत्तों और फलों पर छोटे गहरे धब्बे हो सकते हैं।|पाने व फळांवर लहान गडद ठिपके येऊ शकतात.|Leaves aur fruit par small dark spots ho sakte hain.
Remove severely affected material and maintain sanitation.|गंभीर प्रभावित सामग्री हटाएँ और सफाई रखें।|गंभीर बाधित सामग्री काढा आणि स्वच्छता ठेवा.|Severely affected material hatayein aur sanitation rakhein.
Dark spots may appear on pepper leaves and fruit.|मिर्च के पत्तों और फलों पर गहरे धब्बे हो सकते हैं।|मिरचीच्या पाने व फळांवर गडद ठिपके दिसू शकतात.|Pepper leaves aur fruit par dark spots ho sakte hain.
Remove severely affected leaves and avoid unnecessary leaf wetness.|गंभीर प्रभावित पत्ते हटाएँ और अनावश्यक नमी से बचें।|गंभीर बाधित पाने काढा आणि अनावश्यक ओलावा टाळा.|Severe affected leaves remove karein aur extra wetness avoid karein.
Dark concentric lesions can develop on potato leaves.|आलू के पत्तों पर गहरे गोलाकार धब्बे हो सकते हैं।|बटाट्याच्या पानांवर गडद वर्तुळाकार डाग येऊ शकतात.|Potato leaves par dark concentric lesions ho sakte hain.
Remove affected foliage and improve sanitation.|प्रभावित पत्तियाँ हटाएँ और सफाई सुधारें।|बाधित पाने काढा आणि स्वच्छता सुधारवा.|Affected foliage remove karein aur sanitation improve karein.
Rapidly spreading dark lesions can occur under favorable conditions.|अनुकूल स्थिति में गहरे धब्बे तेजी से फैल सकते हैं।|अनुकूल परिस्थितीत गडद डाग वेगाने पसरू शकतात.|Favourable conditions mein dark lesions rapidly spread kar sakte hain.
Isolate affected plants and seek agricultural guidance quickly.|प्रभावित पौधे अलग करें और शीघ्र कृषि सलाह लें।|बाधित रोपे वेगळी करा आणि लवकर कृषी सल्ला घ्या.|Affected plants isolate karein aur jaldi agriculture guidance lein.
White powder-like fungal growth can cover leaf surfaces.|सफेद चूर्ण जैसी फफूँद पत्ती की सतह ढक सकती है।|पांढरी भुकटीसारखी बुरशी पानाचा पृष्ठभाग झाकू शकते.|White powder-like fungus leaf surface cover kar sakta hai.
Improve airflow and reduce prolonged leaf wetness.|हवा बढ़ाएँ और पत्तों की लंबी नमी घटाएँ।|हवा वाढवा आणि पानांचा दीर्घ ओलावा कमी करा.|Airflow improve karein aur prolonged leaf wetness reduce karein.
Leaf surfaces or margins may develop brown scorched areas.|पत्ती की सतह या किनारों पर भूरे झुलसे हिस्से हो सकते हैं।|पानांचा पृष्ठभाग किंवा कडांवर तपकिरी जळके भाग येऊ शकतात.|Leaf surface ya margins par brown scorched areas ho sakte hain.
Maintain proper irrigation and remove severely affected leaves.|उचित सिंचाई रखें और गंभीर प्रभावित पत्ते हटाएँ।|योग्य सिंचन करा आणि गंभीर बाधित पाने काढा.|Proper irrigation rakhein aur severe affected leaves remove karein.
Small dark lesions can develop on tomato leaves and fruit.|टमाटर के पत्तों और फलों पर छोटे गहरे धब्बे हो सकते हैं।|टोमॅटोच्या पाने व फळांवर लहान गडद डाग येऊ शकतात.|Tomato leaves aur fruit par small dark lesions ho sakte hain.
Remove heavily infected leaves and avoid unnecessary leaf wetness.|अधिक संक्रमित पत्ते हटाएँ और अनावश्यक नमी से बचें।|जास्त संक्रमित पाने काढा आणि अनावश्यक ओलावा टाळा.|Heavily infected leaves remove karein aur extra leaf wetness avoid karein.
Dark concentric-ring lesions can develop on tomato leaves.|टमाटर के पत्तों पर गहरे गोल छल्लेदार धब्बे हो सकते हैं।|टोमॅटोच्या पानांवर गडद वर्तुळाकार डाग येऊ शकतात.|Tomato leaves par dark ring-like lesions ho sakte hain.
Remove affected leaves, improve airflow and avoid prolonged leaf wetness.|प्रभावित पत्ते हटाएँ, हवा बढ़ाएँ और लंबी नमी से बचें।|बाधित पाने काढा, हवा वाढवा आणि दीर्घ ओलावा टाळा.|Affected leaves hatayein, airflow improve karein aur prolonged wetness avoid karein.
Dark water-soaked lesions can spread rapidly under cool, wet conditions.|ठंडी गीली स्थिति में गहरे पानी जैसे धब्बे तेजी से फैल सकते हैं।|थंड ओल्या परिस्थितीत गडद पाणथळ डाग वेगाने पसरू शकतात.|Cool wet conditions mein dark water-soaked lesions rapidly spread kar sakte hain.
Remove severely affected material and seek agricultural guidance quickly.|गंभीर प्रभावित सामग्री हटाएँ और शीघ्र कृषि सलाह लें।|गंभीर बाधित सामग्री काढा आणि लवकर कृषी सल्ला घ्या.|Severely affected material hatayein aur jaldi agriculture guidance lein.
Yellow areas and leaf-surface mold can occur under high humidity.|अधिक नमी में पीले हिस्से और पत्ती पर फफूँद हो सकती है।|जास्त आर्द्रतेत पिवळे भाग आणि पानावर बुरशी येऊ शकते.|High humidity mein yellow areas aur leaf mold ho sakta hai.
Improve ventilation and reduce prolonged humidity.|वेंटिलेशन बढ़ाएँ और लंबी नमी घटाएँ।|हवा खेळती ठेवा आणि दीर्घ आर्द्रता कमी करा.|Ventilation improve karein aur prolonged humidity reduce karein.
Small circular leaf spots can reduce healthy foliage.|छोटे गोल धब्बे स्वस्थ पत्तियाँ घटा सकते हैं।|लहान गोल ठिपके निरोगी पर्णसंभार कमी करू शकतात.|Small circular spots healthy foliage reduce kar sakte hain.
Remove infected leaves and improve airflow.|संक्रमित पत्ते हटाएँ और हवा बढ़ाएँ।|संक्रमित पाने काढा आणि हवा वाढवा.|Infected leaves hatayein aur airflow improve karein.
Mites can cause stippling, yellowing and reduced vigor.|माइट छोटे धब्बे, पीलापन और कमजोर वृद्धि कर सकते हैं।|कोळी कीड लहान ठिपके, पिवळेपणा आणि कमकुवत वाढ करू शकते.|Mites stippling, yellowing aur reduced vigour cause kar sakte hain.
Inspect leaf undersides and use integrated pest management.|पत्तों के नीचे जाँचें और एकीकृत कीट प्रबंधन अपनाएँ।|पानांच्या खाली तपासा आणि एकात्मिक कीड व्यवस्थापन वापरा.|Leaf undersides inspect karein aur IPM use karein.
Circular target-like lesions may develop on leaves.|पत्तों पर निशाने जैसे गोल धब्बे हो सकते हैं।|पानांवर लक्ष्याकार गोल डाग येऊ शकतात.|Leaves par target-like circular lesions ho sakte hain.
Remove severely infected foliage and improve airflow.|गंभीर संक्रमित पत्तियाँ हटाएँ और हवा बढ़ाएँ।|गंभीर संक्रमित पाने काढा आणि हवा वाढवा.|Severely infected foliage remove karein aur airflow improve karein.
Leaves may curl and yellow with reduced growth.|पत्ते मुड़ और पीले हो सकते हैं, वृद्धि कम हो सकती है।|पाने वाकडी व पिवळी होऊ शकतात आणि वाढ कमी होऊ शकते.|Leaves curl aur yellow ho sakti hain, growth reduce ho sakti hai.
Inspect for whitefly vectors and seek local guidance.|सफेद मक्खी वाहक जाँचें और स्थानीय सलाह लें।|पांढरी माशी वाहक तपासा आणि स्थानिक सल्ला घ्या.|Whitefly vectors inspect karein aur local guidance lein.
Mosaic patterns and abnormal leaf development may occur.|मोज़ेक पैटर्न और असामान्य पत्ती विकास हो सकता है।|मोझॅक नमुने आणि असामान्य पान विकास होऊ शकतो.|Mosaic patterns aur abnormal leaf development ho sakta hai.
Remove severely affected plants and maintain field hygiene.|गंभीर प्रभावित पौधे हटाएँ और खेत की स्वच्छता रखें।|गंभीर बाधित रोपे काढा आणि शेत स्वच्छता ठेवा.|Severely affected plants hatayein aur field hygiene maintain karein.
Map library could not load. Check internet connection and reload.|मानचित्र लोड नहीं हुआ। इंटरनेट जाँचकर दोबारा खोलें।|नकाशा लोड झाला नाही. इंटरनेट तपासून पुन्हा उघडा.|Map load nahi hua. Internet check karke reload karein.
`);
load(`
AI assessment unavailable. Save this photo for expert review using the button above.|AI आकलन उपलब्ध नहीं। ऊपर दिए बटन से विशेषज्ञ समीक्षा के लिए फोटो सहेजें।|AI मूल्यांकन उपलब्ध नाही. वरील बटणाने तज्ञ समीक्षेसाठी फोटो जतन करा.|AI assessment unavailable. Upar button se expert review ke liye photo save karein.
Image assessment saved. Request expert review.|फोटो आकलन सहेजा गया। विशेषज्ञ समीक्षा लें।|फोटो मूल्यांकन जतन केले. तज्ञ समीक्षा घ्या.|Image assessment saved. Expert review lein.
Expert review required|विशेषज्ञ समीक्षा जरूरी|तज्ञ समीक्षा आवश्यक|Expert review chahiye
API key required|API key जरूरी|API key आवश्यक|API key chahiye
`);
load(`
Models agree; expert confirmation still required.|दोनों मॉडल सहमत हैं; विशेषज्ञ पुष्टि जरूरी है।|दोन्ही मॉडेल सहमत आहेत; तज्ज्ञांची पुष्टी आवश्यक आहे.|Dono models agree karte hain; expert confirmation zaroori hai.
Models disagree; expert review required.|दोनों मॉडल असहमत हैं; विशेषज्ञ समीक्षा जरूरी है।|दोन्ही मॉडेल असहमत आहेत; तज्ज्ञांचा सल्ला आवश्यक आहे.|Dono models disagree karte hain; expert review zaroori hai.
ONNX unavailable; Kindwise result only.|ONNX उपलब्ध नहीं; केवल Kindwise परिणाम।|ONNX उपलब्ध नाही; फक्त Kindwise निकाल.|ONNX available nahi; sirf Kindwise result.
Kindwise unavailable; ONNX suggestion only. This is not a confirmed diagnosis.|Kindwise उपलब्ध नहीं; केवल ONNX का अनुमान है। यह पुष्ट निदान नहीं है।|Kindwise उपलब्ध नाही; फक्त ONNX चा अंदाज आहे. हे निश्चित निदान नाही.|Kindwise available nahi; sirf ONNX ka andaza hai. Diagnosis confirm nahi hai.
Record symptoms and request expert review before treatment.|लक्षण दर्ज करें और उपचार से पहले विशेषज्ञ समीक्षा लें।|लक्षणे नोंदवा आणि उपचारापूर्वी तज्ज्ञांचा सल्ला घ्या.|Symptoms note karein aur treatment se pehle expert review lein.
Service did not respond in time. Check your connection and retry.|समय पर उत्तर नहीं आया। कनेक्शन जाँचें और दोबारा कोशिश करें।|वेळेत उत्तर आले नाही. जोडणी तपासा आणि पुन्हा प्रयत्न करा.|Time par response nahi aaya. Connection check karke retry karein.
`);
load(`
This is not a leaf photo. Upload a clear photo of one real leaf.|यह पत्ती की फोटो नहीं है। एक असली पत्ती की साफ फोटो डालें।|हा पानाचा फोटो नाही. एका खऱ्या पानाचा स्पष्ट फोटो द्या.|This is not a leaf photo. Upload a clear photo of one real leaf.
Leaf not clear. Retake the photo in daylight.|पत्ती साफ नहीं दिख रही। दिन की रोशनी में दोबारा फोटो लें।|पान स्पष्ट दिसत नाही. दिवसाच्या प्रकाशात पुन्हा फोटो घ्या.|Leaf not clear. Retake the photo in daylight.
Leaf verification unavailable. No disease result issued.|पत्ती की जाँच उपलब्ध नहीं है। रोग का परिणाम नहीं दिया गया।|पानाची तपासणी उपलब्ध नाही. रोगाचा निष्कर्ष दिलेला नाही.|Leaf verification unavailable. No disease result issued.
Assessment unavailable. Please retry or request manual review.|आकलन उपलब्ध नहीं है। दोबारा कोशिश करें या विशेषज्ञ समीक्षा लें।|मूल्यांकन उपलब्ध नाही. पुन्हा प्रयत्न करा किंवा तज्ज्ञांचे परीक्षण घ्या.|Assessment unavailable. Please retry or request manual review.
Awaiting expert review|विशेषज्ञ समीक्षा बाकी|तज्ज्ञ परीक्षण बाकी|Awaiting expert review
Review pending cases before choosing a treatment.|उपचार चुनने से पहले बाकी मामलों की समीक्षा कराएँ।|उपचार निवडण्यापूर्वी प्रलंबित प्रकरणांचे परीक्षण करा.|Review pending cases before choosing a treatment.
Your next steps|आपके अगले कदम|तुमची पुढील पावले|Your next steps
Field observations|खेत के अवलोकन|शेत निरीक्षणे|Field observations
Overdue follow-ups|समय से बाकी अगली जाँच|विलंबित पुढील पाहणी|Overdue follow-ups
Reviewed cases|समीक्षित मामले|परीक्षण झालेली प्रकरणे|Reviewed cases
An expert review is pending. Open your case to add field details or download a referral.|विशेषज्ञ समीक्षा बाकी है। विवरण जोड़ने या रेफरल डाउनलोड करने के लिए मामला खोलें।|तज्ज्ञ परीक्षण बाकी आहे. तपशील जोडण्यासाठी किंवा संदर्भ अहवाल डाउनलोड करण्यासाठी प्रकरण उघडा.|An expert review is pending. Open your case to add field details or download a referral.
No pending reviews. Record new symptoms or revisit your marked plants.|कोई समीक्षा बाकी नहीं है। नए लक्षण दर्ज करें या चिन्हित पौधे दोबारा देखें।|प्रलंबित परीक्षण नाही. नवीन लक्षणे नोंदवा किंवा चिन्हांकित झाडे पुन्हा तपासा.|No pending reviews. Record new symptoms or revisit your marked plants.
Scan a leaf|पत्ती स्कैन करें|पान स्कॅन करा|Scan a leaf
Open expert records|विशेषज्ञ रिकॉर्ड खोलें|तज्ज्ञ नोंदी उघडा|Open expert records
This is a local review record. Download it to share with your expert; no message has been sent.|यह इस उपकरण का समीक्षा रिकॉर्ड है। विशेषज्ञ से साझा करने के लिए डाउनलोड करें; कोई संदेश नहीं भेजा गया है।|ही या उपकरणावरील परीक्षण नोंद आहे. तज्ज्ञांना देण्यासाठी डाउनलोड करा; कोणताही संदेश पाठवलेला नाही.|This is a local review record. Download it to share with your expert; no message has been sent.
No confirmed diagnosis.|कोई पुष्ट निदान नहीं है।|निश्चित निदान झालेले नाही.|No confirmed diagnosis.
Farmer observations|किसान के अवलोकन|शेतकऱ्याची निरीक्षणे|Farmer observations
Save review notes|समीक्षा टिप्पणियाँ सेव करें|परीक्षण टिपा जतन करा|Save review notes
Add the reviewer name and recommendation before marking reviewed.|समीक्षित करने से पहले समीक्षक का नाम और सलाह जोड़ें।|परीक्षण पूर्ण करण्यापूर्वी परीक्षकाचे नाव व सल्ला जोडा.|Add the reviewer name and recommendation before marking reviewed.
Review notes saved on this device.|समीक्षा टिप्पणियाँ इस उपकरण पर सेव हुईं।|परीक्षण टिपा या उपकरणावर जतन झाल्या.|Review notes saved on this device.
Start a review request|समीक्षा का अनुरोध शुरू करें|परीक्षण विनंती सुरू करा|Start a review request
Add a leaf photo and describe what changed. A report helps your expert review the case.|पत्ती की फोटो जोड़ें और बदलाव बताएँ। रिपोर्ट विशेषज्ञ को मामला समझने में मदद करती है।|पानाचा फोटो जोडा व बदल सांगा. अहवाल तज्ज्ञांना प्रकरण समजण्यास मदत करतो.|Add a leaf photo and describe what changed. A report helps your expert review the case.
Download detailed report|विस्तृत रिपोर्ट डाउनलोड करें|सविस्तर अहवाल डाउनलोड करा|Download detailed report
Download spreadsheet|स्प्रेडशीट डाउनलोड करें|स्प्रेडशीट डाउनलोड करा|Download spreadsheet
Generate PDF report|PDF रिपोर्ट तैयार करें|PDF अहवाल तयार करा|Generate PDF report
Download PDF report|PDF रिपोर्ट डाउनलोड करें|PDF अहवाल डाउनलोड करा|Download PDF report
Generating PDF report…|PDF रिपोर्ट तैयार हो रही है…|PDF अहवाल तयार होत आहे…|Generating PDF report...
Print or save as PDF|प्रिंट या PDF में सहेजें|प्रिंट किंवा PDF मध्ये जतन करा|Print ya PDF me save karein
Not recorded|दर्ज नहीं|नोंद नाही|Not recorded
Crop photo|फसल की फोटो|पिकाचा फोटो|Crop photo
`);
load(`
Prepare expert review|विशेषज्ञ समीक्षा तैयार करें|तज्ज्ञ परीक्षण तयार करा|Prepare expert review
Field records|खेत के रिकॉर्ड|शेताच्या नोंदी|Field records
Uncertain cases can be saved for expert review.|अनिश्चित मामले विशेषज्ञ समीक्षा के लिए सेव किए जा सकते हैं।|अनिश्चित प्रकरणे तज्ज्ञ परीक्षणासाठी जतन करता येतात.|Uncertain cases can be saved for expert review.
Leaf verification is required before disease assessment. Photo checks use secure server services.|रोग आकलन से पहले पत्ती की पुष्टि जरूरी है। फोटो की जाँच सुरक्षित सर्वर सेवाओं से होती है।|रोग मूल्यांकनापूर्वी पानाची खात्री आवश्यक आहे. फोटो तपासणी सुरक्षित सर्व्हर सेवांद्वारे होते.|Leaf verification is required before disease assessment. Photo checks use secure server services.
Add field|खेत जोड़ें|शेत जोडा|Add field
Add new field|नया खेत जोड़ें|नवीन शेत जोडा|Add new field
Save field & start monitoring|खेत सहेजें और निगरानी शुरू करें|शेत जतन करा आणि निरीक्षण सुरू करा|Save field & start monitoring
Remove field|खेत हटाएँ|शेत काढा|Remove field
Plot area / size|खेत का क्षेत्रफल / आकार|शेताचे क्षेत्रफळ / आकार|Plot area / size
Soil type|मिट्टी का प्रकार|मातीचा प्रकार|Soil type
Irrigation type|सिंचाई का प्रकार|सिंचनाचा प्रकार|Irrigation type
Initial notes|प्रारंभिक विवरण|सुरुवातीची नोंद|Initial notes
Link to an existing saved field|सहेजे गए खेत से जोड़ें|जतन केलेल्या शेताशी जोडा|Link to an existing saved field
Healthy|स्वस्थ|निरोगी|Healthy
Normal|सामान्य|सामान्य|Normal
Issue detected|लक्षण पाए गए|लक्षणे आढळली|Issue mila
API key required|एपीआई कुंजी आवश्यक|API की आवश्यक|API key chahiye
Ready for leaf scan|पत्ती स्कैन के लिए तैयार|पानाच्या स्कॅनसाठी तयार|Leaf scan ke liye ready
Voice Advisory|बोलकर पूछें|बोलून विचारा|Voice Advisory
Listening… speak now|सुन रहा हूँ… बोलिए|ऐकत आहे… आता बोला|Sun raha hoon… boliye
Voice recognition not supported|इस ब्राउज़र में वॉइस सपोर्ट नहीं है|या ब्राउझरमध्ये व्हॉइस सपोर्ट नाही|Voice support nahi mila
Tap to speak|बोलने के लिए दबाएँ|बोलण्यासाठी दाबा|Bolne ke liye dabayein
Stop listening|सुनना बंद करें|ऐकणे थांबवा|Stop listening
Market Price|बाज़ार भाव|बाजार भाव|Market Price
Mandi Bhav|मंडी भाव|बाजार भाव|Mandi Bhav
Live Mandi Rates|लाइव मंडी भाव|थेट बाजार भाव|Live Mandi Rates
Modal Price|औसत भाव|सरासरी भाव|Modal Price
Monitored Mandis|निगरानी वाली मंडियां|निरीक्षणातील बाजार|Monitored Mandis
Active Commodities|सक्रिय फसलें|सक्रिय पिके|Active Commodities
Top Mandi Gainer|शीर्ष बढ़त वाली फसल|सर्वाधिक तेजीचे पीक|Top Mandi Gainer
MSP Benchmark|MSP समर्थन मूल्य|हमीभाव संदर्भ|MSP Benchmark
Search Mandi or Crop|मंडी या फसल का नाम खोजें|बाजार किंवा पिकाचे नाव शोधा|Search Mandi or Crop
All States|सभी राज्य|सर्व राज्ये|All States
Farmer Income Calculator|किसान उपज आय गणक|शेतकरी उत्पन्न गणक|Farmer Income Calculator
Quantity|मात्रा|प्रमाण|Quantity
Mandi Rate|मंडी भाव|बाजार दर|Mandi Rate
Total Expected Income|कुल अनुमानित आय|एकूण अंदाजे उत्पन्न|Total Expected Income
Govt MSP Comparison|सरकारी MSP तुलना|शासकीय हमीभाव तुलना|Govt MSP Comparison
Loading live APMC Mandi rates…|लाइव मंडी भाव लोड हो रहे हैं…|थेट बाजार भाव लोड होत आहेत…|Loading live APMC Mandi rates…
No Mandi rates match your search|आपकी खोज से कोई मंडी भाव नहीं मिला|तुमच्या शोधानुसार कोणतेही बाजार भाव आढळले नाहीत|No Mandi rates match your search
Try selecting 'All Crops' or clearing the search box.|'सभी फसलें' चुनें या खोज बॉक्स साफ़ करें।|'सर्व पिके' निवडा किंवा शोध बॉक्स साफ करा.|Try selecting 'All Crops' or clearing the search box.
`);
let pattern;
function compile(){pattern=new RegExp(Object.keys(entries).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');}
compile();
function t(text,language=current){if(language==='en')return String(text);const s=String(text);if(entries[s]?.[language])return entries[s][language];return s.replace(pattern,(key,offset,whole)=>{const before=whole[offset-1]||'',after=whole[offset+key.length]||'';if(/[A-Za-z]/.test(key[0])&&/[A-Za-z]/.test(before)||/[A-Za-z]/.test(key.at(-1))&&/[A-Za-z]/.test(after))return key;return entries[key]?.[language]||key;});}
const originals=new WeakMap();let observer;
function apply(){if(typeof document==='undefined'||!document.body)return;observer?.disconnect();
 for(const option of document.querySelectorAll('option'))if(!option.hasAttribute('value'))option.setAttribute('value',option.textContent);
 const walker=document.createTreeWalker(document.body,4);let node;while(node=walker.nextNode()){const p=node.parentElement;if(!p||p.closest('script,style,textarea,[data-no-translate],.msg.user,select#lang,select#languageSelector,.case-meta'))continue;let saved=originals.get(node);if(!saved||node.textContent!==saved.output){saved={source:node.textContent};originals.set(node,saved);}saved.output=t(saved.source);if(node.textContent!==saved.output)node.textContent=saved.output;}
 for(const el of document.querySelectorAll('[placeholder],[title],[aria-label]')){let saved=originals.get(el);if(!saved){saved={};originals.set(el,saved);}for(const attr of ['placeholder','title','aria-label']){if(!el.hasAttribute(attr))continue;const value=el.getAttribute(attr);if(!saved[attr]||saved[attr].output!==value)saved[attr]={source:value};const item=saved[attr];item.output=t(item.source);if(value!==item.output)el.setAttribute(attr,item.output);}}
 document.documentElement.lang=current==='hinglish'?'hi-Latn':current;document.querySelectorAll('#lang,#languageSelector,#auth-language').forEach(el=>el.value=current);observer?.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});}
function setLanguage(language){if(!languages.includes(language))return;current=language;try{localStorage.setItem('krishiLanguage',language);localStorage.setItem('sentinel-language',language);}catch{}if(typeof document!=='undefined'){window.dispatchEvent(new CustomEvent('krishi-language',{detail:language}));apply();}}
const api={t,translate:apply,setLanguage,getLanguage:()=>current,languages,entries,add};root.KrishiI18n=api;if(typeof module!=='undefined')module.exports=api;
if(typeof document!=='undefined'){
 document.addEventListener('change',e=>{if(['lang','languageSelector','auth-language'].includes(e.target.id))setLanguage(e.target.value)});
 window.addEventListener('storage',e=>{if(e.key==='krishiLanguage'&&languages.includes(e.newValue)){current=e.newValue;window.dispatchEvent(new CustomEvent('krishi-language',{detail:current}));apply();}});
 const auth=document.querySelector('.auth-card');if(auth){const label=document.createElement('label');label.className='field';label.innerHTML='<span>Language</span><select id="auth-language" aria-label="Language"><option value="en">English</option><option value="hi">हिन्दी</option><option value="mr">मराठी</option></select>';auth.prepend(label);}
 let pending=false;observer=new MutationObserver(()=>{if(!pending){pending=true;queueMicrotask(()=>{pending=false;apply();});}});apply();
}
})(typeof window==='undefined'?globalThis:window);
