import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from  '../../authentication.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { ConfigService } from 'src/app/config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  posteditform : FormGroup;
  returnurl:String ;
  id: number;

  constructor( private fb : FormBuilder, private auth: AuthenticationService ,
    private router : Router
    , private route: ActivatedRoute, private wowService: NgwWowService,
    private config: ConfigService, private location : Location ) { }

  ngOnInit() {
    this.posteditform = this.fb.group({
      'id': [null,Validators.required],
      'title': [null,Validators.required],
      'author':[null,Validators.required],
      'date':[null,Validators.required],
      'excert':[null,Validators.required],
      'image':[null,Validators.required],
    });
    this.id = this.route.snapshot.params['id'] || null;
  if (this.id){
    this.postbyid(this.id)
    {

    }
  }
    
    this.wowService.init();


  }

  postbyid(id:number)
  {
      this.config.getpostbyid(id).subscribe(
        post => {
          this.posteditform.setValue({
            id: post.id,
            title: post.title,
            author: post.author,
            date: post.date,
            excert : post.excert,
            image:post.image 
          });
        }
      )
  }

updatepost(formdata : NgForm)
{
  this.config.updateposts(formdata).subscribe(
  () => this.getback()    
  )
}

getback()
{
  this.location.back();
}
}
