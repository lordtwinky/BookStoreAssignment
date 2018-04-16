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
      if(book.title == undefined || book.author == undefined || book.price == undefined || book.image == undefined || book.stock == undefined)
      {
        return false;
      }
      else{
        return true;
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
