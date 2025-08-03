import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerUserModel } from '../../model/seller_model';
import { SellerUserLoginModel } from '../../model/seller_login_model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CartModel } from '../../model/cart_model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  showLogin = true;
  authError = '';

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.userService.userAuthReload();
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  signUp(signupForm: SellerUserModel) {
    this.userService.userSignUp(signupForm);
  }

  Login(loginForm: SellerUserLoginModel) {
    this.userService.userLogin(loginForm);
    this.userService.isLoginError.subscribe((isError) => {
      console.warn(isError);
      if (isError) {
        this.authError = 'Email or Password is wrong';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  localCartToRemoteCart() {
    console.warn('localCartToRemoteCart');
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList = JSON.parse(data);
      let currentUser = localStorage.getItem('user');
      let userId = currentUser && JSON.parse(currentUser).id;

      cartDataList.forEach((item: any) => {
        let cartItem: CartModel = {
          userId: userId!,
          product: item,
        };
        setTimeout(() => {
          this.productService.addToCart(cartItem).subscribe((res) => {
            console.warn(res);
          });
        }, 500);
      });
      localStorage.removeItem('localCart');
    }
  }
}
