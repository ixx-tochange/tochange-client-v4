import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { AddressService } from '../../../../services/address.service';
import { AddressTypeService } from '../../../../services/address-type.service';
import { CountryService } from '../../../../services/country.service';
import { AppDialogService } from '../../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    public addressTypes: Array<any> = [];
    public countries: Array<any> = [];
    public saving = false;
  
    address = {
        _id: '',
        country_id: '',
        address_type_id: '',
        address: '',
        receiver_name: '',
        receiver_phone: '',
        address_checking: '未驗證'};
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private addressService: AddressService,
        private addressTypeService: AddressTypeService,
        private countryService: CountryService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        this.addressTypeService.getAddressTypes()
            .then((response: Response) => {
                this.addressTypes = response.json()._items;
            })
        
        this.countryService.getCountries()
            .then((response: Response) => {
                this.countries = response.json()._items;
            })
        
        let id = this.route.snapshot.paramMap.get('id');
        
        if(id && parseInt(id) != 0){
            this.addressService.getAddress(id)
                .then((response: Response) => {
                    this.address = response.json();
                })
                .catch((error) => {
                    this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                        duration: 3000
                    });
                    
                    this.router.navigate(['/addresses']);
                })        
        }
    }
    
    save(){
        this.saving = true;
        
        this.addressService.save(this.address)
            .then((response: Response) => {
                this.snackBar.open('已成功更新收貨地址資料。', 'close', {
                    duration: 3000
                });
                this.router.navigate(['/addresses']);
            })
            .catch((error) => {
                this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                    duration: 3000
                });
                
                this.saving = false;
            })        
            
    }
    
    delete(){
        this.dialogService.confirm('確認刪除？', '您是否要刪除收貨地址？')
            .subscribe((result) => {
                if(result){
                    this.addressService.delete(this.address)
                        .then((response: Response) => {
                            this.snackBar.open('已成功刪除收貨地址。', 'close', {
                                duration: 3000
                            });
                            this.router.navigate(['/addresses']);
                        })
                        .catch((error) => {
                            this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                                duration: 3000
                            });
                        })    
                }

            });
    }
    
    deactivate(){
        this.dialogService.confirm('確認棄用？', '您是否要棄用這個收貨地址？')
            .subscribe((result) => {
                if(result){
                    this.addressService.deactivate(this.address)
                        .then((response: Response) => {
                            this.snackBar.open('已成功更新地址資料。', 'close', {
                                duration: 3000
                            });
                            this.router.navigate(['/addresses']);
                        })
                        .catch((error) => {
                            this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                                duration: 3000
                            });
                        })    
                }

            });
    }
    
    
    
}
