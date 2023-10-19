import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL_History ="http://localhost:8385/SpringMvc/History";
const API_URL ="http://localhost:8385/SpringMvc/placeparkings/";
const API_URL_USERS = "http://localhost:8385/SpringMvc/users/sortPlacewithusers"
@Injectable({
  providedIn: 'root'
})

export class PlaceParkingService {
  apiUrl ="http://localhost:8385/SpringMvc/placeparkings/";
constructor(private Http : HttpClient) {

  }

  create(placeparking:any,IdParking : number): Observable<any>{

    return this.Http.post(API_URL+"add-placeparking/"+IdParking, placeparking);

  }

  get():Observable<any>{

    return this.Http.get(API_URL+"retrieve-AllPlaceParkings");

  }

  getById(id :number):Observable<any>{

    return this.Http.get(API_URL+id);

  }

  delete(id:number) : Observable<any>{

    return this.Http.delete(API_URL+"delete-placeparking/"+id)

  }

  modify(IdParking : number,placeparking:any) : Observable<any>{

    return this.Http.put(API_URL+"Modify-placeparking/"+IdParking, placeparking);

  }





  reserverAll(){
    return this.Http.post(API_URL_USERS,null);
  }

  reserver(placeparking : number,data : any){
    return this.Http.patch(API_URL +"reserver/"+ placeparking,data);
  }
  cancelReserver(placeparking : number){
    return this.Http.patch(API_URL +"cancelReserver/"+ placeparking,null);
  }

  book(placeparking : number,dates : any){
    return this.Http.patch(API_URL +"book/"+ placeparking,dates);
  }
  getReserved(){
    return this.Http.get(API_URL +"getReserved");
  }

  getBooked(){
    return this.Http.get(API_URL +"getBooked");
  }
  ReserverPersonne(placeparking : number,data : any,userId : any){
    return this.Http.patch(API_URL +"ReserverPersonne/"+ placeparking+"/"+userId,data);
  }

  getHistory() : Observable<any[]>{
    return this.Http.get<any[]>(API_URL_History);
  }
}
