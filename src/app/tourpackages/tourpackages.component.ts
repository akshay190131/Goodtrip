import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-tourpackages',
  templateUrl: './tourpackages.component.html',
  styleUrls: ['./tourpackages.component.css']
})
export class TourpackagesComponent implements OnInit {

 public tourpack:any = {};
 public message1:any = "";

  constructor(private config:ConfigService ) { }

  ngOnInit() {
    this.tourpack = this.getfeatures();

  }

  getfeatures(){
    return this.config.getConfig().tourpackages;
  }

  setmessage(s1: string)
  {
    this.config.sendmassage(s1);
    // console.log("this is parent message");
    // console.log(s1); 
  }
}
