import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerUserModel } from '../model/seller_model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}


  userSignUp(sellerUserModel: SellerUserModel) {
    const usr = 'http://localhost:3000/user';
    return this.httpClient
      .post(usr, sellerUserModel, { observe: 'response' })
      .subscribe((res) => {
        console.warn(res);
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
