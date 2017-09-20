import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    public articles: Array<any> = [];
	ts = new Date().getTime();

    constructor(private http: Http) { }

    ngOnInit() {
            
        this.http.get('//app.tochange.com.hk/api/v1/articles?max_results=10&ts=' + this.ts)
            .map(response => response.json())
            .subscribe(res => this.articles = res._items);
    }

}
