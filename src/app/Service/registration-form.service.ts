import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL ="http://localhost:8385/SpringMvc/users";
const API_URL_VOITURE ="http://localhost:8385/SpringMvc/";

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {
  constructor(private Http:HttpClient) {}
  
  create(user:any): Observable<any>{
    return this.Http.post(API_URL, user);
  }
}
