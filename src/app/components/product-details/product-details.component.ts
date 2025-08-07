import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';
import { CommonModule } from '@angular/common';
import { CartModel } from '../../model/cart_model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: ProductModel | undefined;
  counter: number = 1;
  removedCart = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getProductById(params.id);

      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: ProductModel) => {
          return item.id === params.id;
        });
        console.warn(items);
        if (items.length) {
          this.removedCart = true;
        } else {
          this.removedCart = false;
        }
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId).subscribe((res) => {
          let items = res.filter((item: CartModel) => {
            return item.product.id === params.id;
          });
          if (items.length) {
            this.removedCart = true;
          } else {
            this.removedCart = false;
          }
        });
      }
    });
  }

  increment() {
    this.counter = this.counter + 1;
  }

  decrement() {
    if (this.counter > 1) {
      this.counter = this.counter - 1;
    }
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe((res) => {
      this.product = res;
      console.warn(this.product);
    });
  }

  addToCart() {
    if (this.product) {
      this.product.quantity = this.counter;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.product);
        this.removedCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: CartModel = {
          userId: userId!,
          product: this.product,
        };
        console.warn(cartData);
        this.productService.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.removedCart = true;
          }
        });
      }
    }
  }
  removeFromCart(id: string) {
    this.productService.removeItemFromCart(id);
    this.removedCart = false;
  }
}
