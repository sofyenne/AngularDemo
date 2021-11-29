import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';
import { environment } from 'environments/environment';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
 event :  any = {}
 id : any
 techList: any[]
 etat  = ['ended','waiting']
  constructor(private router : Router, private userservice : AuthenticationService,private notif : NotificationsService , private http : HttpClient ,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.gettechnicien()
    this.id = this.route.snapshot.params.id ; 
    
      this.http.get(`${environment.apiUrl}/api/task/get/${this.id}`).subscribe((res)=>{
        this.event = res
        console.log(res)
      }
      , error => console.log(error))
      
    
  }


  updatetask(){
    console.log(this.event)
    this.http.put(`${environment.apiUrl}/api/task/${this.id}` , this.event).subscribe
    (()=>{this.notif.showNotification('success' , 'task updated')
    this.router.navigate(['/calendar'])}
    ,error =>{
      console.log(error) ;
      this.notif.showNotification('danger' , 'error at update')
    })
  }

  gettechnicien(){
    this.userservice.getalluser().then((res)=>{
      this.techList = res.filter(user => user.roles=='user');
    } , error => {
      console.log(error)
    })
  }


}
