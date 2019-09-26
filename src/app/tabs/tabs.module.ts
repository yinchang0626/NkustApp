import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ModalPage } from '../tab2/modals/todoModal/modal.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule
    ],
    declarations: [TabsPage, ModalPage],
    entryComponents: [ModalPage]

})
export class TabsPageModule { }
