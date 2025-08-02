import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { authGuard } from './guards/auth.guard';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'seller-auth', component: SellerAuthComponent, title: 'Seller' },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    title: 'Seller Home',
    canActivate: [authGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    title: 'Seller Add Product',
    canActivate: [authGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    title: 'Seller Update Product',
    canActivate: [authGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'user-auth',
    component: UserAuthComponent,
    title: 'User Auth',
  },
];
