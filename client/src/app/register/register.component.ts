import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm:FormGroup ;

  constructor(private fb:FormBuilder,private _user:UserService,private route:Router) {
    let control={
      name: new FormControl('',[
        Validators.required
      ]),
      lastname:new FormControl('',[
        Validators.required
      ]),
      email:new FormControl('',[
        Validators.required
      ]),
      password:new FormControl('',[
        Validators.required
      ])
    
    }
    this.registerForm=this.fb.group(control)
   }

  ngOnInit(): void {
  }

  register(){
    this._user.register(this.registerForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your account has been created',
            showConfirmButton: false,
            timer: 1500
          })

          this.route.navigate(['/login'])


        },
        error:(err)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'please try again',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigate(['/register'])

        }
      })
      }

  }


