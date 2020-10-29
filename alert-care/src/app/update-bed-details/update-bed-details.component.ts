import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BedDataService} from '../services/bed-data.service';

@Component({
  selector: 'app-update-bed-details',
  templateUrl: './update-bed-details.component.html',
  styleUrls: ['./update-bed-details.component.css']
})
export class UpdateBedDetailsComponent implements OnInit {
  occupancyStatuses = ['Occupied', 'Vacant'];
  updateBedDetailsForm;
  route: ActivatedRoute;
  bedDataServiceRef: BedDataService;
  id;
  updateSuccess: boolean;
  updateFailed: boolean;

  constructor(route: ActivatedRoute, bedDataServiceRef: BedDataService) {
    this.route = route;
    this.bedDataServiceRef = bedDataServiceRef;
   }

  ngOnInit(): void  {
    this.id = this.route.snapshot.params['bedId'];
    this.updateBedDetailsForm = new FormGroup(
      {
        bedID: new FormControl(''),
        bedConfigurationID: new FormControl(''),
        department: new FormControl('', Validators.required),
        occupancyStatus: new FormControl('', Validators.required)
      }
    );

    this.bedDataServiceRef.getBedDataById(this.id).subscribe(data => {
      console.log(data);
      console.log(data.bedID);
      this.updateBedDetailsForm.setValue(data);
    });
  }

  updateBedDetails(data)
  {
    console.log(data);
    this.bedDataServiceRef.updateBedData(this.id,data).subscribe(data => {
      this.updateSuccess = true;
      this.updateBedDetailsForm.reset(); 
     
    },err => {
      this.updateFailed = true;
    });
     
  }

  get bedID()
  {
    return this.updateBedDetailsForm.get('bedID');
  }

  get floor()
  {
    return this.updateBedDetailsForm.get('floor');
  }

  get department()
  {
   return this.updateBedDetailsForm.get('department');
  }

  get occupancyStatus()
  {
    return this.updateBedDetailsForm.get('occupancyStatus');
  }

}
