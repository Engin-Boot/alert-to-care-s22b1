import { Injectable ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BedData} from '../models/bed-data';
import {PatientData} from '../models/patient-data';

@Injectable({
  providedIn: 'root'
})
export class BedDataService {

  httpClient:HttpClient;
  baseUrl:string="https://localhost:44369/api/BedDatas/";
  constructor(httpClient:HttpClient) {
 
    this.httpClient=httpClient;
   }

   getBedData()
   {
     let observableStream=this.httpClient.get<BedData[]>(this.baseUrl);
    console.log(observableStream);
     
    return observableStream;
   }

   getBedDataById(id)
   {
     let observableStream = this.httpClient.get<BedData>(this.baseUrl+id);
     return observableStream;
   }

   updateBedData(id,data)
   {
     let observableStream = this.httpClient.put(this.baseUrl+id,data);
     return observableStream;
   }

   getPatientAllocatedToBed(id)
   {
     let observableStream = this.httpClient.get<PatientData>(this.baseUrl+"patient-allocated-to-bed/"+id);
     return observableStream;
   }

   updateOccupancyStatus(bedId,status)
  {
    this.getBedDataById(bedId).subscribe(
      data=>{
        var updatedBedDetails = data;
        updatedBedDetails.occupancyStatus = status;
        this.updateBedData(bedId,updatedBedDetails).subscribe(
          succ=>{console.log("occupancy status updated")},
          err=>{console.log("occupancy status update failed")}
        )
      }
    )
  }
  
}
