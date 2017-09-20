import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { WaybillService } from '../../../services/waybill.service';

@Component({
  selector: 'app-waybills',
  templateUrl: './waybills.component.html',
  styleUrls: ['./waybills.component.css']
})
export class WaybillsComponent implements OnInit {
    public arrived_waybills: Array<any> = [];
    public waiting_waybills: Array<any> = [];

    constructor(
        private waybillService: WaybillService) { }

    ngOnInit() {
            
        this.waybillService.getWaybills()
            .then((response: Response) => {
                let waybills = response.json()._items;
                
                console.log(waybills);
                
                this.arrived_waybills = waybills.filter(
                    waybill => waybill.received_datetime && waybill.warehouse_position)
                
                this.waiting_waybills = waybills.filter(
                    waybill => !waybill.received_datetime || !waybill.warehouse_position)
            })
    }
    
    selectAll(){
        for(var i=0; i<this.arrived_waybills.length; i++){
            if(this.arrived_waybills[i].description){
                this.arrived_waybills[i].selected = true;
            }
        }
    }
    
    grouping(){
        for(var i=0; i<this.arrived_waybills.length; i++){
            if(this.arrived_waybills[i].description){
                this.arrived_waybills[i].selected = true;
            }
        }
    }

    convertToDate(stringDate){
        let dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    }
   
}
