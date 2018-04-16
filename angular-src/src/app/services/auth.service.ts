import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  book: any;

  constructor(private http:Http ) { }

  registerUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user)
  {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn()
  {
    return tokenNotExpired("id_token");
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  createBook(book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/books/createBook', book, {headers: headers})
      .map(res => res.json());
  }

  getBooks(){
    let headers = new Headers();
    return this.http.get('http://localhost:3000/books/bookList', {headers: headers})
    .map(res => res.json());
  }

  getBookPage(bookID){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/books/getBookbyID', bookID, {headers: headers})
    .map(res => res.json());
  }

  updateBook(book){
    let headers = new Headers();
    return this.http.put('http://localhost:3000/books/updateBook', book, {headers: headers})
    .map(res => res.json());
  }
  
  deleteBook(book){
    let headers = new Headers();
    return this.http.put('http://localhost:3000/books/deleteBook', book, {headers: headers})
    .map(res => res.json());
  }

  addReview(bookRating){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/reviews/addReview', bookRating, {headers: headers})
    .map(res => res.json());
  }

  getReview(reviewID){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/reviews/getReviewbyID', reviewID, {headers: headers})
    .map(res => res.json());
  }

  getUsers(){
    let headers = new Headers();
    return this.http.get('http://localhost:3000/users/userList', {headers: headers})
    .map(res => res.json());
  }

  getUserbyID(userID){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/users/getUserbyID', userID, {headers: headers})
    .map(res => res.json());
  }

  getShoppingCart(shoppingCartID){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/shoppingCarts/getShoppingCartbyID', shoppingCartID, {headers: headers})
    .map(res => res.json());
  }

  addToShoppingCart(userIDBookID){
    let headers = new Headers();
    return this.http.post('http://localhost:3000/shoppingCarts/addBookToShoppingCart', userIDBookID, {headers: headers})
    .map(res => res.json());
  }

  updateShoppingCartDelete(bookRemoveFromShoppingCart){
    let headers = new Headers();
    return this.http.put('http://localhost:3000/shoppingCarts/updateShoppingCartDelete', bookRemoveFromShoppingCart, {headers: headers})
    .map(res => res.json());
  }

  updateShoppingCartPurchase(purchase){
    let headers = new Headers();
    return this.http.put('http://localhost:3000/shoppingCarts/ShoppingCartPurchase', purchase, {headers: headers})
    .map(res => res.json());
  }

  createTransaction(transaction){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/transactions/createTransaction', transaction, {headers: headers})
      .map(res => res.json());
  }

  getTransactionByID(transactionID){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/transactions/getTransactionByID', transactionID, {headers: headers})
      .map(res => res.json());
  }

  adjustStockLevels(bookID){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/books/AdjustStockLevels', bookID, {headers: headers})
      .map(res => res.json());
  }
  

}
