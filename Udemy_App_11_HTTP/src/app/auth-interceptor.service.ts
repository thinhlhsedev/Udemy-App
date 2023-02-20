import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  //Interceptor cho phep config request linh hoat hon
  //Interceptor chay ngay truoc khi request roi di & truoc khi response subcribe
  //Angular se chay nhung xu ly trong interceptor, roi dung HttpHandler next de tiep tuc request req
  //Xu ly cua interceptor co the la config request hien hanh, valid req,...
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on way');
    //Clone request hien tai de modify
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'key'),
    });

    return next.handle(modifiedRequest);
    // .pipe(
    //   tap((event) => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Request came !');
    //       console.log(event.body);
    //     }
    //   })
    // );
  }
}
