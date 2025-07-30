import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { SellerModel } from '../../model/seller_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  constructor(private sellerService: SellerService, private router: Router) {}
  signUp(signupForm: SellerModel): void {
    this.sellerService.userSignUp(signupForm).subscribe((data) => {
      if (data) {
        this.router.navigate(['seller-home']);
      }
    });
  }
}
