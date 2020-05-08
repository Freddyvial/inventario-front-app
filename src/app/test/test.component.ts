import { Component } from '@angular/core';
import { QuestionsServices } from '../services/QuestionsServices';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  results=0;
  title = 'Test';
  questions: any;
  responses = [];


  currenQuestion: any;


  constructor(private questionsServices: QuestionsServices) { }

  ngOnInit() {
    this.currenQuestion = {};

    this.importQuestions();
  }

  importQuestions() {
    this.questionsServices.getQuestions().subscribe(resp => {
      this.questions = resp;
      this.currenQuestion = this.questions[0];
      this.currenQuestion.response = '';
    }, error => {
      console.log('error::', error)
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
    
    this.responses.forEach(r => {
      
      this.results += +r.value; 

    }
      );
console.log(this.results)
  }

}

