import { PatientData } from '../models/patient-data';
import { of } from 'rxjs';

export class  PatientDataStub{

    postPatientData(patientData:PatientData)
    {
        if(patientData!=null){
            return of({ success :true});
        }
        else{
            return of({ error:true});
        }
    }
}