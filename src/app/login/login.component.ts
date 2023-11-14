/**
 * Composant Angular représentant la page de connexion.
 * Ce composant gère le formulaire de connexion et l'authentification.
 */
import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

// Interface définissant la structure d'une demande de connexion
export interface LoginRequest {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Variable pour stocker un éventuel message d'erreur
  error!: string;

  // Objet représentant la demande de connexion
  loginRequest: LoginRequest = {
    email: '',
    password: '',
  };

  // Constructeur du composant, injecte les services nécessaires
  constructor(private authService: AuthService, private router: Router) {}

  // Variable pour stocker le rôle de l'utilisateur après la connexion
  role!: any;

  // Fonction appelée lors de la soumission du formulaire de connexion
  onSubmit() {
    // Appel du service d'authentification pour effectuer la connexion
    this.authService.login(this.loginRequest).subscribe(
      // En cas de succès, stocke le token dans le stockage local et redirige vers le tableau de bord
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        const decodedToken: any = jwt_decode(response.token);
        const role = decodedToken.role;
        localStorage.setItem('role', role);
        localStorage.setItem('email', decodedToken.sub);
        localStorage.setItem('id', decodedToken.id);
        this.router.navigate(['/Dashboard']);
      },
      // En cas d'erreur, affiche un message d'erreur
      (error) => {
        Swal.fire('Oops', 'Veuillez vérifier les champs', 'error');
      }
    );
  }
}
