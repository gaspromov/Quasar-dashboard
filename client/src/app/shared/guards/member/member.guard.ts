import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  constructor(
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.getLocalStorage() && !this.get_cookie('userType')){
        this.router.navigate(['/license'])
      }
      
    return true;
  }

  
  get_cookie ( cookie_name ){
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results )
      return ( unescape ( results[2] ) );
    else
      return false;
  }

  
  getLocalStorage (){
    if (localStorage.getItem('member')=='true')
      return true;
    else 
      return false;
  }
  
}
