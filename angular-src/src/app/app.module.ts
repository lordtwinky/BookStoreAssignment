import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { BrowseBooksComponent } from './components/browse-books/browse-books.component';
import { ViewCustomersComponent } from './components/view-customers/view-customers.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterByAuthorPipe } from './pipes/filter-by-author.pipe';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'addBook', component: CreateBookComponent, canActivate:[AuthGuard]},
  {path: 'browseBooks', component: BrowseBooksComponent, canActivate:[AuthGuard]},
  {path: 'BookPage', component: BookPageComponent, canActivate:[AuthGuard]},
  {path: 'BookPage/:id', component: BookPageComponent, canActivate:[AuthGuard]},
  {path: 'browseUsers', component: ViewCustomersComponent, canActivate:[AuthGuard]},
  {path: 'UserPage', component: UserPageComponent, canActivate:[AuthGuard]},
  {path: 'UserPage/:id', component: UserPageComponent, canActivate:[AuthGuard]},
  {path: 'shoppingCart', component: ShoppingCartComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    CreateBookComponent,
    BrowseBooksComponent,
    ViewCustomersComponent,
    BookPageComponent,
    UserPageComponent,
    ShoppingCartComponent,
    OrderByPipe,
    FilterPipe,
    FilterByAuthorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, OrderByPipe, FilterPipe, FilterByAuthorPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
