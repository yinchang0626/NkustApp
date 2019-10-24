import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from 'src/app/app-consts';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  currentGroupId: any;
  data: any;
  summaryText: string;
  @ViewChild("audio", { static: false }) audio;

  constructor(private http: HttpClient, public router: Router, private nativeAudio: NativeAudio) {
    //測試-使用html5原生
    //this.audio = new Audio("/assets/Track_01.mp3");
    //this.audio.play();
  }

  ngOnInit() {
    this.currentGroupId = this.router.url.split('/')[this.router.url.split('/').length - 1];
    this.loadData();
  }

  loadData() {
    this.http.get<any>(AppConsts.RemoteUrl + `/api/QuestionType`, { params: { groupid: this.currentGroupId } }).subscribe(x => {
      this.data = x;
    });
  }

  submitAction() {
    let unAnswerCount = this.validationQuzi();
    if (unAnswerCount == 0) {
      this.validationAnswer();
    }
  }
  /**
   * 驗證未填答
   */
  validationQuzi(): number {
    let unAnswerCount: number = 0;

    this.data.questionTypes.forEach(questionType => {
      questionType.questions.forEach(question => {
        var selectedAnswerCount = question.options.filter(x => { return x._checkValue }).length;
        if (selectedAnswerCount == 0) unAnswerCount++;
      })
    });
    if (unAnswerCount > 0) {
      this.summaryText = `尚有${unAnswerCount}題未回答`;
    } else {
      this.summaryText = null;
    }
    return unAnswerCount;
  }

  /**
   * 驗證答案是否正確
   */
  validationAnswer() {
    let rightAnswer = 0;
    let errorAnswerCount = 0;
    this.data.questionTypes.forEach(questionType => {
      questionType.questions.forEach(question => {
        var filterData = question.options.filter(x => { return x._checkValue });
        var selectedAnswerCount = filterData.length;
        if (selectedAnswerCount == 1 && filterData[0].value == question.answer) {
          rightAnswer++;
        } else {
          errorAnswerCount++;
        }
      })
    });
    this.summaryText = `答對: ${rightAnswer} 題，錯誤:${errorAnswerCount} 題`;
  }
}
