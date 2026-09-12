(function(root){
'use strict';
function assess(o,previous,now=Date.now()){
 const reasons=[];let score=0;
 if(o.affected/o.sampled>=.2){score+=35;reasons.push('At least 20% of sampled plants show symptoms (+35).');}
 else if(o.affected>0){score+=15;reasons.push('Symptoms reported in the sample (+15).');}
 if(previous&&o.affected/o.sampled>previous.affected/previous.sampled+.05){score+=25;reasons.push('Observed symptom share increased by over 5 percentage points (+25).');}
 if(o.trap!==null&&previous?.trap!==null&&previous?.trap!==undefined&&previous.trap>0&&o.pest===previous.pest&&o.trapHours===previous.trapHours&&o.trap>=previous.trap*1.5){score+=20;reasons.push('Same-pest catch rose ≥50% at the same trap and interval (+20).');}
 if(o.wet==='yes'){score+=10;reasons.push('Prolonged leaf wetness reported (+10).');}
 if(o.spread==='yes'){score+=25;reasons.push('Farmer reports rapid spread (+25).');}
 const stale=now-o.at>72*3600000;
 if(stale)reasons.push('Observation is older than 72 hours; collect a fresh sample.');
 const level=score>=50?'High':score>=20?'Watch':'Routine';
 return{score:Math.min(100,score),level,stale,reasons:reasons.length?reasons:['No configured escalation trigger. Continue scouting.'],incidence:Math.round(o.affected/o.sampled*100)};
}
function validate(o){if(!o.field?.trim()||!o.village?.trim())return 'Enter a field name and village.';if(!Number.isInteger(o.sampled)||o.sampled<1||o.sampled>10000)return 'Sample size must be a whole number from 1 to 10,000.';if(!Number.isInteger(o.affected)||o.affected<0||o.affected>o.sampled)return 'Affected plants must be between zero and sample size.';if(o.trap!==null&&(!Number.isInteger(o.trap)||o.trap<0||o.trap>100000))return 'Trap count must be a non-negative whole number.';return '';}
function latest(records){return [...records].sort((a,b)=>b.at-a.at).filter((r,i,a)=>a.findIndex(x=>x.fieldId===r.fieldId)===i)}
function previous(records,o){return records.filter(r=>r.fieldId===o.fieldId&&r.at<o.at).sort((a,b)=>b.at-a.at)[0]}
function csv(rows){return rows.map(row=>row.map(value=>{let s=String(value??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}).join(',')).join('\r\n')}
const api={assess,validate,latest,previous,csv};if(typeof module!=='undefined')module.exports=api;root.Sentinel=api;
})(typeof window==='undefined'?globalThis:window);
