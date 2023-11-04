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
import { AccueilComponent } from './Component/accueil/accueil.component';
import { AuthGuard } from './Guards/auth.guard';
const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "Register", component: RegistrationFormComponent },
  {
    path: 'Dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: "Users",
        children: [
          {
            path: "GestionUser", component: UserComponent, canActivate: [AuthGuard], data: {
              role: ["Admin"]
            }
          },
          {
            path: "Profil", component: ProfileComponent, canActivate: [AuthGuard]
            , data: {
              role: ["Admin", "User"]
          }
          }, {
            path: '', redirectTo: 'Profil', pathMatch: 'full'
          },

        ]
      },
      {
        path: 'Parking',
        canActivate: [AuthGuard],
        component: ParkingComponent,
        data: {
          role: ["Admin", "User"]
      }

      }, { path: "Parking/PlaceParking/:id", component: PlaceParkingComponent, canActivate: [AuthGuard], },
      {
        path: "Statistiques", component: StatisticsComponent, canActivate: [AuthGuard],
        data: {
          role: ["Admin"]
        }
      },
      {
        path: "Accueil", component: AccueilComponent,
        data: {
          role:[ "Admin", "User"]
        }
    },
      {
        path: "Resrvations", component: ReservationsComponent, canActivate: [AuthGuard],
        data: {
          role: ["Admin"]
        }
      },{ path: '', redirectTo: '/Dashboard/Accueil', pathMatch: 'full' }, // redirect to
    ]
  },
  { path: '', redirectTo: '/Dashboard/Accueil', pathMatch: 'full' }, // redirect to

  { path: '**', redirectTo: '/Dashboard/Accueil' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
