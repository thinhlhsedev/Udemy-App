import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    //ViewContainerRef cho phep truy cap den noi ma directive se duoc su dung
  constructor(public viewContainerRef: ViewContainerRef) {}
}
