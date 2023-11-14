import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from '../Service/user.service';
import { TokenService } from '../Service/token.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public tokenService: TokenService,
    public router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Méthode requise par l'interface CanActivate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Récupération du jeton JWT
    const jwtToken = this.tokenService.getToken();

    // Décodage du jeton JWT pour obtenir les informations du token
    const decodedToken: any =
      this.tokenService.getToken() != null
        ? jwt_decode(jwtToken as string)
        : null;

    // Récupération du rôle de l'utilisateur à partir du jeton décodé
    const userRole = decodedToken != null ? decodedToken.role : null;

    console.log(jwtToken);

    // Vérification de la validité du jeton
    if (!jwtToken || this.jwtHelper.isTokenExpired(jwtToken)) {
      // Vérification si le problème réel est l'expiration du jeton
      if (this.jwtHelper.isTokenExpired(this.tokenService.getToken())) {
        // Affichage d'un message d'expiration de session avec SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Votre session a expiré',
          showConfirmButton: false,
          timer: 3000,
        });
        // Redirection vers la page de connexion
        this.router.navigate(['/Login'], {
          queryParams: { returnUrl: state.url },
        });
      } else {
        // Affichage d'un message d'accès refusé avec SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Accès refusé !!!',
          showConfirmButton: false,
          timer: 3000,
        });
        // Redirection vers la page de connexion
        this.router.navigate(['/Login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    } else {
      // Vérification du rôle de l'utilisateur pour l'accès à certaines routes
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        // Affichage d'un message d'accès refusé en raison du rôle non autorisé avec SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Accès refusé, rôle non autorisé !!!',
          showConfirmButton: false,
          timer: 3000,
        });
        // Redirection vers le tableau de bord
        this.router.navigate(['/Dashboard'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      } else {
        // Si le jeton est valide et le rôle est autorisé, permet l'accès à la route
        return true;
      }
    }
    // Par défaut, permet l'accès à la route
    return true;
  }
}
