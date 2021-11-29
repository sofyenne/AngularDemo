import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';

@Component({
  selector: 'userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  listuser: any[] ; 
  constructor( private notidication : NotificationsService ,private authentication :AuthenticationService  , private router : Router) { }

  ngOnInit(): void {
    this.getALLuser()
  }

getALLuser(){
  this.authentication.getalluser().then((res)=>{
    this.listuser = res ; 
    
  })
  .catch((error)=>console.log(error))} ; 

  deleteUser(id : number){
    this.authentication.deleteuser(id).subscribe(()=>{
      
      
      this.notidication.showNotification('success' , 'user deleted')
      this.getALLuser()
    }
    , eroor => {
      console.log(eroor);
      this.notidication.showNotification('danger' , 'error at delete user')
    })
  }

  edit(id : any){
    this.router.navigate([`/user-profile/${id}`])
  }

}
