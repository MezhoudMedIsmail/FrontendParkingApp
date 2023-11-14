/*
  Ce fichier TypeScript définit un service Angular 'UserServiceService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import des modules nécessaires depuis Angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

// Définition de l'URL de base pour les requêtes API
const API_URL = 'http://localhost:8385/SpringMvc/users/';

// Définition du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  // Constructeur du service, injecte les services Angular nécessaires
  constructor(private http: HttpClient, private httpPrivate: HttpClient) {}

  // Méthode pour récupérer un fichier (image) associé à un utilisateur
  getFile(userId: string): Observable<any> {
    return this.httpPrivate
      .get(`${API_URL}downloadFile/${userId}`, { responseType: 'blob' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            // Gère l'erreur spécifique du code 500 (Fichier non trouvé)
            console.log('Fichier non trouvé');
          } else {
            // Gère d'autres codes d'erreur ou une erreur générale
            console.error("Une erreur s'est produite :", error.message);
          }
          return throwError(
            "Quelque chose s'est mal passé. Veuillez réessayer plus tard."
          );
        })
      );
  }

  // Méthode pour télécharger une image de profil pour un utilisateur
  uploadImage(id: string, uploadedImage: any): Observable<any> {
    return this.httpPrivate.post(`${API_URL}uploadFile/${id}`, uploadedImage);
  }

  // Méthode pour créer un nouvel utilisateur
  create(user: any): Observable<any> {
    return this.httpPrivate.post(API_URL, user);
  }

  // Méthode pour récupérer les informations d'un utilisateur par son identifiant
  getById(id: string): Observable<any> {
    return this.httpPrivate.get(API_URL + id);
  }

  // Méthode pour récupérer tous les utilisateurs
  get(): Observable<any> {
    return this.httpPrivate.get(API_URL + 'retrieve-allUsers');
  }

  // Méthode pour supprimer un utilisateur par son identifiant
  delete(id: number): Observable<any> {
    return this.httpPrivate.delete(API_URL + 'delete-user/' + id);
  }

  // Méthode pour modifier un utilisateur par son identifiant
  modify(id: any, user: any): Observable<any> {
    return this.httpPrivate.put(API_URL + id, user);
  }

  // Méthode pour assigner un utilisateur à une place de parking
  assignUserToPlace(userId: string, placeId: string): Observable<any> {
    return this.httpPrivate.post(
      API_URL + 'users/' + userId + '/parking/' + placeId,
      null
    );
  }
}
