import { Component } from '@angular/core';
import { Router } from '@angular/router';

export class QuestionOptionModel {
  title: string;
  value: string;
  index: number;
  checked: string = null;
}

export class QuestionModel {
  id: string;
  title: string;

  answer: string;

  options: QuestionOptionModel[] = [];

  constructor() {
    this.id = new Date().getMilliseconds().toString() + new Date().getSeconds().toString(); // random value
  }
  generateQuestion() {
    var question = new QuestionOptionModel();
    question.title = "高雄";
    question.value = "A";
    question.index = 0;
    this.options.push(question);
    var question = new QuestionOptionModel();
    question.title = "台北";
    question.value = "B";
    question.index = 1;
    this.options.push(question);

    var question = new QuestionOptionModel();
    question.title = "新竹";
    question.value = "C";
    question.index = 2;
    this.options.push(question);
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datas: QuestionModel[];

  constructor(private router: Router) {
    this.datas = this.getQuestion();
  }

  submitAction() {
    let errorCount = this.checkAnswer();
    if (errorCount == 0) {
      this.router.navigate(['./home/sucess']);
    } else {
      this.router.navigate(['./home/fail']);
    }

  }

  addQuestionAction() {
    this.router.navigate(['./home/add-question']);
  }

  //題目單選
  clearOtherOption(currentQuestion, option) {
    var currentQuestionIndex = this.datas.findIndex((item) => {
      return item.id == currentQuestion.id;
    });
    this.datas[currentQuestionIndex].options.forEach(item => {
      if (item.title != option.title) {
        item.checked = null;
      }
    });
  }
  private checkAnswer() {
    let errorCount = 0;
    this.datas.forEach((data: any) => {
      //選項多選
      var userSelectedOption = data.options.find((option) => {
        return option.checked != null;
      });
      console.log(data);
      if (userSelectedOption.value != data.answer) {
        errorCount++;
      }

    });
    return errorCount;
  }



  private getQuestion() {
    let result = [];
    var question = new QuestionModel();
    question.title = "國立高雄科技大學在哪裡 ? ";
    question.answer = "A";
    question.generateQuestion();
    result.push(question);
    return result;
  }



}
