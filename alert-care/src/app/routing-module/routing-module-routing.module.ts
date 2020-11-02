import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPatientDetailsComponent } from '../view-patient-details/view-patient-details.component';
import { UpdateBedDetailsComponent } from '../update-bed-details/update-bed-details.component';
import { UpdatePatientDetailsComponent } from '../update-patient-details/update-patient-details.component';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import {HomeComponent} from '../home/home.component';
import {BedListCompComponent} from '../bed-list-comp/bed-list-comp.component';
import {SetupComponent} from '../setup/setup.component';

export const routes: Routes = [
  {path: '' , redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  
  {path: 'bedList/:configurationId', component: BedListCompComponent, children: [
    {path: '' , redirectTo: 'home', pathMatch: 'full'},  
  ]},
  {path: 'viewPatient/:bedId', component: ViewPatientDetailsComponent},
  {path: 'addPatient/:bedId', component: AddNewPatientComponent},
  {path: 'updatePatientDetails/:bedId', component: UpdatePatientDetailsComponent},
  {path: 'updateBedDetails/:bedId', component: UpdateBedDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModuleRoutingModule { }
