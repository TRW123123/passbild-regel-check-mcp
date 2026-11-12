import type {zwecke} from './schema';
export type Zweck=typeof zwecke[number];
export type Erlaubt='ja'|'nein'|'bedingt';
export const STAND='2026-11-12';
export const scope='Gibt nur hinterlegte, datierte Regeln für Deutschland wieder. Prüft kein Foto, ruft keine Website ab, scrapt nichts, speichert nichts und ist keine Rechtsberatung. Maßgeblich ist die zuständige Behörde.';
export type Quelle={titel:string;url:string;datum:string;live_geprueft_am:string};
const q=(titel:string,url:string,datum:string):Quelle=>({titel,url,datum,live_geprueft_am:STAND});
export const Q={
 bundesdruckerei:q('Bundesdruckerei: Aufnahmesysteme für biometrische Lichtbilder (PointID), Übergangsregelung bis 31.07.2025','https://www.bundesdruckerei.de/de/newsroom/news/aktuelles-pointid-aufnahmesysteme-fuer-biometrische-lichtbilder-bereit','2025-04'),
 bdrFaq:q('Bundesdruckerei: FAQ Digitales Lichtbild (Liste der Dokumente mit Pflicht zum digitalen Lichtbild), Stand 22.10.2024, Version 1.7','https://daten.verwaltungsportal.de/dateien/news/1/0/3/9/0/5/1/FAQ_Digitales_Lichtbild.pdf','2024-10-22'),
 ueberlingen:q('Stadt Überlingen: Digitale Lichtbilder ab 1. Mai 2025','https://www.ueberlingen.de/digitale-lichtbilder-ab-1-mai-2025','2025-04-14'),
 koeln:q('Stadt Köln: Digitale Lichtbilder sind ab dem 1. Mai 2025 gesetzlich verpflichtend','https://www.stadt-koeln.de/politik-und-verwaltung/presse/mitteilungen/27532/index.html','2025-04-29'),
 rbb24:q('rbb24: Digitale Passbilder ersetzen ab Mai Passfotos aus Papier','https://www.rbb24.de/panorama/beitrag/2025/04/passbilder-digital-behoerden-berlin-brandenburg.html','2025-04-22'),
 tagesschau:q('tagesschau.de: Neue Regeln ab 1. Mai: Foto für Ausweis muss digital vorliegen','https://www.tagesschau.de/inland/innenpolitik/personalausweis-reisepass-passbild-fotos-digital-buergeramt-faeser-100.html','2025-04-22'),
 diploBangkok:q('Deutsche Botschaft Bangkok (Auswärtiges Amt): Allgemeine Antragsvoraussetzungen Schengen-Visum (Beispiel einer Auslandsvertretung)','https://bangkok.diplo.de/th-de/service/05-visa-und-einreise/2754314-2754314','2026-01-30'),
 alfo:q('Suche nach registrierten Fotografen für digitale Lichtbilder (von Köln, Überlingen und rbb24 genannt)','https://alfo-passbild.com/fotograf-in-der-naehe/','laufend')
};
export const WICHTIGE_UNTERSCHEIDUNG='Personalausweis und Reisepass (sowie u. a. elektronischer Aufenthaltstitel und Reiseausweise): seit 01.05.2025 nur digitale Lichtbilder, aufgenommen in der Behörde (z. B. PointID der Bundesdruckerei, 6 € je Lichtbild) oder von einem registrierten Fotodienstleister, der das Bild verschlüsselt per Cloud an die Behörde übermittelt. Selbstgemachte Fotos, Bilder aus Fotokabinen und Passfotos aus Foto-Apps sind dafür nicht mehr erlaubt. Papierfotos waren nur in Ausnahmefällen bis 31.07.2025 übergangsweise möglich. Führerschein: nicht betroffen, Lichtbilder in Papierform weiterhin möglich.';
export const KEIN_AMTLICHES_PASSBILD='Ein selbst erstelltes, bearbeitetes oder KI-generiertes Porträt (auch aus Profil- oder Bewerbungsfoto-Diensten) ist kein amtliches Passbild und kann für Personalausweis und Reisepass nicht verwendet werden.';
export interface Regel {zweck:Zweck;bezeichnung:string;selbstfoto_erlaubt:Erlaubt;begruendung:string;was_zu_tun_ist:string[];geltungsdatum:string;quellen:Quelle[]}
const ausweisPass=(zweck:'ausweis'|'reisepass',bezeichnung:string):Regel=>({zweck,bezeichnung,selbstfoto_erlaubt:'nein',
 begruendung:`Seit 01.05.2025 werden für den ${bezeichnung} nur noch digitale Lichtbilder akzeptiert (Gesetz zur Stärkung der Sicherheit im Pass-, Ausweis- und ausländerrechtlichen Dokumentenwesen vom 03.12.2020). Selbstgemachte Fotos, Bilder aus Fotokabinen und Passfotos aus Foto-Apps sind nicht mehr erlaubt (Stadt Überlingen; Stadt Köln: keine selbst erstellten digitalen Fotos aus Foto-Apps). Die Übergangsregelung für Papierlichtbilder in Ausnahmefällen lief bis 31.07.2025.`,
 was_zu_tun_ist:['Lichtbild direkt in der Pass- und Ausweisbehörde aufnehmen lassen, wenn sie ein Aufnahmesystem hat (Gebühr 6 € je Lichtbild bei Aufnahme in der Behörde).','Oder zu einem registrierten Fotodienstleister gehen, der das Bild verschlüsselt an die Behörde übermittelt (meist per QR-Code); Suche z. B. über alfo-passbild.com.','Vorab auf der Website der eigenen Behörde prüfen, ob dort vor Ort fotografiert wird.'],
 geltungsdatum:'2025-05-01',quellen:[Q.bundesdruckerei,Q.ueberlingen,Q.koeln,Q.rbb24,Q.bdrFaq,Q.alfo]});
export const regeln:Record<Zweck,Regel>={
 ausweis:ausweisPass('ausweis','Personalausweis'),
 reisepass:ausweisPass('reisepass','Reisepass'),
 fuehrerschein:{zweck:'fuehrerschein',bezeichnung:'Führerschein',selbstfoto_erlaubt:'bedingt',
  begruendung:'Der Führerschein gehört nicht zu den Dokumenten mit Pflicht zum digitalen Lichtbild (Bundesdruckerei-FAQ). Lichtbilder in Papierform bleiben möglich (Stadt Überlingen: für Führerscheinanträge weiterhin Papierform erforderlich; rbb24; tagesschau.de: für den Führerschein ändert sich nichts). Ob ein selbst gemachtes Papierfoto angenommen wird, hängt davon ab, ob es die Lichtbild-Anforderungen der Fahrerlaubnisbehörde erfüllt; dazu liegt hier keine eigene amtliche Quelle vor.',
  was_zu_tun_ist:['Bei der zuständigen Fahrerlaubnisbehörde nachsehen, welche Form (Papier oder digital) und welche Fotoanforderungen sie verlangt.','Im Zweifel ein biometrisches Passbild von einem Fotodienstleister mitbringen.'],
  geltungsdatum:'2025-05-01 (keine Änderung für den Führerschein)',quellen:[Q.ueberlingen,Q.rbb24,Q.tagesschau,Q.bdrFaq]},
 bewerbung:{zweck:'bewerbung',bezeichnung:'Bewerbung',selbstfoto_erlaubt:'ja',
  begruendung:'Für Bewerbungsfotos gilt die Pflicht zum digitalen Lichtbild nicht; sie betrifft nur die vom BMI genannten Ausweisdokumente (Bundesdruckerei-FAQ). rbb24 nennt Bewerbungen ausdrücklich als Zweck, für den Passbilder aus Papier weiter verwendet werden können. Eine amtliche Fotovorgabe für Bewerbungen ist in den geprüften Quellen nicht genannt.',
  was_zu_tun_ist:['Ein eigenes oder professionell erstelltes Foto ist möglich; es gibt keine amtliche Stelle, die es annehmen muss.','Für Personalausweis oder Reisepass ist ein solches Foto nicht verwendbar.'],
  geltungsdatum:'keine amtliche Regelung (Stand 2026-11-12)',quellen:[Q.bdrFaq,Q.rbb24]},
 visum:{zweck:'visum',bezeichnung:'Visum (Antrag bei einer deutschen Auslandsvertretung)',selbstfoto_erlaubt:'bedingt',
  begruendung:'Visa stehen nicht auf der Liste der Dokumente mit Pflicht zum digitalen Lichtbild (Bundesdruckerei-FAQ). Die Auslandsvertretungen verlangen biometriefähige Passfotos; Beispiel Deutsche Botschaft Bangkok (30.01.2026): 45 × 35 mm, nicht älter als 6 Monate, Gesichtshöhe 70–80 %, keine nachträgliche Bearbeitung (kein Photoshop/Filter); sonst wird der Antrag unbearbeitet zurückgegeben. Ein generelles Verbot selbst gemachter Fotos ist in den geprüften Quellen nicht genannt; die Anforderungen legt die jeweilige Vertretung fest.',
  was_zu_tun_ist:['Die Fotoanforderungen auf der Website der zuständigen deutschen Auslandsvertretung prüfen (sie unterscheiden sich, z. B. Fotopapier oder Hintergrundfarbe).','Ein unbearbeitetes, aktuelles biometrisches Foto verwenden; Filter oder KI-Bearbeitung führen zur Rückgabe.','Bei Visa anderer Schengen-Staaten gelten deren Vertretungen.'],
  geltungsdatum:'abhängig von der Auslandsvertretung (Beispiel Bangkok: Stand 30.01.2026)',quellen:[Q.diploBangkok,Q.bdrFaq]}
};
export function checkPassbildRegeln(input:{zweck:Zweck;land?:string}){
 const land=(input.land??'DE').toUpperCase();
 if(land!=='DE')throw Error(`Land ${land} wird in v0.1 nicht unterstützt: nur DE (Deutschland). Für andere Länder die Regeln der zuständigen Behörde prüfen.`);
 const r=regeln[input.zweck];
 if(!r)throw Error('Unbekannter Zweck. Erlaubt: ausweis, reisepass, fuehrerschein, bewerbung, visum.');
 return {zweck:r.zweck,bezeichnung:r.bezeichnung,land,selbstfoto_erlaubt:r.selbstfoto_erlaubt,begruendung:r.begruendung,was_zu_tun_ist:[...r.was_zu_tun_ist],geltungsdatum:r.geltungsdatum,wichtige_unterscheidung:WICHTIGE_UNTERSCHEIDUNG,kein_amtliches_passbild:KEIN_AMTLICHES_PASSBILD,quellen:r.quellen.map(x=>({...x})),stand:STAND,hinweis:'Keine Rechtsberatung. Regeln können sich ändern; maßgeblich ist die zuständige Behörde.',scope};
}
export function getPassbildRegeln(){
 return {land:'DE',stand:STAND,regeln:Object.values(regeln).map(r=>({zweck:r.zweck,bezeichnung:r.bezeichnung,selbstfoto_erlaubt:r.selbstfoto_erlaubt,begruendung:r.begruendung,was_zu_tun_ist:[...r.was_zu_tun_ist],geltungsdatum:r.geltungsdatum,quellen:r.quellen.map(x=>x.url)})),wichtige_unterscheidung:WICHTIGE_UNTERSCHEIDUNG,kein_amtliches_passbild:KEIN_AMTLICHES_PASSBILD,quellen:Object.values(Q).map(x=>({...x})),hinweis:'Statische, datierte Regel-Tabelle. Keine Rechtsberatung; maßgeblich ist die zuständige Behörde.',scope};
}
