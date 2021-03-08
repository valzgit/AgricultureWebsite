import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rasadnik } from '../rasadnik';
import { ServisService } from '../servis.service';
import { Proizvod } from '../proizvod';
import { Sadnica } from '../sadnica';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.css']
})
export class MagacinComponent implements OnInit {

  constructor(private router: Router, private service: ServisService) { }
  username: string;
  rasadnik: Rasadnik;
  proizvodi: Proizvod[] = [];
  proizvodistalni: Proizvod[] = [];
  pom: Proizvod[] = [];
  nazivi: string[] = [];
  proizvodjaci: string[] = [];
  prosledjenasadnica:Sadnica;
  ubrzaj:string;
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
    this.ubrzaj=localStorage.getItem("ubrzaj");
    if(this.ubrzaj=="")this.ubrzaj=null;
    localStorage.setItem("ubrzaj",'');
    this.service.dohvatiMagacin(this.rasadnik.id).subscribe(data => { this.proizvodi = data; this.proizvodistalni = data; });
    this.service.dohvatiMagacin1(this.rasadnik.id).subscribe(data => { this.nazivi = data; });
    this.service.dohvatiMagacin2(this.rasadnik.id).subscribe(data => { this.proizvodjaci = data; });
    this.prosledjenasadnica=JSON.parse(localStorage.getItem("sadnica"));
    if(JSON.stringify(this.prosledjenasadnica)==`""`)this.prosledjenasadnica=null;
  }
  izabrano: string = "Ne sortiraj";
  naziv: string;
  proizvodjac: string;
  kolicina: string="Opadajuce";
  ukucanitekst:string="";
  filter() {this.proizvodi = this.proizvodistalni;
    if (this.izabrano == "Ne sortiraj") {return; }
    else if (this.izabrano == "Naziv") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        if (element.naziv == this.naziv) this.pom.push(element);
      });
      this.proizvodi = this.pom;
    }
    else if (this.izabrano == "Proizvodjac") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        if (element.ime == this.proizvodjac) this.pom.push(element);
      });
      this.proizvodi = this.pom;
    }
    else if (this.izabrano == "Kolicina") {
      this.pom = [];
      this.proizvodistalni.forEach(element => {
        this.pom.push(element);
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
    else if (this.izabrano=="A-Z"){
      this.pom=[];
      this.proizvodistalni.forEach(element => {
        this.pom.push(element);
      });
      this.pom.sort(function compare( a, b ) {
        if ( a.naziv < b.naziv ){
          return -1;
        }
        if ( a.naziv > b.naziv ){
          return 1;
        }
        return 0;
      });
      this.proizvodi = this.pom;
    }
    else if(this.izabrano=="A-Z (Preduzece)"){
      this.pom=[];
      this.proizvodistalni.forEach(element => {
        this.pom.push(element);
      });
      this.pom.sort(function compare( a, b ) {
        if ( a.ime < b.ime ){
          return -1;
        }
        if ( a.ime > b.ime ){
          return 1;
        }
        return 0;
      });
      this.proizvodi = this.pom;
    }
    else if(this.izabrano=="Kucaj"){
      this.pom=[];
      this.proizvodistalni.forEach(element => {
        if(element.naziv.search(this.ukucanitekst)>-1){
          this.pom.push(element);
        }
      });
      this.proizvodi = this.pom;
    }
    else if(this.izabrano=="Kucaj (Preduzece)"){
      this.pom=[];
      this.proizvodistalni.forEach(element => {
        if(element.ime.search(this.ukucanitekst)>-1){
          this.pom.push(element);
        }
      });
      this.proizvodi = this.pom;
    }
    this.ukucanitekst="";
  }
  
  posadi(i:number){
    localStorage.setItem("rasadnik", JSON.stringify(""));
    this.service.zasadiSeme(this.prosledjenasadnica.id,this.prosledjenasadnica.idr,this.proizvodi[i].idproizvodi);
    this.router.navigate(["/poljoprivrednik"]);
  }
  primeni(i:number){
    localStorage.setItem("rasadnik", JSON.stringify(""));
    this.service.iskoristiProizvod(this.prosledjenasadnica.id,this.prosledjenasadnica.idr,this.proizvodi[i].idproizvodi);
    this.router.navigate(["/poljoprivrednik"]);
  }
  ponisti(i:number){
    localStorage.setItem("rasadnik", JSON.stringify(""));
    this.service.ponisti(this.proizvodi[i]);
    this.router.navigate(["/poljoprivrednik"]);
  }

}
