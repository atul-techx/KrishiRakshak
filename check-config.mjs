import {loadEnvironment,configuration} from './runtime-config.mjs';
loadEnvironment();const c=configuration();
console.log('Google Gemini server key: '+(c.chat?'configured':'MISSING — add GEMINI_API_KEY to .env or host environment'));
console.log('Kindwise crop.health key: '+(c.cropHealth?'configured':'MISSING — add KINDWISE_API_KEY to .env or host environment'));
console.log('Configuration check only; key validity, account credits and live API responses are not tested.');
if(!c.chat||!c.cropHealth)process.exitCode=1;
