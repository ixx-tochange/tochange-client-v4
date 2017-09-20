import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    member_id : string = '';
    user_id : string = '';

    constructor() { }

    ngOnInit() {
        let me = JSON.parse(localStorage.getItem('me'));
        this.member_id = me.member_id;
        this.user_id = me._id;
    }

}
