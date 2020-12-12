import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-usericon',
  templateUrl: './usericon.component.html',
  styleUrls: ['./usericon.component.css']
})
export class UsericonComponent implements OnInit {
@Input() profileimage : any;
  constructor() { }

  ngOnInit() {
  }

}
