import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from '../Service/user.service';
import { TokenService } from '../Service/token.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public tokenService: TokenService, public router: Router,private jwtHelper : JwtHelperService) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const jwtToken = this.tokenService.getToken();
      const decodedToken: any = this.tokenService.getToken() != null ? jwt_decode(jwtToken as string) : null;
      const userRole = decodedToken != null ? decodedToken.role : null;
      console.log(jwtToken)

    if(!jwtToken || this.jwtHelper.isTokenExpired(jwtToken)) {
      // check Wither the real problem is the expiration of the
      if(this.jwtHelper.isTokenExpired(this.tokenService.getToken())){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Votre session est éxpriée',
          showConfirmButton: false,
          timer: 3000
        })
//        localStorage.clear();
console.log("chadytek ye bent")
        this.router.navigate(["/Login"], { queryParams: { returnUrl: state.url } });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Access Denied !!!",
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
      }
    }else{
      if(route.data['role'] && route.data['role'].indexOf(userRole) === -1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Access Denied,Role Not Granted !!!",
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigate(['/Dashboard'], { queryParams: { returnUrl: state.url } })
        return false;
      }
      else{
        return true;
      }
    }
    return true;
  }


}
