import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = 'http://127.0.0.1:3000/contact/'

  constructor(private http:HttpClient) { }

create(contact:any){
  return this.http.post(this.url+'create',contact)
}

getMyContact(idUser:any){
  return this.http.get(this.url+'getbyiduser/'+idUser)
}
getById(id:any){
  return this.http.get(this.url+'getbyid/'+id)
}
delete(id:any){
  return this.http.delete(this.url+'delete/'+id)
}

update(id:any,contact:any){
  return this.http.put(this.url+'update/'+id,contact)
}
}
