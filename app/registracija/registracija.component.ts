import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../preduzece';
import { Poljoprivrednik } from '../poljoprivrednik';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  tip: string = "poljoprivrednik";
  preduzece: Preduzece = { Punoime: "", username: "", password1: "", password2: "", Datum: null, Mesto: "", email: "", };
  poljoprivrednik: Poljoprivrednik = { Ime: "", Prezime: "", username: "", password1: "", password2: "", Datum: null, Mesto: "", email: "", Telefon: "" };

  constructor(private router: Router, private service: ServisService) {
  }

  ngOnInit(): void {
  }

  isCaptchaChecked(): boolean {
    return grecaptcha && grecaptcha.getResponse().length !== 0;
  }

  recaptcha: any[];
  t: string;
  resolved(captchaResponse: any[]) {
    this.recaptcha = captchaResponse;
  }

  registruj() {
    let kepca = this.isCaptchaChecked();
    if (!kepca) {
      alert("Da li ste robot?");
      return;
    }
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

    let prva = /.{7,}/;
    let druga = /[A-Z]+/;
    let treca = /[0-9]+/;
    let cetvrta = /\W+/;
    let peta = /^[A-Z]/;
    let sesta = /^[a-z]/;
    let mejl=/.+@.+\..+/;
    if(!mejl.test(izabrani.email)){
      alert("Mejl nije dobrog oblika!");
      return;
    }
    if (!(prva.test(izabrani.password1) && druga.test(izabrani.password1) && treca.test(izabrani.password1) && cetvrta.test(izabrani.password1) && (peta.test(izabrani.password1) || sesta.test(izabrani.password1)) && izabrani.password1 == izabrani.password2)) {
      alert("Unesite ponovo sifre!");
      return;
    }
    let ime = "";
    if (this.t == "k") {
      ime = this.poljoprivrednik.username;
    }
    else ime = this.preduzece.username;
    this.service.getLocation(izabrani.Mesto).subscribe(data => {
      let provera = /"coordinates":\[\d+.\d+,\d+.\d+\]/;
      if (provera.test(JSON.stringify(data)) == true) {
        this.service.getUsername(ime).subscribe(data => {
          if (data.length == 0) {
            if (this.t == "k") {
              this.service.postKorPolj(izabrani);
            }
            else { this.service.postKorPred(izabrani); }
            alert("Success!");
            this.router.navigate(["/log"]);
          } else alert("Korisnicko ime je vec zauzeto!");
        })
      }
      else { alert("Mesto je nepostojece!"); }
    })
  }
}
