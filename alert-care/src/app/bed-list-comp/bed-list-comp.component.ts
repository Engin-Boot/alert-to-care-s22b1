import { Component, OnInit } from '@angular/core';
import {BedDataService} from '../services/bed-data.service';
import {BedConfigService} from '../services/bed-config.service';
import {PatientDataService} from '../services/patient-data.service';
import {BedData} from '../models/bed-data';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-bed-list-comp',
  templateUrl: './bed-list-comp.component.html',
  styleUrls: ['./bed-list-comp.component.css']
})
export class BedListCompComponent implements OnInit {
check: boolean;
bedDataServiceRef: BedDataService;
patientDataServiceRef: PatientDataService;
bedConfServiceRef: BedConfigService;
location: Location
bedDataList: BedData[];
route: Router;
acr: ActivatedRoute;
id;

  constructor(bedDataServiceRef:BedDataService, route:Router, patientDataServiceRef:PatientDataService, location:Location, bedConfServiceRef:BedConfigService, acr:ActivatedRoute) {
    this.patientDataServiceRef = patientDataServiceRef;
    this.bedDataServiceRef = bedDataServiceRef;
    this.route = route;
    this.bedConfServiceRef = bedConfServiceRef;
    this.location = location;
    this.acr =  acr;
   }

  ngOnInit(): void {
    this.id = this.acr.snapshot.params['configurationId'];
    this.bedConfServiceRef.getBedsForGivenBedConfigurationId(this.id).subscribe(data => {
      console.log(data);
      this.bedDataList = data;
    });
  }

  disableManagePatientDetailsButtonWhenOccupancyStatusisVacant(occupancyStatus: string)
  {
    
    if(occupancyStatus.toUpperCase() == "VACANT")
    {
      this.check = true;
    }
    else
    {
      this.check = false;
    }
    return this.check;
  }

  deletePatientEntry(bedId)
  {
    //delete patient entry from data base
    this.bedDataServiceRef.getPatientAllocatedToBed(bedId).subscribe(
      data => { 
        this.patientDataServiceRef.deletePatientData(data[0].patientID).subscribe(succ => {alert("Patient entry deleted successfully");
          window.location.reload();
          this.bedDataServiceRef.updateOccupancyStatusAndDepartmentWhenPatientDeleted(bedId);
          },
          err => {alert('Patient entry deletion failed');}
        );
      },
      err => {alert('Something went wrong');}
    );
    
  }

  updatePatientDetails(bedId)
  {
    this.route.navigateByUrl('updatePatientDetails/'+bedId);
  }

  viewPatientDetails(bedId)
  {
    this.route.navigateByUrl('viewPatient/'+bedId);
  }

  addPatient(id)
  {
    this.route.navigateByUrl('addPatient/'+id);
  }

  updateBedDetails(id)
  {
    this.route.navigateByUrl('updateBedDetails/'+id);
  }

}
