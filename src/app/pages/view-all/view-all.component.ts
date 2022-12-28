import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectChange } from '@angular/material/select';
import { map, Observable, Subscription } from 'rxjs';
import { AgesService } from 'src/app/services/ages.service';
import { checkPositiveNumberInput } from 'src/app/utils/number.validator';
import { Good } from '../../models/good';
import { GoodService } from '../../services/good.service';
import { SettingsData } from '../../utils/settings-data';
import { CollectionService } from '../../services/collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent implements OnInit {

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;
  ages!: string[];
  collections!: string[];
  filtersData!: FormGroup;
  goods!: Good[];
  filteredGoods!: Good[];
  selectedItem!: Good | {};

  sortBy: any[] = [
    'price asc',
    'price desc',
    'label asc',
    'label desc'
  ]

  constructor(
    private goodService: GoodService,
    private agesService: AgesService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.filtersData = new FormGroup({
      ageFilter: new FormControl('all'),
      collectionFilter: new FormControl('all'),
      showNewCollection: new FormControl(false),
      priceFrom: new FormControl(0, checkPositiveNumberInput()),
      priceTo: new FormControl(0, checkPositiveNumberInput())
    })


    this.route.params.subscribe(x => {
      switch (x['filterKey']) {
        case 'age':
          this.filtersData.patchValue({ ageFilter: x['filterValue'] })
          break;
        case 'collection':
          this.filtersData.patchValue({ collectionFilter: x['filterValue'] })
          break;
      }
    })

    this.goodService.getAll()
      .pipe(
        map((data: Good[]) => {
          return data.sort(x => x.price)
        })
      )
      .subscribe(goods => {
        this.goods = goods;
        this.filteredGoods = goods;
        this.applyFilters();
      });
    this.agesService.getAll().subscribe(ages => this.ages = ages);
    this.collectionService.getAll().subscribe(collections => this.collections = collections);
  }

  filter() {
    if (this.filtersData.valid) {
      this.applyFilters()
    }
  }

  applyFilters() {
    const filters = this.filtersData.value;
    this.filteredGoods = this.goods;
    if (filters.ageFilter) {
      if (filters.ageFilter !== 'all') {
        this.filteredGoods = this.filteredGoods.filter(x => x.age === filters.ageFilter)
      }
    }
    if (filters.collectionFilter) {
      if (filters.collectionFilter !== 'all') {
        this.filteredGoods = this.filteredGoods.filter(x => x.collection === filters.collectionFilter)
      }
    }
    if (filters.showNewCollection) {
      this.filteredGoods = this.filteredGoods.filter(x => x.isNewCollection === filters.showNewCollection)
    }
    if (filters.priceFrom) {
      this.filteredGoods = this.filteredGoods.filter(x => x.price >= +filters.priceFrom)
    }
    if (filters.priceTo) {
      this.filteredGoods = this.filteredGoods.filter(x => x.price <= +filters.priceTo)
    }
  }

  sortGoods(event: MatSelectChange) {
    const params = SettingsData.sortOptions.find(i => i.value === event.value);
    if (!params) {
      return;
    }
    this.goods.sort(params.sortFn);
  }
}
