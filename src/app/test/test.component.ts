import { Component } from '@angular/core';
import { QuestionsServices } from '../services/QuestionsServices';
import {ChartServices} from '../services/ChartServices'
import { AnswerPatientServices } from '../services/AnswerPatientServices';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { type } from 'os';
import { ThemeService } from 'ng2-charts';
import { from } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  nameDepartment=[];
  lowProbability=[];
  highProbability=[];
  results = 0;
  title = 'Test';
  questions: any;
  responses = [];
  end = false;
  loading = false;
  resultsByDepartment: any;


  currenQuestion: any;


  constructor(private chartServices:ChartServices,private router: Router, private spinner: NgxSpinnerService, private questionsServices: QuestionsServices, private answerPatientServices: AnswerPatientServices) { }

  ngOnInit() {
    this.currenQuestion = {};
    this.importQuestions();
    this.consultResultByDeparment();

  }
  theEnd() {
    if (this.end) {
      return true;
    }
    return false;
  }
  consultResultByDeparment() {
    this.spinner.show();
    this.chartServices.consultResultByDepartment().subscribe(resp => {
      this.resultsByDepartment = resp;
      console.log(resp);
      for (let index = 0; index < this.resultsByDepartment.length; index++) {
       this.nameDepartment[index]=this.resultsByDepartment[index].nameDepartment;
       this.lowProbability[index]=this.resultsByDepartment[index].lowProbability;
       this.highProbability[index]=this.resultsByDepartment[index].highProbability; 
      }
      this.spinner.hide();
    }, error => {
      console.log('Error:: ', error);
      this.spinner.hide();
    });

  }

  importQuestions() {
    this.spinner.show();
    this.questionsServices.getQuestions().subscribe(resp => {
      this.questions = resp;
      this.currenQuestion = this.questions[0];
      this.currenQuestion.response = '';
      this.spinner.hide();
    }, error => {
      console.log('error::', error)
      this.spinner.hide();
    });
  }
  goToRegistry() {
    localStorage.setItem('RESULT', this.results.toString());
    this.router.navigateByUrl('/patients')
  }

  getNexQuestion() {
    if (this.currenQuestion.response === '1') {
      if (this.currenQuestion.positiveAnswer == 0) {
        this.responses.push(this.currenQuestion);
      } else {
        this.responses.push(this.currenQuestion);
        this.currenQuestion = this.questions.find(question => question.id === this.currenQuestion.positiveAnswer);
      }
    } else {
      if (this.currenQuestion.response === '0') {
        if (this.currenQuestion.negativeAnswer == 0) {
          this.responses.push(this.currenQuestion);
        } else {
          this.responses.push(this.currenQuestion);
          this.currenQuestion = this.questions.find(question => question.id === this.currenQuestion.negativeAnswer);
        }
      }

    }
    this.currenQuestion.response = '';
  }
  //C1___________________________________________________________________________
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = this.nameDepartment;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: this.highProbability, label: 'Probabilidad Alta' },
    { data: this.lowProbability, label: 'Probabilidad Baja' }
  ];


  sumResponses() {
    this.responses.forEach(r => {
      if (r.response == 1) {
        this.results += +r.value;
      }
    }

    );
    this.results = this.results * 100;
    this.results.toFixed(2);
    this.end = true;
  }

}

