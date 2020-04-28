import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

interface dataPoint {
  year: string;
  price: number;
}

interface MetalData {
  [metal: string]: dataPoint[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: []},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(239,208,111)',
    },
  ];
  public lineChartType = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.baseUrl}/get-data`).subscribe((data: MetalData) => {
      this.lineChartData[0].data = data.gold.map(dataPoint => dataPoint.price);
      this.lineChartLabels = data.gold.map(dataPoint => dataPoint.year);
    })
  }
}
