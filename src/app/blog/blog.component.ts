import { Component, OnInit ,Input} from '@angular/core';
import {ConfigService} from '../config.service';
import { PagerService } from '../pager.service';
import {Post} from '../post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
 
  blog: any = {};
  allitems: any[] = [];
  pages: any[] = [];
  pager : any = {};
  pagesize = 4;
  posts: Post[];

  constructor(private config :ConfigService , private pagerserv: PagerService) { }

  ngOnInit() {
    this.blog = this.getblogs();
    this.getposts();
  }

  getblogs(){
    return this.config.getConfig().blog;
  }
  getposts()
  {
    this.config.getposts().subscribe(
      posts => {
        this.posts = posts;
        this.allitems = this.posts;
        // console.log("array length is");
        // console.log(this.allitems);
        this.setpage(1);
      }
    );
  }

  setpage(pagenumber : number)
  {
    this.pager = this.pagerserv.getpager(this.allitems.length ,pagenumber,this.pagesize);

    this.pages = this.allitems.slice(this.pager.startindex,this.pager.endindex+1);  
  }

}
