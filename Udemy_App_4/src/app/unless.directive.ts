import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
//De su dung truong hop nay, can dat ten ham set() giong ten selector
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
      //Tao view trong view container nay dua tren param la Template templateRef
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
