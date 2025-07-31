import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent {
  productList: ProductModel[] = [];
  deleteMessage: String | undefined;
  faTrash = faTrash;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe((res) => {
      if (res) {
        this.productList = res;
        console.warn(this.productList);
      }
    });
  }
  deleteItem(id: string) {
    this.productService.deleteItem(id).subscribe((res) => {
      console.warn(res);
      if (res) {
        this.deleteMessage = 'Product deleted successfully';
        setTimeout(() => {
          this.deleteMessage = undefined;
        }, 3000);
        this.getProductList();
      }
    });
  }
}
