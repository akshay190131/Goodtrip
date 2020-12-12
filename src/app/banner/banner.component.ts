import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private wowservice : NgwWowService,private auth: AuthenticationService, private router : Router) { }

  ngOnInit() {
    // this.wowservice.init();
  }

  nsvigate(){
    if(!this.auth.isloggedin())
    {
      // console.log("Inside");
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/tourpackage']);
    }

  }


}
