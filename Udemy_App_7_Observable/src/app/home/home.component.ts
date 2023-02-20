import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubcription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubcription = interval(1000).subscribe(
    //   count => {
    //Todo
    //   }
    // );

    //Toan bo ve observable
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        //Moi thay doi ve data deu thong qua observer
        observer.next(count);
        if (count === 2) {
          observer.complete(); //Hoan thanh observable
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3 !'));
        }
        count++;
      }, 1000);
    });

    //Observable cho phep can thiep vao mot observable khac
    //Trong pipe() co nhieu built-in method, ex: map(), filter(),...
    //customIntervalObservable.pipe();

    //Moi lan count thay doi && observer goi method next, customIntervalObservable chay Todo vi da subcribe tu truoc
    this.firstObsSubcription = customIntervalObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          //Todo
          return 'Round' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          //Moi khi co thay doi ve data, phan xu ly o day se duoc chay
          //Todo
          console.log(data);
        },
        (error) => {
          //Error trong observable co the kill observable do ngay lap tuc
          //Xu ly loi o day
          //Todo
          console.log(error);
          alert(error.message);
        },
        () => {
          //Sau khi complete observable, day se la phan xu ly thong tin them
          //Todo
          console.log('Completed');
        }
      );
  }

  ngOnDestroy() {
    this.firstObsSubcription.unsubscribe;
  }
}
