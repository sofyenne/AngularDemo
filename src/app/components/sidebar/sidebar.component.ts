import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: any[] = [
    { roles:['admin' , 'user'] , path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { roles:['admin' , 'user'] , path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { roles:['admin'],path: '/user-list', title: 'User List',  icon:'content_paste', class: '' },
    { roles:['admin'],path: '/user-create', title: 'Add new User',  icon:'library_books', class: '' },
    { roles:['admin' , 'user'],path: '/calendar', title: 'Calendar',  icon:'library_books', class: '' },
  
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

 async  ngOnInit() {
    let user =await JSON.parse(localStorage.getItem('currentuser'))
    let role = user.roles
    if(role!==null && role == 'user')
    this.menuItems = ROUTES.filter(menuItem => menuItem.roles.includes('user'));
    else this.menuItems = ROUTES
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
