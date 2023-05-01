import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  intercept(req:any,next:any){
    let tokenizedReq=req.clone(
      {
        headers:req.headers.set('Authorization','bearer '+localStorage.getItem('token'))
      }
    )
    return next.handle(tokenizedReq)
  }
}
