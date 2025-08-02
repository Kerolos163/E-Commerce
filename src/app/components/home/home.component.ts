import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, transition, style, animate } from '@angular/animations';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fade', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  currentItem = 0;
  popularProducts: ProductModel[] = [];
  productList: ProductModel[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getPopularProducts();
    this.getAllProducts();
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
  prevSlide() {
    if (this.currentItem === 0) {
      this.currentItem = this.popularProducts.length - 1;
    } else {
      this.currentItem--;
    }
  }
  nextSlide() {
    if (this.currentItem === this.popularProducts.length - 1) {
      this.currentItem = 0;
    } else {
      this.currentItem++;
    }
  }

  getPopularProducts() {
    this.productService.popularProducts().subscribe((res) => {
      if (res) {
        this.popularProducts = res;
        console.warn(this.popularProducts);
      }
    });
  }

  getAllProducts() {
    this.productService.getProductList().subscribe((res) => {
      if (res) {
        this.productList = res;
        console.warn(this.productList);
      }
    });
  }
}
