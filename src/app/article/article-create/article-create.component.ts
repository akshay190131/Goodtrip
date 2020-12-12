import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AuthenticationService } from  '../../authentication.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { ConfigService } from 'src/app/config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  
  postcreateform : FormGroup;
  returnurl:String ;
  id: number;

  constructor( private fb : FormBuilder, private auth: AuthenticationService ,
    private router : Router
    , private route: ActivatedRoute, private wowService: NgwWowService,
    private config: ConfigService, private location : Location ) { }

  ngOnInit() {
    this.postcreateform = this.fb.group({
          // 'id': [null,Validators.required],
      'title': [null,Validators.required],
      'author':[this.getauthor(),Validators.required],
      'date':[Date.now(),Validators.required],
      'excert':[null,Validators.required],
      'image':[null,Validators.required],
    });
  
    this.wowService.init();


  }

 

addpost(formdata : NgForm)
{
  this.config.addposts(formdata).subscribe(
  (post) => this.router.navigate([`article/${post.id}`])    
  );
}

getback()
{
  this.location.back();
}

getauthor()
{
  return this.auth.getuser()['id'];
}

}
