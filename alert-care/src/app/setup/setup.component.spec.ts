import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupComponent } from './setup.component';
import { BedConfigService} from '../services/bed-config.service';
import { BedDataService } from '../services/bed-data.service';
import { BedConfig} from '../models/bed-config.model';
import {BedData} from '../models/bed-data';
import {Router} from '@angular/router';
import {ApiLoggerServiceService} from '../services/api-logger-service.service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';


class RouterStub {
  navigate(url: string) { return url; }
}

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupComponent ], 
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ BedConfigService, BedDataService, BedConfig, BedData, ApiLoggerServiceService, 
       {provide: Router, useClass: RouterStub }
      ]  
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit button',() => {

    spyOn(component,'onSubmit');
    let e1 = fixture.debugElement.query(By.css('button')).nativeElement;
    e1.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid',() => {

    component.setupDetailsForm.controls['floor'].setValue(null);
    component.setupDetailsForm.controls['noOfBed'].setValue(null);
    component.setupDetailsForm.controls['layout'].setValue(null);

    expect(component.setupDetailsForm.valid).toBeFalsy();
  });

  it('form should be valid',() => {

    component.setupDetailsForm.controls['floor'].setValue(20);
    component.setupDetailsForm.controls['noOfBed'].setValue(2);
    component.setupDetailsForm.controls['layout'].setValue("opposite");

    expect(component.setupDetailsForm.valid).toBeTruthy();
  });


});
