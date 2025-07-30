import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SellerModel } from '../model/seller_model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<Boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SellerModel) {
    console.log(data);
    const url = 'http://localhost:3000/seller';
    this.http
      .post<SellerModel>(url, data, { observe: 'response' })
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
}
