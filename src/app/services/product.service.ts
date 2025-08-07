import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductModel } from '../model/product_model';
import { Observable } from 'rxjs';
import { CartModel } from '../model/cart_model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<ProductModel[]>();
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

  localAddToCart(product: ProductModel) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: ProductModel) => item.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(model: CartModel) {
    const url = 'http://localhost:3000/cart';
    return this.httpclient.post(url, model);
  }

  getCartList(userId: string) {
    const url = `http://localhost:3000/cart?userId=${userId}`;
    return this.httpclient.get<CartModel[]>(url);
  }
}
