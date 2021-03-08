import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { KorisnikPom } from '../korisnikpom';
import { Preduzece } from '../preduzece';
import { Poljoprivrednik } from '../poljoprivrednik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service:ServisService,private router:Router) { }

  ngOnInit(): void {
    let pom=JSON.parse(localStorage.getItem("tip"));
    if(pom=="p" || pom=="k")this.router.navigate(["/log"]);
    this.username=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.username==null || this.username==""){
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip",JSON.stringify("a"));
    this.service.getAdmin().subscribe(data=>{this.kp=data;if(this.kp==null){this.kp=[]};});
    this.service.getAdmin2().subscribe(data=>{this.kp2=data;  if(this.kp2==null){this.kp2=[]};});
  }

  username: string;
  sifra: string;
  kp:KorisnikPom[]=[];
  kp2:KorisnikPom[]=[];
  
  tip:string="poljoprivrednik";
  preduzece: Preduzece = { Punoime: "", username: "", password1: "", password2: "", Datum: null, Mesto: "", email: "", };
  poljoprivrednik: Poljoprivrednik = { Ime: "", Prezime: "", username: "", password1: "", password2: "", Datum: null, Mesto: "", email: "", Telefon: "" };
  t:string;

 prebaci(kor:KorisnikPom){
  this.service.postPrihvacen(kor).subscribe();
  this.refresh();
 } 
 obrisi(kor:KorisnikPom){
  this.service.obrisiKor(kor);
  this.refresh();
 } 
 registruj() {
  let izabrani;

  if (this.tip == "preduzece") {
    izabrani = this.preduzece;
    this.t = "p";
    if (this.preduzece.Punoime == "" || this.preduzece.Punoime == null || this.preduzece.Punoime.length > 44 ||
      this.preduzece.username == "" || this.preduzece.username == null || this.preduzece.username.length > 44 ||
      this.preduzece.Mesto == "" || this.preduzece.Mesto == null || this.preduzece.Mesto.length > 44 ||
      this.preduzece.email == "" || this.preduzece.email == null || this.preduzece.email.length > 44 ||
      this.preduzece.password1 == "" || this.preduzece.password1 == null || this.preduzece.password1.length > 44 || this.preduzece.Datum == null) {
      alert("Morate uneti sva polja i nijedno od njih ne sme biti duze od 45 karaktera!"); return;
    }
  }
  else {
    izabrani = this.poljoprivrednik;
    this.t = "k";
    if (this.poljoprivrednik.Ime == "" || this.poljoprivrednik.Ime == null || this.poljoprivrednik.Ime.length > 44 ||
      this.poljoprivrednik.username == "" || this.poljoprivrednik.username == null || this.poljoprivrednik.username.length > 44 ||
      this.poljoprivrednik.Mesto == "" || this.poljoprivrednik.Mesto == null || this.poljoprivrednik.Mesto.length > 44 ||
      this.poljoprivrednik.email == "" || this.poljoprivrednik.email == null || this.poljoprivrednik.email.length > 44 ||
      this.poljoprivrednik.password1 == "" || this.poljoprivrednik.password1 == null || this.poljoprivrednik.password1.length > 44 ||
      this.poljoprivrednik.Prezime == "" || this.poljoprivrednik.Prezime == null || this.poljoprivrednik.Prezime.length > 44 ||
      this.poljoprivrednik.Telefon == "" || this.poljoprivrednik.Telefon == null || this.poljoprivrednik.Telefon.length > 44 || this.poljoprivrednik.Datum == null) {
      alert("Morate uneti sva polja i nijedno od njih ne sme biti duze od 45 karaktera!"); return;
    }
  }

   let prva=/.{7,}/;
   let druga=/[A-Z]+/;
   let treca=/[0-9]+/;
   let cetvrta=/\W+/;
   let peta=/^[A-Z]/;
   let sesta=/^[a-z]/;
   let mejl=/.+@.+\..+/;
    if(!mejl.test(izabrani.email)){
      alert("Mejl nije dobrog oblika!");
      return;
    }

   if (!(prva.test(izabrani.password1) && druga.test(izabrani.password1) && treca.test(izabrani.password1) && cetvrta.test(izabrani.password1) && (peta.test(izabrani.password1) || sesta.test(izabrani.password1)) && izabrani.password1 == izabrani.password2)) {
    alert("Unesite ponovo sifre!");
    return;
  }
   let ime="";
   if(this.t=="k"){
     ime=this.poljoprivrednik.username;
   }
   else ime=this.preduzece.username;
   this.service.getUsername(ime).subscribe(data=>{
     console.log(JSON.stringify(data));
    if(data.length==0){
      if(this.t=="k"){
        this.service.postKorPolj(izabrani); }
        else {this.service.postKorPred(izabrani);}
        alert("Success!");
    }else alert("Korisnicko ime je vec zauzeto!");
   })    
this.refresh();
}
refresh(){
  this.service.getAdmin().subscribe(data=>{this.kp=data;if(this.kp==null){this.kp=[]};});
  this.service.getAdmin2().subscribe(data=>{this.kp2=data; if(this.kp2==null){this.kp2=[]};});
}
navigacija:number=0;
promenisifru(){
  this.navigacija=1;
}
glavni(){
    this.navigacija=0;
}
starasif:string;
novasif:string;
opetsif:string;
passchange(){
  let prva=/.{7,}/;
  let druga=/[A-Z]+/;
  let treca=/[0-9]+/;
  let cetvrta=/\W+/;
  let peta=/^[A-Z]/;
  let sesta=/^[a-z]/;
if(this.starasif==this.novasif){
  alert("Stara i nova sifra ne mogu biti iste!");
  return;
}
 if( !(prva.test(this.novasif) && druga.test(this.novasif) && treca.test(this.novasif) && cetvrta.test(this.novasif) && (peta.test(this.novasif) || sesta.test(this.novasif)) && this.novasif==this.opetsif)){
    alert("Unesite ponovo sifre!");
   return;
  }
  this.service.checkPassword(this.starasif,this.username).subscribe(data=>{
    if(data.length==0){
      alert("Pogresna sifra!");return;
    }
    else{
      this.service.changePassword(this.novasif,this.username);
      alert("Success");
      this.router.navigate(["/log"]);
    }
  });

}
}
