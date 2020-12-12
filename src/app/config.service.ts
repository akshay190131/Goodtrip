import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
import { configuration } from './configuration';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from './post';
import { user } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'Application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiurl = 'api/posts';
  private teachmsg = new BehaviorSubject<string>("Default message");
  message = this.teachmsg.asObservable();
  config = configuration;
  constructor(private http: HttpClient) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('here');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getConfig() {
    return this.config;
  }

  sendmassage(message: string) {
    this.teachmsg.next(message);
  }

  getposts(): Observable<Post[]> {
    return this.http.get<any>(this.apiurl).pipe(
      tap(
        // post => console.log(post)
      ),
      catchError(this.handleError('get posts', []))
    );
  }


  getsettings(database: string, id?:string): Observable<any[]> {
    let uid = id || null;
    let url:string;
    uid !== null ? url = `api/${database}/${id}` : url =  `api/${database}`

    return this.http.get<any>(url).pipe(
      tap(
        // setting => console.log(setting)
      ),
      catchError(this.handleError('setting', []))
    );
  }


  getpostbyid(id: number) {
    return this.http.get<any>(`${this.apiurl}/${id}`).pipe(
      tap(
        // post => console.log(post)
      ),
      catchError(this.handleError('get posts by id', []))
    );
  }

  getuserbyid(id: number) {
    let url = 'api/user';
    return this.http.get<any>(`${url}/${id}`).pipe(
      tap(
        // user => console.log(user)
      ),
      catchError(this.handleError('get user by id', []))
    );
  }
  getuserbyname(user1:string): Observable<any> {
    let url = 'api/user';
    // console.log(user1);
    user1 = '^'+user1.trim()+'$';
    // console.log(user1);
    return this.http.get(url+ '?username=' + user1).pipe(
      tap(
        // user => console.log(user)
      )
    );
  }
  getuserbyemail(user1:string): Observable<any> {
    let url = 'api/user';
    user1 = user1.trim().replace('@', '%40');
    user1 = '^'+user1.trim()+'$';
    return this.http.get(url+ '?email=' + user1).pipe(
      tap(
        // user => console.log(user)
      )
    );
  }
  


  updateposts(formdata: NgForm): Observable<Post[]> {
    return this.http.put<any>(`${this.apiurl}`, formdata, httpOptions).pipe(
      tap(
        // post => console.log(post)
      ),
      catchError(this.handleError('Update posts', []))
    );
  }

  updateuser(formdata): Observable<any> {
    console.log(formdata);
    let url = 'api/user';
    return this.http.patch<any>(`${url}`, formdata, httpOptions).pipe(
      tap(
        user => {
          // console.log(user);
            const id = user.id;
           this.http.delete<any>(`${url}/${id}`, httpOptions).pipe(
            tap(us => {
              // console.log('deleted hero id='+us.id)
            }
            ),
            catchError(this.handleError('Delete user failed', []))
            );
          // user.username = formdata.username;
          Object.keys(formdata).forEach(key=>user[key]=formdata[key]);

          // console.log("Passed deletion");
          // console.log(user);
           this.http.post<any>(`${url}`, user).pipe(
            tap(
              // post => console.log(post)
            ));
        }
      ),
      catchError(this.handleError('Update user failed', []))
    );
  }

  updateemail(formdata): Observable<any> {
    console.log(formdata);
    let url = 'api/user';
    return this.http.patch<any>(`${url}`, formdata, httpOptions).pipe(
      tap(
        user => {
          console.log(user);
            const id = user.id;
           this.http.delete<any>(`${url}/${id}`, httpOptions).pipe(
            tap(us => {
              // console.log('deleted hero id='+us.id)
            }
            ),
            catchError(this.handleError('Delete user failed', []))
            );
          user.email = formdata.email;

          // console.log("Passed deletion");
          // console.log(user);
           this.http.post<any>(`${url}`, user).pipe(
            tap(
              // post => console.log(post)
            ));
        }
      ),
      catchError(this.handleError('Update user failed', []))
    );
  }

  updaterest(formdata): Observable<any> {
    console.log(formdata);
    let url = 'api/user';
    return this.http.patch<any>(`${url}`, formdata, httpOptions).pipe(
      tap(
        user => {
          console.log(user);
            const id = user.id;
           this.http.delete<any>(`${url}/${id}`, httpOptions).pipe(
            tap(us => {
              // console.log('deleted hero id='+us.id)
            }
            ),
            catchError(this.handleError('Delete user failed', []))
            );
          user.username = formdata.username;
          // console.log("Passed deletion");
          // console.log(user);
           this.http.post<any>(`${url}`, user).pipe(
            tap(
              // post => console.log(post)
            ));
        }
      ),
      catchError(this.handleError('Update user failed', []))
    );
  }

  addposts(formdata: NgForm): Observable<any> {
    return this.http.post<any>(`${this.apiurl}`, formdata).pipe(
      tap(
        // post => console.log(post)
      ),
      catchError(this.handleError('Add New posts', []))
    );
  }

}

