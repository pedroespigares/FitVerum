import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.checkAuthStateAsync().then((res) => {
      if(this.auth.isLogged && !this.auth.isAdmin && !this.auth.isTrainer && res){
        return true;
      } else {
        this.router.navigate(['/error/403-forbidden']);
        return false;
      }
    });
  }

}
