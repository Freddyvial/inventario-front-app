import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    ngOnInit() {
    }

    constructor() { }
//C1___________________________________________________________________________
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Probabilidad Alta' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Probabilidad Baja'  }
    ];
//C2_________________________________________________________________________________
public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
public doughnutChartData = [120, 150, 180, 90];
public doughnutChartType = 'doughnut';
//C3__________________________________________________________________________________
public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
public radarChartData = [
  {data: [120, 130, 180, 70], label: '2017'},
  {data: [90, 150, 200, 45], label: '2018'}
];
public radarChartType = 'radar';
//C4__________________________________________________________________________________
public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
public pieChartData = [120, 150, 180, 90];
public pieChartType = 'pie';
//C5______________________________________________________________________________________
}