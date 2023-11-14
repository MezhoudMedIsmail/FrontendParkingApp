/*
  Ce fichier TypeScript définit un service Angular 'ParkingService' responsable de la gestion des opérations liées aux parkings.

  Commentaires détaillés :
*/

// Import des modules nécessaires depuis Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// URL de base pour les requêtes liées aux parkings
const API_URL = 'http://localhost:8385/SpringMvc/parkings/';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  // Constructeur du service, injecte le module HttpClient
  constructor(private http: HttpClient) {}

  // Fonction pour créer un nouveau parking, renvoie un Observable de type any
  create(parking: any): Observable<any> {
    // Effectue une requête HTTP de type POST vers l'URL spécifiée pour ajouter un parking avec les données fournies
    return this.http.post(API_URL + 'add-parking', parking);
  }

  // Fonction pour récupérer un parking par son identifiant, renvoie un Observable de type any
  getById(id: number): Observable<any> {
    // Effectue une requête HTTP de type GET vers l'URL spécifiée pour récupérer les données d'un parking par son identifiant
    return this.http.get(API_URL + id);
  }

  // Fonction pour récupérer la liste de tous les parkings, renvoie un Observable de type any
  get(): Observable<any> {
    // Effectue une requête HTTP de type GET vers l'URL spécifiée pour récupérer la liste de tous les parkings
    return this.http.get(API_URL + 'retrieve-allParkings');
  }

  // Fonction pour supprimer un parking par son identifiant, renvoie un Observable de type any
  delete(id: number): Observable<any> {
    // Effectue une requête HTTP de type DELETE vers l'URL spécifiée pour supprimer un parking par son identifiant
    return this.http.delete(API_URL + 'delete-parking/' + id);
  }

  // Fonction pour modifier un parking, renvoie un Observable de type any
  modify(parking: any): Observable<any> {
    // Effectue une requête HTTP de type PUT vers l'URL spécifiée pour modifier un parking avec les données fournies
    return this.http.put(API_URL + 'modify-parking', parking);
  }
}
