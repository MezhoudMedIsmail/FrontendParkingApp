import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from "sweetalert2";

const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  fieldTextType: boolean = true;

  imageProfile!: SafeUrl;
  uploadedImage!: any;

  ngOnInit(): void {}

  // Get user From SessionStorage in the browser
  refreshProfile() {
    this.getImage(this.userId as string);
    this.service.getById(this.userId).subscribe((res: any) => {
      this.user = res;
      console.log(res);
    });
  }

  goToPage(path: string) {
    this.router.navigate(['/Dashboard/Profile', path]);
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  user: any = {
    firstName: '',

    lastName: '',

    email: '',

    password: '',

    post_title: '',

    phone_num: '',

    hiring_date: '',
  };
  ListUsers!: any[];

  userModify: any = {
    id: 0,

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
  userId: string = '';
  constructor(
    private service: UserServiceService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userId = localStorage.getItem('id') as string;
    this.refreshProfile();
  }

  modifyUsers(f: NgForm) {
    // Check if any of the required properties are empty
    if (
      !this.user.firstName &&
      !this.user.lastName &&
      !this.user.email &&
      !this.user.password &&
      !this.user.post_title &&
      !this.user.phone_num &&
      !this.user.hiring_date
    ) {
      Swal.fire('Oops',"Veuillez vérifier les champs",'error');
      return; // Exit the function if any required field is empty
    }

    // If all required fields are filled, proceed with the modification
    this.service.modify(this.user.userId, this.user).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Votre compte a été modifié avec succés',
        showConfirmButton: false,
        timer: 3000
      })
    });
  }


  // get Profile Picture
  getImage(userId: string) {
    this.service.getFile(userId).subscribe(
      (res: any) => {
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      () => {
        this.imageProfile = LogoImgPath;
      }
    );
  }

  // Upload Image
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    this.imageUploadAction();
  }
  // change profile picture
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage);
    this.service.uploadImage(this.userId as string, imageFormData).subscribe(
      (response: any) => {
        console.log(response.status);
        this.getImage(this.userId as string);
        window.location.reload();
      },
      () => {
        alert('Image Size should not be more then 500KB');
      }
    );
  }
}
