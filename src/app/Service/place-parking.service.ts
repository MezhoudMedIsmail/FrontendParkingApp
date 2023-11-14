/*
  Ce fichier TypeScript définit un service Angular 'PlaceParkingService' responsable de la gestion des opérations liées aux places de parking.

  Commentaires détaillés :
*/

// Import des modules nécessaires depuis Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Déclaration des constantes pour les URLs des différentes fonctionnalités du service
const API_URL_History = 'http://localhost:8385/SpringMvc/History';
const API_URL = 'http://localhost:8385/SpringMvc/placeparkings/';
const API_URL_USERS =
  'http://localhost:8385/SpringMvc/users/sortPlacewithusers';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class PlaceParkingService {
  // URL de base pour les requêtes liées aux places de parking
  apiUrl = 'http://localhost:8385/SpringMvc/placeparkings/';

  // Constructeur du service, injecte le module HttpClient
  constructor(private http: HttpClient) {}

  // Fonction pour créer une nouvelle place de parking, renvoie un Observable de type any
  create(placeparking: any, IdParking: number): Observable<any> {
    // Effectue une requête HTTP de type POST vers l'URL spécifiée pour ajouter une place de parking avec les données fournies
    return this.http.post(
      API_URL + 'add-placeparking/' + IdParking,
      placeparking
    );
  }

  // Fonction pour récupérer la liste de toutes les places de parking, renvoie un Observable de type any
  get(): Observable<any> {
    // Effectue une requête HTTP de type GET vers l'URL spécifiée pour récupérer la liste de toutes les places de parking
    return this.http.get(API_URL + 'retrieve-AllPlaceParkings');
  }

  // Fonction pour récupérer une place de parking par son identifiant, renvoie un Observable de type any
  getById(id: number): Observable<any> {
    // Effectue une requête HTTP de type GET vers l'URL spécifiée pour récupérer les données d'une place de parking par son identifiant
    return this.http.get(API_URL + id);
  }

  // Fonction pour supprimer une place de parking par son identifiant, renvoie un Observable de type any
  delete(id: number): Observable<any> {
    // Effectue une requête HTTP de type DELETE vers l'URL spécifiée pour supprimer une place de parking par son identifiant
    return this.http.delete(API_URL + 'delete-placeparking/' + id);
  }

  // Fonction pour modifier une place de parking, renvoie un Observable de type any
  modify(IdParking: number, placeparking: any): Observable<any> {
    // Effectue une requête HTTP de type PUT vers l'URL spécifiée pour modifier une place de parking avec les données fournies
    return this.http.put(
      API_URL + 'Modify-placeparking/' + IdParking,
      placeparking
    );
  }

  // Fonction pour réserver toutes les places de parking pour un utilisateur donné, renvoie un Observable de type any
  reserverAll(data: any) {
    return this.http.post(API_URL_USERS, data);
  }

  // Fonction pour réserver une place de parking spécifique pour un utilisateur donné, renvoie un Observable de type any
  reserver(placeparking: number, data: any) {
    return this.http.patch(API_URL + 'reserver/' + placeparking, data);
  }

  // Fonction pour annuler la réservation d'une place de parking spécifique, renvoie un Observable de type any
  cancelReserver(placeparking: number) {
    return this.http.patch(API_URL + 'cancelReserver/' + placeparking, null);
  }

  // Fonction pour réserver une place de parking spécifique pour un utilisateur donné à des dates spécifiques, renvoie un Observable de type any
  book(placeparking: number, dates: any) {
    return this.http.patch(API_URL + 'book/' + placeparking, dates);
  }

  // Fonction pour récupérer la liste des places de parking réservées, renvoie un Observable de type any
  getReserved() {
    return this.http.get(API_URL + 'getReserved');
  }

  // Fonction pour récupérer la liste des places de parking réservées pour un utilisateur donné, renvoie un Observable de type any
  getBooked() {
    return this.http.get(API_URL + 'getBooked');
  }

  // Fonction pour réserver une place de parking spécifique pour un utilisateur donné, renvoie un Observable de type any
  ReserverPersonne(placeparking: number, data: any, userId: any) {
    return this.http.patch(
      API_URL + 'ReserverPersonne/' + placeparking + '/' + userId,
      data
    );
  }

  // Fonction pour récupérer l'historique des réservations, renvoie un Observable de type any[]
  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_History);
  }

  // Fonction pour récupérer l'historique des réservations pour un utilisateur donné, renvoie un Observable de type any[]
  getHistoryPerId(id: string): Observable<any[]> {
    return this.http.get<any[]>(API_URL_History + '/' + id);
  }
}
