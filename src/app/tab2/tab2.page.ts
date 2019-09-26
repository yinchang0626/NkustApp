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
    "sequence": 1,
    "title": "TODO 1",
    "tag": ["Work"],
    "description": "TODODetail",
    "isFinish": false
  },
  {
    "sequence": 2,
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

    console.log(this.datasBuffer[this.datasBuffer.length - 1]);
    this.tagBuffer = this.datasBuffer[this.datasBuffer.length - 1].tag;
    for (let i in this.tagBuffer) {
      console.log(this.tagBuffer[i])
    }
  }

  editAction(item: any) {
    console.log(item.sequence);
  }

  async presentModal(sequence: number,tagBuffer:any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { sequence,tagBuffer}
    });
    modal.onDidDismiss()
      .then((response) => {
        for (let i in this.datas) {
          if (this.datas[i].sequence == response.data.sequence && response.data.title != undefined) {
            this.datas[i].title = response.data.title;
          }
          if (this.datas[i].sequence == response.data.sequence && response.data.description != undefined) {
            this.datas[i].description = response.data.description;
          }
          if (this.datas[i].sequence == response.data.sequence && response.data.tag.length != 0) {
            this.datas[i].tag = response.data.tag;
          }
        }
      });
    return await modal.present();
  }

    addAction(){
    }



}
