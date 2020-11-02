import { Injectable ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BedData} from '../models/bed-data';
import {PatientData} from '../models/patient-data';

@Injectable({
  providedIn: 'root'
})
export class BedDataService {

  httpClient: HttpClient;
  baseUrl: string = 'https://localhost:5001/api/BedDatas/';
  constructor(httpClient: HttpClient) {
 
    this.httpClient = httpClient;
   }

   getBedData()
   {
     const observableStream = this.httpClient.get<BedData[]>(this.baseUrl);
     return observableStream;
   }

   getBedDataById(id)
   {
     const observableStream = this.httpClient.get<BedData>(this.baseUrl+id);
     return observableStream;
   }

   updateBedData(id, data)
   {
     const observableStream = this.httpClient.put(this.baseUrl+id, data);
     return observableStream;
   }

   getPatientAllocatedToBed(id)
   {
     const observableStream = this.httpClient.get<PatientData>(this.baseUrl+'patient-allocated-to-bed/'+id);
     return observableStream;
   }

   addBedData(bedData)
   {
      const observableStream = this.httpClient.post(this.baseUrl,bedData);
      return observableStream;
   }

   updateOccupancyStatusAndDepartmentWhenPatientDeleted(bedId)
  {
    this.getBedDataById(bedId).subscribe(
      data => {
        let updatedBedDetails = data;
        updatedBedDetails.occupancyStatus = 'Vacant';
        updatedBedDetails.department = '';
        this.updateBedData(bedId,updatedBedDetails).subscribe(
          succ=>{console.log('occupancy status and Department updated');},
          err=>{console.log('occupancy status and Department update failed');}
        )
      }
    );
  }

  updateOccupancyStatus(bedId,status)
  {
    this.getBedDataById(bedId).subscribe(
      data => {
        var updatedBedDetails = data;
        updatedBedDetails.occupancyStatus = status;
        this.updateBedData(bedId,updatedBedDetails).subscribe(
          succ=>{console.log('occupancy status updated');},
          err=>{console.log('occupancy status update failed');}
        )
      }
    );
  }
  
}
