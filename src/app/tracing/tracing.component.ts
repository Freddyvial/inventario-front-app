import { Component, OnInit, ViewChild } from '@angular/core';
import { TracingService } from '../services/TracingService';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
    selector: "app-tracing",
    templateUrl: './tracing.component.html',
    styleUrls: ['./tracing.component.css']
})
export class TracingComponent {
    tracings;
    ngOnInit() {
        this.spinner.show();
    this.importTracing();
    }

    constructor(private tracingService: TracingService, private router: Router, private spinner: NgxSpinnerService) { }
    displayedColumns: string[] = ['id', 'date', 'detailTracing', 'medical', 'patient','observation','state', 'action'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    tracing={
        id:"",
        date:"",
        detailTracing:{},
        medical:{},
        patient:{},
        observation:"",
        state:{}
    }
    importTracing() {
        this.tracingService.consultTracing().subscribe(resp => {
            console.log(resp);
            this.tracings = resp;
            this.dataSource = new MatTableDataSource<any>(this.tracings);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        }, error => {
            console.log('Error:: ', error);
            this.spinner.hide();
        });

    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}









