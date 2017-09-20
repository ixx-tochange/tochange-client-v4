import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';

@Injectable()
export class ConsignmentBillService {
    private BASE_URL: string = '//app.tochange.com.hk/api/v1';
    private ts = new Date().getTime();
    
    constructor(
        private http: Http,
        private authService: AuthService) { }

    getConsignmentBills(page: number): Promise<any> {
        let url: string = `${this.BASE_URL}/consignment_bills?sort=[("_id", -1)]&page=${page}&ts=${this.ts}`;
        
        return this.http.get(url, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }
    
    getConsignmentBill(id: string): Promise<any> {
        let url: string = `${this.BASE_URL}/consignment_bills/${id}?embedded={"waybills": true, "price_list": true, "collect_address": true}&ts=${this.ts}`;
        
        return this.http.get(url, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }
    
    
    /*save(consignmentBill: any): Promise<any> {
        let url: string = consignmentBill._id ? `${this.BASE_URL}/waybills/${consignmentBill._id}` : `${this.BASE_URL}/waybills`;
        
        let httpHeader = this.authService.getHttpHeader();
        if(waybill._id){
            httpHeader.set('If-Match', waybill._etag);
            httpHeader.set('X-HTTP-Method-Override', 'PATCH');
        }

        
        let data = waybill._Id ? 
            {
                'description': waybill.description
            } : 
            {
                'logistics_company_id': parseInt(waybill.logistics_company_id),
                'number': waybill.number,
                'description': waybill.description
            }

        return this.http.post(url, data, {headers: httpHeader })
            .toPromise()
            .catch(this.handleError);
    }
    
    delete(waybill: any): Promise<any> {
        let url: string = `${this.BASE_URL}/${waybill._links.self.href}`;
        let httpHeader = this.authService.getHttpHeader();
        httpHeader.set('If-Match', waybill._etag);
    
        return this.http.delete(url, {headers: httpHeader })
            .toPromise()
            .catch(this.handleError);
    }
    
    check_waybill_exist(waybill: any): Promise<any> {
        let url: string = `${this.BASE_URL}/waybills/check_waybill_exist`;
        let data = {
            'number': waybill.number.trim(),
            'logistics_company_id': parseInt(waybill.logistics_company_id)
        }
        
        return this.http.post(url, data, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }
    
    claim(waybill_id: string): Promise<any> {
        let url: string = `${this.BASE_URL}/waybills/claim`;
        let data = {
            'waybill_id': waybill_id
        }
        
        return this.http.post(url, data, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }*/
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


    
}