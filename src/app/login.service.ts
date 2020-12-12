import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  selectedEmployee: Login;
  employees:Login[];
  readonly baseurl='http://localhost:3000/login';

  constructor(private http:HttpClient) { }
  postEmployee(emp:Login)
  {
     return this.http.post(this.baseurl,emp);
  }
}
