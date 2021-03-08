import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-rasadnik',
  templateUrl: './rasadnik.component.html',
  styleUrls: ['./rasadnik.component.css']
})
export class RasadnikComponent implements OnInit {

  constructor(private router: Router, private service: ServisService) { }

  username: string;
  ngOnInit(): void {
    let pom = JSON.parse(localStorage.getItem("tip"));
    if (pom == "p" || pom == "a") this.router.navigate(["/log"]);
    this.username = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.username == null || this.username == "") {
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip", JSON.stringify("k"));
  }
  duzina: number;
  sirina: number;
  naziv: string;
  mesto: string;
  povrsina: number;

  dodajRasadnik() {
    if (this.duzina == null || this.sirina == null) { alert("Neadekvatna povrsina"); return; }
    if (this.mesto == "" || this.mesto == null || this.naziv == null || this.naziv == "") { alert("Morate uneti sva polja!"); return; }
    if (this.mesto.length > 44 || this.naziv.length > 44) { alert("Predugacak string!"); return; }
    this.povrsina = Math.floor(this.duzina) * Math.floor(this.sirina);
    if (this.povrsina == null || this.povrsina == 0 || this.povrsina < 0) { alert("Neadekvatna povrsina"); return; }
    this.service.getLocation(this.mesto).subscribe(data => {
      let provera = /"coordinates":\[\d+.\d+,\d+.\d+\]/;
      if (provera.test(JSON.stringify(data)) == true){
        this.service.dodajRasadnik(this.username, this.naziv, this.mesto, Math.floor(this.povrsina), Math.floor(this.duzina), Math.floor(this.sirina));
        alert("Success!");
        this.router.navigate(["/poljoprivrednik"]);
      }
      else {alert("Mesto na kome se nalazi rasadnik je nepostojece!");}
    })

  }
}
