// Import des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ParkingService } from 'src/app/Service/parking.service';
import Swal from 'sweetalert2';

// Définition du composant Angular
@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {
  // Initialisation de la liste des parkings lors de l'initialisation du composant
  ngOnInit(): void {
    this.getParkings();
  }

  // Variable pour vérifier le rôle de l'utilisateur (admin ou non)
  adminCheck: boolean = false;

  // Données du parking à créer
  parkingData: any = {};

  // Données du parking à modifier
  parkingModify: any = {
    id: '',
    libelle: 'hello',
    adresse: '',
    capacite: '',
  };

  // Variable pour stocker la valeur du formulaire
  value!: string;

  // Liste des parkings récupérée depuis le service
  ListParkings!: any[];

  // Constructeur du composant avec injection du service ParkingService
  constructor(private service: ParkingService) {
    // Vérifie si le rôle dans le stockage local est "Admin" et met à jour la variable adminCheck
    localStorage.getItem('role') == 'Admin' ? (this.adminCheck = true) : false;
  }

  // Définition du formulaire réactif avec des champs pour le libellé, l'adresse et la capacité du parking
  formulaire: FormGroup = new FormGroup({
    libelle: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    capacite: new FormControl('', [Validators.required]),
  });

  // Fonction pour ouvrir la fenêtre modale de modification de parking avec les données du parking sélectionné
  openModel(parking: any) {
    console.log(parking);
    this.parkingModify = {
      id: parking.id,
      libelle: parking.libelle,
      adresse: parking.adresse,
      capacite: parking.capacite,
    };
    console.log(this.parkingModify);
  }

  // Fonction pour créer un nouveau parking
  check() {
    const parking = {
      libelle: this.formulaire.get('libelle')?.value,
      adresse: this.formulaire.get('adresse')?.value,
      capacite: this.formulaire.get('capacite')?.value,
    };
    if (this.formulaire.valid) {
      // Appel du service pour créer un nouveau parking
      this.service.create(parking).subscribe(
        (res: any) => {
          this.parkingData = res;
          this.getParkings();
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Affichage d'une alerte en cas de champs invalides dans le formulaire
      Swal.fire('Oops', 'Veuillez vérifier les champs', 'error');
    }
    console.log(parking);
  }

  // Fonction pour récupérer la liste des parkings depuis le service
  getParkings() {
    this.service.get().subscribe((res: any) => {
      this.ListParkings = res;
      console.log(res);
    });
  }

  // Fonction pour modifier un parking existant
  modifyParkings(f: NgForm) {
    this.service.modify(this.parkingModify).subscribe((res: any) => {
      // Affichage d'une alerte de succès pour la modification
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification éffectuée avec succès',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }

  // Fonction pour supprimer un parking
  deleteParking(id: any) {
    this.service.delete(id).subscribe((res: any) => {
      // Affichage d'une alerte de succès pour la suppression
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppression avec succès',
        showConfirmButton: false,
        timer: 3000,
      });
      // Rechargement de la page après la suppression
      window.location.reload();
    });

    // Récupération de la liste des parkings après la suppression
    this.getParkings();
  }

  // Fonction pour gérer la soumission du formulaire (pour le débogage)
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
}
