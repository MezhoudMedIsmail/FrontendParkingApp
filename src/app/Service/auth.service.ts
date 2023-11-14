/*
  Ce fichier TypeScript définit un service Angular 'AuthService' responsable de la gestion de l'authentification.
  Il utilise le module HttpClient pour effectuer des requêtes HTTP vers un endpoint d'authentification distant.

  Commentaires détaillés :
*/

// Import du module Injectable depuis Angular et du module HttpClient pour les requêtes HTTP
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Définition de l'URL de l'API d'authentification
  private apiUrl = 'http://localhost:8385/SpringMvc/users/login';

  // Constructeur du service, injecte le module HttpClient
  constructor(private http: HttpClient) {}

  // Fonction de connexion, prend un objet 'data' avec les informations d'identification (email, password)
  login(data: { email: string; password: string }) {
    // Effectue une requête HTTP de type POST vers l'URL d'authentification avec les données fournies
    return this.http.post(this.apiUrl, data);
  }
}
