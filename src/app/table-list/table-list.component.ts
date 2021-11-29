import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';
import { error } from 'protractor';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  listuser: any[] ; 

  constructor( private notidication : NotificationsService ,private authentication :AuthenticationService) { }

  ngOnInit():void {

    this.authentication.getalluser().then((res)=>{
      this.listuser = res ; 
      
    })
    .catch((error)=>console.log(error))
    
  }



  /**deleteUser(id : number){
    this.authentication.deleteuser(id).subscribe((res)=>{
      this.notidication.showNotification('success' , 'user deleted')
    }, eroor => {
      console.log(error);
      this.notidication.showNotification('danger' , 'error at delete user')
    })
  }


*/

}
