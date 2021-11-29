import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';

@Component({
  selector: 'createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
    userForm : FormGroup  ; 
  constructor(private notificationService : NotificationsService ,  private formBuilder : FormBuilder , private authservice : AuthenticationService , private router : Router) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      email : ['' , [Validators.required]],
      password : ['' , [Validators.required]],
      firstname : ['' , [Validators.required]],
      lastname : ['' , [Validators.required]],
      roles: 'user' ,
    })
  }

  submit(){
    console.log(this.userForm.value)
    this.authservice.createuser(this.userForm.value).subscribe((res)=>{
      console.log(res)
      this.notificationService.showNotification('success' , 'user created')
      this.router.navigate(['/table-list']);

    },error => { console.log(error)
      this.notificationService.showNotification('danger' , 'error at create user')} )
    
  }
  
}
