import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user!:User;

  constructor(private userService:UserService){
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.token;
  }
}
