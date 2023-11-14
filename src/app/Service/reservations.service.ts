/*
  Ce fichier TypeScript définit un service Angular 'ReservationsService' qui peut être injecté dans d'autres composants ou services Angular.

  Commentaires :
*/

// Import des modules nécessaires depuis Angular
import { Injectable } from '@angular/core';

// Déclaration du service comme injectable et associé au root de l'application
@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  // Constructeur du service
  constructor() {}
}
