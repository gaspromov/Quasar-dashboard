import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.getLocalStorage())
        this.router.navigate(['/admin-panel/home']);
    return true;
  }

  
  getLocalStorage (){
    if (localStorage.getItem('accessToken') && localStorage.getItem('userType')=='admin')
      return true;
    else 
      return false;
  }
  
}
