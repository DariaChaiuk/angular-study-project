import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private scroller: ViewportScroller) { }
  offers: any[] = [
    { 
      src: '../../../assets/woman-sea.jpg', 
      price: 6, 
      description: 'Sundresses from only', 
      filter: {key: 'collection', value: 'summer'}
    },
    { 
      src: '../../../assets/woman-vocation.jpg',
      price: 6,
      description: 'Wide variety of hats from',
      filter: {key: 'age', value: 'adult' }
    },
    { 
      src: '../../../assets/child.jpg',
      price: 6,
      description: 'Dresses for little princess from',
      filter: {key: 'age', value: 'child'}
    },
    { 
      src: '../../../assets/woman-home.jpg',
      price: 10,
      description: 'Cool looks for teenagers from',
      filter: {key: 'age', value: 'teenager'}
    },
  ];

  ngOnInit() {}

  openAboutUs() {
    this.scroller.scrollToAnchor("aboutus");
  }

  
}
