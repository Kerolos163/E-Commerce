import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SellerUserModel } from '../model/seller_model';
import { Router } from '@angular/router';
import { SellerUserLoginModel } from '../model/seller_login_model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
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

  userLogin(sellerUserLoginModel: SellerUserLoginModel) {
    const url = `http://localhost:3000/user?email=${sellerUserLoginModel.email}&password=${sellerUserLoginModel.password}`;
    this.httpClient.get(url, { observe: 'response' }).subscribe((res: any) => {
      if (res && res.body && res.body.length) {
        this.isLoginError.emit(false);
        localStorage.setItem('user', JSON.stringify(res.body[0]));
        this.router.navigate(['/']);
      } else {
        this.isLoginError.emit(true);
      }
    });
  }
}
