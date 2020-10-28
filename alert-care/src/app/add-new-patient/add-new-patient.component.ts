import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';
import {PatientDataService} from '../services/patient-data.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.css']
})
export class AddNewPatientComponent implements OnInit {
  levels = ['stable','unstable']
  addPatientDetailsForm;
   route:ActivatedRoute;
   bedDataServiceRef:BedDataService;
   patientDataServiceRef:PatientDataService;
   id;
   addSuccess:boolean;
   addFail:boolean;

  constructor( route:ActivatedRoute,bedDataServiceRef:BedDataService,patientDataServiceRef:PatientDataService) {
    this.route=route;
    this.bedDataServiceRef=bedDataServiceRef;
    this.patientDataServiceRef=patientDataServiceRef;
   }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['bedId'];
    this.addPatientDetailsForm = new FormGroup({
      patientID:new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      mobileNumber:new FormControl('',Validators.required),
      spo2:new FormControl('',Validators.required),
      bpm:new FormControl('',Validators.required),
      bedID:new FormControl('',Validators.required),
    })
    this.addPatientDetailsForm.patchValue({
        bedID:this.id
      })
   /* this.bedDataServiceRef. getBedDataById(this.id).subscribe(data=>{
      this.addPatientDetailsForm.patchValue({
        bedID:data.bedID
      })
    })*/
  }

    get patientID()
  {
    return this.addPatientDetailsForm.get('patientID');
  }

  get bedID()
  {
    return this.addPatientDetailsForm.get('bedID');
  }

  get name()
  {
    return this.addPatientDetailsForm.get('name');
  }

  get mobileNumber()
  {
    return this.addPatientDetailsForm.get('mobileNumber');
  }

  get dateOfBirth()
  {
    return this.addPatientDetailsForm.get('dateOfBirth');
  }

  get spo2()
  {
    return this.addPatientDetailsForm.get('spo2');
  }

  get bpm()
  {
    return this.addPatientDetailsForm.get('bpm')
  }

  addPatientDetails(data)
  {
    var patientDetails = data;
    patientDetails.mobileNumber = data.mobileNumber.toString();
    console.log(patientDetails);
    this.patientDataServiceRef.postPatientData(patientDetails).subscribe(success=>{
      this.addSuccess=true;
      this.addPatientDetailsForm.reset();
      this.bedDataServiceRef.updateOccupancyStatus(data.bedID,"Occupied");
    },err=>{
      this.addFail=true;
    })
    
  }
}