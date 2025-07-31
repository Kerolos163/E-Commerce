import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product_model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  addProduct(item: ProductModel) {
    const url = 'http://localhost:3000/products';
    return this.httpclient.post(url, item);
  }
}
