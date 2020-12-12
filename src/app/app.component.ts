import { Component } from '@angular/core';
// import { NgwWowService } from 'ngx-wow';
import { Router, NavigationEnd} from '@angular/router'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Good_Trip';

  constructor(private router: Router){
    //subscribes every changes of your route
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
           //scroll to top
           window.scrollTo(0,0);
        }
     });
 }


}
