import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BedListCompComponent } from './bed-list-comp/bed-list-comp.component';
import { NavbarCompComponent } from './navbar-comp/navbar-comp.component';
import { ViewPatientDetailsComponent } from './view-patient-details/view-patient-details.component';
import { UpdateBedDetailsComponent } from './update-bed-details/update-bed-details.component';
import { UpdatePatientDetailsComponent } from './update-patient-details/update-patient-details.component';
import { AddNewPatientComponent } from './add-new-patient/add-new-patient.component';
import {RoutingModuleRoutingModule} from './routing-module/routing-module-routing.module';
import { HomeComponent } from './home/home.component';
import { BedLayoutDisplayComponent } from './bed-layout-display/bed-layout-display.component';
import { SetupComponent } from './setup/setup.component';


@NgModule({
  declarations: [
    AppComponent,
    BedListCompComponent,
    NavbarCompComponent,
    ViewPatientDetailsComponent,
    UpdateBedDetailsComponent,
    UpdatePatientDetailsComponent,
    AddNewPatientComponent,
    HomeComponent,
    BedLayoutDisplayComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,RoutingModuleRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
