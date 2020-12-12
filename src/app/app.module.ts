import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HeaderComponent } from './header/header.component';
import { FeaturesComponent } from './features/features.component';
import { BannerComponent } from './banner/banner.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SliderComponent } from './slider/slider.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TourpackagesComponent } from './tourpackages/tourpackages.component';
import { PackageComponent } from './tourpackages/package/package.component';
import { LinksComponent } from './aboutus/links/links.component';
import { ConfigService } from './config.service';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { ArticleComponent } from './article/article.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagerService } from './pager.service';
import { ContactusComponent } from './contactus/contactus.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { NgwWowModule } from 'ngx-wow';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserdashboardModule } from './userdashboard/userdashboard.module';

import { Signup1Component } from './signup1/signup1.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    HeaderComponent,
    FeaturesComponent,
    BannerComponent,
    FeedbackComponent,
    SliderComponent,
    LoginComponent,
    SignupComponent,
    TourpackagesComponent,
    PackageComponent,
    LinksComponent,
    BlogComponent,
    PostComponent,
    ArticleComponent,
    NotfoundComponent,
    PaginationComponent,
    ContactusComponent,
    ArticleEditComponent,
    ArticleCreateComponent,
    NavmenuComponent,
    
    
    Signup1Component,
  ],
  imports: [
    BrowserModule,
    NgwWowModule,
    NgbModule,
    UserdashboardModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClientModule, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
)
  ],
  providers: [ConfigService,PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
