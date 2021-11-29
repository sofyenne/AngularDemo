import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { CreateuserComponent } from 'app/createuser/createuser.component';
import { UserlistComponent } from 'app/userlist/userlist.component';
import { CalendarComponent } from '../events/calendar/calendar.component';
import { AddTaskComponent } from '../events/add-task/add-task.component';
import { UpdateTaskComponent } from '../events/update-task/update-task.component';



export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'user-list',     component: UserlistComponent},
    {path : 'user-create'    , component : CreateuserComponent},
    {
        path : 'calendar' , component : CalendarComponent
    },
    {
        path : 'add-task' , component : AddTaskComponent
    } , 
    {
        path : 'update-task/:id' , component : UpdateTaskComponent
    }
  
  
];
