import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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
  categories: Array<Object> =[];

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    function Category(id, name){
      this.id = id;
      this.name = name;
    }

    var categoryNames = ["Comedy", "Drama", "Horror fiction", "Romance", "Satire", "Tragedy", "Fantasy", "Adventure"]
    for(var index = 0; index < categoryNames.length; index++){
      var categoryObject = new Category(index+1, categoryNames[index]);
      this.categories.push(categoryObject)
    }
  }

  onCreateBookSubmit() {
    const book = {
      title: this.title,
      author: this.author,
      price: this.price,
      category: this.category,
      image: this.image,
      stock: this.stock
    }

    //all fields must be filled in
    if (!this.validateService.validateBookCreate(book)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //stock and price must be positive numbers
    if (!this.validateService.validateBookCreateStockPrice(book)) {
      this.flashMessage.show('Price and stock must be equal or bigger than 0', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    

    //Create book
    this.authService.createBook(book).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Book added successfully', { cssClass: 'alert-success', timeout: 3000 });
        // this.router.navigate(['/browseBooks']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

  }

}
