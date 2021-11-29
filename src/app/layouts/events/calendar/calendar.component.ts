import { Component, OnInit } from '@angular/core';
import {
 
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { error } from 'protractor';
import { NotificationsService } from 'app/services/notification';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  eventForm : FormGroup

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  
  @ViewChild('taskContent', { static: true })    taskContent: TemplateRef<any>;

 

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [  ];
  event : any

  activeDayIsOpen: boolean = true;

 role : any

   ngOnInit() : void{
let user = JSON.parse(localStorage.getItem('currentuser'))
this.role = user.roles
   this.getallevent() ; 

   
  }


  constructor(private router : Router  , private modal: NgbModal , private http : HttpClient , private notif : NotificationsService ) {}

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

 
  

  deleteEvent(eventToDelete: CalendarEvent) {
    this.http.delete(`${environment.apiUrl}`+`/api/task/${eventToDelete.id}`).subscribe(()=>{
      this.notif.showNotification('success' , 'task deleted')  ; 
    } , er =>{
      console.log(er);
      this.notif.showNotification('danger' , 'error at delete task')
    })
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getallevent(){
    this.http.get(environment.apiUrl+"/api/task/all").subscribe((res:any)=>{
      let user= JSON.parse(localStorage.getItem('currentuser'));
     
      if (res.length > 0) {
        if(user.role !== null && user.roles=='user'){
        
         let r = res.filter(e=>e.technicien == user.userId)
       
         if(r.length>0){
          r.map(e => {
            this.addEvents({ ...e, startDate: new Date(e.start), endDate: new Date(e.end) })
          })
         }
        
        }else {
          res.map(e => {
            this.addEvents({ ...e, startDate: new Date(e.start), endDate: new Date(e.end) })
          })
        }
        }
        
   

    } , error=>console.log(error))
  } ;



  addEvents(element: any): void {
    this.events = [
      ...this.events,
      {
        id : element.tacheId , 
        title: element.tache,
        start: element.startDate,
        end: element.endDate,
        color: element.etat == 'ended' ? colors.red : colors.blue,
        technicen :element.technicen,
        status : element.etat
      }
    ];
  }; 


  
}

