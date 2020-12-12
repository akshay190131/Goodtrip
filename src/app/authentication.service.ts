import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap,catchError,map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'api/user';
  //  isloggedin:boolean;

   handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Reahere');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http:HttpClient, private router: Router) { }

  signup(formdata : NgForm)
  {
    return this.http.post<any>( `${this.apiUrl}/signup`,formdata).pipe(
      tap(user => {
        // console.log(user);
      }),
      catchError(this.handleError('getHeroes', []))
    );
  }

  login(formdata : NgForm)
  {
    // console.log(formdata);
    return this.http.post<any>(`${this.apiUrl}/login`,formdata).pipe(
      tap(user => {
        // console.log(user);
        if(user && user.token)
        {
        localStorage.setItem('currentuser',JSON.stringify(user));
        // this.isloggedin = true;
      }
      }),
      catchError(this.handleError('getHeroes', []))
    );
  }

  logout()
  {
    localStorage.removeItem('currentuser');
    // this.isloggedin = false;
    this.router.navigate(['/home']);
  }


  isloggedin()
  {
    if(localStorage.getItem('currentuser'))
    {
      return true;
    }
    else
      return false;
  }

  getuser()
  {
    if(this.isloggedin){
      return JSON.parse(localStorage.getItem('currentuser'));
    }
  }
}
