import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            {
                path: 'index',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage]
})
export class HomePageModule { }
