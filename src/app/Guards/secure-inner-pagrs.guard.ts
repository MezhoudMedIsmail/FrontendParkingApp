import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagrsGuard implements CanActivate {
  // La méthode canActivate est requise par l'interface CanActivate
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // La logique actuelle de cette garde de navigation est de toujours permettre l'accès à la route sécurisée.
    // Cela signifie que la route est accessible en tout temps.
    return true;
  }
}
