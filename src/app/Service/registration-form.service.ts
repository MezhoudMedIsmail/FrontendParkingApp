/*
  Ce fichier TypeScript définit un service Angular 'RegistrationFormService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import des modules nécessaires depuis Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Constantes contenant les URLs des services web
const API_URL = 'http://localhost:8385/SpringMvc/users';
const API_URL_VOITURE = 'http://localhost:8385/SpringMvc/';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService {
  // Constructeur du service avec injection de dépendance pour le module HttpClient
  constructor(private Http: HttpClient) {}

  // Fonction pour créer un nouvel utilisateur en envoyant une requête HTTP POST à l'API
  create(user: any): Observable<any> {
    return this.Http.post(API_URL, user);
  }
}
