import {loadEnvFile} from 'node:process';
import {fileURLToPath} from 'node:url';
export function loadEnvironment(file=new URL('./.env',import.meta.url)){
 try{loadEnvFile(file instanceof URL?fileURLToPath(file):file);}catch(error){if(error.code!=='ENOENT')throw new Error('Could not read the server .env file. Check its format and permissions.');}
}
export function configuration(env=process.env){
 const present=value=>typeof value==='string'&&value.trim().length>0&&!/^(your[_ -]|replace[_ -]|paste[_ -]|example)/i.test(value.trim());
 return {chat:present(env.GEMINI_API_KEY),cropHealth:present(env.KINDWISE_API_KEY),port:Number(env.PORT||3000),host:env.HOST||(env.PORT?'0.0.0.0':'127.0.0.1')};
}
