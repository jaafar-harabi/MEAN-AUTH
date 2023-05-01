import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  contactForm:FormGroup;

  constructor(private fb:FormBuilder,private _user:UserService,private _contact:ContactService,private _router:Router) {
    let controls={
      name:new FormControl('',[
        Validators.required
      ]),
      lastname:new FormControl('',[
        Validators.required
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      tel:new FormControl('',[
        Validators.required
      ]),
      address:new FormControl('',[
        Validators.required
      ]),
      image:new FormControl('',[
        Validators.required
      ])

    }
    this.contactForm=fb.group(controls)
   }
   image:any
   select(e:any){
    this.image= e.target.files[0];
  }
  userData:any
  ngOnInit(): void {
    this.userData=this._user.getDataFromToken()
  }
  create(){
    let fd= new FormData() ;
    fd.append('name',this.contactForm.value.name)
    fd.append('lastname',this.contactForm.value.lastname)
    fd.append('email',this.contactForm.value.email)
    fd.append('tel',this.contactForm.value.tel)
    fd.append('address',this.contactForm.value.address)
    fd.append('image',this.image)
    fd.append('idUser',this.userData._id)


    this._contact.create(fd)
      .subscribe({
        next:(res)=>{
          

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
            this._router.navigate(['/home/list'])

        },
        error:(err)=>{
          

                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })

        }
      })


  }
  

}
