import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { Platform, NavController } from '@ionic/angular';

 export class DeviceInfo{
   id:string;
   advertising:any;
   rssi:Number;
   isEmmaDevice:boolean = false;
   timestamp:Date;
   //測試用裝置ID
   private demoBLTDeviceID =  'F5:D4:4D:26:FC:E2';
   constructor(x){
     this.id = x.id;
     this.advertising = x.advertising;
     this.rssi = x.rssi;
     this.isEmmaDevice = x.isEmmaDevice;
     this.timestamp = new Date();
     this.checkIsEmmaDevice();
   }


   checkIsEmmaDevice(){
    if(this.demoBLTDeviceID == this.id){
      this.isEmmaDevice = true;
    }else{
      this.isEmmaDevice = false;
    }
     

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

  datas:any;
  isOnlyShowEmmDevice: boolean  = true;
  debug;
  constructor(private bleDevice:BLE,  private platform: Platform,public navCtrl: NavController ) {
    
  }
  ionViewWillEnter(){
    
    this.platform.ready().then(()=>{
      this.scanAllDevice();
      this.removeDeviceFromListIfTimeout(5000);
    });
    
    
  }


  private removeDeviceFromListIfTimeout(timeout:number){
    setInterval(()=>{
      var date = Date.now();
      this.datas = this.datas.filter(element =>{
        return date - element.timestamp.getTime() < timeout;
      });
    },timeout);

  }

  scanAllDevice(){
      this.bleDevice.startScanWithOptions([],{reportDuplicates:true}).subscribe(x=>{
        if(!this.datas) this.datas = [];
        var index = this.datas.map(element =>{
          return element.id;
        }).indexOf(x.id);
        if(index == -1)
        {
          var data = new DeviceInfo(x);
          if(this.isOnlyShowEmmDevice){
            if(data.isEmmaDevice){
              this.datas.push(data);
            }
          }else{
            this.datas.push(data);
          }
        }
        else{
          this.datas[index].update(x);
        }
      });
  }

  connect(deviceId:string){
    this.bleDevice.connect(deviceId).subscribe(res=>{
      this.debug = res;
    });
  }

  clearDevice(){
    this.datas = [];
  }
}
