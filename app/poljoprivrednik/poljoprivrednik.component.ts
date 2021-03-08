import { Component, OnInit, Inject } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { ServisService } from '../servis.service';
import { Rasadnik } from '../rasadnik';
import { Sadnica } from '../sadnica';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, Notification } from 'angular2-notifications'
import { Proizvod } from '../proizvod';


@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit {

  constructor(private router: Router, private service: ServisService, public dialog: MatDialog, private notifications: NotificationsService) {
  }
  username: string;
  rasadnici: Rasadnik[] = []
  refresh() {
    this.service.dohvatiRasadnike(this.username).subscribe(data => {
      this.rasadnici = data;
      this.rasadnici.forEach((element, index) => {
        this.obavestenja[index] = "";
        if (element.temp < 12 || element.voda < 75) {
          this.onError("Rasadnik " + element.naziv + " zahteva Vasu paznju!", index);
        }
      });
    });
  }
  ngOnInit(): void {
    localStorage.setItem("rasadnik", JSON.stringify(""));
    localStorage.setItem("sadnica", JSON.stringify(""));
    let pom = JSON.parse(localStorage.getItem("tip"));
    if (pom == "p" || pom == "a") this.router.navigate(["/log"]);
    this.username = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.username == null || this.username == "") {
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip", JSON.stringify("k"));
    this.refresh();
    this.timer1 = setInterval(() => {
      this.service.dohvatiRasadnike(this.username).subscribe(data => {
        let x = data;
        x.forEach((element, index) => {
          if (this.rasadnici[index].temp != element.temp || this.rasadnici[index].voda != element.voda) {
            this.rasadnici[index].temp = element.temp;
            this.rasadnici[index].voda = element.voda;
          }
        });
        this.rasadnici.forEach((element, index) => {
          if ((this.rasadnici[index].temp < 12 || this.rasadnici[index].voda < 75) && this.obavestenja[index] == "") {
            this.onError("Rasadnik " + element.naziv + " zahteva Vasu paznju!", index);
          }
        });
      });
    }, 100000);
    this.timer2 = setInterval(() => {
      if (this.izabrano != -1) {
        this.service.getSadnice(this.izabrano).subscribe(data => {
          let s = data;
          s.forEach((element, index) => {
            if (element.izvadi != this.sadnice[index].izvadi) {
              this.sadnice[index].izvadi = element.izvadi;
            } if (element.proizvod == "Prazan" && this.sadnice[index].proizvod == "Pending") {
              this.sadnice[index].izvadi = element.izvadi;
              this.sadnice[index].proizvod = element.proizvod;
            }
          });
        });
      }
    }, 10000);
  }
  obavestenja: string[] = [];
  timer1;
  timer2;
  cleartimer12(){
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }
  ////////////////////
  povecaj() {
    this.rasadnici[this.unizu].temp += 1;
    this.service.povecajtemp(this.izabrano);
    if (this.rasadnici[this.unizu].temp >= 12 && this.rasadnici[this.unizu].voda >= 75 && this.obavestenja[this.unizu] != "") {
      this.notifications.remove(this.obavestenja[this.unizu]);
      this.obavestenja[this.unizu] = "";
    }
  }
  smanji() {
    this.rasadnici[this.unizu].temp -= 1;
    this.service.smanjitemp(this.izabrano);
    if ((this.rasadnici[this.unizu].temp < 12 || this.rasadnici[this.unizu].voda < 75) && this.obavestenja[this.unizu] == "") {
      this.onError("Rasadnik " + this.rasadnici[this.unizu].naziv + " zahteva Vasu paznju!", this.unizu);
      this.service.posaljimejl(this.sadnice[0].idr);
    }
  }
  povecajl() {
    this.rasadnici[this.unizu].voda += 1;
    this.service.povecajvodu(this.izabrano);
    if (this.rasadnici[this.unizu].temp >= 12 && this.rasadnici[this.unizu].voda >= 75 && this.obavestenja[this.unizu] != "") {
      this.notifications.remove(this.obavestenja[this.unizu]);
      this.obavestenja[this.unizu] = "";
    }
  }
  smanjil() {
    this.rasadnici[this.unizu].voda -= 1;
    this.service.smanjivodu(this.izabrano);
    if ((this.rasadnici[this.unizu].temp < 12 || this.rasadnici[this.unizu].voda < 75) && this.obavestenja[this.unizu] == "") {
      this.onError("Rasadnik " + this.rasadnici[this.unizu].naziv + " zahteva Vasu paznju!", this.unizu);
      this.service.posaljimejl(this.sadnice[0].idr);
    }

  }
  /////////////////////////////////////
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

  }////////////////////////////////////

  onError(message, index) {
    let x = this.notifications.error("Paznja!", message, {
      position: ['bottom', 'right'],
      // timeOut:3000,
      animate: "fade",
      clickToClose: false
      // showProgressBar:true
    });
    this.obavestenja[index] = x.id;
  }
  //////////////////////////////////
  public sadnice: Sadnica[] = [];

  izabrano = -1;
  unizu = -1;

  nacrtaj(pom: Rasadnik, i: number) {
    this.izabrano = pom.id;
    this.unizu = i;
    localStorage.setItem("rasadnik", JSON.stringify(this.rasadnici[i]));
    this.service.getSadnice(pom.id).subscribe(data => { this.sadnice = data; });
  }


  openDialog(i: number): void {

    if (this.sadnice[i].proizvod == 'Prazan') {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: { id: this.sadnice[i].id, idr: this.sadnice[i].idr, proizvod: this.sadnice[i].proizvod, zasadjen: this.sadnice[i].zasadjen, izvadi: this.sadnice[i].izvadi, proizvodjac: this.sadnice[i].proizvodjac ,trajanje:this.sadnice[i].trajanje}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else if (this.sadnice[i].proizvod != 'Prazan' && this.sadnice[i].proizvod != 'Pending' && this.sadnice[i].izvadi != 0) {
      const dialogRef = this.dialog.open(DialogSaSadnicom, {
        width: '250px',
        data: { id: this.sadnice[i].id, idr: this.sadnice[i].idr, proizvod: this.sadnice[i].proizvod, zasadjen: this.sadnice[i].zasadjen, izvadi: this.sadnice[i].izvadi, proizvodjac: this.sadnice[i].proizvodjac ,trajanje:this.sadnice[i].trajanje}
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    } else if (this.sadnice[i].proizvod != 'Prazan' && this.sadnice[i].proizvod != 'Pending' && this.sadnice[i].izvadi == 0) {
      const dialogRef = this.dialog.open(DialogIzvadi, {
        width: '250px',
        data: { id: this.sadnice[i].id, idr: this.sadnice[i].idr, proizvod: this.sadnice[i].proizvod, zasadjen: this.sadnice[i].zasadjen, izvadi: this.sadnice[i].izvadi, proizvodjac: this.sadnice[i].proizvodjac ,trajanje:this.sadnice[i].trajanje}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == -1) return;
        this.sadnice.forEach(element => {
          if (result == element.id) {
            element.izvadi = 1440;
            element.proizvod = 'Pending';
            element.proizvodjac = null;
            element.zasadjen = null;
            this.rasadnici[this.unizu].slobodno++;
            this.rasadnici[this.unizu].zauzeto--;
          }
        });
      });
    }
    else {
      const dialogRef = this.dialog.open(DialogBez, {
        width: '250px',
        data: { id: this.sadnice[i].id, idr: this.sadnice[i].idr, proizvod: this.sadnice[i].proizvod, zasadjen: this.sadnice[i].zasadjen, izvadi: this.sadnice[i].izvadi, proizvodjac: this.sadnice[i].proizvodjac,trajanje:this.sadnice[i].trajanje }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
}
//////////////////////////////////

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Sadnica, public service: ServisService, public router: Router) { }
  posadi() {
    localStorage.setItem("sadnica", JSON.stringify(this.data));
    this.dialogRef.close(0);
    this.router.navigate(["/magacin"]);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'dialogsasadnicom',
  templateUrl: './dialogsasadnicom.html',
})
export class DialogSaSadnicom {

  constructor(
    public dialogRef: MatDialogRef<DialogSaSadnicom>,
    @Inject(MAT_DIALOG_DATA) public data: Sadnica, private service: ServisService, private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ubrzaj() {
    localStorage.setItem("sadnica", JSON.stringify(this.data));
    localStorage.setItem("ubrzaj", 'ima');
    this.dialogRef.close(0);
    this.router.navigate(["/magacin"]);
  }
}
@Component({
  selector: 'dialogizvadi',
  templateUrl: './dialogizvadi.html',
})
export class DialogIzvadi {

  constructor(
    public dialogRef: MatDialogRef<DialogIzvadi>,
    @Inject(MAT_DIALOG_DATA) public data: Sadnica, private service: ServisService) { }
  izvadi() {
    this.service.izvadi(this.data.id);
    this.dialogRef.close(this.data.id);
  }
  onNoClick(): void {
    this.dialogRef.close(-1);
  }

}
@Component({
  selector: 'dialogbez',
  templateUrl: './dialogbez.html',
})
export class DialogBez {

  constructor(
    public dialogRef: MatDialogRef<DialogBez>,
    @Inject(MAT_DIALOG_DATA) public data: Sadnica, private service: ServisService, private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

}