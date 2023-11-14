// Import des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { PlaceParkingComponent } from '../parking/place-parking/place-parking.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Import des services nécessaires
import { PlaceParkingService } from 'src/app/Service/place-parking.service';
import { TokenService } from 'src/app/Service/token.service';
import { UserServiceService } from 'src/app/Service/user.service';
import { ParkingService } from 'src/app/Service/parking.service';

// Définition d'une constante pour le chemin de l'image du logo
const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  // Déclaration des variables utilisées dans le composant
  imageProfile!: SafeUrl;
  listHistory: any[] = [];
  userId: string = '';
  ListParkings: any[] = [];
  placeParkings: any[] = [];
  nbPlaceDispo: number = 0;

  // Constructeur du composant avec injection des services nécessaires
  constructor(
    private placeService: PlaceParkingService,
    private tokenService: TokenService,
    private service: UserServiceService,
    private sanitizer: DomSanitizer,
    private parkingService: ParkingService
  ) {
    // Appels aux fonctions nécessaires lors de la création du composant
    this.getHistory();
    this.userId = localStorage.getItem('id') as string;
    this.getImage(this.userId as string);
    this.getParkings();
    this.getPlaceParkings();
  }

  // Fonction pour récupérer les places de parking et calculer le nombre de places disponibles
  getPlaceParkings() {
    this.placeService.get().subscribe((res: any) => {
      this.placeParkings = res;
      console.log(res);
      this.nbPlaceDispo = this.placeParkings.filter(
        (obj) => obj.status === false
      ).length;
    });
  }

  // Fonction pour récupérer la liste des parkings
  getParkings() {
    this.parkingService.get().subscribe((res: any) => {
      this.ListParkings = res;
      console.log(this.ListParkings);
    });
  }

  // Fonction pour récupérer l'image de profil de l'utilisateur
  getImage(userId: string) {
    this.service.getFile(userId).subscribe(
      (res: any) => {
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        this.imageProfile = LogoImgPath;
      }
    );
  }

  // Fonction pour récupérer l'historique des places de parking occupées par l'utilisateur
  getHistory() {
    const id = this.tokenService.getId() as string;
    this.placeService.getHistoryPerId(id).subscribe((res: any) => {
      this.listHistory = res;
      console.log(res);
    });
  }
}
