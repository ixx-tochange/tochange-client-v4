import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
    public faqs: Array<any> = [];
	ts = new Date().getTime();

    constructor(private http: Http) { }

    ngOnInit() {
            
        this.http.get('//app.tochange.com.hk/api/v1/faqs?ts=' + this.ts)
            .map(response => response.json())
            .subscribe(res => this.faqs = res._items);
    }

}
