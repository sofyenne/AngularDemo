import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationsService } from 'app/services/notification';
import { environment } from 'environments/environment';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  eventForm: FormGroup;
etat  = ['ended','waiting']
techList : any[];
tech =['sofien' , 'ali']
apiUrl = environment.apiUrl+'/api/task'
  constructor(private router : Router ,private notification : NotificationsService ,private formbuilder : FormBuilder , private userService : AuthenticationService , private http : HttpClient) { }

  ngOnInit(): void {
    this.eventForm = this.formbuilder.group({
      tache : ['',[Validators.required]],
      etat : ['' ,[Validators.required]],
      start : ['',[Validators.required]],
      end : ['',[Validators.required]],
      technicien : ['',[Validators.required]],
      
      
    })

    this.gettechnicien()
  }




  gettechnicien(){
    this.userService.getalluser().then((res)=>{
      this.techList = res.filter(user => user.roles=='user');
    } , error => {
      console.log(error)
    })
  }

   createtask(){
     let task : any = this.eventForm.value
    
     this.http.post(`${this.apiUrl}/create`, task).subscribe
    ((res)=>{
      
      this.notification.showNotification("success" , "task created")
      this.router.navigate(['/calendar'])
    } , error =>{
      console.log(error) , 
      this.notification.showNotification('danger' , error)
    })
     
  }

}
