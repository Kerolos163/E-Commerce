import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../model/product_model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData: ProductModel | undefined;
  updateProductMessage: String | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getProductById(params.id);
    });
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe((res) => {
      this.productData = res;
      console.warn(this.productData);
    });
  }

  updateProduct(productForm: ProductModel) {
    productForm.id = this.productData?.id ?? '';
    this.productService.updateProduct(productForm).subscribe((res) => {
      console.warn(res);
      if (res) {
        this.updateProductMessage = 'Product Updated Successfully';
        setTimeout(() => {
          this.updateProductMessage = undefined;
          this.router.navigate(['seller-home']);
        }, 3000);
      }
    });
  }
}
