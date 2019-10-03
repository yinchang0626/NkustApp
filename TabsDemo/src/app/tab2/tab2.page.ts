import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modals/todoModal/modal.page';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    public datas: any[] = [{
        "id": 1,
        "title": "TODO 1",
        "tag": ["工作"],
        "description": "TODODetail",
        "isFinish": false
    },
    {
        "id": 2,
        "title": "TODO 2",
        "tag": ["工作", "讀書"],
        "description": "TODODetail",
        "isFinish": true
    }];


    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    async presentModal(item: any) {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: { data: item }
        });
        modal.onDidDismiss().then((result) => {
            //有傳資料代表要更新陣列
            if (result.data) { 
                var findexDataIndex = this.datas.indexOf(item => {
                    return item.id == result.data.id;
                })
                if (findexDataIndex != -1) {
                    this.datas[findexDataIndex] = result.data;
                }
            }
            
        });
        return await modal.present();
    }

    async addAction(title: string) {
        var randomId = new Date().getUTCMilliseconds().toString() + new Date().getMinutes().toString();
        this.datas.push({
            "id": randomId,
            "title": title + randomId,
            "tag": [],
            "description": "TODO3Detail",
            "isFinish": false
        });

    }
    deletAction(data: any) {
        this.datas = this.datas.filter(item => {
            return item.id != data.id;
        });
    }

}
