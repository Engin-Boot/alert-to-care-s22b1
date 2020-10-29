import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BedConfigService} from '../services/bed-config.service';
import { BedDataService } from '../services/bed-data.service';
import { BedConfig} from '../models/bed-config.model';
import {BedData} from '../models/bed-data';
import {Router} from '@angular/router';
import {ApiLoggerServiceService} from '../services/api-logger-service.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit{ 
  setupDetailsForm;
  route: Router;
  layoutList = ['L-Shaped', 'Opposite'];
  bedConfigData;
  bedData;
  apiLogger: ApiLoggerServiceService;

  constructor(
    private bedConfigService: BedConfigService,
    private bedDataService: BedDataService,
    route: Router,
    apiLogger: ApiLoggerServiceService
  ){
    this.route = route,
    this.apiLogger = apiLogger
  }

  ngOnInit(){

    this.setupDetailsForm = new FormGroup(
      {
        
        floor:new FormControl('', Validators.required),
        noOfBed:new FormControl('', Validators.required),
        layout:new FormControl('', Validators.required)
      }
    );
  }

  get floor()
  {
    return this.setupDetailsForm.get('floor');
  }

  get noOfBed()
  {
    return this.setupDetailsForm.get('noOfBed');
  }

  get layout()
  {
    return this.setupDetailsForm.get('layout');
  }

  onSubmit(data){
    this.bedConfigData = data;
    this.bedConfigData.noOfBed = this.bedConfigData.noOfBed.toString();
    console.log(this.bedConfigData);
    
    this.setupDetailsForm.reset();

    this.bedConfigService.addBedConfigData(this.bedConfigData)
    .subscribe(
      data => {
        console.log(data);

        for(let i = 1; i<= parseInt(this.bedConfigData.noOfBed); i++){

          let id = "B" + data.configurationID + this.bedConfigData.floor + i;
          this.bedData = new BedData(id,data.configurationID,'','Vacant');
          
          this.bedDataService.addBedData(this.bedData)
          .subscribe(

            data => console.log(data),
            error => this.apiLogger.write(error.message)
          );
        }
        this.route.navigateByUrl('bedList/'+data.configurationID)

      },
      error => this.apiLogger.write(error)
    );

  }
}
