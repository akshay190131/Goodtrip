import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TourpackagesComponent } from './tourpackages/tourpackages.component';
import { PackageComponent } from './tourpackages/package/package.component';
import { LinksComponent } from './aboutus/links/links.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { ArticleComponent } from './article/article.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {RouteguardService } from './routeguard.service';
import { ContactusComponent } from './contactus/contactus.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { UserdashboardModule } from './userdashboard/userdashboard.module';




const routes: Routes = [
  { path: '', redirectTo: '/home',pathMatch:'full'},
  { path: 'home', component: SliderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', loadChildren: () => UserdashboardModule , canActivate: [RouteguardService]},
  { path: 'tourpackage', component: TourpackagesComponent},
  { path: 'package', component: PackageComponent},
  { path: 'FAQ',component: LinksComponent},
  { path: 'blog' , component: BlogComponent },
  { path: 'article/:id' , component: ArticleComponent },
  { path: 'article-edit/:id' , component: ArticleEditComponent , canActivate: [RouteguardService] },
  { path: 'article-create' , component: ArticleCreateComponent , canActivate: [RouteguardService]},
  { path: '404' , component: NotfoundComponent },
  { path: 'contactus' , component: ContactusComponent },
  { path: '**' , redirectTo: '/404'},
  
  
  // { path: '' , component:  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
