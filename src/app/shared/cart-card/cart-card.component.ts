import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { CartItem } from '../../models/cart-item';
import { CartActions } from '../../pages/cart-page/store/cart.actions';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {
  @Input() cartItem!: CartItem

  constructor(private store: Store<fromApp.AppState>) { }
  number = 0;

  ngOnInit(): void {
    this.number = this.cartItem.numberOfItems
  }

  deleteItem(id: string | undefined){
    this.store.dispatch(CartActions.removeitem({ cartItem: this.cartItem}));
  }

  numberChanged($event: any){
    this.cartItem = {...this.cartItem, numberOfItems: this.number}
    this.store.dispatch(CartActions.updateitem({ cartItem: this.cartItem}));
  }

}
