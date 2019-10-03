import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss'],
})
export class FailComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  backAction(){
    this.router.navigate(['../']);

  }
}
