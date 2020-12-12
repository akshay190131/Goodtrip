import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import {ConfigService} from '../../config.service';
import { Subscription } from 'rxjs';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class PackageComponent implements OnInit {
 public package:any = {};
 public key:any = "nothing";
 public chilmsg:any = "";

  
 public param: Subscription;
  constructor(public config:ConfigService, public boot : NgbCarouselConfig ) { 

    boot.interval = 4000;
    boot.wrap = true;
    boot.keyboard = false;
    boot.pauseOnHover = false;

  }

  ngOnInit() {
   this.param =  this.config.message
   .subscribe(chilmsg => this.chilmsg = chilmsg)
   this.getchilmsg(this.chilmsg);
  }



  getchilmsg(chilmsg : string)
  {
if(chilmsg !== "Default message"){
    window.localStorage.setItem(this.key,chilmsg);
    const p1 = this.config.getConfig().package.place;
    const pack = p1.find(function(todo,index){
      return todo.name.toLowerCase() === chilmsg.toLowerCase();
    })
    // console.log(pack);
    this.package = pack;
  }
  else
  {
    // console.log(chilmsg);
    chilmsg = window.localStorage.getItem(this.key);
    // console.log(chilmsg);
    if(localStorage.getItem(this.key)!=="nothing")
    {
      this.getchilmsg(chilmsg);
    }
  }
}

}





