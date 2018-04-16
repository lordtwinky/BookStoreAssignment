import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userID;
  user;
  transactions = [];
  admin;
  
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });

    const userI = {
      userID: this.userID
    }
    this.authService.getUserbyID(userI).subscribe(data => {
      this.user = data.user;
      this.admin = data.user.admin;
      for (var i = 0; i < data.user.transactions.length; i++) {
        const transactionI = {
          transactionID: data.user.transactions[i]
        }
        this.authService.getTransactionByID(transactionI).subscribe(data => {
          this.transactions.push(data.transaction);
        },
          err => {
            return false;
          });
      }
    },
      err => {
        return false;
      });
  }

}
