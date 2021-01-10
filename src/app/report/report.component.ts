import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../services/ReportService';
import { RoomServices } from '../services/RoomServices';
import { ArticleServices } from '../services/ArticleServices';
import { MatListOption } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent {
    constructor(private articleServices: ArticleServices, private roomServices: RoomServices, private reportService: ReportService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) { }
    dateReport;
    dateHoy;
    reports=new Array;
    reportOk = false;
    articles;
    date = new FormControl(new Date());
    room;
    dataSuorceMonitor = new Array;
    monitorModel = new Array;
    arrayArticleReport = new Array;
    articlesReported;
    displayedColumns: string[] = ['room', 'state', 'user', "date", "report"];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    applyFilter(event: any) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    editReport(element) {
        this.report = element;
        
    }

    onGroupsChange(options: MatListOption[]) {
        // map these MatListOptions to their values
        this.articlesReported = options.map(o => o.value);
        console.log(this.report)

    }
    checkArticles(articlesReported) {
        for (let index = 0; index < this.articles.length; index++) {
            if (articlesReported[index] == this.articles[index].name) {
                this.articles.splice(index, 1);
            }

        }
        this.upArticlesReport(this.articles);
    }
    upArticlesReport(articles) {
        for (let index = 0; index < articles.length; index++) {
            this.articleReport.article.id = articles[index].id;
            this.articleReport.report.idReport = this.report.idReport;
            this.arrayArticleReport.push(this.articleReport);
        }
        this.saveArticlesReported(this.arrayArticleReport);

    }
    saveArticlesReported(arrayArticleReport) {
        console.log(arrayArticleReport);
        for (let index = 0; index < arrayArticleReport.length; index++) {
            this.reportService.sendArticlesReported(arrayArticleReport[index]).subscribe(resp => {
            }, error => {
                console.log(error);
            });

        }
    }
    report = {
        idReport: "",
        room: { idRoom: "", name: "" },
        state: { id: "" },
        user: {
            campus: { idCampus: "" },
            idUser: "",
            userName: ""
        }
    }
    articleReport = {
        report: { idReport: "" },
        article: { id: "" }
    }
    ngOnInit() {
        this.consulReports(localStorage.getItem("CAMPUSUSER").toString());;
        if (this.isModel()) {
            this.consulRoomByUser(localStorage.getItem("USER"));
        }
        this.report.user.campus.idCampus=localStorage.getItem("CAMPUSUSER").toString();
        this.report.user.idUser = localStorage.getItem("USER");
        this.report.user.userName = localStorage.getItem("USERNAME")
    }
    isModel() {
        if (localStorage.getItem("ROLE") == "3") {
            return true;
        }
    }
    isAdmin() {
        if (localStorage.getItem("ROLE") == "1" || localStorage.getItem("ROLE") == "2") {
            return true;
        }
    }
    typesOfShoes: string[] = [];

    consulArticlesByRoom(room) {
        this.spinner.show();
        this.articleServices.consulArticesByRoom(room.idRoom).subscribe(resp => {
            this.articles = resp;
            for (let index = 0; index < this.articles.length; index++) {
                this.typesOfShoes.push(this.articles[index].name);

            }
            this.spinner.hide();
        }, error => {
            console.log("Error:: ", error);
            this.spinner.hide();
        });
    }
    consulReports(idCampus) {
        this.spinner.show();
        this.reportService.consultReport(idCampus).subscribe(resp => {
            console.log(resp);
            this.reports = JSON.parse(JSON.stringify(resp));
            for (let index = 0; index < this.reports.length; index++) {
              this.reports[index].date=moment(this.reports[index].date).format('l')
                
            }
            if (this.isAdmin()) {
                this.dataSource = new MatTableDataSource<any>(this.reports);
                this.dataSource.paginator = this.paginator;
            } else {
                this.reportService.consulMonitorModel(localStorage.getItem("USER")).subscribe(resp => {
                    this.monitorModel = JSON.parse(JSON.stringify(resp));
                    for (let index = 0; index < this.reports.length; index++) {
                        const idReport = this.reports[index].user.id;
                        for (let index2 = 0; index2 < this.monitorModel.length; index2++) {
                            if (this.monitorModel[index2].userModel.id == idReport) {
                                this.dataSuorceMonitor.push(this.reports[index])
                            }

                        }
                    }
                    this.dataSource = new MatTableDataSource<any>(this.dataSuorceMonitor);
                    this.dataSource.paginator = this.paginator;
                }, error => {
                    console.log(error);
                });

            }
            this.checkReport(this.reports);
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
            console.log(error);
        });
    }
    checkReport(reports) {
        console.log(reports);
        let user = localStorage.getItem("USER");
        let now = moment().format('l');
        for (let index = 0; index < reports.length; index++) {
            if (this.reports[index].user.idUser == user && reports[index].date == now) {
                this.reportOk = true;
            }

        }
    }
    consulRoomByUser(idUser) {
        this.spinner.show();
        this.roomServices.consulRoomsByUser(idUser).subscribe(resp => {
            console.log(resp)
            this.room = resp;
            this.report.room.idRoom = this.room.idRoom;
            this.report.room.name = this.room.name
            this.consulArticlesByRoom(this.report.room);
            this.spinner.hide();
        }, error => {
            console.log(error);
            this.spinner.hide();
        });
    }
    upReport(idState) {
        this.spinner.show();
        this.report.state.id = idState;
        console.log(this.report);
        this.reportService.sendReport(this.report).subscribe(resp => {
            console.log(resp)
            this.report = JSON.parse(JSON.stringify(resp));
            this.checkArticles(this.articlesReported);
            this.ngOnInit();
            this.spinner.hide();
           
        }, error => {
            this.spinner.hide();
            console.log(error);
        });
    }

}