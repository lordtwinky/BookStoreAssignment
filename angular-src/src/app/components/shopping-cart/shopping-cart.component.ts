import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  IDUser;
  shoppingCartID;
  shoppingCart;
  books = [];
  totalPrice = 0;
  user;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.IDUser = profile.user._id;
      this.shoppingCartID = profile.user.shoppingCart;
      this.user = profile.user;
      const shoppingCartI = {
        shoppingCartID: this.shoppingCartID
      }
      this.authService.getShoppingCart(shoppingCartI).subscribe(data => {
        this.shoppingCart = data.shoppingCart
        for (var i = 0; i < data.shoppingCart.books.length; i++) {
          const bookI = {
            bookID: data.shoppingCart.books[i]
          }
          this.authService.getBookPage(bookI).subscribe(data => {
            this.books.push(data.book);
            this.totalPrice += data.book.price
          },
            err => {
              return false
            });
        }
      },
        err => {
          return false
        });

    },
      err => {
        return false;
      });
  }

  remove(bookID, i) {
    //make change to totalprice

    this.totalPrice -= this.books[i].price

    //remove the deleted item from front-end
    this.books.splice(i, 1);

    //remove the deleted item in back-end
    const bookRemoveFromShoppingCart = {
      shoppingCartID: this.shoppingCartID,
      bookID: bookID
    }

    this.authService.updateShoppingCartDelete(bookRemoveFromShoppingCart).subscribe(data => {
    });

  }

  checkout() {

    // create transaction
    const transaction = {
      userID: this.IDUser,
      books: this.books,
      totalPrice: this.totalPrice,
      shippingAddress: this.user.shippingAddress,
      cardNumber: this.user.paymentMethod
    }
    for (var i = 0; i < this.books.length; i++) {
      const bookI = {
        bookID: this.books[i]._id
      }
      this.authService.adjustStockLevels(bookI).subscribe(data => {
      });
    }
    this.authService.createTransaction(transaction).subscribe(data => {
      this.removeItems()
    });
  }

  removeItems() {
    //remove from front-end
    this.books = [];

    //remove from back-end
    const purchase = {
      shoppingCartID: this.shoppingCartID
    }
    this.authService.updateShoppingCartPurchase(purchase).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Your purchase was successful', { cssClass: 'alert-success', timeout: 3000 });
      }
      else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
