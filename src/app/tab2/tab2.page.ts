import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal2/modal.page';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    datas: any[] = [{
        "id": 1,
        "title": "TODO 1",
        "tag": ["Work"],
        "description": "TODODetail",
        "isFinish": false
    },
    {
        "id": 2,
        "title": "TODO 2",
        "tag": ["Work", "Study"],
        "description": "TODODetail",
        "isFinish": true
    }];

    datasBuffer: any[] = this.datas;
    tagBuffer: any[] = [];
    lastNumofBuffer: number;

    constructor(public modalController: ModalController) { }

    ngOnInit() {
        this.datasBuffer.sort(function (a, b) {
            return a.tag.length - b.tag.length;
        });
        this.tagBuffer = this.datasBuffer[this.datasBuffer.length - 1].tag;
    }

    editAction(item: any) {
    }

    async presentModal(item: any) {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: { data: item }
        });
        return await modal.present();
    }

    async addAction() {
        const modal = await this.modalController.create({
            component: ModalPage,
        });
        return await modal.present();

    }
}
