import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url= 'http://127.0.0.1:3000/user/'

  constructor(private http:HttpClient) { }
  
  register(user:any){
    return this.http.post(this.url+'register',user)
  }

  login(user:any){
    return this.http.post(this.url+'login',user)
  }

  isLoggedIn(){
    let token=localStorage.getItem('token')
    if (token){
      return true
    }else{
      return false
    }
    
  }
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  getDataFromToken(){
    let token=localStorage.getItem('token') 

    if (token){

      return JSON.parse(window.atob(token.split('.')[1])) ;
    }

  }
}
