/*
  Ce fichier TypeScript définit un service Angular 'TokenService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import du décorateur Injectable depuis Angular
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
// Définition des clés utilisées pour stocker les tokens et les identifiants dans le stockage local

const TOKEN_KEY = 'token';
const ID_KEY = 'id';
// Déclaration du service comme injectable et associé au root de l'application

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // Constructeur du service

  constructor() {}
  // Méthode pour sauvegarder un token dans le stockage local du navigateur

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  // Méthode pour récupérer l'identifiant de l'utilisateur à partir du token

  public getUser(): string | null {
    const jwtToken = this.getToken();
    const decodedToken: any =
      this.getToken() != null ? jwt_decode(jwtToken as string) : null;
    const userId = decodedToken != null ? decodedToken?.id : null;
    return userId;
  }
  // Méthode pour récupérer le token depuis le stockage local du navigateur

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY) !== null
      ? window.localStorage.getItem(TOKEN_KEY)
      : null;
  }
  // Méthode pour récupérer l'identifiant depuis le stockage local du navigateur

  public getId(): string | null {
    return window.localStorage.getItem(ID_KEY) !== null
      ? window.localStorage.getItem(ID_KEY)
      : null;
  }
  // Méthode pour récupérer le rôle de l'utilisateur à partir du token

  public getRole() {
    const jwtToken = this.getToken();
    const decodedToken: any =
      this.getToken() != null ? jwt_decode(jwtToken as string) : null;
    const userRole = decodedToken != null ? decodedToken?.role : null;
    return userRole;
  }
}
