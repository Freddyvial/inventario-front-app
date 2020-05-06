import { Component } from '@angular/core';
import { QuestionsServices } from '../services/QuestionsServices';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
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
      this.currenQuestion.response = '1';
    }, error => {
      console.log('error::', error)
    });

  }

  getNexQuestion() {
    if (this.currenQuestion.response === '1') {
      this.responses.push(this.currenQuestion);
      this.currenQuestion = this.questions.find(question => question.id === this.currenQuestion.positiveAnswer);
    } else {
      if (this.currenQuestion.response === '0') {
        this.responses.push(this.currenQuestion);
        this.currenQuestion = this.questions.find(question => question.id === this.currenQuestion.negativeAnswer);
      }
    }
    this.currenQuestion.response = '0';
  }

}

