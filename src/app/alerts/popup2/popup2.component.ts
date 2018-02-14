// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { UpdateMobileService } from '../../providers/update-mobile.service';
import { UpdateMobileModel } from './updateMobile.model.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css'],
  providers:[UpdateMobileService]
})
export class Popup2Component implements OnInit {
  // ------------------------local variables-----------------------------
	DOB;
	date;
  month;
  complexForm: FormGroup;
	updateMobileModel:UpdateMobileModel=new UpdateMobileModel();
  days
  dateValue
  months
  years
  totalYears=100;
  dd
  mm
  yy
  constructor(private formBuilder: FormBuilder,private updateMobileService:UpdateMobileService,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<Popup2Component>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
     this.complexForm = formBuilder.group({
      'gender':[null,Validators.compose([Validators.required])],
      'mobileNumber':[null,Validators.compose([Validators.required])],
      'date':[null,Validators.compose([Validators.required])],
      'month':[null,Validators.compose([Validators.required])],
      'year':[null,Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
    this.getDays();//invokes getDays();
    this.getMonths();//invokes getMonths();
    this.getYears();//invokes getYears();
  }

// -------------------------invokes on update button--------------------------------
 onUpdate(){
   switch (this.mm) {
              case "Dec":this.month='12'
              break;
              case "Nov":this.month='11'
              break;
              case "Oct":this.month='10'
              break;
              case "Sep":this.month='09'
              break;
              case "Aug":this.month='08'
              break;
              case "Jul":this.month='07'
              break;
              case "Jun":this.month='06'
              break;
              case "May":this.month='05'
              break;
              case "Apr":this.month='04'
              break;
              case "Mar":this.month='03'
              break;
              case "Feb":this.month='02'
              break;
              case "Jan":this.month='01'
              break;
              default:
                break;
   }
  this.updateMobileModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
 	this.updateMobileModel.firstName=this.appProvider.current.firstName;
 	this.updateMobileModel.lastName=this.appProvider.current.lastName;
 	this.updateMobileModel.mobileNumberNew=this.appProvider.current.mobileNumber;
 	this.updateMobileModel.state=this.appProvider.current.state
 	this.updateMobileModel.district=this.appProvider.current.district;
 	this.updateMobileModel.block=this.appProvider.current.block;
    this.updateMobileService.updateMobileNumber(this.updateMobileModel).subscribe(data=>{
    	if(data){
    		this.dialogRef.close(data);
    	}
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
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
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
