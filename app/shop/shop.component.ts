import { Component, OnInit, Inject } from '@angular/core';
import { Rasadnik } from '../rasadnik';
import { Proizvod } from '../proizvod';
import { Sadnica } from '../sadnica';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Komentari } from '../komentari';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private router: Router, private service: ServisService, private http: HttpClient) { }
  username: string;
  rasadnik: Rasadnik;
  proizvodi: Proizvod[] = [];
  proizvodistalni: Proizvod[] = [];
  pom: Proizvod[] = [];
  nazivi: string[] = [];
  proizvodjaci: string[] = [];
  korpa: Proizvod[] = [];
  prosledjenasadnica: Sadnica;
  ubrzaj: string;
  detalji=false;
  komentari:Komentari[]=[];
  ngOnInit(): void {
    let pom = JSON.parse(localStorage.getItem("tip"));
    if (pom == "p" || pom == "a") this.router.navigate(["/log"]);
    this.username = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.username == null || this.username == "") {
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip", JSON.stringify("k"));
    if (JSON.parse(localStorage.getItem("rasadnik")) == null || JSON.parse(localStorage.getItem("rasadnik")) == "")
      this.router.navigate(["/poljoprivrednik"]);
    this.rasadnik = JSON.parse(localStorage.getItem("rasadnik"));
    localStorage.setItem("rasadnik", JSON.stringify(""));
    this.service.dohvatiShop(this.rasadnik.id).subscribe(data => { this.proizvodi = data; this.proizvodistalni = data; });
    this.service.dohvatiShop1(this.rasadnik.id).subscribe(data => { this.nazivi = data; });
    this.service.dohvatiShop2(this.rasadnik.id).subscribe(data => { this.proizvodjaci = data; });
  }
  izabrano: string = "Ne sortiraj";
  naziv: string;
  proizvodjac: string;
  kolicina: string = "Opadajuce";
  filter() {
    this.proizvodi = this.proizvodistalni;
    if (this.izabrano == "Ne sortiraj") { return; }
    else if (this.izabrano == "Naziv") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        let pomm: Proizvod = {
          idproizvodi: element.idproizvodi,
          idvlasnika: element.idvlasnika,
          naziv: element.naziv,
          kol: element.kol,
          proizvodjac: element.proizvodjac,
          vrsta: element.vrsta,
          idrasadnika: element.idrasadnika,
          ime: element.ime,
          dani: element.dani,
          brojocena: element.brojocena,
          ocena: element.ocena,
          cena:element.cena,
          datum:element.datum
        }
        if (element.naziv == this.naziv) this.pom.push(pomm);
      });
      this.proizvodi = this.pom;
    }
    else if (this.izabrano == "Proizvodjac") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        let pomm: Proizvod = {
          idproizvodi: element.idproizvodi,
          idvlasnika: element.idvlasnika,
          naziv: element.naziv,
          kol: element.kol,
          proizvodjac: element.proizvodjac,
          vrsta: element.vrsta,
          idrasadnika: element.idrasadnika,
          ime: element.ime,
          dani: element.dani,
          brojocena: element.brojocena,
          ocena: element.ocena,
          cena:element.cena,
          datum:element.datum
        }
        if (element.ime == this.proizvodjac) this.pom.push(pomm);
      });
      this.proizvodi = this.pom;
    }
    else if (this.izabrano == "Kolicina") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        let pomm: Proizvod = {
          idproizvodi: element.idproizvodi,
          idvlasnika: element.idvlasnika,
          naziv: element.naziv,
          kol: element.kol,
          proizvodjac: element.proizvodjac,
          vrsta: element.vrsta,
          idrasadnika: element.idrasadnika,
          ime: element.ime,
          dani: element.dani,
          brojocena: element.brojocena,
          ocena: element.ocena,
          cena:element.cena,
          datum:element.datum
        }
        this.pom.push(pomm);
      });
      if (this.kolicina == "Rastuce") {
        this.pom.sort(function (a, b) {
          return a.kol - b.kol;
        });
      }
      else {
        this.pom.sort(function (a, b) {
          return b.kol - a.kol;
        });
      }
      this.proizvodi = this.pom;
    }
  }
  ukorpu(p: Proizvod) {
    let x = false;
    this.korpa.forEach((element, index) => {
      if (element.idproizvodi == p.idproizvodi) {
        p.kol--; element.kol++; x = true;
        if (this.proizvodi == this.pom) {
          this.proizvodistalni.forEach(el => {
            if (el.idproizvodi == p.idproizvodi) {
              el.kol--;
            }
          });
        }
      }
    });
    if (x == false) {
      let pom: Proizvod = {
        idproizvodi: p.idproizvodi,
        idvlasnika: p.idvlasnika,
        naziv: p.naziv,
        kol: 1,
        proizvodjac: p.proizvodjac,
        vrsta: p.vrsta,
        idrasadnika: p.idrasadnika,
        ime: p.ime,
        dani: p.dani,
        brojocena: p.brojocena,
        ocena: p.ocena,
        cena:p.cena,
        datum:p.datum
      }
      this.korpa.push(pom); p.kol--;
      if (this.proizvodi == this.pom) {
        this.proizvodistalni.forEach(el => {
          if (el.idproizvodi == p.idproizvodi) {
            el.kol--;
          }
        });
      }
    }
  }
  smanji(p: Proizvod) {
    p.kol--;
    this.proizvodi.forEach(element => {
      if (element.idproizvodi == p.idproizvodi) {
        element.kol++;
      }
    });
    if (this.proizvodi == this.pom) {
      this.proizvodistalni.forEach(el => {
        if (el.idproizvodi == p.idproizvodi) {
          el.kol++;
        }
      });
    }
    if (p.kol == 0) this.izbaci(p);
  }
  izbaci(p: Proizvod) {
    this.proizvodi.forEach(element => {
      if (element.idproizvodi == p.idproizvodi) {
        element.kol += p.kol;
      }
    });
    if (this.proizvodi == this.pom) {
      this.proizvodistalni.forEach(el => {
        if (el.idproizvodi == p.idproizvodi) {
          el.kol += p.kol;
        }
      });
    }
    this.korpa.forEach((element, index) => {
      if (element.idproizvodi == p.idproizvodi) {
        this.korpa.splice(index, 1); return;
      }
    });
  }
  korpepreduzeca:Proizvod[][]=[];
  gotovakupovina:boolean=false;
  kupi() {this.gotovakupovina=true;
    if (this.korpa.length != 0) {
      let pom:number[]=[]
      this.korpa.forEach(element => {
        if(pom.length==0){pom.push(element.proizvodjac);}
        else{
          let x=false;
          pom.forEach(e => {
            if(e==element.proizvodjac){x=true;}
          });
          if(x==false){pom.push(element.proizvodjac);}
        }
      });
      pom.forEach(element => {
        this.service.oznaciDatum(element);
        let x = this.service.naruci();
        x.subscribe(data => {
          this.korpa.forEach(e => {if(e.proizvodjac==element){//ovaj zahtev treba da bude post ukoliko su nazivi cudnovati
            this.http.get("http://localhost:3000/naruci/" + e.idproizvodi + "/" + this.rasadnik.idv + "/" + e.naziv + "/" + e.kol + "/" + e.proizvodjac + "/" + e.vrsta + "/" + this.rasadnik.id + "/" + e.dani + "/" + data[0].id).subscribe();}
          });
        })
      });
 
    }
    alert("Uspeh!");
  }
proizvod:number=0;
info(i:number){this.ostavikomentar=false;
  this.detalji=true;
  this.proizvod=this.proizvodi[i].idproizvodi;
  this.service.uzmikomentare(this.proizvodi[i]).subscribe(data=>{this.komentari=data;});
  this.service.uzmidozvole(this.proizvodi[i].idproizvodi,this.username).subscribe(data=>{console.log("USAO");
    if(data.length!=0 && data[0].komentarisao==0)this.dozvoljenkomentar=true;else this.dozvoljenkomentar=false; })
}
dozvoljenkomentar:boolean=false;
ostavikomentar:boolean=false;
komentarisi(){
this.ostavikomentar=true;
}
comment:string;
hocena:number=5;
posaljikomentar(){
  //if(this.hocena==null || this.comment==""){alert("Niste komentarisali!");return;}
this.detalji=false;this.ostavikomentar=false;
let poredbenielement:Proizvod;
this.proizvodi.forEach(element => {
  if(element.idproizvodi==this.proizvod){poredbenielement=element;
    element.brojocena++;
    if(element.brojocena-1==0)element.ocena=this.hocena;
    else {
      element.ocena=((element.brojocena-1)*element.ocena+this.hocena)/element.brojocena;
    }
  }
});
this.proizvodistalni.forEach(element => {
  if(element.idproizvodi==this.proizvod){
    if(poredbenielement.brojocena==element.brojocena){}
    else {
      element.brojocena++;
    if(element.brojocena-1==0)element.ocena=this.hocena;
    else {
      element.ocena=((element.brojocena-1)*element.ocena+this.hocena)/element.brojocena;
    }
    }
  }
});
this.service.comment(this.comment,this.hocena,this.username,this.proizvod);
}
}
