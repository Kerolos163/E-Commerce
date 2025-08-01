import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { SellerUserModel } from '../../model/seller_model';
import { CommonModule } from '@angular/common';
import { SellerUserLoginModel } from '../../model/seller_login_model';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  showLogin = true;
  authError = '';
  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.reloadSeller();
  }
  signUp(signupForm: SellerUserModel): void {
    this.sellerService.userSignUp(signupForm);
  }
  Login(loginForm: SellerUserLoginModel): void {
    this.sellerService.userLogin(loginForm);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is wrong';
        // alert('Invalid user details');
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
