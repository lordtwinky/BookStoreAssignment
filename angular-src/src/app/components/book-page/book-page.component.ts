import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  bookID: string;
  book:Object;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookID = params['id'];
    });

    const bookI = {
      bookID: this.bookID
    }


    this.authService.getBookPage(bookI).subscribe(data => {
      this.book = data.book;
    },
    err => {
      return false;
    });
    

  

    
  }

}
