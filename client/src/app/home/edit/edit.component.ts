import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contactForm:FormGroup;
  id:any;
  contact:any;


  constructor(private fb:FormBuilder,private _act:ActivatedRoute,private _contact:ContactService,private _route:Router) { 
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
      ])

    }
    this.contactForm=fb.group(controls)

  }

  ngOnInit(): void {
    this.id=this._act.snapshot.paramMap.get('id')
    this._contact.getById(this.id)
      .subscribe({
        next:(res)=>{
          this.contact=res
          this.contactForm.controls['name'].setValue(this.contact.name)
          this.contactForm.controls['lastname'].setValue(this.contact.lastname)
          this.contactForm.controls['email'].setValue(this.contact.email)
          this.contactForm.controls['tel'].setValue(this.contact.tel)
          this.contactForm.controls['address'].setValue(this.contact.address)

        },error:(err)=>{
          console.log(err)
        }
      })
  }
  image:any
  select(e:any){
    this.image=e.target.files[0]
  }
  save(){
    let fd=new FormData()
    fd.append('name',this.contactForm.value.name)
    fd.append('lastname',this.contactForm.value.lastname)
    fd.append('email',this.contactForm.value.email)
    fd.append('tel',this.contactForm.value.tel)
    fd.append('address',this.contactForm.value.address)
    if (this.image){
      fd.append('image',this.image)


    }else{
      fd.append('image',this.contact.image)
    }
    this._contact.update(this.id,fd)
      .subscribe({
        next:(res)=>{
          this._route.navigate(['/home/list'])


        },
        error:(err)=>{
          console.log(err);
          
        }
      })
   

  }

}
