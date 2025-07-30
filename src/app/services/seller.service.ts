import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SellerModel } from '../model/seller_model';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  userSignUp(data: SellerModel): Observable<SellerModel> {
    console.log(data);
    const url = 'http://localhost:3000/seller';
    return this.http.post<SellerModel>(url, data);
  }
}
