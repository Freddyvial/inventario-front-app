import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn() && next.url[0].path !== '/login') {
      this.router.navigateByUrl('/login');
      return false;
    }
    console.log('next.url::', next.url[0].path);
    if (this.authService.isLoggedIn() && next.url.length && next.url[0].path === '') {
      this.router.navigateByUrl('/login');
      return false
    }

    return true;
  }

}
