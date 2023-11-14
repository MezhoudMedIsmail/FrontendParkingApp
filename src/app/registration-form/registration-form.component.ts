/*
  Ce fichier TypeScript correspond au composant Angular 'RegistrationFormComponent'.
  Il gère la logique de la page d'inscription, y compris la validation du formulaire et l'envoi des données au service d'enregistrement.

  Commentaires détaillés :
*/

// Import des modules nécessaires depuis Angular et d'autres fichiers
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegistrationFormService } from '../Service/registration-form.service';
import { UserServiceService } from '../Service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

// Définition du composant Angular avec son sélecteur, modèle et feuille de style
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  // Initialisation des variables pour stocker les données utilisateur, les informations du formulaire et la liste des utilisateurs
  userData: any = {};
  userCreate: any = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    post_title: '',
    phone_num: '',
    hiring_date: '',
    role: '',
    voitures: {
      matricule: '',
      type: '',
    },
  };
  value!: string;
  ListUsers!: any[];

  // Constructeur du composant, injection des services nécessaires
  constructor(private service: UserServiceService, private router: Router) {}

  // Définition du formulaire avec les champs requis et les validations
  formulaire: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
      ),
    ]),
    post_title: new FormControl('', [Validators.required]),
    phone_num: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),
    hiring_date: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
    ]),
    role: new FormControl('', [Validators.required]),
    matricule: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  // Fonction de vérification et d'envoi des données du formulaire
  check() {
    // Création d'un objet utilisateur avec les données du formulaire
    const user = {
      firstName: this.formulaire.get('firstName')?.value,
      lastName: this.formulaire.get('lastName')?.value,
      email: this.formulaire.get('email')?.value,
      password: this.formulaire.get('password')?.value,
      post_title: this.formulaire.get('post_title')?.value,
      phone_num: this.formulaire.get('phone_num')?.value,
      hiring_date: this.formulaire.get('hiring_date')?.value,
      role: 'User',
      voitures: {
        matricule: this.formulaire.get('matricule')?.value,
        type: this.formulaire.get('type')?.value,
      },
    };

    // Appel du service pour créer un nouvel utilisateur
    this.service.create(user).subscribe(
      (res: any) => {
        this.userData = res;
        // Affichage d'une notification de succès avec SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Utilisateur a été ajoutée avec succés, Bienvenue',
          showConfirmButton: false,
          timer: 3000,
        });
        // Redirection vers la page de connexion
        this.router.navigate(['login']);
      },
      (error: any) => {
        // Affichage d'une notification d'erreur en cas d'échec de création
        console.log(
          error(Swal.fire('Oops', 'Veuillez vérifier les champs', 'error'))
        );
      }
    );
  }

  // Fonction de gestion de la soumission du formulaire (inutilisée dans le code actuel)
  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }
}
