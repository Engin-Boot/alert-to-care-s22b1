import { BedData } from './bed-data';

describe('BedData', () => {
  it('should create an instance', () => {
    expect(new BedData("B101",1,"Dental","Vacant")).toBeTruthy();
  });
});
