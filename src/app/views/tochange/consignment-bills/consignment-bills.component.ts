import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { ConsignmentBillService } from '../../../services/consignment-bill.service';

@Component({
  selector: 'app-consignment-bills',
  templateUrl: './consignment-bills.component.html',
  styleUrls: ['./consignment-bills.component.css']
})
export class ConsignmentBillsComponent implements OnInit {
    public consignmentBills: Array<any> = [];

    constructor(
        private consignmentBillService: ConsignmentBillService) { }

    ngOnInit() {
            
        this.consignmentBillService.getConsignmentBills(1)
            .then((response: Response) => {
                this.consignmentBills = response.json()._items;
            })
    }
    
    convertToDate(stringDate){
        let dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    }
   
}
