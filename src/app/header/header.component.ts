import { Component, OnInit ,AfterContentChecked} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from '../config.service';
import { Observable, of } from 'rxjs';
import { user } from '../user';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterContentChecked {

  menu:any;
  isloggedin:boolean;
  database = 'menu';
  profileimage: string = 'https://img.icons8.com/ios/452/settings.png' ;
  user: user;

  constructor(private auth: AuthenticationService, private config : ConfigService) { }

  ngOnInit() {
    this.isloggedin = this.auth.isloggedin();

    this.getmenu(this.database);
    this.getuser();

  }

  ngAfterContentChecked() {
    // Called after every check of the component's or directive's content.
    // Add 'implements AfterContentChecked' to the class.
    // console.log(this.isloggedin);
    // this.isloggedin = this.auth.isloggedin();
    of(this.auth.isloggedin()).subscribe(
      () => {
        // console.log("contentchanged");
        this.getuser();
        this.isloggedin = this.auth.isloggedin();
      }
    );
  }
  
  logout()
  {
    this.auth.logout( );
  }

getmenu(database)
{
  this.config.getsettings(database).subscribe(
    settings => {this.menu = settings;
      // console.log(settings);
    }
  );
}

getuser()
{
  let localuser = JSON.parse(localStorage.getItem('currentuser'));
  // console.log("Function is running") 
  if(localuser )
  {
      // console.log("Insider If loop Function is running")
    this.config.getuserbyid(localuser.id).subscribe(
      user =>{
        if(user.image)
          {this.profileimage = user.image;}
        else  
        { this.profileimage = 'favicon.ico'; }
      }
    );       
  }
  else{
    this.profileimage = 'favicon.ico';
  }
  // console.log(this.profileimage);
}

}





















//      (<any>$)(function() {
//     var header = (<any>$)('.GreyHeader');
//     (<any>$)(document).scroll(function() {    
//         var scroll = (<any>$)(document).scrollTop();
//         console.log(scroll);
//         if (scroll >= 3300)
//         {
//             header.removeClass('FireBrickRed ').addClass('GreyHeader');
//         }
//         else if (scroll >= 2750)
//         {
//             header.removeClass('GreyHeader').addClass('FireBrickRed ');
//         }
//         else if (scroll >= 2100)
//         {
//             header.removeClass('FireBrickRed ').addClass('GreyHeader');
//         }
//         else if (scroll >= 700) {
//             header.removeClass('GreyHeader').addClass('FireBrickRed ');
//         }
//         else {
//             header.removeClass('FireBrickRed ').addClass('GreyHeader');
//         }
//     });
// });
