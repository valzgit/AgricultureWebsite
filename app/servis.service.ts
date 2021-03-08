import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KorisnikPom } from './korisnikpom';
import { Poljoprivrednik } from './poljoprivrednik';
import { Koordinate } from './koordinate';
import { Preduzece } from './preduzece';
import { Rasadnik } from './rasadnik';
import { Sadnica } from './sadnica';
import { Polj } from './polj';
import { Pred } from './pred';
import { Proizvod } from './proizvod';
import { Generator } from './generator';
import { Komentari } from './komentari';
import { Kurir } from './kuriri';
import { Mesto } from './mesto';
import { Datumi } from './datumi';
import { Dozvole } from './dozvole';

@Injectable({
  providedIn: 'root'
})
export class ServisService {

  constructor(private http: HttpClient) { }

  koordinata: Koordinate = { k1: 0, k2: 0 };

  getKor(u: string, s: string) {
    let k={username:u,password:s};
    return this.http.post<KorisnikPom[]>(`http://localhost:3000/get`,k);
  }
  postKorPolj(polj: Poljoprivrednik){
    this.http.post('http://localhost:3000/insertpoljoprivrednik', polj).subscribe();
  }
  postKorPred(pred: Preduzece){
    this.http.post('http://localhost:3000/insertpreduzece',pred).subscribe();
  }
  getSadnice(id:number){
    return this.http.get<Sadnica[]>(`http://localhost:3000/get/sadnica/dohvati/${id}`);
  }
  getAdmin() {
    return this.http.get<KorisnikPom[]>(`http://localhost:3000/get/admin`);
  }
  getAdmin2() {
    return this.http.get<KorisnikPom[]>(`http://localhost:3000/get/admin2`);
  }
  getUsername(u: string) {
    let k={u:u};
    return this.http.post<KorisnikPom[]>(`http://localhost:3000/getusername`,u);
  }
  checkPassword(pass: string, user: string) {
    let k={p:pass,u:user};
    return this.http.post<string>(`http://localhost:3000/get/sifra`,k);
  }
  changePassword(pass: string, user: string) {
    let k={p:pass,u:user};
    return this.http.post(`http://localhost:3000/insert/sifra`,k).subscribe();
  }
  postPrihvacen(kor: KorisnikPom) {
    let k={u:kor.username,s:kor.password,t:kor.type};
    return this.http.post(`http://localhost:3000/insertprihvacen`,k);
  }

  postObrisan(kor: KorisnikPom) {
    let k={u:kor.username,s:kor.password,t:kor.type};
    return this.http.post(`http://localhost:3000/insertobrisan`,k);
  }
  obrisiKor(kor: KorisnikPom) {
    this.http.get(`http://localhost:3000/delete/user/${kor.username}`).subscribe();
  }
 
  dodajRasadnik(username: string, naziv: string, mesto: string, povrsina: number,duz:number,sir:number) {
    this.http.get(`http://localhost:3000/dodajrasadnik/${username}/${naziv}/${mesto}/${JSON.stringify(povrsina)}/${duz}/${sir}`).subscribe();
  }
  dohvatiRasadnike(username: string) {
    let k={ime:username};
    return this.http.post<Rasadnik[]>(`http://localhost:3000/get/rasadnikdohvati/opet`,k);
  }
  //key:string="ApR2Bzoer9XWK1SrqC_3nt7ve9DxP2qC0gs-h7Ba8qP4gH1TJTonV3MsrBTouc2l";
  key:string="Ahy9tK5-GRaXp6VTZQ2b0c1_ACwSkL42MtYUm5Qn_T2XhqNN3L3EZj1Z0o9QsvVA";
  //BING DISTANCE API
  getTime(k1: number, k2: number, k3: number, k4: number) {
   
    return this.http.get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${JSON.stringify(k1)},${JSON.stringify(k2)}&destinations=${JSON.stringify(k3)},${JSON.stringify(k4)}&travelMode=driving&startTime=2017-06-15T13:00:00-07:00&key=${this.key}`);
  }
  getLocation(mesto: string) {
    return this.http.get(`http://dev.virtualearth.net/REST/v1/Locations?locality=${mesto}&maxResults=1&key=${this.key}`);
  }
  //MEJL
  posaljimejl(id:number){alert("Mejl je poslat!");
      this.http.get(`http://localhost:3000/posaljimejl/${id}`).subscribe();
  }
  ///AZURIRANJE ADMIN
  dohvatiPolj(u:number){
    return this.http.get<Polj>(`http://localhost:3000/get/dohvatiPolj/dodatno/r/${u}`);
  }
  dohvatiPred(u:number){
   return this.http.get<Pred>(`http://localhost:3000/get/dohvatiPred/dodatno/r/${u}`);
  }
  azurirajPolj(id:number,Ime:string,Prezime:string,Datum:string,Mesto:string,Telefon:string,email:string){
    let k={id:id,Ime:Ime,Prezime:Prezime,Datum:Datum,Mesto:Mesto,Telefon:Telefon,email:email};
   this.http.post(`http://localhost:3000/insertazurirajPolj`,k).subscribe();
  }
  azurirajPred(p:Pred){
    let k={idp:p.idp,ime:p.ime,datum:p.datum,mesto:p.mesto,email:p.email};
    this.http.post(`http://localhost:3000/ins`,k).subscribe();
  }
  povecajtemp(id:number){this.http.get(`http://localhost:3000/dodajtemp/${id}`).subscribe();}
  smanjitemp(id:number){this.http.get(`http://localhost:3000/smanjitemp/${id}`).subscribe();}
  povecajvodu(id:number){this.http.get(`http://localhost:3000/dodajvodu/${id}`).subscribe();}
  smanjivodu(id:number){this.http.get(`http://localhost:3000/smanjivodu/${id}`).subscribe();}
  dohvatiMagacin(id:number){
    return this.http.get<Proizvod[]>(`http://localhost:3000/dohvatimagacin/${id}`);
  }
  dohvatiMagacin1(id:number){
    return this.http.get<string[]>(`http://localhost:3000/dohvatimagacinnaziv/${id}`);
  }
  dohvatiMagacin2(id:number){
    return this.http.get<string[]>(`http://localhost:3000/dohvatimagacinproizvodjac/${id}`);
  }
  zasadiSeme(ids:number,idr:number,idp:number){
    this.http.get(`http://localhost:3000/zasadiseme/${ids}/${idr}/${idp}`).subscribe();
  }
  izvadi(ids:number){
    this.http.get(`http://localhost:3000/izvadi/${ids}`).subscribe();
  }
  iskoristiProizvod(ids:number,idr:number,idp:number){
    this.http.get(`http://localhost:3000/iskoristiproizvod/${ids}/${idr}/${idp}`).subscribe();
  }
  dohvatiShop(id:number){
    return this.http.get<Proizvod[]>(`http://localhost:3000/dohvatishop/${id}`);
  }
  dohvatiShop1(id:number){
    return this.http.get<string[]>(`http://localhost:3000/dohvatishopnaziv/${id}`);
  }
  dohvatiShop2(id:number){
    return this.http.get<string[]>(`http://localhost:3000/dohvatishopproizvodjac/${id}`);
  }
  naruci(){
   return this.http.get<Generator[]>("http://localhost:3000/generator");
  }
  ponisti(p:Proizvod){
    this.http.get(`http://localhost:3000/ponisti/${p.ocena}`).subscribe();
  }
  uzmikomentare(p:Proizvod){
    return this.http.get<Komentari[]>(`http://localhost:3000/uzmikomentare/${p.idproizvodi}`);
  }
  uzmikomentare2(p:number){
    return this.http.get<Komentari[]>(`http://localhost:3000/uzmikomentare/${p}`);
  }
  uzmiproizvode(ime:string){
    let k={i:ime};
  return this.http.post<Proizvod[]>(`http://localhost:3000/proizvodeuzmi`,k);
  }
  povuciproizvod(id:number){
    this.http.get(`http://localhost:3000/povuciproizvod/${id}`).subscribe();
  }
  dodajproizvod(ime:string,naziv:string,vrsta:string,cena:number,kol:number,dani:number){
    let k={u:ime,n:naziv,v:vrsta,c:cena,k:kol,d:dani}
    this.http.post(`http://localhost:3000/dodajproizvod`,k).subscribe();
  }
  dohvatiNarudzbine(ime:string){
    let k={i:ime};
    return this.http.post<Proizvod[]>(`http://localhost:3000/dohvatinarudzbine`,k);
  }
  dohvatiKurire(ime:string){
    let k={i:ime};
    return this.http.post<Kurir[]>(`http://localhost:3000/dohvatikurire`,k);
  }
  posaljiKurira(id:number,vreme:number,por:number){
    this.http.get(`http://localhost:3000/posaljikurira/${id}/${vreme}/${por}`).subscribe();
  }
  dohvatiLokacije(id:number,ime:string){
    let k={id:id,naziv:ime};
    return this.http.post<Mesto[]>(`http://localhost:3000/dohvatilokacije`,k);
  }
  naCekanju(id:number){
    this.http.get(`http://localhost:3000/nacekanju/${id}`).subscribe();
  }
  dohvDatume(ime:string){
    let k={i:ime};
    return this.http.post<Datumi[]>(`http://localhost:3000/datumi`,k);
  }
  oznaciDatum(idproiz:number){
    this.http.get(`http://localhost:3000/oznacidatum/${idproiz}`).subscribe();
  }
  uzmidozvole(id:number,username:string){
    let k={idproizvodi:id,username:username};
    return this.http.post<Dozvole[]>(`http://localhost:3000/uzmidozvole`,k);
  }
  comment(c:string,o:number,username:string,idproizvodi:number){
    let k={c:c,o:o,username:username,idpro:idproizvodi};
    this.http.post(`http://localhost:3000/comment`,k).subscribe();
  }
  proveridalvecima(username:string,naziv:string){
    let k={u:username,n:naziv};
   return this.http.post<string[]>(`http://localhost:3000/proveridalvecima`,k);
  }
}


