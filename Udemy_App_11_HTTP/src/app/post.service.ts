import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    //HTTP request duoc handle boi Observable. Neu khong co observable nao subscribe toi, HTTP request do se bi bo qua boi Angular
    this.http
      .post(
        'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        {
          //Mac dinh la body, Angular se dong goi phan body trong response thanh json
          // response de lay full response
          // event de lay thong tin event, ex: Sent, Upload, Response,... thuoc HttpEventType
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPost() {
    // this.http
    //   .get<{ [key: string]: Post }>(
    //     'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
    //   )
    //   .pipe(
    //     map((responseData: { [key: string]: Post }) => {
    //       const postsArray: Post[] = [];
    //       for (const key in responseData) {
    //         if (responseData.hasOwnProperty(key)) {
    //           postsArray.push({ ...responseData[key], id: key });
    //         }
    //       }
    //       return postsArray;
    //     })
    //   )
    //   .subscribe((posts) => {});

    //HttpParams la kieu immutable => can override
    //Can add them bao nhieu key-value param thi append bay nhieu
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'prinLike');
    searchParams = searchParams.append('parent', 'prinLike');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({}),
          params: searchParams,
        }
      )
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deletePost() {
    return this.http
      .delete(
        'https://udemyapp-ca702-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
          //Mac dinh la json, co the chuyen thanh text, blob,...
          //blob
          //responseType thuc chat duoc config giong voi config kieu du lieu sau method, Ex: .delete<T>
          responseType: 'json',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
