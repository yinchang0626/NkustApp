import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { modalController } from '@ionic/core';

@Component({
    selector: 'modal-page',
    templateUrl: 'modal.page.html'
})
export class ModalPage {

    @Input() sequence;

    responseData: any = {};
    ngTag: string;
    tag: string[] = [];
    title: string;
    description: string;

    constructor(navParams: NavParams) {
        // componentProps can also be accessed at construction time using NavParams
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.responseData.sequence = this.sequence;
        this.responseData.title = this.title;
        this.responseData.description = this.description;
        this.responseData.tag = this.tag;
        modalController.dismiss(this.responseData);
    }

    tagChange() {
        this.tag.push(this.ngTag)
        console.log(this.ngTag)
    }

}