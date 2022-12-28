import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[backgroundColor]'
})
export class PinkBackgroundDirective implements OnInit {
  @Input('backgroundColor') backgroundColor: string = '';
  defaultPinkBackground = 'rgb(241, 224, 227)';
  defaultGrayBackground = 'gainsboro';
  @HostBinding('style.backgroundColor') backgroundColorStyle: string = '';
  constructor() { }
  ngOnInit(): void {
    if(this.backgroundColor === 'gray'){
      this.backgroundColorStyle = this.defaultGrayBackground;
    }
    else{
      this.backgroundColorStyle = this.defaultPinkBackground;
    }
  }

}
