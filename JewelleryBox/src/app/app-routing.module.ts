import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomeComponent } from './pages/home/home.component';
import { JewelsComponent } from './pages/jewels/jewels.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'jewels',component:JewelsComponent},
  {path:'about',component:AboutComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'cart-page',component:CartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
