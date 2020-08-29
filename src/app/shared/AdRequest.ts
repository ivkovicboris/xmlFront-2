import { AdAdRequest } from './AdAdRequest';

export class AdRequest
{
    id: string;
    clientId:string;
    startDate: Date;
    endDate: Date;
    requestStatus: string;
    adAdRequests: Array<AdAdRequest>;

    constructor(
        id:string,
        clientId:string,
        startDate:Date,
        endDate:Date,
        requestStatus:string,
        adAdRequests: Array<AdAdRequest>,
    ){
        this.id = id;
        this.clientId = clientId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.requestStatus = requestStatus;
        this.adAdRequests = adAdRequests;
    }

}