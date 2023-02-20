import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/shared/analytics.service';
import { HighlightDirective } from 'src/app/shared/highlight.directive';

@Component({
  //standalone cmp la cmp khong can khai bao trong declarations:[] cua NgModule
  //Tuy nhien, standalone cmp la mot cmo doc lap, co the reusable o nhieu cmp khac, nhung Angular khong nhan dien duoc vi khong khai bao trong ngModule
  // => khai bao standalone cmp trong imports:[] cua NgModule
  standalone: true,
  imports: [HighlightDirective],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
