import { Component, OnInit, ViewChild  , AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatCalendarCellCssClasses, MatDateRangeInput,  } from '@angular/material/datepicker';
import { PlaceParkingService } from 'src/app/Service/place-parking.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  title = 'Liste en attente';
  listBookedPlaceParkings : any[] = [];
  listReservedPlaceParkings : any[] = [];
  constructor(private placeParkingService : PlaceParkingService){
    this.placeParkingService.getBooked().subscribe((res :any)=>{
      this.listBookedPlaceParkings = res;
    })
    this.placeParkingService.getReserved().subscribe((res : any)=>{
      this.listReservedPlaceParkings = res;
    })
  }

  reservation(placeParking : any,status : boolean){
    const data = {
      endDate : placeParking.endDate.slice(0,10),
      startDate : placeParking.startDate.slice(0,10),
      status : status
    }
    placeParking.status = status;
    if(status){
      this.placeParkingService.reserver(placeParking.id,placeParking).subscribe((res :any)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Confirmation avec succés',
          showConfirmButton: false,
          timer: 7000
        })
        Swal.fire('Oops',"Confirmation échouée",'error');
      })
    }else{
      this.placeParkingService.cancelReserver(placeParking.id).subscribe(()=>{
        Swal.fire('Oops',"La réservation est annulée",'error');
        window.location.reload();
      })
    }
  }
}
