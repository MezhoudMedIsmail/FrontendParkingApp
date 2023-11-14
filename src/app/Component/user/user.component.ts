import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',

  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  // Propriété pour gérer l'affichage/masquage du mot de passe

  fieldTextType: boolean = true;
  ngOnInit(): void {}
  // Méthode pour basculer l'affichage/masquage du mot de passe

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  userData: any = {};

  // Données de l'utilisateur à modifier

  userModify: any = {
    userId: 0,

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
  // Variable pour stocker la valeur du formulaire

  value!: string;
  // Liste des utilisateurs

  ListUsers!: any[];

  // Constructeur qui initialise le service et appelle la fonction getUsers

  constructor(private service: UserServiceService) {
    this.getUsers();
  }

  // Formulaire de création d'utilisateur avec des validateurs

  formulaire: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    firstName: new FormControl('', [Validators.required]),

    lastName: new FormControl('', [Validators.required]),

    post_title: new FormControl('', [Validators.required]),

    phone_num: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    hiring_date: new FormControl('', [Validators.required]),

    Matricule: new FormControl('', [Validators.required]),

    Type: new FormControl('', [Validators.required]),
  });
  // Méthode pour ouvrir la modal de modification avec les données de l'utilisateur sélectionné

  openModel(user: any) {
    this.fieldTextType = !this.fieldTextType;
    this.userModify = {
      id: user.userId,

      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      post_title: user.post_title,

      password: user.password,

      phone_num: user.phone_num,

      hiring_date: user.hiring_date,

      role: user.role,

      voitures: {
        matricule: user.voitures?.matricule,

        type: user.voitures?.type,
      },
    };
    console.log(this.userModify);
  }
  // Méthode pour créer un nouvel utilisateur

  check() {
    console.log(this.formulaire.get('email')?.value);
    // Création d'un objet user avec les valeurs du formulaire

    const user = {
      email: this.formulaire.get('email')?.value,
      firstName: this.formulaire.get('firstName')?.value,
      lastName: this.formulaire.get('lastName')?.value,
      post_title: this.formulaire.get('post_title')?.value,
      phone_num: this.formulaire.get('phone_num')?.value,
      password: this.formulaire.get('password')?.value,
      hiring_date: this.formulaire.get('hiring_date')?.value,
      role: 'User',

      voitures: {
        matricule: this.formulaire.get('Matricule')?.value,
        type: this.formulaire.get('Type')?.value,
      },
    };
    console.log(this.formulaire);
    // Vérification des champs requis avant d'envoyer la requête

    if (
      this.formulaire.get('post_title')?.value &&
      this.formulaire.get('email')?.value &&
      this.formulaire.get('firstName')?.value &&
      this.formulaire.get('password')?.value
    ) {
      // Appel du service pour créer l'utilisateur

      this.service.create(user).subscribe(
        (res: any) => {
          this.userData = res;

          this.getUsers();
          // Affichage d'une alerte de succès avec SweetAlert2

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ajout éffectuée avec succés',
            showConfirmButton: false,
            timer: 3000,
          });
          // Rechargement de la page

          window.location.reload();
        },
        // Gestion des erreurs

        (error: any) => {
          // Affichage d'une alerte si des champs requis sont manquants

          Swal.fire('Oops', 'Veuillez vérifier les champs', 'error');
        }
      );
    } else {
      Swal.fire('Oops', 'Veuillez vérifier les champs', 'error');
    }

    console.log(user);
  }
  // Méthode pour récupérer la liste des utilisateurs

  getUsers() {
    this.service.get().subscribe((res: any) => {
      console.log(res);
      this.ListUsers = res;
    });
  }
  // Méthode pour supprimer un utilisateur

  deleteUser(id: any) {
    this.service.delete(id).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppression éffectuée avec succés',
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();
    });

    this.getUsers();
  }

  // Méthode pour modifier un utilisateur

  modifyUsers(f: NgForm) {
    console.log(this.userModify);
    // Vérification si des champs requis sont vides ou non définis
    if (
      !this.userModify.firstName &&
      !this.userModify.lastName &&
      !this.userModify.email &&
      !this.userModify.post_title &&
      !this.userModify.password &&
      !this.userModify.phone_num &&
      !this.userModify.hiring_date &&
      !this.userModify.role &&
      !this.userModify.voitures?.matricule &&
      !this.userModify.voitures?.type
    ) {
      // Affichage d'une alerte de succès avec SweetAlert2

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification éffectuée avec succés',
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();
      return; // Sortir de la fonction si l'un des champs requis est vide
    }

    // Si tous les champs requis sont remplis, procéder à la modification
    this.service
      .modify(this.userModify.id, this.userModify)
      .subscribe((res: any) => {
        window.location.reload();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modification éffectuée avec succés',
          showConfirmButton: false,
          timer: 3000,
        });
      });
  }
}
