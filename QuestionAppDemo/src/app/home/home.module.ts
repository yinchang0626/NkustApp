import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PageService } from './page.service';
import { SuccessComponent } from './success/success.component';
import { FailComponent } from './fail/fail.component';
import { AddQuestionComponent } from './add-question/add-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'add-question',
        component: AddQuestionComponent,
      },
      {
        path: 'sucess',
        component: SuccessComponent,
      },
      {
        path: 'fail',
        component: FailComponent,
      }

    ])
  ],
  providers:[PageService],
  declarations: [HomePage,SuccessComponent,FailComponent,AddQuestionComponent]
})
export class HomePageModule {}
