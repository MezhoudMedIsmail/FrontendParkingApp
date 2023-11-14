/*
  Ce fichier TypeScript définit un service Angular 'TestService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import des modules nécessaires depuis Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8380/SpringMvc/users/';
const API_URL_VOITURE = 'http://localhost:8380/SpringMvc/';
// Déclaration du service comme injectable et associé au root de l'application

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // Constructeur du service avec injection de dépendance HttpClient

  constructor(private Http: HttpClient) {}
  // Méthode pour créer un nouvel utilisateur en utilisant une requête HTTP POST

  create(user: any): Observable<any> {
    return this.Http.post(API_URL + 'add-user', user);
  }

  // Méthode pour récupérer tous les utilisateurs en utilisant une requête HTTP GET

  get(): Observable<any> {
    return this.Http.get(API_URL + 'retrieve-allUsers');
  }

  // Méthode pour supprimer un utilisateur en utilisant une requête HTTP DELETE

  delete(id: number): Observable<any> {
    return this.Http.delete(API_URL + 'delete-user/' + id);
  }

  // Méthode pour modifier un utilisateur en utilisant une requête HTTP PUT

  modify(user: any): Observable<any> {
    return this.Http.put(API_URL + 'Modify-user', user);
  }
}
