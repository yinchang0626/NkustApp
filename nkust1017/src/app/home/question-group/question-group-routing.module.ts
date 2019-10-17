import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';


const routes: Routes = [
  {
    path:'',
    component:QuizPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionGroupRoutingModule { }
