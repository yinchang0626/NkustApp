import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Platform, NavController } from '@ionic/angular';

 export class DeviceInfo{
   id:string;
   advertising:any;
   rssi:Number;
   isEmmaDevice:boolean = false;
   timestamp:Date;
   constructor(x){
     this.id = x.id;
     this.advertising = x.advertising;
     this.rssi = x.rssi;
     this.isEmmaDevice = x.isEmmaDevice;
     this.timestamp = new Date();
   }
   
   update(x){
    this.advertising = x.advertising;
    this.rssi = x.rssi;
    this.timestamp = new Date();
   }
 }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  demoBLTDeviceID =  'F5:D4:4D:26:FC:E2';
  datas:any = [];
  constructor(private bleDevice:BLE,  private platform: Platform,public navCtrl: NavController ) {
    
  }
  ionViewWillEnter(){
    
    this.platform.ready().then(()=>{
      this.scanAllDevice();
    });
    
     setInterval(()=>{
       var date = Date.now();
       this.datas = this.datas.filter(element =>{
         return date - element.timestamp.getTime() < 5000;
       });
     },5000);
  }

  scanAllDevice(){
    //setInterval(()=>{
      this.bleDevice.startScanWithOptions([],{reportDuplicates:true}).subscribe(x=>{
        var index = this.datas.map(element =>{
          return element.id;
        }).indexOf(x.id);
        if(index == -1)
        {
          if(this.demoBLTDeviceID == x.id){
            x.isEmmaDevice = true;
          }
          this.datas.push(new DeviceInfo(x));
        }
        else{
          this.datas[index].update(x);
        }
      })
    //},1000);

  }

  connect(deviceId:string){
    this.bleDevice.connect(deviceId).subscribe(res=>{
      console.log(res);
    });
  }

}
