import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';
import { KorisnikPom } from '../korisnikpom';

@Component({
  selector: 'app-logovanje',
  templateUrl: './logovanje.component.html',
  styleUrls: ['./logovanje.component.css']
})
export class LogovanjeComponent implements OnInit {

  constructor(private router: Router, private service: ServisService) { }

  ngOnInit(): void {
    localStorage.setItem("ulogovan", JSON.stringify(""));
    localStorage.setItem("tip", JSON.stringify(""));
    localStorage.setItem("rasadnik", JSON.stringify(""));
    localStorage.setItem("sadnica", JSON.stringify(""));
  }

  username: string;
  sifra: string;
  kp: KorisnikPom[] = [];

  uloguj() {
    this.service.getKor(this.username, this.sifra).subscribe(data => {
      this.kp = data;
      if (data.length == 0) { alert("Pogresni username/password"); }
      this.kp.forEach(element => {
        if (element.accepted == 'y') {
          localStorage.setItem("ulogovan", JSON.stringify(this.username));
          if (element.type == "a") {
            this.router.navigate(["/admin"]);
          } else if (element.type == "k") {
            this.router.navigate(["/poljoprivrednik"]);
          } else if (element.type == "p") {
            this.router.navigate(["/preduzece"]);
          }
          else {
            alert("Neocekivana greska!");
          }
        }
        else {
          alert("Niste jos prihvaceni od strane administratora!");
        }
      });
    });




  }
}
