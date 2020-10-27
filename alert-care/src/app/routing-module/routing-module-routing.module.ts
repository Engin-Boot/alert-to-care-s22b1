import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPatientDetailsComponent } from '../view-patient-details/view-patient-details.component';
import { UpdateBedDetailsComponent } from '../update-bed-details/update-bed-details.component';
import { UpdatePatientDetailsComponent } from '../update-patient-details/update-patient-details.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import {HomeComponent} from '../home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'viewPatient/:patientId',component:ViewPatientDetailsComponent},
  {path:'updateBedDetails/:bedId',component:UpdateBedDetailsComponent},
  {path:'updatePatientDetails/:patientId',component:UpdatePatientDetailsComponent},
  {path:'addPatient/:bedId',component:AddNewPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModuleRoutingModule { }
