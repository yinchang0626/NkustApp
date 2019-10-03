import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.page.html'
})
export class ModalPage {

    @Input() data;

    modifyData: any = {};
    selectedTag: any;
    tag: any;
    title: string;
    description: string;
    options: any = [
        { name: "工作", value: '工作' },
        { name: "讀書", value: '讀書' }

    ]

    constructor(private navParams: NavParams, private modalCtrl: ModalController) {
        let data = navParams.get('data');
        this.modifyData = Object.assign(data);
        console.log(this.modifyData);
        this.selectedTag = data.tag;
    }
    
    dismiss() {
        this.modalCtrl.dismiss(null);
        
    }

    saveAction() {
        this.modifyData.tag = this.selectedTag;
        console.log(this.modifyData.tag, this.selectedTag);
        this.modalCtrl.dismiss(this.modifyData);
    }

    selectedOptionAction() {
        this.tag = this.selectedTag;
    }

}