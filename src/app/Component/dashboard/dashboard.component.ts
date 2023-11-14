// Import des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user.service';

// Définition d'une constante pour le chemin de l'image du logo
const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Déclaration des variables utilisées dans le composant
  adminCheck: boolean = false;
  email: string = '';
  imageProfile!: SafeUrl;

  // Constructeur du composant avec injection des services nécessaires
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // Vérifie si le rôle dans le stockage local est "Admin" et met à jour la variable adminCheck
    localStorage.getItem('role') == 'Admin' ? (this.adminCheck = true) : false;

    // Récupère l'email depuis le stockage local
    this.email = localStorage.getItem('email') as string;

    // Appelle la fonction pour récupérer l'image de profil de l'utilisateur
    this.getImage(localStorage.getItem('id') as string);
  }

  // Fonction pour basculer le statut de la barre latérale
  status = false;
  addToggle() {
    this.status = !this.status;
  }

  // Fonction de déconnexion
  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Fonction pour récupérer l'image de profil de l'utilisateur
  getImage(userId: string) {
    this.userService.getFile(userId).subscribe(
      (res: any) => {
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      () => {
        this.imageProfile = LogoImgPath;
      }
    );
  }
}
