import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConsts } from '../app-consts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  datas$:Observable<any[]>;
  constructor(private http:HttpClient) {
    
  }

  ngOnInit(){
    this.datas$ = this.http.get<any>(AppConsts.RemoteUrl + '/api/QuestionGroups');

  }
}
