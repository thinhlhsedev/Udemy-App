import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[app-BasicHighlight-Directive]',
})
export class BasicHighlightDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
    elementRef;
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }


}
