import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

 public intro:any = {  };


  constructor( public config:ConfigService ) { }

  ngOnInit() {
    this.intro = this.getintro();
  }

 public getintro(){
    return this.config.getConfig().aboutus;
  }
}
