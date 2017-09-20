import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';

@Injectable()
export class AddressService {
    private BASE_URL: string = '//app.tochange.com.hk/api/v1';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    private ts = new Date().getTime();
    
    constructor(
        private http: Http,
        private authService: AuthService) { }

    getAddresses(): Promise<any> {
        let url: string = `${this.BASE_URL}/addresses?embedded={"address_type": true}&where={"deprecated": false}&ts=${this.ts}`;
        
        return this.http.get(url, {headers: this.authService.getHttpHeader() }).toPromise();
    }
    
    getAddress(id: string): Promise<any> {
        let url: string = `${this.BASE_URL}/addresses/${id}?ts=${this.ts}`;
        
        return this.http.get(url, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }
    
    save(address: any): Promise<any> {
        let url: string = address._id ? `${this.BASE_URL}/addresses/${address._id}` : `${this.BASE_URL}/addresses`;
        
        let httpHeader = this.authService.getHttpHeader();
        if(address._id){
            httpHeader.set('If-Match', address._etag);
            httpHeader.set('X-HTTP-Method-Override', 'PATCH');
        }

        
        let data = {
            'country_id': parseInt(address.country_id),
            'address_type_id': parseInt(address.address_type_id),
            'address': address.address,
            'receiver_name': address.receiver_name,
            'receiver_phone': address.receiver_phone,
            'address_checking': '未驗證'
        }

        return this.http.post(url, data, {headers: httpHeader })
            .toPromise()
            .catch(this.handleError);
    }
    
    delete(address: any): Promise<any> {
        let url: string = `${this.BASE_URL}/${address._links.self.href}`;
        let httpHeader = this.authService.getHttpHeader();
        httpHeader.set('If-Match', address._etag);
    
        return this.http.delete(url, {headers: httpHeader })
            .toPromise()
            .catch(this.handleError);
    }
    
    deactivate(address: any): Promise<any> {
        let url: string = `${this.BASE_URL}/${address._links.self.href}`;
        let httpHeader = this.authService.getHttpHeader();
        httpHeader.set('If-Match', address._etag);
        let data: {
            'deprecated': true
        }
    
        return this.http.patch(url, data, {headers: httpHeader })
            .toPromise()
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    
}