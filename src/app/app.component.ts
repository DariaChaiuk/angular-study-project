import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from './pages/auth-page/store/auth.actions';
import { CartActions } from './pages/cart-page/store/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') sideMenu!: MatDrawer;

  title = 'shop';
  showSideMenu = false;
  isAuthenticate = false;
  cartGoodsNumber = 0;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { };

  ngOnInit(): void {
    this.store.select('auth')
    .pipe(map(data => data.user))
    .subscribe(user => {
      this.isAuthenticate = !!user;
    });
    this.store.dispatch(AuthActions.autologin());
    this.store.dispatch(CartActions.loaditems());
    this.store.select('cart').subscribe(data => {
      this.cartGoodsNumber = 0;
      data.cartItems.forEach(element => {
        this.cartGoodsNumber += element.numberOfItems
      });
    })
  }

  setIsSideMenuShown(isEventFromSideBar: boolean) {
    if (!this.showSideMenu && isEventFromSideBar) {
      return;
    }
    this.showSideMenu = !this.showSideMenu;
    this.sideMenu.toggle();
  }

  goToLogin() {
    if (this.isAuthenticate) {
      this.store.dispatch(AuthActions.logout());
    }
    this.router.navigate(['/login']);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
}
