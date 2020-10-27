export class BedData {
    bedID:string;
    floor:number;
    department:string;
    occupancyStatus:string;

    constructor(bedId:string,floor:number,dept:string,status:string){

        this.bedID = bedId;
        this.floor = floor;
        this.department = dept;
        this.occupancyStatus = status;
    }
}
