import { Component } from '@angular/core';
import { QuestionsServices } from '../services/QuestionsServices';
import { AnswerPatientServices } from '../services/AnswerPatientServices';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { type } from 'os';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  results = 0;
  title = 'Test';
  questions: any;
  responses = [];
  end = false;
  loading = false;


  currenQuestion: any;


  constructor(private router: Router, private spinner: NgxSpinnerService, private questionsServices: QuestionsServices, private answerPatientServices: AnswerPatientServices) { }

  ngOnInit() {
 this.currenQuestion = {};
    this.importQuestions();
  
  }
  theEnd(){
    if(this.end){
      return true;
    }
    return false;    
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
    localStorage.setItem('RESULT',this.results.toString());
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
public barChartLabels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Probabilidad Alta' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Probabilidad Baja'  }
];


  sumResponses() {
    this.responses.forEach(r => {
      if (r.response == 1) {
        this.results += +r.value;
      }
    }

    );
    this.results=this.results*100;
    this.results.toFixed(2);
    this.end = true;
  }

}

