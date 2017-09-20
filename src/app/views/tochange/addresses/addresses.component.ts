import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
    public addresses: Array<any> = [];

    constructor(private addressService: AddressService) { }

    ngOnInit() {
            
        this.addressService.getAddresses()
            .then((response: Response) => {
                this.addresses = response.json()._items;
            })
    }

    
    
}
