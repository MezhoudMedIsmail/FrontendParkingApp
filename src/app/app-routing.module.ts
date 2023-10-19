import { ParkingComponent } from './Component/parking/parking.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { UserComponent } from './Component/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { PlaceParkingComponent } from './Component/parking/place-parking/place-parking.component';
import { StatisticsComponent } from './Component/statistics/statistics.component';
import { ReservationsComponent } from './Component/reservations/reservations.component';
import { ProfileComponent } from './Component/profile/profile.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'dashboard' , component: DashboardComponent ,
  children : [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'parking'
    },
    {path:'user',component: UserComponent},
    {path:'parking', component: ParkingComponent},
    {path:'placeparking/:id', component: PlaceParkingComponent},
    {path: 'statistics' , component:StatisticsComponent},
    {path: 'reservations' , component : ReservationsComponent},
    {path: 'profile' , component : ProfileComponent},
  ]},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
