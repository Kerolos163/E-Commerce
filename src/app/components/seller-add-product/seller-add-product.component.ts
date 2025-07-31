import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: String | undefined;
  constructor(private productService: ProductService) {}

  addProduct(productForm: ProductModel) {
    this.productService.addProduct(productForm).subscribe((res) => {
      console.warn(res);
      if (res) {
        this.addProductMessage = 'Product added successfully';
        setTimeout(() => {
          this.addProductMessage = undefined;
        }, 3000);
      }
    });
  }
}
