import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';

@Injectable()
export class AddressTypeService {
    private BASE_URL: string = '//app.tochange.com.hk/api/v1';
    private ts = new Date().getTime();
    
    constructor(
        private http: Http,
        private authService: AuthService) { }

    getAddressTypes(): Promise<any> {
        let url: string = `${this.BASE_URL}/address_types?ts=${this.ts}`;
        
        return this.http.get(url, {headers: this.authService.getHttpHeader() })
            .toPromise()
            .catch(this.handleError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}