// Angular Component for User Profile Management

// Importing necessary modules and services
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

// URL for the default profile picture
const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  fieldTextType: boolean = true; // Flag to toggle password visibility

  imageProfile!: SafeUrl; // SafeUrl type to handle sanitized image URLs
  uploadedImage!: any; // Variable to store the uploaded image

  ngOnInit(): void {}

  // Initialize user data and fetch profile picture on component creation
  refreshProfile() {
    this.getImage(this.userId as string); // Fetch and display profile picture
    this.service.getById(this.userId).subscribe((res: any) => {
      this.user = res; // Update user data
    });
  }

  // Navigate to a specific page within the profile section
  goToPage(path: string) {
    this.router.navigate(['/Dashboard/Profile', path]);
  }

  // Toggle password visibility
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // Object to store user information
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    post_title: '',
    phone_num: '',
    hiring_date: '',
  };

  // Array to store a list of users (might be used for future enhancements)
  ListUsers!: any[];

  // Object to store modified user information
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

  userId: string = ''; // Variable to store the user ID
  constructor(
    private service: UserServiceService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userId = localStorage.getItem('id') as string; // Retrieve user ID from local storage
    this.refreshProfile(); // Initialize user data and fetch profile picture
  }

  // Function to modify user information
  modifyUsers(f: NgForm) {
    // Check if any of the required properties are empty
    if (
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.email ||
      !this.user.password ||
      !this.user.post_title ||
      !this.user.phone_num ||
      !this.user.hiring_date
    ) {
      Swal.fire('Oops', 'Veuillez vérifier les champs', 'error');
      return; // Exit the function if any required field is empty
    }

    // If all required fields are filled, proceed with the modification
    this.service.modify(this.user.userId, this.user).subscribe(() => {
      // Display success message using SweetAlert2
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Votre compte a été modifié avec succès',
        showConfirmButton: false,
        timer: 3000,
      });
    });
  }

  // Function to fetch and display the user's profile picture
  getImage(userId: string) {
    this.service.getFile(userId).subscribe(
      (res: any) => {
        // Create a sanitized URL for the profile picture
        let objectURL = URL.createObjectURL(res);
        this.imageProfile = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      () => {
        // Set a default profile picture URL in case of an error
        this.imageProfile = LogoImgPath;
      }
    );
  }

  // Function to handle image upload
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0]; // Store the uploaded image
    this.imageUploadAction(); // Trigger the image upload action
  }

  // Function to change the profile picture
  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('file', this.uploadedImage); // Append the image file to FormData
    this.service.uploadImage(this.userId as string, imageFormData).subscribe(
      (response: any) => {
        // Log the response status to the console
        console.log(response.status);
        this.getImage(this.userId as string); // Fetch and display the updated profile picture
        window.location.reload(); // Reload the page to reflect changes
      },
      () => {
        // Display an alert if there is an error uploading the image
        alert('Image Size should not be more than 500KB');
      }
    );
  }
}
