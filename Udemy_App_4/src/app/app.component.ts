import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Udemy_App_4';

  numbers = [1, 2, 3, 4, 5];
  odds = [1, 3, 5];
  evens = [2, 4];
  onlyOdd = false;

  value = 10;
}
