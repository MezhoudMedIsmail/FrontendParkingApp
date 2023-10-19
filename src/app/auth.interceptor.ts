import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if(token != null){
          // Clone the request and add the Authorization header with the token
    const authRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)
  });

  // Pass the cloned request to the next handler
  return next.handle(authRequest);
    }else{
      return next.handle(request);
    }
  }
}
