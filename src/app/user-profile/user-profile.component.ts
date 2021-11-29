import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentuser : any ; 
  tokenn : any 
    constructor(private rout: ActivatedRoute , private notification :NotificationsService ,private authService : AuthenticationService , private router : Router , private route : ActivatedRoute) { }

 async  ngOnInit() {
    let id =  await this.rout.snapshot.params.id
    if(id!=null){
       this.authService.getoneuser(id).subscribe((res)=>{
         this.currentuser = res
       })
        
    }
    else{
       
      if(localStorage.getItem('currentuser')!=null){
      
        this.currentuser=JSON.parse(localStorage.getItem('currentuser')||'{}')
    }

    
  }}
  getuser(){
   /**  let token = this.authService.getDecodedToken();
    if(token){
      this.tokenn = token 
      let id = this.tokenn.id
      let user = localStorage.getItem('id')
      this.authService.getoneuser(id).subscribe((response : any)=>{
        this.currentuser=response
        console.log(response)
      },
      error=> console.log(error))**/

    }
    updateuserprofile(): void {
      delete(this.currentuser.date)
      console.log(this.currentuser)
      this.authService.updateuser(this.currentuser,this.currentuser.userId).subscribe((res)=>{
        this.notification.showNotification('success' , 'user updated')
      } , error => { console.log(error)
      this.notification.showNotification('danger' , 'error at update user')}
      )
    }

  }
    


