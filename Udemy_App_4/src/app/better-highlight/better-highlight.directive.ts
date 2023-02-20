import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';


  ngOnInit() {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    //Dung cach nay de set style tot hon set style truc tiep len element,
    //vi co nhung browser ma minh khong the sua truc tiep o DOM
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;
  //HostBinding co tac dung nhu Renderer

  @HostListener('mouseenter') mouseOver(eventData: Event){
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    //=> Xu ly behavior nhu hover, mouse over, mouse leave,...
    //this.backgroundColor = 'blue'; => hardcode
    this.backgroundColor = this.highlightColor; //=> binding dynamic tien loi cho viec sua doi, con co the gan gia tri trong template (@Input())
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event){
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    //this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }
}
