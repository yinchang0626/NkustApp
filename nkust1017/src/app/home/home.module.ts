import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
  
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: '1',
        loadChildren: ()=> import('./question-group/question-group.module').then(m=>m.QuestionGroupModule)
      },
      {
        path: '2',
        loadChildren: ()=>  import('./question-group/question-group.module').then(m=>m.QuestionGroupModule)
      },
      {
        path: '3',
        loadChildren: ()=> import('./question-group/question-group.module').then(m=>m.QuestionGroupModule)
      }

    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
