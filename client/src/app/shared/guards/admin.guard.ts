import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../admin-auth/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AdminAuthService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.getLocalStorage())
        this.auth.logout();
    return true;
  }

  
  getLocalStorage (){
    if (localStorage.getItem('accessToken') && localStorage.getItem('userType')=='admin')
      return true;
    else 
      return false;
  }
  
}
