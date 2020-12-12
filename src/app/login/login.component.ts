import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
/*import { NgForm } from '@angular/forms';
import {LoginService} from '../login.service';*/


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform : FormGroup;
  returnurl:String ;
  public err:any =false ;

  constructor( private fb : FormBuilder, private auth: AuthenticationService ,
    private router : Router
    , private route: ActivatedRoute, private wowService: NgwWowService) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      'username': [null,[Validators.required,Validators.minLength(3)]],
      'password': [null,Validators.required]
    });

    this.returnurl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    // this.wowService.init();
  }


  login(formData : NgForm)
  {
    // console.log(formData);
    this.auth.login(formData).subscribe
    ((user) => {
      if(!user.name)
     { 
       this.err = true;
     }
     else{
      this.router.navigate([this.returnurl]);
     }
    })
  }



/*
constructor(private loginService:LoginService){}
ngOnInit() {
  this.resetForm();
}
resetForm(form?:NgForm)
{
if(form)
form.reset();
this.loginService.selectedEmployee={
_id:"",
name:"",
email:"",
password:""

}
}
onSubmit(form:NgForm)
{
this.loginService.postEmployee(form.value).subscribe((res)=>{
  this.resetForm(form);

})
}
*/
}

