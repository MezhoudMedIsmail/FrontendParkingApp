import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ParkingService } from 'src/app/Service/parking.service';
@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {
  ngOnInit() :void {
    this.getParkings();
  }
  adminCheck : boolean = false;


    parkingData : any = {}

    parkingModify : any = {
      id : '',
      libelle : 'hello',
      adresse : '',
      capacite : '',
    };

    value! : string ;

    ListParkings!: any[];

    constructor(private service: ParkingService){
      localStorage.getItem('role') == "Admin" ? this.adminCheck = true : false;
    }

    formulaire: FormGroup = new FormGroup({

      libelle: new FormControl('', [Validators.required]),

      adresse: new FormControl('', [Validators.required]),

      capacite: new FormControl('', [Validators.required]),

    });

    openModel(parking : any){
      console.log(parking)
      this.parkingModify = {
        id : parking.id,
        libelle : parking.libelle,
        adresse : parking.adresse,
        capacite : parking .capacite,
      }

      console.log(this.parkingModify);
    }

    check(){
      const parking = {
        libelle: this.formulaire.get('libelle')?.value,
        adresse: this.formulaire.get('adresse')?.value,
        capacite: this.formulaire.get('capacite')?.value,
      }
      if(this.formulaire.valid){

      this.service.create(parking).subscribe(
        (res:any) => {
          this.parkingData = res;
          this.getParkings();
        },
        (error:any) => {
          console.log(error);
        }
    );

      }else{
        alert('Please fill in all required fields');
      }
      console.log(parking);
    }

    getParkings(){
      this.service.get().subscribe((res:any)=>{
        this.ListParkings = res;
        console.log(res)
      });
    }

    modifyParkings(f: NgForm) {
      this.service.modify(this.parkingModify).subscribe((res: any) => {
        alert('updated sucess !');
      });
    }

    deleteParking(id: any) {
      this.service.delete(id).subscribe((res: any) => {
        alert(res);
      });

      this.getParkings();
    }

    onSubmit(f: NgForm) {
      console.log(f.value);

      console.log(f.valid);
    }
}
