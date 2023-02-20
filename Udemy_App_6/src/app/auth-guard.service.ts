import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  //CanActivate co the chay async (return ve Observable hoac Promise) va sync
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
