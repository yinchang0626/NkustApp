import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.page.html'
})
export class ModalPage {

    @Input() data;

    responseData: any = {};
    ngTag: string;
    tag: string[] = [];
    title: string;
    description: string;
    options: any = [
        { name: "¤u§@", value: 'work' },
        { name: "Åª®Ñ", value: 'student' }

    ]

    constructor(private navParams: NavParams, private modalCtrl: ModalController) {
        this.data = {};
    }
    
    dismiss() {
        this.modalCtrl.dismiss(this.responseData);
        
    }

    saveAction() {
        this.responseData.id = this.data.id;
        this.responseData.title = this.title;
        this.responseData.description = this.description;
        this.responseData.tag = this.tag;
        this.modalCtrl.dismiss(this.responseData);
    }

    tagChange() {
        this.tag.push(this.ngTag)
    }

}