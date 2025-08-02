import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerUserModel } from '../../model/seller_model';
import { SellerUserLoginModel } from '../../model/seller_login_model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  showLogin = true;
  authError = '';

  constructor(private userService: UserService) {}

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
    console.warn(loginForm);
  }
}
