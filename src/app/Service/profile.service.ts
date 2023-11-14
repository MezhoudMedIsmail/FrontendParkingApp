/*
  Ce fichier TypeScript définit un service Angular 'ProfileService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import du module 'Injectable' depuis Angular pour marquer la classe comme injectable
import { Injectable } from '@angular/core';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // Constructeur du service
  constructor() {}
}
