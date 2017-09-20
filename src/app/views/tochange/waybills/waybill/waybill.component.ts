import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { WaybillService } from '../../../../services/waybill.service';
import { LogisticsCompanyService } from '../../../../services/logistics-company.service';
import { AppDialogService } from '../../../../services/app-dialog/app-dialog.service';

@Component({
  selector: 'app-waybill',
  templateUrl: './waybill.component.html',
  styleUrls: ['./waybill.component.css']
})
export class WaybillComponent implements OnInit {
    public logisticsCompanies: Array<any> = [];
    public saving = false;
  
    waybill = {
        _id: '',
        number: '', 
        logistics_company_id: '',
        description: '',
        received_datetime: ''};
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private waybillService: WaybillService,
        private logisticsCompanyService: LogisticsCompanyService,
        public dialogService: AppDialogService,
        public snackBar: MdSnackBar) { }

    ngOnInit() {
        this.logisticsCompanyService.getLogisticsCompanies()
            .then((response: Response) => {
                this.logisticsCompanies = response.json()._items;
            })
        
        let id = this.route.snapshot.paramMap.get('id');
        
        if(id && parseInt(id) != 0){
            this.waybillService.getWaybill(id)
                .then((response: Response) => {
                    this.waybill = response.json();
                })
                .catch((error) => {
                    this.snackBar.open('系統繁忙，請稍後再試。[' + error.status + ']', 'close', {
                        duration: 3000
                    });
                    
                    this.router.navigate(['/waybills']);
                })        
        }
    }
    
    save(){
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
    }
    
    convertToDate(stringDate){
        let dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut;
    }
    
    
}
