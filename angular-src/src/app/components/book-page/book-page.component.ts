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
  book: Object;
  starRating: number;
  stars = [];
  comment;
  reviews = [];
  averageRating: number = 0.00;
  length;
  starValues = [];
  IDUser;
  bookStock;
  count: number = 0;
  totalStars: number = 0;
  averageStars: number = 0;
  antiStars = []

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

    this.authService.getProfile().subscribe(profile => {
      this.IDUser = profile.user._id;
    },
      err => {
        return false;
      });


    this.authService.getBookPage(bookI).subscribe(data => {
      this.book = data.book;
      this.bookStock = data.book.stock;
      this.length = data.book.reviews.length;
      for (var i = 0; i < data.book.reviews.length; i++) {

        const reviewI = {
          reviewID: data.book.reviews[i]
        }
        this.authService.getReview(reviewI).subscribe(data => {
          if (data.review.user != undefined && data.review.starRating != undefined) {
            const reviewStarRating = data.review.starRating
            const reviewComment = data.review.comment
            const userI = {
              userID: data.review.user
            }
            var username;
            this.authService.getUserbyID(userI).subscribe(data => {
              const review = {
                starRating: reviewStarRating,
                comment: reviewComment,
                user: data.user.username
              }
              this.totalStars = this.totalStars + reviewStarRating
              this.count = this.count + 1
              this.reviews.push(review)
              if (this.count == this.length) {
                this.averageRating = Math.round(this.totalStars / this.count * 100) / 100
                this.averageStars = Math.round(this.totalStars / this.count);
                for (var i = 0; i < this.averageStars; i++) {
                  const star1 = "star"
                  this.stars.push(star1)
                }
                for (var z = 0; z < 5 - this.averageStars; z++) {
                  const star1 = "star"
                  this.antiStars.push(star1)
                }

              }
            });

          }

        });

      }

    },
      err => {
        return false;

      });


  }

  reviewSubmit() {
    // console.log(this.reviews[0])
    const bookInfo = {
      bookID: this.bookID,
      starRating: this.starRating,
      comment: this.comment,
      userID: this.IDUser
    }

    //all fields must be filled in
    if (!this.validateService.validateReview(bookInfo)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //check for valid star rating (0-5)
    if (!this.validateService.validateRating(this.starRating)) {
      this.flashMessage.show('Please enter a number between 0 and 5', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.addReview(bookInfo).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Review submission successful', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Review submission error', { cssClass: 'alert alert-danger', timeout: 3000 });
      }
    });

  }

  addToShoppingCart() {
    if (this.bookStock > 0) {
      const bookIDuserID = {
        userID: this.IDUser,
        bookID: this.book
      }

      this.authService.addToShoppingCart(bookIDuserID).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Item has been added to your shopping basket', { cssClass: 'alert-success', timeout: 3000 });
        } else {
          this.flashMessage.show('Error', { cssClass: 'alert alert-danger', timeout: 3000 });
        }
      });
    }
    else {
      this.flashMessage.show('You cannot add this to you shopping cart as its stock is 0', { cssClass: 'alert alert-danger', timeout: 3000 });
    }
  }

}
