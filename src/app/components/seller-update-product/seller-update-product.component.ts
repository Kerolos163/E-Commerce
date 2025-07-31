import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../model/product_model';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  updateProductMessage = '';
  updateProduct(productForm: ProductModel) {
    console.warn(productForm);
  }
}
