import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  items: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.store.select('cart').subscribe(data => {
      this.items = data.cartItems;
      this.totalPrice = 0;
      data.cartItems.forEach(x => this.totalPrice += x.item.price * x.numberOfItems);
    })
  }

}
