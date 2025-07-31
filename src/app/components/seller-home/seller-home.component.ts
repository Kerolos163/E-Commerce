import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/product_model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  faPen = faPen;
  constructor(private productService: ProductService,private router: Router) {}
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

  editItem(id: string) {
    console.warn(id);
    this.router.navigate(['seller-update-product', id]);
  }
}
