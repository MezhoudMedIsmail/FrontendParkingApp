import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

  const API_URL = "http://localhost:8385/SpringMvc/users/";
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private Http : HttpClient) { }

  get():Observable<any>{

    return this.Http.get(API_URL+"assign-places");

  }


}
