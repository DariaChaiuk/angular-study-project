import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-gallery-good-item',
  templateUrl: './gallery-good-item.component.html',
  styleUrls: ['./gallery-good-item.component.css']
})
export class GalleryGoodItemComponent implements OnInit {
  @Input() offerItem!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToOffer(){
    this.router.navigate(['/view-all', {filterKey: this.offerItem.filter.key, filterValue: this.offerItem.filter.value}])
  }

}
