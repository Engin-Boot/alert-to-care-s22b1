import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';
import {PatientDataService} from '../services/patient-data.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {
  levels = [ 'stable', 'unstable' ];
  addPatientDetailsForm;
  route: ActivatedRoute;
  bedDataServiceRef: BedDataService;
  patientDataServiceRef: PatientDataService;
  id;
  addSuccess: boolean;
  addFail: boolean;

  constructor( route:ActivatedRoute, bedDataServiceRef:BedDataService, patientDataServiceRef:PatientDataService ) {
    this.route = route;
    this.bedDataServiceRef = bedDataServiceRef;
    this.patientDataServiceRef = patientDataServiceRef;
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['bedId'];
    this.addPatientDetailsForm = new FormGroup({
      patientID: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      spo2: new FormControl('', Validators.required),
      bpm: new FormControl('', Validators.required),
      bedID: new FormControl('', Validators.required),
    });
    this.addPatientDetailsForm.patchValue({
        bedID: this.id
      });
   
  }

    get patientID(): FormControl
  {
    return this.addPatientDetailsForm.get('patientID');
  }

  get bedID(): FormControl
  {
    return this.addPatientDetailsForm.get('bedID');
  }

  get name(): FormControl
  {
    return this.addPatientDetailsForm.get('name');
  }

  get mobileNumber(): FormControl
  {
    return this.addPatientDetailsForm.get('mobileNumber');
  }

  get dateOfBirth(): FormControl
  {
    return this.addPatientDetailsForm.get('dateOfBirth');
  }

  get spo2(): FormControl
  {
    return this.addPatientDetailsForm.get('spo2');
  }

  get bpm(): FormControl
  {
    return this.addPatientDetailsForm.get('bpm');
  }

  addPatientDetails(data): void
  {
    let patientDetails = data;
    patientDetails.mobileNumber = data.mobileNumber.toString();
    console.log(patientDetails);
    this.patientDataServiceRef.postPatientData(patientDetails).subscribe(success => {
      this.addSuccess = true;
      this.addPatientDetailsForm.reset();
      this.bedDataServiceRef.updateOccupancyStatus(data.bedID,"Occupied");
    },err => {
      this.addFail = true;
    });
    
  }
}
