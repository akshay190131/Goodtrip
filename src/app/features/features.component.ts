import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  public features:any = {};
  public message1:any = "";


  constructor(private config:ConfigService ) { }

  ngOnInit() {
    this.features = this.getfeatures();

  }

  getfeatures(){
    return this.config.getConfig().features;
  }

  setmessage(s1: string)
  {
    this.config.sendmassage(s1);
    // console.log("this is parent message");
    // console.log(s1); 
  }

}
