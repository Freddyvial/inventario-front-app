import { Component } from '@angular/core';
import { QuestionsServices } from '../services/QuestionsServices';
import { AnswerPatientServices } from '../services/AnswerPatientServices';
import { NgxSpinnerService } from "ngx-spinner";
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


  constructor(private spinner: NgxSpinnerService, private questionsServices: QuestionsServices, private answerPatientServices: AnswerPatientServices) { }

  ngOnInit() {

    this.spinner.show();
    this.currenQuestion = {};
    this.importQuestions();
    this.spinner.hide();
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

  getResponses() {
    this.spinner.show();
    this.sumResponses();
    const body = {
      idPatient: '1',
      resul: this.results
    }
    this.answerPatientServices.setAnswerPatient(body).subscribe(resp => {


      this.spinner.hide();

    }, error => {

      this.spinner.hide();

      console.error(error);
    });
  }

  sumResponses() {
    this.responses.forEach(r => {
      if (r.response == 1) {
        this.results += +r.value;
      }
    }

    );

    this.end = true;
  }

}

