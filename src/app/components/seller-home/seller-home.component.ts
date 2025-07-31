import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: ProductModel[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProductList().subscribe((res) => {
      if (res) {
        this.productList = res;
        console.warn(this.productList);
      }
    });
  }
}
