import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionGroupRoutingModule } from './question-group-routing.module';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuizPageComponent],
  imports: [
    CommonModule,
    QuestionGroupRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class QuestionGroupModule { }
