import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import * as jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   userUri = environment.apiUrl+'/api/users';
  constructor(private http : HttpClient , private router : Router) { }
  

  login(formlogin : any) : Observable<any> {
   return this.http.post(`${this.userUri}/authenticate` , formlogin)  }

   tokenExists(): boolean {
    let token = localStorage.getItem('token');
     return token ? true : false
  }
  getDecodedToken() {
    let token = localStorage.getItem('token');
    if (token) {
       return jwtDecode(token)
    }else{
      return null
    }
  }

  logout(){
    localStorage.removeItem('currentuser')
    this.router.navigateByUrl('/login')
  }

  createuser(user : any) : Observable<any>{
    return this.http.post(`${this.userUri}/create` , user )
  }
  updateuser(user : any , id : any) : Observable<any>{
    return this.http.put(`${this.userUri}/${id}` , user)
  }
  async getalluser():Promise<any>{
  const res =await this.http.get(`${this.userUri}/all`).toPromise()
     return res
  }
  getoneuser(id : any) : Observable<any>{
    return this.http.get(`${this.userUri}/${id}`)
  }
  deleteuser(id : number): Observable<any>{
    return this.http.delete(`${this.userUri}/${id}`)
  }

}
