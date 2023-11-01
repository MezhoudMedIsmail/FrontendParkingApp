import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'token';
const ID_KEY = 'id';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public saveToken(token : string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getUser():string | null{
    const jwtToken = this.getToken();
      const decodedToken: any = this.getToken() != null ? jwt_decode(jwtToken as string) : null;
      const userId = decodedToken != null ? decodedToken?.id : null;
    return userId;
  }
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY) !== null ? window.localStorage.getItem(TOKEN_KEY) : null;
  }
  public getId(): string | null {
    return window.localStorage.getItem(ID_KEY) !== null ? window.localStorage.getItem(ID_KEY) : null;
  }

  public getRole(){
    const jwtToken = this.getToken();
      const decodedToken: any = this.getToken() != null ? jwt_decode(jwtToken as string) : null;
      const userRole = decodedToken != null ? decodedToken?.role : null;
    return userRole;
  }

}
