import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


const  API_URL ="http://localhost:8385/SpringMvc/users/";
  const API_URL_VOITURE ="http://localhost:8385/SpringMvc/";



@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(http:HttpClient,private httpPrivate : HttpClient){

  }


  private apiUrl = "http://localhost:8385/SpringMvc/users/";


  getFile(userId: string): Observable<any> {
    return this.httpPrivate.get(`${this.apiUrl}downloadFile/${userId}`, { responseType: 'blob' }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          // Handle the specific error code
          console.log('File not found');
        } else {
          // Handle other error codes or general error
          console.error('An error occurred:', error.message);
        }
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
  // upload Image Profile For user
  uploadImage(id : string,uploadedImage : any){
    return this.httpPrivate.post(`${this.apiUrl}uploadFile/${id}`,uploadedImage);
  }



  create(user:any): Observable<any>{
    return this.httpPrivate.post(API_URL, user);
  }
  getById(id :string):Observable<any>{
    return this.httpPrivate.get(API_URL+id);
  }


  get():Observable<any>{

    return this.httpPrivate.get(API_URL+"retrieve-allUsers");

  }



  delete(id:number) : Observable<any>{

    return this.httpPrivate.delete(API_URL+"delete-user/"+id)

  }

  modify(id : any,user:any) : Observable<any>{
    return this.httpPrivate.put(API_URL+id,user)
  }


  assignUserToPlace(id:string , idPlace:string){
    return this.httpPrivate.post(API_URL+"users/"+id+"/parking/"+idPlace,null);
  }

}

