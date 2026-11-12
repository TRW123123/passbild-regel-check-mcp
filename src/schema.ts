export type Schema={type?:string;description?:string;examples?:unknown[];properties?:Record<string,Schema>;items?:Schema;required?:string[];additionalProperties?:boolean;enum?:readonly unknown[];maxLength?:number;minLength?:number;minimum?:number;exclusiveMinimum?:number;maximum?:number;maxItems?:number;pattern?:string;default?:unknown};
// Kopie der Validierung aus car-listing-check, ergänzt um exclusiveMinimum und deutsche Fehlermeldungen.
export function validate(value:unknown,s:Schema,path='arguments'):void{
 if(s.type==='object'){
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error(`${path} muss ein Objekt sein.`);
  const v=value as Record<string,unknown>;
  for(const k of s.required??[])if(!(k in v))throw Error(`${path}.${k} fehlt (Pflichtfeld).`);
  for(const [k,x] of Object.entries(v)){const child=s.properties&&Object.hasOwn(s.properties,k)?s.properties[k]:undefined;if(!child){if(s.additionalProperties===false)throw Error(`${path}: unbekanntes Feld ${k}.`);}else validate(x,child,`${path}.${k}`);}
 }else if(s.type==='string'){
  if(typeof value!=='string'||!value.trim()||Array.from(value).length>(s.maxLength??Infinity)||(s.pattern&&!new RegExp(s.pattern).test(value)))throw Error(`${path} muss ein nicht leerer Text sein (höchstens ${s.maxLength} Zeichen).`);
 }else if(s.type==='number'||s.type==='integer'){
  const lower=s.exclusiveMinimum!==undefined?`größer als ${s.exclusiveMinimum}`:`mindestens ${s.minimum}`;
  if(typeof value!=='number'||!Number.isFinite(value)||value<(s.minimum??-Infinity)||(s.exclusiveMinimum!==undefined&&value<=s.exclusiveMinimum)||value>(s.maximum??Infinity)||(s.type==='integer'&&!Number.isInteger(value)))throw Error(`${path} muss eine ${s.type==='integer'?'ganze Zahl':'Zahl'} sein, ${lower} und höchstens ${s.maximum}.`);
 }
 if(s.enum&&!s.enum.includes(value))throw Error(`${path} muss einer dieser Werte sein: ${s.enum.join(', ')}.`);
}
export const zwecke=['ausweis','reisepass','fuehrerschein','bewerbung','visum'] as const;
export const checkInput:Schema={type:'object',additionalProperties:false,required:['zweck'],properties:{
 zweck:{type:'string',description:'Wofür das Foto gebraucht wird: ausweis (Personalausweis), reisepass, fuehrerschein, bewerbung oder visum (Visumantrag bei einer deutschen Auslandsvertretung).',examples:['ausweis'],enum:zwecke,minLength:1,maxLength:20},
 land:{type:'string',description:'Land der Regeln als ISO-Code. In v0.1 nur DE (Deutschland). Vorgabe DE.',examples:['DE'],minLength:2,maxLength:2,pattern:'^[A-Za-z]{2}$',default:'DE'}
}};
export const regelnInput:Schema={type:'object',additionalProperties:false,properties:{}};
