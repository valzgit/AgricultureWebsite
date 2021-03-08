import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proizvod } from '../proizvod';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  constructor(private router:Router,private service:ServisService) { }
username:string;
proizvodi:Proizvod[]=[];
  ngOnInit(): void {
    let pom=JSON.parse(localStorage.getItem("tip"));
    if(pom=="k" || pom=="a")this.router.navigate(["/log"]);
    this.username=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.username==null || this.username==""){
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip",JSON.stringify("p"));
    this.service.uzmiproizvode(this.username).subscribe(data=>{this.proizvodi=data;});
  }
  dodaj:string="dodaj";
naziv:string;
vrsta:string;
dani:number;
kolicina:number;
cena:number;
zavrsi(){
  if(this.naziv==null || this.vrsta==null || this.dani==null || this.kolicina==null || this.cena==null || this.naziv=="" || this.vrsta==""){
    alert("Unesite sva polja pre nego sto zavrsite!");return;
  }
  if(this.naziv.length>44){
    alert("Naziv ne sme biti duzi od 44 karaktera!");return;
  }
  this.service.proveridalvecima(this.username,this.naziv).subscribe(data=>{
    if(data.length==0){
    this.service.dodajproizvod(this.username,this.naziv,this.vrsta,this.cena,this.kolicina,this.dani);
    this.service.uzmiproizvode(this.username).subscribe(data=>{this.proizvodi=data;});
    alert("Uspeh!");}
    else alert("Proizvod sa istim imenom vec postoji!");
  })
 
}
povuci(x:Proizvod,i:number){
  this.proizvodi.splice(i,1);
  this.service.povuciproizvod(x.idproizvodi);
}
}
