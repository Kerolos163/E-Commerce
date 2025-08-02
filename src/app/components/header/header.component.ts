import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType = 'default';
  sellerName = '';
  userName = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = JSON.parse(sellerStore!)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStorage = localStorage.getItem('user');
          let userData = JSON.parse(userStorage!);
          this.userName = userData.name;
          console.warn(this.userName);
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  sellerlogout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userlogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
}
