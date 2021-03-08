import { Component, OnInit } from '@angular/core';
import { ServisService } from '../servis.service';
import { Koordinate } from '../koordinate';
import { Router } from '@angular/router';
import { Proizvod } from '../proizvod';
import { Kurir } from '../kuriri';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private service: ServisService, private router: Router) { }
  username: string;
  proizvodi: Proizvod[] = [];
  proizvodio: Proizvod[] = [];
  pom: Proizvod[] = [];
  kuriri: Kurir[] = [];
  ngOnInit(): void {
    let pom = JSON.parse(localStorage.getItem("tip"));
    if (pom == "k" || pom == "a") this.router.navigate(["/log"]);
    this.username = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.username == null || this.username == "") {
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip", JSON.stringify("p"));
    this.service.dohvatiNarudzbine(this.username).subscribe(data => {
    this.proizvodi = data; this.proizvodio = data;
      this.filter();
    });
    this.service.dohvatiKurire(this.username).subscribe(data => { this.kuriri = data; });
  }
  koordinata: Koordinate = { k1: 0, k2: 0 };
  koordinata2: Koordinate = { k1: 0, k2: 0 };
  mesto: string = "Beograd";
  mesto2: string = "Kraljevo"
  izabrano: string = "Ne sortiraj";
  pozovi() {
    let testt = /"coordinates":\[\d+.\d+,\d+.\d+\]/;
    this.service.getLocation(this.mesto).subscribe(data => {
      if (testt.test(JSON.stringify(data)) == true){
      let pom = JSON.stringify(data).match(testt)[0];
      pom="{"+pom+"}";
      let pokusaj=JSON.parse(pom);
      console.log(pokusaj.coordinates[0]+" "+pokusaj.coordinates[1]);
      this.koordinata.k1 = pokusaj.coordinates[0];
      this.koordinata.k2 = pokusaj.coordinates[1];
      this.pozovi2();}
      else {alert("Mesto na kome se nalazi preduzece je nepostojece! Kontaktirajte administratora za promenu!");this.dugmici=true;this.kuriri.push(this.izbacenikurir);}
    });
  }
  pozovi2() {
    let testt = /"coordinates":\[\d+.\d+,\d+.\d+\]/;
    this.service.getLocation(this.mesto2).subscribe(data => {
      if (testt.test(JSON.stringify(data)) == true){
      let pom = JSON.stringify(data).match(testt)[0];
      pom="{"+pom+"}";
      let pokusaj=JSON.parse(pom);
      console.log(pokusaj.coordinates[0]+" "+pokusaj.coordinates[1]);
      this.koordinata2.k1 = pokusaj.coordinates[0];
      this.koordinata2.k2 = pokusaj.coordinates[1];
      this.vreme();}
      else {alert("Mesto na kome se nalazi rasadnik je nepostojece!");this.dugmici=true; this.kuriri.push(this.izbacenikurir);}
    });
  }
  broj: number = 0;
  idposlatog: number = 0;
  porudzbina: number = 0;
  brojposlatog: number = 0;
  vreme() {
    let testt = /"travelDuration":\d+.\d+/;
    this.service.getTime(this.koordinata.k1, this.koordinata.k2, this.koordinata2.k1, this.koordinata2.k2).subscribe(data => {
      if (testt.test(JSON.stringify(data)) == true) {
        let pom = JSON.stringify(data).match(testt)[0];
        pom="{"+pom+"}";
        let pokusaj=JSON.parse(pom);
        console.log(pokusaj.travelDuration+"min");
        this.broj =pokusaj.travelDuration;
        if(this.broj==0){this.broj=20;}
        this.service.posaljiKurira(this.idposlatog, this.broj, this.porudzbina);
        let x = [];
        this.proizvodi.forEach((element, index) => {
          if (element.ocena == this.proizvodi[this.brojposlatog].ocena) {
            x.push(index);
          }
        });
        x.forEach((element, index) => {
          this.proizvodi.splice(element - index, 1);
        }); this.proizvodio = this.proizvodi; alert("Kuriru do rasadnika treba " + this.broj + " min, a duplo vise dok ponovo ne bude spreman...");
      } else { alert("Rasadnik se nalazi na nama nepoznatom mestu, narudzbina ne moze biti ispunjena!");this.kuriri.push(this.izbacenikurir); }
    });
    this.dugmici=true;
  }
  navigacija: number = 0;
  promenisifru() {
    this.navigacija = 1;
  }
  glavni() {
    this.navigacija = 0;
  }
  starasif: string;
  novasif: string;
  opetsif: string;
  passchange() {
    let prva = /.{7,}/;
    let druga = /[A-Z]+/;
    let treca = /[0-9]+/;
    let cetvrta = /\W+/;
    let peta = /^[A-Z]/;
    let sesta=/^[a-z]/;
    if (this.starasif == this.novasif) {
      alert("Stara i nova sifra ne mogu biti iste!");
      return;
    }
    if (!(prva.test(this.novasif) && druga.test(this.novasif) && treca.test(this.novasif) && cetvrta.test(this.novasif) && (peta.test(this.novasif) || sesta.test(this.novasif)) && this.novasif == this.opetsif)) {
      alert("Unesite ponovo sifre!");
      return;
    }
    this.service.checkPassword(this.starasif, this.username).subscribe(data => {
      if (data.length == 0) {
        alert("Pogresna sifra!"); return;
      }
      else {
        this.service.changePassword(this.novasif, this.username);
        alert("Success");
        this.router.navigate(["/log"]);
      }
    });

  }
  ponisti(i: number) {
    this.service.ponisti(this.proizvodi[i]);
    let x = [];
    this.proizvodi.forEach((element, index) => {
      if (element.ocena == this.proizvodi[i].ocena) {
        x.push(index);
      }
    });
    x.forEach((element, index) => {
      this.proizvodi.splice(element - index, 1);
    });
    this.proizvodio = this.proizvodi;
  }
  dugmici=true;
  izbacenikurir:Kurir;
  potvrdi(i: number) {this.dugmici=false;
     if (this.kuriri.length == 0) {
      if(this.proizvodi[i].cena==-1){alert("Vec je dodat u specijalne porudzbine!");this.dugmici=true;return;}
      this.proizvodio.forEach(element => {
        if(element.ocena==this.proizvodi[i].ocena){
          this.service.naCekanju(element.idproizvodi);
        }
      });
      this.proizvodio.forEach(element => {
        if(element.ocena==this.proizvodi[i].ocena){element.cena=-1;this.proizvodi[i].cena=-1;}
      }); 
      this.filter();
      this.dugmici=true;
    }
    else {
      let k = this.kuriri.pop();
      this.izbacenikurir=k;
      this.brojposlatog = i;
      this.porudzbina = this.proizvodi[i].ocena;
      this.idposlatog = k.id;
      this.service.dohvatiLokacije(this.proizvodi[i].ocena, this.username).subscribe(data => {
        this.mesto = data[0].mesto;
        if(data.length==2){
        this.mesto2 = data[1].mesto;
        this.pozovi();}
        else{
          this.mesto2=data[0].mesto;
          this.broj=20;
          this.service.posaljiKurira(this.idposlatog, this.broj, this.porudzbina);
        let x = [];
        this.proizvodi.forEach((element, index) => {
          if (element.ocena == this.proizvodi[this.brojposlatog].ocena) {
            x.push(index);
          }
        });
        x.forEach((element, index) => {
          this.proizvodi.splice(element - index, 1);
        }); 
        this.proizvodio = this.proizvodi;
         alert("Kuriru do rasadnika treba " + this.broj + " min, a duplo vise dok ponovo ne bude spreman...");
         this.dugmici=true;
        }
      })
    }
  }

  filter() {
  this.proizvodi = this.proizvodio;
    if (this.izabrano == "Ne sortiraj") { }
    else {
      this.pom = [];
      this.proizvodio.forEach(element => {
        this.pom.push(element);
      });
      if (this.izabrano == "Rastuce") {
        this.pom.sort(function (a, b) {
          let x = new Date(a.datum);
          let y = new Date(b.datum);
          if (x >= y) return 1;
          else return -1;
        });
      }
      else {
        this.pom.sort(function (a, b) {
          let x = new Date(a.datum);
          let y = new Date(b.datum);
          if (x <= y) return 1;
          else return -1;
        });
      }
      this.proizvodi = this.pom;
    }
    ////////////////
    this.pom = []; let broj = 0;
    this.proizvodi.forEach((element, index) => {
      if (element.ocena != null && element.cena < 0) {
        let x: Proizvod = {
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
          cena: element.cena,
          datum: element.datum,
        }
        this.pom.push(x);
      }
    });
    this.proizvodi.forEach((element, index) => {
      if (element.ocena == null || element.cena >= 0) {
        let x: Proizvod = {
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
          cena: element.cena,
          datum: element.datum,
        }
        this.pom.push(x);
      }
    });
    this.proizvodi = this.pom;
    //////////////////
  }
}
