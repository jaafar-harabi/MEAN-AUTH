import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _user:UserService,private router:Router){}
  canActivate(){
    if (this._user.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }

  }
    
  }
  

