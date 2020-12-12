import { Injectable } from '@angular/core';
import { InMemoryDbService , RequestInfo, ResponseOptions, STATUS, getStatusText} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
      const user = [
        { id: 1, name: 'Akshay', username: 'Akshay09',email:'190330131@klh.edu.in',password :'akshay','bio': 'Ur I can is better than ur IQ :)','phone':9390026605 ,'image':'akshay.png'},
        { id: 2, name: 'Prabhu Shakthi', username: 'Prabhu49',email:'190330250@klh.edu.in',password :'prabhu','bio': 'This is the Prabhu','phone':9573553145 ,'image':'prabhu.png'},
        { id: 3, name: 'Pranav', username: 'Pranav124',email:'190330124@klh.edu.in',password :'pranav','bio': 'Iam there!! ','phone':8374670855,'image':'pranav1.png'},
      ];   

      const menu = [
        {id: 1,title:'home',link: '/home'},
        {id: 2,title:'login',link: '/login'},
       
        {id: 3,title:'tour packages',link: '/tourpackage'},
        {id: 4,title:'FAQ',link: '/FAQ'},
        {id: 5,title:'signup',link: '/signup'},
        {id: 6,title:'profile',link: '/:name/profile'},
      ];

      const posts = [
        {id:1,title:'First one is always the king of the worlds',author:'Akshay',date:'2020-11-09 ',excert:'Traveled to the end of the World ....',image:'pic1.jpg'},
        {id:2,title:'No One Cares',author:'Prabhu',date:'2020-11-12 ',excert:'My life my rules.',image:'p2.jpg'},
       
        {id:3,title:'Time Heals',author:'Pranav',date:'2020-09-19',excert:'Time heals!!!',image:'p1.jpg'},
       
        {id:5,title:'last one',author:'Akshay-131',date:'2020-12-01',excert:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo aliquam eos eligendi delectus quam, labore expedita quas asperiores, quibusdam eius, saepe culpa? Id eius animi enim nisi sapiente officiis voluptas?',image:'pic2.jpg'},
        {id:6,title:'First Second one',author:'Akshay',date:'2020-12-19',excert:'Traveled to the end of the World',image:'pic1.jpg'},
        {id:7,title:'First Second one',author:'pranav',date:'2020-12-19',excert:'Traveled to the end of the World',image:'pic1.jpg'},
        {id:8,title:'First Second one',author:'Prabhu',date:'2020-12-19',excert:'Traveled to the end of the World',image:'pic1.jpg'},
        {id:9,title:'First Second one',author:'Pranav',date:'2020-12-19',excert:'Traveled to the end of the World',image:'pic1.jpg'},
        {id:10,title:'First Second one',author:'Prabhu',date:'2020-12-19',excert:'Traveled to the end of the World',image:'pic1.jpg'}, 
      ]

      return {user,posts,menu};
    }



    getToken(users)
    {
      return "This is a token";
    }

    get(reqInfo : RequestInfo)
    {
      if(reqInfo.collectionName === 'posts')
      {
        return this.getarticles(reqInfo);
      }
      return undefined;
    }

    getarticles(reqInfo:RequestInfo)
    {
        return reqInfo.utils.createResponse$(() => {
          const dataEncap = reqInfo.utils.getConfig().dataEncapsulation;
          const id = reqInfo.id;
          const collection = reqInfo.collection;
          const data = id === undefined ? collection : reqInfo.utils.findById(collection,id);


          // console.log(resonseBody);

          const options : ResponseOptions = data ?
          {
            body: dataEncap ? {data}:data,
            status: 200
          }:
          {
            body: { error: "Post not found"},
            status: 404
          };
          options.statusText = options.status === 200 ? 'ok' : 'not found';
          options.headers = reqInfo.headers;
          options.url = reqInfo.url;
          return options;
        });
    
    }



    post(reqInfo : RequestInfo)
    {
      if(reqInfo.id === 'login')
      {
        // console.log("from login");
        return reqInfo.utils.createResponse$(() => {
          const dataEncap = reqInfo.utils.getConfig().dataEncapsulation;
          const users = reqInfo.collection.find(usr => {
            return reqInfo.req['body'].username === usr.username && reqInfo.req['body'].password === usr.password;
          });
          // console.log(users);

          let resonseBody = {};
          if(users)
          { 
            resonseBody = {
              id: users.id,
              email: users.email,
              name: users.name,
              token : this.getToken(users)
            }; 

          }
          // console.log(resonseBody);

          const options : ResponseOptions = resonseBody ?
          {
            body: dataEncap ? {resonseBody}:resonseBody,
            status: 200
          }:
          {
            body: { error: "User with id= `${reqInfo.req['body'].username}` not found "},
            status: 404
          };

          options.statusText = options.status === 200 ? 'ok' : 'not found';
          options.headers = reqInfo.headers;
          options.url = reqInfo.url;
          return options;


        });
    }
      else if(reqInfo.id === 'signup')
      {
        reqInfo.id = null;
        // console.log("from signup");
      }

    }

    patch(reqInfo: RequestInfo): Observable<Response> {
      
      const users = reqInfo.collection.find(usr => {
        return reqInfo.req['body'].id === usr.id;
      });
      // console.log(users);
      // console.log("Inside Patch");



      const responseOptions: ResponseOptions = {
          headers: reqInfo.headers,
          url: reqInfo.url,
          body:users,
          status: STATUS.OK,
          statusText: getStatusText(STATUS.OK),
      }
      return reqInfo.utils.createResponse$(() => responseOptions);
  }



}
