import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellerUserModel } from '../model/seller_model';
import { Router } from '@angular/router';
import { SellerUserLoginModel } from '../model/seller_login_model';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<Boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SellerUserModel) {
    console.log(data);
    const url = 'http://localhost:3000/seller';
    this.http
      .post<SellerUserModel>(url, data, { observe: 'response' })
      .subscribe((res) => {
        console.warn(res);
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: SellerUserLoginModel) {
    const url = `http://localhost:3000/seller?email=${data.email}&password=${data.password}`;

    this.http.get(url, { observe: 'response' }).subscribe((res: any) => {
      console.warn(res.body);
      if (res && res.body && res.body.length) {
        this.isLoginError.emit(false);
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(res.body));
        this.router.navigate(['seller-home']);
      } else {
        console.warn('User not found');
        this.isLoginError.emit(true);
      }
    });
  }
}
