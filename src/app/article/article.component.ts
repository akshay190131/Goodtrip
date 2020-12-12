import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute} from '@angular/router'; 
import { ConfigService } from '../config.service';
import { Location } from '@angular/common';
import { Post } from '../post';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public post:any = Post;
  constructor(private route: ActivatedRoute,private config: ConfigService,private loc:Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
   this.getpostbyid(id); 
  }
  getlocback()
  {
    this.loc.back();
  }
  getpostbyid(id: number)
  {
    return this.config.getpostbyid(id).subscribe(
      post => {this.post = post
            // console.log(post);
          }
    );  
  }

}
