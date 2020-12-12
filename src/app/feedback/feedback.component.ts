import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

 public feedback:any = {}

  constructor(private config:ConfigService ) { }

  ngOnInit() {
    this.feedback = this.getfeedback();

  }

  getfeedback(){
    return this.config.getConfig().feedback;
  }

}
