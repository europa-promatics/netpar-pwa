// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StateService } from '../../providers/state.service';
import { SecurityModel } from './securty.model.component';
import { SecurityDialogService } from './security-dialog.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppProvider } from '../../providers/app';
import { AllPostsService } from '../../providers/allPost.service' 
import { SecurityDialog2Component } from '../security-dialog2/security-dialog2.component';
// ----------------importing statements for local libraries and plugins end----------------------

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.css'],
  providers:[StateService,SecurityDialogService,AllPostsService]
})
export class SecurityDialogComponent implements OnInit {
  // ----------------local variables-------------------------
  complexForm: FormGroup;
  states
  securityModel: SecurityModel= new SecurityModel();
  stateData;
  districtData
  blockData
  constructor(private allPostsService:AllPostsService,private formBuilder: FormBuilder,private appProvider:AppProvider,private dialog: MatDialog,private securityDialogService:SecurityDialogService ,public dialogRef: MatDialogRef<SecurityDialogComponent>,private stateService:StateService,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.complexForm = formBuilder.group({
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'block':[null, Validators.compose([Validators.required])],
    })

   }

  ngOnInit() {
     this.getStateData();
  }

  // ------------------invokes on close button--------------------
  onClosed(){
  	this.dialogRef.close();
  }

  // ----------------------invokes on ok button-------------------------
  onOk(){
    this.securityModel.firstName=this.appProvider.current.firstName;
    this.securityModel.lastName=this.appProvider.current.lastName;
    this.securityModel.mobileNumber=this.appProvider.current.previousMobileNumber;
    this.securityDialogService.SecurityStep1(this.securityModel).subscribe(data=>{
      if (data) {
        this.appProvider.current.state=this.securityModel.state;
        this.appProvider.current.district=this.securityModel.district;
        this.appProvider.current.block=this.securityModel.block;
        this.dialogRef.close(data);
      }
    },err=>{

    })
  }

  // ------------------used to get the data of the state such as districts & blocks--------------------
  getStateData(){
    this.allPostsService.getJSON().subscribe(data=>{
       this.stateData=data
    },error=>{
      console.log(error);
    })
  }

  // -----------------------invokes on selection of state---------
  onState(stateData){
    this.districtData=stateData.dist;
  }

  // -----------------------invokes on selection of district---------
  onDistrict(district){
    this.blockData=district.block;
  }
  
}
