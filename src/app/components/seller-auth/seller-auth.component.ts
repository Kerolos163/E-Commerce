import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { SellerModel } from '../../model/seller_model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  showLogin = true;
  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.reloadSeller();
  }
  signUp(signupForm: SellerModel): void {
    this.sellerService.userSignUp(signupForm);
  }
  Login(loginForm: any): void {
    console.warn(loginForm);
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
