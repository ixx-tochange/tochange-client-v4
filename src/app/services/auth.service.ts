import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private BASE_URL: string = '//app.tochange.com.hk/auth';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http) { }

    login(email: string, password: string): Promise<any> {
        let url: string = `${this.BASE_URL}/login`;
        return this.http.post(url, JSON.stringify({ email: email, password: password }), {headers: this.headers}).toPromise();
    }

    register(name: string, email: string, password: string): Promise<any> {
        let url: string = `${this.BASE_URL}/signup`;
        return this.http.post(url, JSON.stringify({ name: name, email: email, password: password }), {headers: this.headers}).toPromise();
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
    
    
    me(){
        let url: string = `${this.BASE_URL}/me`;
        let token = btoa(JSON.parse(localStorage.getItem('currentUser')).token + ':');
        
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        });
        
        return this.http.get(url, {headers: headers}).toPromise();
    }
    
    activation(token: string): Promise<any> {
        let url: string = `${this.BASE_URL}/activation`;
        
        return this.http.post(url, JSON.stringify({ token: token }), {headers: this.headers}).toPromise();
    }
    
    resend(email: string): Promise<any> {
        let url: string = `${this.BASE_URL}/resend`;
        
        return this.http.post(url, JSON.stringify({ email: email }), {headers: this.headers}).toPromise();
    }
    
    forgot(email: string): Promise<any> {
        let url: string = `${this.BASE_URL}/forgot_password`;
        
        return this.http.post(url, JSON.stringify({ email: email }), {headers: this.headers}).toPromise();
    }
    
    reset(token: string): Promise<any> {
        let url: string = `${this.BASE_URL}/reset_password`;
        
        return this.http.post(url, JSON.stringify({ token: token }), {headers: this.headers}).toPromise();
    }
    
    getHttpHeader() {
        let token = btoa(JSON.parse(localStorage.getItem('currentUser')).token + ':');
        
        let headers: Headers = new Headers({
            'Content-Type': 'application/json',
            'Cache-control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Basic ${token}`
        });
        
        return headers;
    }
}