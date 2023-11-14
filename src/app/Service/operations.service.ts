/*
  Ce fichier TypeScript définit un service Angular 'OperationsService' responsable de la gestion des opérations liées aux places.

  Commentaires détaillés :
*/

// Import des modules nécessaires depuis Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// URL de base pour les requêtes liées aux opérations sur les places
const API_URL = 'http://localhost:8385/SpringMvc/users/';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  // Constructeur du service, injecte le module HttpClient
  constructor(private http: HttpClient) {}

  // Fonction pour récupérer les opérations liées aux places, renvoie un Observable de type any
  get(): Observable<any> {
    // Effectue une requête HTTP de type GET vers l'URL spécifiée pour récupérer les données des places
    return this.http.get(API_URL + 'assign-places');
  }
}
