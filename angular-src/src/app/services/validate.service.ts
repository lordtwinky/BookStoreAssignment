import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user)
  {
      if(user.email == undefined || user.username == undefined || user.password == undefined || user.shippingAddress == undefined || user.paymentMethod == undefined)
      {
        return false;
      }
      else{
        return true;
      }
  }

  validateBookCreate(book)
  {
      if(book.title == undefined || book.title == "" || book.author == undefined || book.author == "" || book.price == undefined || book.price == "" || book.image == undefined || book.image == "" || book.stock == undefined || book.stock == "" || book.category == "")
      {
        return false;
      }
      else{
        return true;
      }
  }

  validateBookCreateStockPrice(book)
  {
      if(book.stock >= 0 && book.price)
      {
        return true;
      }
      else{
        return false;
      }
  }

  validateEmail(email)
  {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateReview(review)
  {
      if(review.starRating == undefined || review.comment == undefined)
      {
        return false;
      }
      else{
        return true;
      }
  }

  validateRating(starRating){
    if(starRating >= 0 && starRating <= 5)
    {
      return true;
    }
    else{
      return false;
    }
  }

}
