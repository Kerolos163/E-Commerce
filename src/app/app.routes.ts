import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { authGuard } from './guards/auth.guard';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';

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
];
