import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { Good } from 'src/app/models/good';
import { GoodService } from '../../services/good.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartActions } from '../cart-page/store/cart.actions';

@Component({
  selector: 'app-good-details',
  templateUrl: './good-details.component.html',
  styleUrls: ['./good-details.component.css']
})
export class GoodDetailsComponent implements OnInit {
  selectedGood!: Good;

  constructor(
    private store: Store<{ goodItem: { selectedItem: Good } }>,
    private goodService: GoodService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.goodService.getById(params['id']);
      })
    ).subscribe(good => {
      this.selectedGood = good
    })
  }

  addToCart(){
    this.store.dispatch(CartActions.additem({good: this.selectedGood}));
  }

}
