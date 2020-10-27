import { Component, OnInit } from '@angular/core';
import {BedDataService} from '../services/bed-data.service';
import {PatientDataService} from '../services/patient-data.service';
import {BedData} from '../models/bed-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bed-list-comp',
  templateUrl: './bed-list-comp.component.html',
  styleUrls: ['./bed-list-comp.component.css']
})
export class BedListCompComponent implements OnInit {
check:boolean;
bedDataServiceRef:BedDataService;
patientDataServiceRef:PatientDataService;
bedDataList:BedData[];
route:Router;

  constructor(bedDataServiceRef:BedDataService, route:Router,patientDataServiceRef:PatientDataService) {
    this.patientDataServiceRef=patientDataServiceRef;
    this.bedDataServiceRef =bedDataServiceRef;
    this.route=route;
   }

  ngOnInit(): void {
    this.bedDataServiceRef.getBedData().subscribe(data=>{
      console.log(data);
      this.bedDataList=data;
    })
  }

  disableManagePatientDetailsButtonWhenOccupancyStatusisVacant(occupancyStatus:string)
  {
    
    if(occupancyStatus.toUpperCase()=="VACANT")
    {
      this.check=true;
    }
    else
    {
      this.check=false;
    }
    return this.check;
  }

  deletePatientEntry(bedId)
  {
    //delete patient entry from data base
    this.bedDataServiceRef.getPatientAllocatedToBed(bedId).subscribe(
      data=>{ 
        this.patientDataServiceRef.deletePatientData(data[0].patientID).subscribe(succ=>{alert("Patient entry deleted successfully");
          this.bedDataServiceRef.updateOccupancyStatus(bedId,"Vacant");
          },
          err=>{alert("Patient entry deletion failed")}
        )
      },
      err=>{alert("Something went wrong")}
    )
    
  }

  updatePatientDetails(bedId)
  {
    
    this.bedDataServiceRef.getPatientAllocatedToBed(bedId).subscribe(data=>{
     
      this.route.navigate(['updatePatientDetails',data[0].patientID]);
    },
    err=>{
      alert("Patient Details Not Found!!!")
    })
  }

  viewPatientDetails(bedId)
  {
    this.bedDataServiceRef.getPatientAllocatedToBed(bedId).subscribe(data=>{
      this.route.navigate(['viewPatient',data[0].patientID]);
    },err=>{
      alert("Patient Details Not Found!!!")
    })
  }

  

}
