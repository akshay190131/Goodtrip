import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import { NgwWowService } from 'ngx-wow';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
 public banner:any =  {
  };



  constructor(private config : ConfigService,private wowservice : NgwWowService) { }

  ngOnInit() {
   this.banner =  this.getbanner();
  //  this.wowservice.init();

  }

  getbanner(){
    return this.config.getConfig().banner;
  }

}
