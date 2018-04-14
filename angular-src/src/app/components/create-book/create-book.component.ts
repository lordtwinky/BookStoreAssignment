import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  title: String;
  author: String;
  price: String;
  category: String;
  image: Number;
  stock: Number;
  categories: Array<Object>;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.categories = []
    const category1 = {id:1, name:"Comedy"};
    const category2 = {id:2, name:"Drama"};
    const category3 = {id:3, name:"Horror fiction"};
    const category4 = {id:4, name:"Romance"};
    const category5 = {id:4, name:"Satire"};
    const category6 = {id:4, name:"Tragedy"};
    const category7 = {id:4, name:"Fantasy"};
    const category8 = {id:4, name:"Adventure"};
    this.categories.push(category1, category2, category3, category4, category5, category6, category7, category8)
  }

  onCreateBookSubmit(){
    const book = {
      title: this.title,
      author: this.author,
      price: this.price,
      category: this.category,
      image: this.image,
      stock: this.stock
    }

    //all fields must be filled in
    if(!this.validateService.validateBookCreate (book)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Create book
    this.authService.createBook(book).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Book added successfully', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/browseBooks']);
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
