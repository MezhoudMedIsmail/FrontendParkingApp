import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';


@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',

  styleUrls: ['./user.component.css'],
})
export class UserComponent {



  fieldTextType: boolean = true;
  ngOnInit(): void {
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  userData: any = {};

  userModify: any = {
    userId : 0 ,

    firstName: '',

    lastName: '',

    email: '',

    password: '',

    post_title: '',

    phone_num: '',

    hiring_date: '',

    role:'',

    voitures: {
      matricule: '',

      type: '',
    },
  };

  value!: string;

  ListUsers!: any[];


  constructor(private service: UserServiceService) {
    this.getUsers();

  }



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

    hiring_date: new FormControl('', [
      Validators.required,
    ]),

    Matricule: new FormControl('', [Validators.required]),

    Type: new FormControl('', [Validators.required]),
  });

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

      role : user.role,

      voitures: {
        matricule: user.voitures?.matricule,

        type: user.voitures?.type,
      },
    };
    console.log(this.userModify);
  }

  check() {
    console.log(this.formulaire.get('email')?.value);

    const user = {
      email: this.formulaire.get('email')?.value,
      firstName: this.formulaire.get('firstName')?.value,
      lastName: this.formulaire.get('lastName')?.value,
      post_title: this.formulaire.get('post_title')?.value,
      phone_num: this.formulaire.get('phone_num')?.value,
      password: this.formulaire.get('password')?.value,
      hiring_date: this.formulaire.get('hiring_date')?.value,
      role: "User",

      voitures: {
        matricule: this.formulaire.get('Matricule')?.value,
        type: this.formulaire.get('Type')?.value,
      },

    };
    console.log(this.formulaire)
   if(
    this.formulaire.get('post_title')?.value&&
    this.formulaire.get('email')?.value &&
    this.formulaire.get('firstName')?.value&&
    this.formulaire.get('password')?.value
    ){
    this.service.create(user).subscribe(
      (res: any) => {
        this.userData = res;

        this.getUsers();
      },

      (error: any) => {
        console.log(error);
      }
    );
   }else{
    alert("fill in the blanks with the rigth values")
   }

    console.log(user);
  }

  getUsers() {
    this.service.get().subscribe((res: any) => {
      console.log(res);
      this.ListUsers = res;
    });
  }

  deleteUser(id: any) {
    this.service.delete(id).subscribe((res: any) => {
      alert(res);
    });

    this.getUsers();
  }


  modifyUsers(f: NgForm) {

    console.log(this.userModify)
    // Check if any of the required properties are empty or undefined
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
      alert('Please fill in all required fields');
      return; // Exit the function if any required field is empty
    }

    // If all required fields are filled, proceed with the modification
    this.service.modify(this.userModify.id, this.userModify).subscribe((res: any) => {
      alert('Updated successfully');
    });
  }
}
