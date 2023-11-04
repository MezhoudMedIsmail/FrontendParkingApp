import { Component } from '@angular/core';
import { PlaceParkingComponent } from '../parking/place-parking/place-parking.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PlaceParkingService } from 'src/app/Service/place-parking.service';
import { TokenService } from 'src/app/Service/token.service';
import { UserServiceService } from 'src/app/Service/user.service';
import { ParkingService } from 'src/app/Service/parking.service';
const LogoImgPath =
  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  imageProfile!: SafeUrl;
  listHistory : any[] = [];
  userId: string = '';
  ListParkings : any[] = [];
  placeParkings :any[] =[];
  nbPlaceDispo :number = 0;

  constructor(private placeService : PlaceParkingService,private tokenService : TokenService,private service: UserServiceService,private sanitizer: DomSanitizer,private parkingService: ParkingService){
    this.getHistory();
    this.userId = localStorage.getItem('id') as string;
    this.getImage(this.userId as string);
    this.getParkings();
    this.getPlaceParkings();
  }

  getPlaceParkings(){
    this.placeService.get().subscribe((res:any)=>{
      this.placeParkings = res;
      console.log(res)
      this.nbPlaceDispo = this.placeParkings.filter(obj => obj.status === false ).length
    });
  }

  getParkings(){
    this.parkingService.get().subscribe((res:any)=>{
      this.ListParkings = res;
      console.log(this.ListParkings)
    });
  }



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

  getHistory(){
    const id = this.tokenService.getId() as string;
    this.placeService.getHistoryPerId(id).subscribe((res : any)=>{
      this.listHistory = res;
      console.log(res);
    })
  }
}
