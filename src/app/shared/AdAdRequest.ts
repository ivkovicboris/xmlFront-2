import { Ad } from './Ad';
import { AdRequest } from './AdRequest';

export class AdAdRequest {
    adId:string;
    ad:Ad;
    adRequestId:string;
    adRequest:AdRequest;

    constructor(
        adId:string,
        ad:Ad,
        adRequestId:string,
        adRequest:AdRequest,
    ) {
        this.adId = adId;
        this.ad = ad;
        this.adRequestId = adRequestId;
        this.adRequest = adRequest;
    }
}