import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceHolderDirective {

  //ViewContainerRef cho phep truy cap den noi ma directive se duoc su dung
  constructor(public viewContainerRef: ViewContainerRef){}


}
