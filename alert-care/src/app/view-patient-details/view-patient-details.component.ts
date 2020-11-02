import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientDataService} from '../services/patient-data.service';
import {PatientData} from '../models/patient-data';
import {BedDataService} from '../services/bed-data.service';

@Component({
  selector: 'app-view-patient-details',
  templateUrl: './view-patient-details.component.html',
  styleUrls: ['./view-patient-details.component.css']
})
export class ViewPatientDetailsComponent implements OnInit {
route: ActivatedRoute;
patientDataServiceRef: PatientDataService;
patientData: PatientData;
id;
bedDataServiceRef: BedDataService;

  constructor(patientDataServiceRef: PatientDataService, route: ActivatedRoute, bedDataServiceRef: BedDataService) {
    this.patientData = new PatientData();
    this.route = route;
    this.patientDataServiceRef = patientDataServiceRef;
    this.bedDataServiceRef = bedDataServiceRef;
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['bedId'];
      this.bedDataServiceRef.getPatientAllocatedToBed(this.id).subscribe(data => {
      this.patientDataServiceRef.getPatientDataById(data[0].patientID).subscribe(data => {
        console.log(data);
        this.patientData.patientID = data.patientID;
        this.patientData.name = data.name;
        this.patientData.dateOfBirth = data.dateOfBirth;
        this.patientData.mobileNumber = data.mobileNumber;
        this.patientData.spo2 = data.spo2;
        this.patientData.bpm = data.bpm;
        this.patientData.bedID = data.bedID;
      }
     );
    },err=>{
      alert('Patient Details Not Found!!!');
    });
  }

}
