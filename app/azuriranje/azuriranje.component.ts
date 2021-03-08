import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';
import { KorisnikPom } from '../korisnikpom';
import { Polj } from '../polj';
import { Pred } from '../pred';

@Component({
  selector: 'app-azuriranje',
  templateUrl: './azuriranje.component.html',
  styleUrls: ['./azuriranje.component.css']
})
export class AzuriranjeComponent implements OnInit {

  constructor(private router:Router, private service:ServisService) {}
username:string;
  ngOnInit(): void {
    let pom=JSON.parse(localStorage.getItem("tip"));
    if(pom=="p" || pom=="k")this.router.navigate(["/log"]);
    this.username=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.username==null || this.username==""){
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip",JSON.stringify("a"));
    this.service.getAdmin2().subscribe(data=>{this.kp=data ; if(this.kp==null){this.kp=[]};});
  }
  kp:KorisnikPom[]=[];
  izabran:string='';
  polj:Polj=null;
  pred:Pred=null;
  dohvati(k:KorisnikPom){
    if(k.type=='k'){
      this.service.dohvatiPolj(k.id).subscribe(data=>{this.polj=data;this.izabran=k.type;});
    }else{
      this.service.dohvatiPred(k.id).subscribe(data=>{this.pred=data;this.izabran=k.type;});
    }
  }
  azurirajPolj(){
    let mejl=/.+@.+\..+/;
    if(!mejl.test(this.polj[0].email)){
      alert("Mejl nije dobrog oblika!");
      return;
    }
    this.service.azurirajPolj(this.polj[0].id,this.polj[0].Ime,this.polj[0].Prezime,this.polj[0].Datum,this.polj[0].Mesto,this.polj[0].Telefon,this.polj[0].email);
  }
  azurirajPred(){
    let mejl=/.+@.+\..+/;
    if(!mejl.test(this.pred[0].email)){
      alert("Mejl nije dobrog oblika!");
      return;
    }
    this.service.azurirajPred(this.pred[0]);
  }
}
