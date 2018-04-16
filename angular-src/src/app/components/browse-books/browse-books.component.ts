import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe'
import { FilterByAuthorPipe } from '../../pipes/filter-by-author.pipe'
import { OrderByPipe } from '../../pipes/order-by.pipe'
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe'


@Component({
  selector: 'app-browse-books',
  templateUrl: './browse-books.component.html',
  styleUrls: ['./browse-books.component.css']
})
export class BrowseBooksComponent implements OnInit {
  books;
  admin;
  attributesAscending = [];
  attributesDescending = [];
  categories = [];
  
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private filter: FilterPipe,
    private order: OrderByPipe,
    private filterByAuthor: FilterPipe,
    private categoryFilter: CategoryFilterPipe
  ) { }

  ngOnInit() {
    //check if user is admin
    this.authService.getProfile().subscribe(profile => {
      this.admin = profile.user.admin;
    },
      err => {
        return false;
      })
    //get books
    this.authService.getBooks().subscribe(data => {
      this.books = data.books
    });


    function Category(id, name){
      this.id = id;
      this.name = name;
    }

    var categoryNames = ["Comedy", "Drama", "Horror fiction", "Romance", "Satire", "Tragedy", "Fantasy", "Adventure"]
    for(var index = 0; index < categoryNames.length; index++){
      var categoryObject = new Category(index+1, categoryNames[index]);
      this.categories.push(categoryObject)
    }

    function Attribute(name, ascdesc){
      if(ascdesc == "asc"){
        this.name = name;
      }
      else{
        this.name = "-" + name
      }
      
    }

    var attributesAscending = ["title", "author", "price", "stock", "category"]

    for(var index = 0; index < attributesAscending.length; index++){
      var attributeAscendingObject = new Attribute(attributesAscending[index], "asc");
      this.attributesAscending.push(attributeAscendingObject)
      var attributeDescendingObject = new Attribute(attributesAscending[index], "desc");
      this.attributesDescending.push(attributeDescendingObject)
    }


  }

  edit(book) {

    //all fields must be filled in
    if (!this.validateService.validateBookCreate(book)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.updateBook(book).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Update successful', { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this.flashMessage.show('Update error', { cssClass: 'alert alert-danger', timeout: 3000 });
      }
    });
  }




}
