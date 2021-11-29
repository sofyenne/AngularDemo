import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm : FormGroup  ; 

  constructor(private notidfication : NotificationsService ,private formBuilder : FormBuilder ,private authentication : AuthenticationService,private router : Router ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required]] ,
      password : ['' , [Validators.required]]
    })
  }

  login(){
    console.log(this.loginForm.value)
    this.authentication.login(this.loginForm.value).subscribe((res)=>{
      
       localStorage.setItem('currentuser' , JSON.stringify(res))
        this.router.navigateByUrl('dashboard')
        this.notidfication.showNotification('success' , 'authentiaction succes')
      
    }, error => {console.log(error)
    this.notidfication.showNotification('danger' , 'login ro password incorrect')})

    
  }

}
