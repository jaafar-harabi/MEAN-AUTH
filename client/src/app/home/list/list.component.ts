import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contact:any
  userData:any


  constructor(private usercontact:ContactService,private user:UserService) { }

  ngOnInit(): void {
    this.userData=this.user.getDataFromToken()

    this.usercontact.getMyContact(this.userData._id)
      .subscribe({
        next:(res)=>{
          this.contact=res


        },error:(err)=>{
          console.log(err)
        }
      })


  }
  delete(id:any){
    this.usercontact.delete(id)
      .subscribe({
        next:(res)=>{
          this.ngOnInit()
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }
  
  }


