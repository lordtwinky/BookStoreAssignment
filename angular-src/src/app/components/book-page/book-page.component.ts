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
  starRating: Number;
  stars = [];
  comment;
  reviews = [];
  averageRating;
  length;
  starValues = [];
  IDUser;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    var count;

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
      this.length = data.book.reviews.length;
      for (var i = 0; i < data.book.reviews.length; i++) {

        const reviewI = {
          reviewID: data.book.reviews[i]
        }
        this.authService.getReview(reviewI).subscribe(data => {
          if (data.review.user != undefined) {
            const reviewStarRating = data.review.starRating
            const reviewComment = data.review.comment
            const userI = {
              userID: data.review.user
            }
            var username;
            this.authService.getUserPage(userI).subscribe(data => {
              const review = {
                starRating: reviewStarRating,
                comment: reviewComment,
                user: data.user.username
              }
              this.reviews.push(review)
            });

          }
          else {
            if (data.review.comment != undefined || data.review.starRating != undefined)
              this.reviews.push(data.review)
          }
        });

      }

    },
      err => {
        return false;

      });

    const star1 = "d"
    const star2 = "w"

    this.stars.push(star1, star2)





  }

  reviewSubmit() {
    // console.log(this.reviews[0])
    const bookInfo = {
      bookID: this.bookID,
      starRating: this.starRating,
      comment: this.comment,
      userID: this.IDUser
    }

    this.authService.addReview(bookInfo).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Review submission successful', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Review submission error', { cssClass: 'alert-success', timeout: 3000 });
      }
    });

  }

  addToShoppingCart() {
    const bookIDuserID = {
      userID: this.IDUser,
      bookID: this.book
    }
    this.authService.addToShoppingCart(bookIDuserID).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Item has been added to your shopping basket', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Error', { cssClass: 'alert-success', timeout: 3000 });
      }
    });
  }

}
