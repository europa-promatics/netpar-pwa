// ----------------importing statements for local libraries and plugins----------------------

import { Component, OnInit, Inject ,AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SecurityDialogModel } from './security-dialog2.model.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SecurityDialog2Service } from './security-dialog2.service';
import {AppProvider} from '../../providers/app'
// ----------------importing statements for local libraries and plugins----------------------


@Component({
  selector: 'app-security-dialog2',
  templateUrl: './security-dialog2.component.html',
  styleUrls: ['./security-dialog2.component.css'],
  providers:[SecurityDialog2Service]
})
export class SecurityDialog2Component implements OnInit {
  // ---------------- local variables-------------------------
  securityDialogModel: SecurityDialogModel = new SecurityDialogModel();
  complexForm: FormGroup;
  DOB;
  date;
  month;
  fromPage;
  days
  dateValue
  months
  years
  totalYears=100;
  dd
  mm
  yy
  constructor(private formBuilder: FormBuilder,private appProvider:AppProvider,private securityDialog2Service:SecurityDialog2Service,private dialog: MatDialog, public dialogRef: MatDialogRef<SecurityDialog2Component>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.complexForm = formBuilder.group({
      'gender':[null,Validators.compose([Validators.required])],
      'date':[null,Validators.compose([Validators.required])],
      'month':[null,Validators.compose([Validators.required])],
      'year':[null,Validators.compose([Validators.required])]
    })
  }

  // -----------------invokes on page initialization-------------------------
  ngOnInit() {
    this.fromPage=this.data.message;
    this.getDays();//invokes getDays()
    this.getMonths();//invokes getMonths()
    this.getYears();//invokes getYears()
  }

  // ----------------------------invokes on close button------------------------
  onClosed(){
  	this.dialogRef.close();
  }


  // ----------------------invokes on ok button--------------------------------
  onOk(){
      switch (this.mm) {
            case "Dec":
              this.month='12'
            break;
            case "Nov":
              this.month='11'
            break;
            case "Oct":
              this.month='10'
            break;
            case "Sep":
              this.month='09'
            break;
            case "Aug":
              this.month='08'
            break;
            case "Jul":
              this.month='07'
            break;
            case "Jun":
              this.month='06'
            break;
            case "May":
              this.month='05'
            break;
            case "Apr":
              this.month='04'
            break;
            case "Mar":
              this.month='03'
            break;
            case "Feb":
              this.month='02'
            break;
            case "Jan":
              this.month='01'
            break;
            default:
              break;
          }
    this.securityDialogModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
    this.securityDialogModel.firstName=this.appProvider.current.firstName;
    this.securityDialogModel.lastName=this.appProvider.current.lastName;
    this.securityDialogModel.state=this.appProvider.current.state
    this.securityDialogModel.district=this.appProvider.current.district
    this.securityDialogModel.block=this.appProvider.current.block;
    this.securityDialogModel.mobileNumber=this.appProvider.current.previousMobileNumber;
    this.securityDialog2Service.SecurityStep2(this.securityDialogModel).subscribe(data=>{
      this.dialogRef.close(data);
    },err=>{

    })
  }

  // ----------------------------calender------------------
    getDays(){
        this.days = [];
        for(var i=1;i<=31;i++){
              if(i<=9){
                this.dateValue = '0' + i;
              } else {
                 this.dateValue = i;
              }
              this.days.push({value:this.dateValue});
        }
        // alert (JSON.stringify(this.days));
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
        // alert(JSON.stringify(this.months))
        return this.months;
    }


    getYears(){
      var currentYear = new Date().getFullYear();
      this.years=[];
      for (var i = currentYear; i > currentYear - this.totalYears; i--) {
          this.years.push({year: [i - 1]});
      }
      return this.years;
    }

}
