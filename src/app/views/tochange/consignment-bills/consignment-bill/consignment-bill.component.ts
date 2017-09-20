import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { ConsignmentBillService } from '../../../../services/consignment-bill.service';
import { WaybillService } from '../../../../services/waybill.service';
import { PriceListService } from '../../../../services/price-list.service';
import { CollectAddressService } from '../../../../services/collect-address.service';
import { AddressService } from '../../../../services/address.service';
import { AppDialogService } from '../../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-consignment-bill',
  templateUrl: './consignment-bill.component.html',
  styleUrls: ['./consignment-bill.component.css']
})
export class ConsignmentBillComponent implements OnInit {
    public priceLists: Array<any> = [];
    public collectAddresses: Array<any> = [];
    public addresses: Array<any> = [];
    public saving = false;
  
    consignmentBill = {
        _id: '',
        number: '', 
        waybills: [{_id: '', selected: false, freight_weight: 0}],
        price_list: {currency: '', taobao_link: ''},
        price_list_id: '',
        total_weight: 0,
        first_weight: 0,
        follow_weight: 0,
        collect_address_id: 0,
        collect_address: '',
        shipping_address_id: 0,
        consignee_address: '',
        consignee_name: '',
        consignee_phone: '',
        freight: 0,
        extra: 0,
        discount: 0,
        freight_collect: 0,
        freight_prepaid: 0,
        payment_ref: '',
        checked: false,
        comments: '',
        shipment_datetime: ''};
        
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private consignmentBillService: ConsignmentBillService,
        private waybillService: WaybillService,
        private priceListService: PriceListService,
        private collectAddressService: CollectAddressService,
        private addressService: AddressService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        this.addressService.getAddresses()
            .then((response: Response) => {
                this.addresses = response.json()._items.filter(
                    address => address.approved)
            })

            
            
        let id = this.route.snapshot.paramMap.get('id');
        
        if(id && parseInt(id) != 0){
            this.consignmentBillService.getConsignmentBill(id)
                .then((response: Response) => {
                    this.consignmentBill = response.json();
                    
                })
                .catch((error) => {
                    this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                        duration: 3000
                    });
                    
                    this.router.navigate(['/consignment-bills']);
                })        
        }else{
            this.priceListService.getPriceLists()
                .then((response: Response) => {
                    this.priceLists = response.json()._items;
                })
            this.collectAddressService.getCollectAddresses()
                .then((response: Response) => {
                    this.collectAddresses = response.json()._items;
                })
                
            this.waybillService.getWaybills()
                .then((response: Response) => {
                    let waybills = response.json()._items;
                    
                    this.consignmentBill.waybills = waybills.filter(
                        waybill => waybill.received_datetime && waybill.freight_weight > 0 && waybill.description
                    )
                    
                    let selectedWaybills = this.route.snapshot.queryParams['waybills'];
                    if(selectedWaybills){
                        selectedWaybills = selectedWaybills.split(',');
                    }

                    for(var i=0; i<this.consignmentBill.waybills.length; i++){
                        this.consignmentBill.waybills[i].selected = false;
                        
                        if(selectedWaybills){
                            for(var j = 0; j < selectedWaybills.length; j++){
                                if(selectedWaybills[j] == this.consignmentBill.waybills[i]._id){
                                    this.consignmentBill.waybills[i].selected = true;
                                }
                            }
                        }
                    }
                    
                    this.updateWeight();
                })
                
                
        }
    }
    
    selectWaybill(event, id){
        for(var i=0; i<this.consignmentBill.waybills.length; i++){
            if(this.consignmentBill.waybills[i]._id == id){
                this.consignmentBill.waybills[i].selected = event.checked;
            }
        }
        
        this.updateWeight();
    }
    
    updateWeight(){
        this.consignmentBill.total_weight = 0;
        this.consignmentBill.first_weight = 0;
        this.consignmentBill.follow_weight = 0;
        for(var i=0; i<this.consignmentBill.waybills.length; i++){
            if(this.consignmentBill.waybills[i].selected){
                this.consignmentBill.total_weight += this.consignmentBill.waybills[i].freight_weight;
            }
        }
        
        if(this.consignmentBill.total_weight > 0){
            this.consignmentBill.total_weight = Math.round(this.consignmentBill.total_weight * 100) / 100;
        }
        
        this.refreshFreight();
    }
    
    changePriceList(){
        this.consignmentBill.collect_address_id = null;
        this.consignmentBill.shipping_address_id = null;
        this.consignmentBill.consignee_address = null;
        this.consignmentBill.consignee_name = null;
        this.consignmentBill.consignee_phone = null;
        
        for(var i=0; i<this.collectAddresses.length; i++){
            if(this.collectAddresses[i].price_list_id == this.consignmentBill.price_list_id){
                this.consignmentBill.collect_address_id = this.collectAddresses[i]._id;
                this.consignmentBill.consignee_address = this.collectAddresses[i].address;
            }
        }
        
        if(this.consignmentBill.collect_address_id == null && this.addresses.length){
            this.consignmentBill.shipping_address_id = this.addresses[0]._id;
            this.consignmentBill.consignee_address = this.addresses[0].full_address;
            this.consignmentBill.consignee_name = this.addresses[0].receiver_name;
            this.consignmentBill.consignee_phone = this.addresses[0].receiver_phone;
        }
        
        this.refreshFreight();
    }
    
    changeShippingAddress(){
        if(this.consignmentBill.shipping_address_id != null){
            for(var i=0; i<this.addresses.length; i++){
                if(this.addresses[i]._id == this.consignmentBill.shipping_address_id){
                    this.consignmentBill.consignee_address = this.addresses[i].full_address;
                    this.consignmentBill.consignee_name = this.addresses[i].receiver_name;
                    this.consignmentBill.consignee_phone = this.addresses[i].receiver_phone;
                }
            }
        }
        
        this.refreshFreight();
    }
    
    refreshFreight(){
        if(this.consignmentBill.checked) return;
        
        this.consignmentBill.freight = 0;
        this.consignmentBill.extra = 0;
        this.consignmentBill.discount = 0;
        this.consignmentBill.freight_collect = 0;
        this.consignmentBill.freight_prepaid = 0;
        
        let selectedPriceList = {first_weight_factor: 0, follow_weight_factor: 0, extra: 0};
        
        for(var i=0; i<this.priceLists.length; i++){
            if(this.priceLists[i]._id == this.consignmentBill.price_list_id){
                selectedPriceList = this.priceLists[i];
                this.consignmentBill.price_list.taobao_link = this.priceLists[i].taobao_link;
                
                if(this.consignmentBill.total_weight > 0){
                    
                    if(this.consignmentBill.total_weight >= 30){
                        this.consignmentBill.first_weight = 0;
                    }else{
                        this.consignmentBill.first_weight = selectedPriceList.first_weight_factor;
                    }
                        
                    
                    this.consignmentBill.follow_weight = Math.max(Math.ceil(this.consignmentBill.total_weight) - this.consignmentBill.first_weight, selectedPriceList.follow_weight_factor);
                }
                

                this.consignmentBill.freight = (this.priceLists[i].first_weight * this.consignmentBill.first_weight) + 
                    (this.priceLists[i].follow_weight * this.consignmentBill.follow_weight);
            }
        }


        if(this.consignmentBill.shipping_address_id != null){
            for(var i=0; i<this.addresses.length; i++){
                if(this.addresses[i]._id == this.consignmentBill.shipping_address_id){
                    if(this.addresses[i].address_type.with_extra_charge){
                        this.consignmentBill.extra = selectedPriceList.extra;
                    }
                }
            }
            this.consignmentBill.freight_prepaid = this.consignmentBill.freight + this.consignmentBill.extra - this.consignmentBill.discount;
        }else{
            this.consignmentBill.freight_collect = this.consignmentBill.freight - this.consignmentBill.discount;
        }
        
    }
    
    /*getPriceList(){
        for(var i=0; i<this.priceLists.length; i++){
            if(this.priceLists[i]._id == this.consignmentBill.price_list_id){
                return this.priceLists[i];
            }
        }
        return {};
    };*/
    
    /*save(){
        this.saving = true;
        
        this.waybillService.save(this.waybill)
            .then((response: Response) => {
                this.snackBar.open('已成功更新貨品資料。', 'close', {
                    duration: 3000
                });
                this.router.navigate(['/waybills']);
            })
            .catch((error) => {
                this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                    duration: 3000
                });
                
                this.saving = false;
            })        
            
    }
    
    delete(){
        this.dialogService.confirm('確認刪除？', '您是否要刪除運單'+this.waybill.number+'？')
            .subscribe((result) => {
                if(result){
                    this.waybillService.delete(this.waybill)
                        .then((response: Response) => {
                            this.snackBar.open('已成功刪除運單資料。', 'close', {
                                duration: 3000
                            });
                            this.router.navigate(['/waybills']);
                        })
                        .catch((error) => {
                            this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                                duration: 3000
                            });
                        })    
                }

            });
    }
    
    onLogisticsCompanyChange(event){
        if(this.waybill._id) return true;
        
        this.waybillService.check_waybill_exist(this.waybill)
            .then((response: Response) => {
                let data = response.json();
                
                if(!data.waybill_id) return false;
                
                if(data.user_id){
                    let me = JSON.parse(localStorage.getItem('me'));
                    
                    if(data.user_id == me._id){
                        this.dialogService.alert('運單'+this.waybill.number+'已到達物流中轉站！', '在我們的記錄中，此運單不能被認領，請檢查你的貨物清單或聯絡我們的客戶服務員。');
                    }else{
                        this.dialogService.alert('運單'+this.waybill.number+'重複新增！', '在我們的記錄中，此運單已在閣下的系統內，當貨物到達後，會自動錄入到閣下系統的。');
                    }
                    
                    this.waybill.number = null;
                    this.waybill.logistics_company_id = null;
                }else{
                    this.dialogService.confirm('運單'+this.waybill.number+'已到達物流中轉站！', '是否要認領呢？')
                      .subscribe((result) => {
                          if(result){
                              this.claim(data.waybill_id);
                          }
                        
                      });
                }
                
            })
            .catch((error) => {
                this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                    duration: 3000
                });
                
                this.waybill.number = null;
                this.waybill.logistics_company_id = null;
            })                
    }
    
    claim(waybill_id){
        this.waybillService.claim(waybill_id)
            .then((response: Response) => {
                let data = response.json();
                
                this.dialogService.alert('運單'+this.waybill.number+'已到達物流中轉站！', '已成功認領。請先用<中文>簡單地填寫資料，才能組合出貨。');
                
                this.router.navigate(['/waybills', data.waybill_id]);
            })
            .catch((error) => {
                this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                    duration: 3000
                });
                
                this.waybill.number = null;
                this.waybill.logistics_company_id = null;
            })        
    }*/
    
    convertToDate(stringDate){
        let dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    }
    
    
}
