import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config.service';
import { user } from '../../user';
import { FormGroup, FormBuilder, Validators, NgForm ,  ReactiveFormsModule, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  user : user;
  isloggedin: boolean;
  ct: boolean[] = [true,true,true,true,true];
  editform : FormGroup;
  editusername : FormGroup;
  edituseremail : FormGroup;

  constructor( private router : Router, private config: ConfigService,private fb : FormBuilder, ) { }

  ngOnInit() {
    this.getuser();

    this.editform = this.fb.group({
      'id': [null,Validators.required],
      'name': [null,[Validators.required, Validators.minLength(4)]],
      'bio':[null, Validators.maxLength(25)],
      'image':[null],
      'phone':[null],
    });
    // ,Validators.pattern
    this.editusername = this.fb.group({
      'id': [null,Validators.required],
      'username':[null,[Validators.required, Validators.minLength(2)],[this.uniqueval()]],
    });

this.edituseremail = this.fb.group({
      'id': [null,Validators.required],
      'email':[null,[Validators.required, Validators.email],[this.uniqueemail()]],
    });
    

  }
  // this.updateuser = this.fb.group({});

  // 
  getuser()
  {
    var localuser = JSON.parse(localStorage.getItem('currentuser'));
    // console.log(localuser.id);
    this.config.getuserbyid(localuser.id).subscribe(
        user =>{
          this.user = user;
          this.fillform(user);

        }
    );
      this.isloggedin = true;
    
  }

  fillform(user)
  {
    this.editform.setValue({
      id: user.id,
      name: user.name,
      bio : user.bio,
      image: user.image,
      phone: user.phone
    });
    // console.log(user);

    this.editusername.setValue({
      id: user.id,
      username: user.username
    });

    this.edituseremail.setValue({
      id: user.id,
      email: user.email
    });

  }


  logout()
  {
    localStorage.removeItem('currentuser');
    this.isloggedin = false;
    this.router.navigate(['/home']);
  }

  edit(ind:number)
  {
    this.ct[ind]=false;
  }
  show(id:number)
  {
    this.editform.reset();
    this.editusername.reset();
    this.edituseremail.reset();
    
    this.fillform(this.user);
    this.ct[id]=true;
    
  }

  updateform(formdata : NgForm,ind:number)
  {
    // console.log(formdata);
    this.config.updateuser(formdata).subscribe(
    () => {
      this.getuser();
    }   
    );
    this.show(ind);
  }

  uniqueval(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let debounceTime = 700; //milliseconds
      return timer(debounceTime).pipe(switchMap(()=> {
      return this.config.getuserbyname(control.value).pipe(
        map(users => {
          return (users && users.length > 0) ? {"userExists": true} : null;
      return null; 
        })
      );
    })
  );
  }
  }

  uniqueemail(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let debounceTime = 700; //milliseconds
      return timer(debounceTime).pipe(switchMap(()=> {
      return this.config.getuserbyemail(control.value).pipe(
        map(users => {
          return (users && users.length > 0) ? {"emailExists": true} : null;
      return null; 
        })
      );
    })
  );
  }
  }


}
