import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BedListCompComponent } from './bed-list-comp.component';
import {BedDataService} from '../services/bed-data.service';
import {BedConfigService} from '../services/bed-config.service';
import {PatientDataService} from '../services/patient-data.service';
import {BedData} from '../models/bed-data';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../routing-module/routing-module-routing.module';



describe('BedListCompComponent', () => {
  let component: BedListCompComponent;
  let fixture: ComponentFixture<BedListCompComponent>;
  let location: Location;
  let route: Router;
  let routerSpy =  {navigateByUrl: jasmine.createSpy('navigateByUrl')}
  let bedDataServiceRef: BedDataService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedListCompComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes(routes) ],
      providers: [BedDataService, BedConfigService, PatientDataService, BedData, Location, Router,
      {provide: ActivatedRoute, useValue: {snapshot: {params: {'configurationId': '21'}}}}, 
      {provide: Router, useValue: routerSpy}
      
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    route = TestBed.get(Router); 
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(BedListCompComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(Router);
    bedDataServiceRef = TestBed.inject(BedDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to addPatient', fakeAsync(() => {
    component.addPatient('B2111');
    tick(); 
    expect (routerSpy.navigateByUrl).toHaveBeenCalledWith('addPatient/B2111');
    
  }));

  it('should navigate to updateBedDetails', fakeAsync(() => {
    component.updateBedDetails('B2111');
    tick(); 
    fixture.detectChanges();
    expect (routerSpy.navigateByUrl).toHaveBeenCalledWith('updateBedDetails/B2111');
    
  }));

  it('should navigate to viewPatient', fakeAsync(() => {
    component.viewPatientDetails('B2111'); 
    tick();
    expect (routerSpy.navigateByUrl).toHaveBeenCalledWith('viewPatient/B2111');
    
  }));

  it('should navigate to  updatePatient', fakeAsync(() => {
    component.updatePatientDetails('B2111');
    tick();
    expect (routerSpy.navigateByUrl).toHaveBeenCalledWith('updatePatientDetails/B2111');
    
  }));


});
