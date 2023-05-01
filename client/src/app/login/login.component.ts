import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private _user:UserService,private route:Router) {
    let controls ={
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password:new FormControl('',[
        Validators.required
      ])
    }
    this.loginForm=fb.group(controls)
   }

  ngOnInit(): void {
  }

  token:any;

  login(){
    this._user.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.token=res
          localStorage.setItem('token',this.token.mytoken);
          this.route.navigate(['/home'])

        },
        error:(err)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'email or password invalid',
            showConfirmButton: false,
            timer: 1500
          })

        }
      })
  }
  


}
