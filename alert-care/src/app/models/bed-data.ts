export class BedData {
    bedID: string;
    bedConfigurationID: number;
    department: string;
    occupancyStatus: string;

    constructor(bedId:string, bedConfigurationID:number, dept:string, status:string){

        this.bedID = bedId;
        this.bedConfigurationID = bedConfigurationID;
        this.department = dept;
        this.occupancyStatus = status;
    }
}
