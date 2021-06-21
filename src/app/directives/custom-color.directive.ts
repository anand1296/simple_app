import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class CustomColorDirective implements OnChanges {

  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    console.log('inside custom color directive');
    // console.log(this.elementRef.nativeElement.style);
    this.elementRef.nativeElement.style.color = 'red';
  }

}
