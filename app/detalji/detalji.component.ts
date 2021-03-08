import { Component, OnInit } from '@angular/core';
import { Komentari } from '../komentari';
import { ServisService } from '../servis.service';
import { Router } from '@angular/router';
import { Proizvod } from '../proizvod';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent implements OnInit {

  constructor(private service:ServisService,private router:Router) { }
username:string;
  ngOnInit(): void {
    let pom=JSON.parse(localStorage.getItem("tip"));
    if(pom=="k" || pom=="a")this.router.navigate(["/log"]);
    this.username=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.username==null || this.username==""){
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip",JSON.stringify("p"));
    this.proizvod=JSON.parse(localStorage.getItem("proslproizvod"));
    this.ceoproizvod=JSON.parse(localStorage.getItem("proslceoproizvod"));
    this.info();
  }
  proizvod:number=0;
  komentari:Komentari[]=[];
  ceoproizvod:Proizvod;
  info(){
    this.service.uzmikomentare2(this.proizvod).subscribe(data=>{this.komentari=data;});
  }
  vrati(){
    this.router.navigate(["/nudi"]);
  }
}
