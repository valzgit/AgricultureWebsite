import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datumi } from '../datumi';
import { ServisService } from '../servis.service';

@Component({
  selector: 'app-barovi',
  templateUrl: './barovi.component.html',
  styleUrls: ['./barovi.component.css']
})
export class BaroviComponent implements OnInit {

  constructor(private router: Router, private service: ServisService) { }
  username: string;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels = ['-29', '-28', '-27', '-26', '-25', '-24', '-23', '-22', '-21', '-20', '-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', 'Danas'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Porudzbine na dnevnom nivou u poslednjih mesec dana' }
  ]
  datumi: Datumi[] = [];
  prikazi=false;
  ngOnInit(): void {
    let pom = JSON.parse(localStorage.getItem("tip"));
    if (pom == "k" || pom == "a") this.router.navigate(["/log"]);
    this.username = JSON.parse(localStorage.getItem("ulogovan"));
    if (this.username == null || this.username == "") {
      this.router.navigate(["/log"]);
    }
    localStorage.setItem("tip", JSON.stringify("p"));
    this.service.dohvDatume(this.username).subscribe(data => { this.datumi = data; this.vizualizuj(); })
  }
  vizualizuj() {
    let d: Date = new Date();
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let dan = d.getDate();
    d = new Date(y + "-" + m + "-" + dan);
    d.setHours(2,0,0,0);
   this.datumi.forEach(element => {
      let pom = new Date(element.datum);
      let time = pom.getTime() - d.getTime();
    time = time/3600000;time=time/24;
    if(time>-30)
      this.barChartData[0].data[time + 29] += element.broj;
    });
    this.prikazi=true;
  }
}
