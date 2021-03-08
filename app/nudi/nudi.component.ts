import { Component, OnInit } from '@angular/core';
import { Proizvod } from '../proizvod';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-nudi',
  templateUrl: './nudi.component.html',
  styleUrls: ['./nudi.component.css']
})
export class NudiComponent implements OnInit {

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
info(i:number){
  localStorage.setItem("proslproizvod",""+this.proizvodi[i].idproizvodi);
  localStorage.setItem("proslceoproizvod",JSON.stringify(this.proizvodi[i]));
  this.router.navigate(["/detalji"]);
}
}
