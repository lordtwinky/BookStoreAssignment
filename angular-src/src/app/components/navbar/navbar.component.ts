import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  admin = false;

  constructor(private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    //check if user is admin
    this.authService.getProfile().subscribe(profile => {
      this.admin = profile.user.admin;
    },
      err => {
        return false;
      })
  }
  
  onLogoutClick()
  {
    this.authService.logout();
    this.flashMessage.show('You have been logged out',{
      cssClass: 'alert-success',
      timeout: 3000});  

    this.router.navigate(['/login']);
    return false;
  }
}
