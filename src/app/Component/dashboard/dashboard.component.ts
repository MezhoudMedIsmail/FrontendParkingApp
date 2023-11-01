import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Service/user.service';

const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  adminCheck : boolean = false;
  email : string = "";
  imageProfile!: SafeUrl;

  constructor(private userService : UserServiceService,private router : Router, private sanitizer: DomSanitizer){
    localStorage.getItem('role') == "Admin" ? this.adminCheck = true : false;
    this.email = localStorage.getItem('email') as string;
    this.getImage(localStorage.getItem('id') as string)
    }
    status = false;
addToggle()
{
  this.status = !this.status;
}

  logOut(){
    localStorage.clear();
    this.router.navigate(["/ogin"]);
  }


      // get Profile Picture
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
