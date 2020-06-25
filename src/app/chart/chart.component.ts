import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ChartServices } from '../services/ChartServices'
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    ngOnInit() {
        this.consultByDepartmentByState();
        this.consultResultByState();
        this.consultResultByDeparment();
        this.cosultByBirhDate();
    }
    radarChartData = [];

    constructor(private chartServices: ChartServices, private spinner: NgxSpinnerService) { }
    public radarChartLabels = ['Recuperado', 'Enfermo', 'Seguimiento', 'Muerto'];

    public radarChartType = 'radar';
    quantityState = [0, 0, 0, 0];
    nameDepartment;
    namePrevius;
    dataChart = [[], ""];
    count;
    nameS;
    states = ['Recuperado', 'Enfermo', 'Seguimiento', 'Muerto'];
    dataChar4 = [];
    dataUp = false;
    doughnutChartType = 'doughnut';
    resultsByState;
    nameState = [];
    quantity = [];
    nameDepartment2 = [];
    lowProbability = [];
    highProbability = [];
    resultsByDepartment: any;
    ages: any;

    consultResultByDeparment() {
        this.spinner.show();
        this.chartServices.consultResultByDepartment().subscribe(resp => {
            this.resultsByDepartment = resp;
            console.log(resp);
            for (let index = 0; index < this.resultsByDepartment.length; index++) {
                this.nameDepartment2[index] = this.resultsByDepartment[index].nameDepartment;
                this.lowProbability[index] = this.resultsByDepartment[index].lowProbability;
                this.highProbability[index] = this.resultsByDepartment[index].highProbability;
            }
            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
    cosultByBirhDate() {
        let countChildren = 0;
        let youngBoys = 0;
        let adults = 0;
        let olderAdults = 0;
        this.spinner.show();
        this.chartServices.consultResultByBirthDate().subscribe(resp => {
            console.log(resp);
            this.ages = resp;
            for (let index = 0; index < this.ages.length; index++) {
                const age = this.ages[index].age;
                if (age < 15) {
                    countChildren += this.ages[index].quantity;
                }
                if (age >= 15 && age < 25) {
                    youngBoys += this.ages[index].quantity;
                }
                if (age >= 25 && age < 60) {
                    adults += this.ages[index].quantity;
                }
                if (age >= 60) {
                    olderAdults += this.ages[index].quantity;
                }
            }
            this.pieChartData[0] = countChildren;
            this.pieChartData[1] = youngBoys;
            this.pieChartData[2] = adults;
            this.pieChartData[3] = olderAdults;





        }, error => {
            console.log("Error:: ", error)
        });
    }
    consultByDepartmentByState() {
        this.count = 0;
        this.spinner.show();
        this.chartServices.consultResultByDepartmentByState().subscribe(resp => {
            this.resultsByState = resp;
            const charData = new Map();
            this.resultsByState.forEach(rs => {
                let departamentStates = charData.get(rs.nameDepartment);

                if (!departamentStates) {
                    charData.set(rs.nameDepartment, { label: rs.nameDepartment, data: [0, 0, 0, 0] });
                    departamentStates = charData.get(rs.nameDepartment);
                }

                for (let index = 0; index < this.states.length; index++) {
                    if (this.states[index] === rs.nameState) {

                        departamentStates.data[index] = rs.quantity;
                    }

                }

            }


            );
            for (const data of charData.values()) {
                this.radarChartData.push(data)
            }


            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });
    }
    consultResultByState() {
        this.spinner.show();
        this.chartServices.consultResultByState().subscribe(resp => {
            this.resultsByState = resp;
            console.log(resp);
            this.dataUp = true;
            for (let index = 0; index < this.resultsByState.length; index++) {
                this.nameState[index] = this.resultsByState[index].nameState;
                this.quantity[index] = this.resultsByState[index].quantity;
            }

            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
    //C1___________________________________________________________________________
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartLabels = this.nameDepartment2;
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [
        { data: this.highProbability, label: 'Probabilidad Alta' },
        { data: this.lowProbability, label: 'Probabilidad Baja' }
    ];
    //C2_________________________________________________________________________________

    //C4__________________________________________________________________________________
    public pieChartLabels = ['Niños', 'Jovenes', 'Adultos', 'Adultos Mayores'];
    public pieChartData = [120, 150, 180, 90];
    public pieChartType = 'pie';


    public radarChartOptions: RadialChartOptions = {
        responsive: true,
    };
}
