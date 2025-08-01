import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product_model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  addProduct(item: ProductModel) {
    const url = 'http://localhost:3000/products';
    return this.httpclient.post(url, item);
  }

  getProductList(): Observable<ProductModel[]> {
    const url = 'http://localhost:3000/products';
    return this.httpclient.get<ProductModel[]>(url);
  }

  deleteItem(id: string) {
    const url = `http://localhost:3000/products/${id}`;
    return this.httpclient.delete(url);
  }

  getProductById(id: string) {
    const url = `http://localhost:3000/products/${id}`;
    return this.httpclient.get<ProductModel>(url);
  }

  updateProduct(product: ProductModel) {
    const url = `http://localhost:3000/products/${product.id}`;
    console.warn(url);
    return this.httpclient.put(url, product);
  }

  popularProducts() {
    const url = 'http://localhost:3000/products?_limit=3';
    return this.httpclient.get<ProductModel[]>(url);
  }
}
