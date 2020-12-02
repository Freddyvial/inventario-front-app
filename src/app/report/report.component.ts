import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../services/ReportService';
import { RoomServices } from '../services/RoomServices';
import { ArticleServices } from '../services/ArticleServices';
import * as moment from 'moment';
@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent {
    constructor(private articleServices: ArticleServices,private roomServices: RoomServices, private reportService: ReportService, private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) { }
    dateReport;
    dateHoy;
    reports;
    reportOk = false;
    articles;

    report = {
        date: "",
        idReport: "",
        nameReport: "",
        room: { idRoom: "", name: "", campus: "", user: "", photo: "" },
        state: { id: "", name: "" },
        user: {
            campus: { idCampus: "", name: "", direction: "", logo: "" },
            id: "",
            passWord: "",
            role: "",
            userName: ""
        }
    }
    ngOnInit() {
        this.consulReports(localStorage.getItem("CAMPUSUSER"));
        this.consulRoomByUser(localStorage.getItem("USER"));
        this.report.user.id=localStorage.getItem("USER");
        this.report.user.userName=localStorage.getItem("USERNAME")
    }
    typesOfShoes: string[] = [];

    consulArticlesByRoom(room){
        this.spinner.show();
        console.log(room.idRoom);
        this.articleServices.consulArticesByRoom(room.idRoom).subscribe(resp => {
            this.articles=resp;
            for (let index = 0; index < this.articles.length; index++) {
                this.typesOfShoes.push(this.articles[index].name);
                
            }
          console.log(resp); 
          this.spinner.hide();
        }, error => {
          console.log("Error:: ", error);
          this.spinner.hide();
        });
      }
    consulReports(idCampus) {
        this.reportService.consultReport(idCampus).subscribe(resp => {
            console.log(resp)
            this.reports = resp;
            this.checkReport(this.reports);
        }, error => {
            console.log(error);
        });
    }
    checkReport(reports) {
        let user = localStorage.getItem("USER");
        let now = moment().format('L');
        for (let index = 0; index < reports.length; index++) {
            this.dateReport = reports[index].date;
            this.dateReport = moment(this.dateReport).format('L')
            if (this.reports[index].user.id == user && this.dateReport == now) {
                this.reportOk = true;
            }

        }
    }
    consulRoomByUser(idUser) {
        this.roomServices.consulRoomsByUser(idUser).subscribe(resp => {
            console.log(resp);
            this.report.room=JSON.parse(JSON.stringify(resp));
            this.consulArticlesByRoom(this.report.room);
        }, error => {
            console.log(error);
        });
    }


}