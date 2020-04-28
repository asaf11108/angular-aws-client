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
  goldData: ChartDataSets[] = [
    { data: []},
  ];
  goldLabels: Label[] = [];
  silverData: ChartDataSets[] = [
    { data: []},
  ];
  silverLabels: Label[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(239,208,111)',
    },
  ];
  lineChartType = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.baseUrl}/get-data`).subscribe((data: MetalData) => {
      this.goldData[0].data = data.gold.map(dataPoint => dataPoint.price);
      this.silverData[0].data = data.silver.map(dataPoint => dataPoint.price);
      this.goldLabels = data.gold.map(dataPoint => dataPoint.year);
      this.silverLabels = data.silver.map(dataPoint => dataPoint.year);
    })
  }
}
