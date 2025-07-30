import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SellerService);

  return authService.isSellerLoggedIn.pipe(
    take(1),
    map(function (isSellerLoggedIn) {
      console.warn('isSellerLoggedIn', isSellerLoggedIn);
      if (localStorage.getItem('seller')) {
        return true;
      }
      return isSellerLoggedIn ? true : false;
    })
  );
};
