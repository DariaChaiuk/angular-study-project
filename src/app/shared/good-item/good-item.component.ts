import { Component, Input, OnInit } from '@angular/core';
import { Good } from 'src/app/models/good';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoodItemActions } from './store/good-item.actions';
import * as fromApp from '../../store/app.reducer';
import { CartActions } from '../../pages/cart-page/store/cart.actions';

@Component({
  selector: 'app-good-item',
  templateUrl: './good-item.component.html',
  styleUrls: ['./good-item.component.css']
})
export class GoodItemComponent implements OnInit {
  @Input() good!: Good;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

  }

  showDetails() {
    this.router.navigate(['/details', this.good.id]);
  }

  addToCart() {
    this.store.dispatch(CartActions.additem({good: this.good}));
  }
}
