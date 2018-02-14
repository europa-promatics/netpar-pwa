// ----------------importing statements for local libraries and plugins ----------------------
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { StateService} from '../providers/state.service';
import { RegisterModel} from './register.model.component';
import { RegisterService} from './register.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PopupComponent } from '../alerts/popup/popup.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { TranslationService } from '../providers/translation.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppProvider } from '../providers/app';
import { AllPostsService } from '../providers/allPost.service';
import { UpdateMobileService } from '../providers/update-mobile.service';
import { MessagingService } from "../messaging.service";
// ----------------importing statements for local libraries and plugins ends ----------------------

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[StateService,RegisterService,AllPostsService,TranslationService,UpdateMobileService,MessagingService]
})
export class RegisterComponent implements OnInit {
// --------------local variables----------------------
 complexForm: FormGroup;
 states;
 registerModel: RegisterModel = new RegisterModel ();
 validationErrorMessage;
 date;
 DOB
 months;
 month;
 days
 dateValue;
 totalYears=100;
 years;
 dd;
 mm;
 yy;
 loading=false;
 stateData;
 districtData;
 blockData;
 currentInputTag:any;
 currentString:any;
 sendString:any;
 selectedValue:any;
 currentActiveIndex:number;
 outputStringArrayLength:number;
 inputStringLength;
 outputStringLength;
 caretPos;
 suggestedDataForTransliteration;
 message
// --------------local variables ends----------------------

  constructor(private updateMobileService:UpdateMobileService,
    private msgService: MessagingService,
    private elementRefrence: ElementRef,
    private translationService:TranslationService,
    private allPostsService:AllPostsService,
    private formBuilder: FormBuilder,
    private appProvider:AppProvider,
    private dialog: MatDialog,
    private router:Router,
    private stateService:StateService,
    private registerService:RegisterService,
    private route:  ActivatedRoute) { 
    if(!this.appProvider.current.mobileNumber){
      this.router.navigate(['/welcome-screen2'])
    }else{
      if (this.appProvider.current.refferalId) {
        this.registerModel.inviteCode=this.appProvider.current.refferalId;
      }
      // ------------------------------ for validations------------------------

      this.complexForm = formBuilder.group({
        'firstName':[null],
        'lastName':[null],
        'state': [null, Validators.compose([Validators.required])],
        'district': [null, Validators.compose([Validators.required])],
        'block':[null, Validators.compose([Validators.required])],
        'date':[null,Validators.compose([Validators.required])],
        'month':[null,Validators.compose([Validators.required])],
        'year':[null,Validators.compose([Validators.required])],
        'gender':[null,Validators.compose([Validators.required])]
      })
    }
    
  }

  // ----------------------------invokes on the initialization of page-----------------------
  ngOnInit() {
  	 this.getStatelist();//getStatelist()
     this.getDays();//getDays()
     this.getMonths();//getMonths()
     this.getYears();//getYears()
     this.getStateData()//getStateData()
  }

  // --------------------------used to get the state data------------------------
  getStatelist(){
  	this.stateService.getStates().then(data=>{
  		this.states=data;
  	})
  }

  // --------------------stores the firstname in english--------------------------
  onBlurFirstName(){
    this.appProvider.current.firstName_eng=this.registerModel.firstName;
  }

  // --------------------stores the lastname in english--------------------------

  onBlurLastName(){
    this.appProvider.current.lastName_eng=this.registerModel.lastName;
  }

  // --------------------------on register button------------------------------
  onRegister(){
      let validate = {
        firstName:this.registerModel.firstName,
        lastName:this.registerModel.lastName,
        state:this.registerModel.state,
        district:this.registerModel.district,
        block:this.registerModel.block,
        date:this.dd,
        month:this.mm,
        year:this.yy,
        gender:this.registerModel.gender,
      }
      if(!validate.firstName){
        this.validationErrorMessage="first name missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else if(!validate.lastName){
        this.validationErrorMessage="last name missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else if(!validate.state){
        this.validationErrorMessage="state missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else if(!validate.district){
        this.validationErrorMessage="district missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else if(!validate.block){
        this.validationErrorMessage="block missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else if(!validate.date || !validate.year || !validate.month){
        this.validationErrorMessage="Dob  missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }
      else if(!validate.gender){
        this.validationErrorMessage="gender missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }
       this.monthToNumeric();
       this.mainRegisterFunction();
  }

  // --------------------------converts the moths to numeric value------------------

  monthToNumeric(){
    switch(this.mm){
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
  }

  // --------------------------open the PopupComponent ------------------

   openDialog(): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:"something went wrong"}
        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }

  // --------------------------open the ValidationBoxesComponent ------------------

    openValidationAlert(msg){
        let dialogRef = this.dialog.open(ValidationBoxesComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
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

    // ------------------------------------main register function invokes on register button------------------------

    mainRegisterFunction(){
       this.registerModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
       this.registerModel.firstName_eng=this.appProvider.current.firstName_eng;
       this.registerModel.lastName_eng=this.appProvider.current.lastName_eng;
       this.registerModel.mobileNumber=this.appProvider.current.mobileNumber;
       this.registerModel.platform="Browser";
       this.registerModel.language=localStorage['selectedLanguage']
       this.loading=true;
       this.registerService.Register(this.registerModel)
       .subscribe(data=>{
         if (data.success==true) {
           this.msgService.getPermission();
           this.msgService.receiveMessage();
           this.message = this.msgService.currentMessage;
           this.loading=false;
           localStorage.setItem('isLoggedin', 'true');
           localStorage['userInfo']=JSON.stringify(data.response);
           localStorage['profileImage']=data.response.userImage;
           localStorage['mobileNumber']=data.response.mobileNumber;
           localStorage['userArticalView']=data.response.userArticalView;
           console.log(localStorage['userInfo'])
           this.updateMobileService.registerDeviceForNotification(this.appProvider.current.userData._id,localStorage.getItem('token')).subscribe(data=>{
              console.log(data);
            },err=>{
              console.log(err);
            })
           this.router.navigate(["/Home"],{skipLocationChange:false});
         }
         else{
           this.loading=false
             this.openDialog();
         }
       },err=>{
         this.loading=false
         this.openDialog();
       })
    }

    // ----------------used to get the state data--------------------
    getStateData(){
      this.allPostsService.getJSON().subscribe(data=>{
         this.stateData=data
         console.log(this.stateData)
      },error=>{
        console.log(error);
      })
    }

    // ---------------------------invokes on selecting state---------------
    onState(stateData){
      this.registerModel.state=stateData.name;
      this.districtData=stateData.dist;
    }

    // ---------------------------invokes on selecting district---------------

    onDistrict(district){
      this.registerModel.district=district.name;
      this.blockData=district.block;
    }

    // ---------------------------invokes on selecting block---------------

    onBlock(block){
      this.registerModel.block=block.name
    }

    // ---------------------------transliteration functions---------------------------------
    onTransliteration(value,event,tag){
     var myEl=event.target
     this.currentInputTag=tag
     this.elementRefrence=event
     let post =this.getCaretPos(event)
     this.currentString=value
     let subValue=value.substring(0, post)
     let localValue=subValue.split(' ')
     let length=localValue.length
     let letstring=localValue[length-1]
     let replcedstring=letstring.match(/[a-zA-Z]+/g);
     let stringForSend
     if (replcedstring) {
       stringForSend=replcedstring[0]
     }
     if (!stringForSend) {
     return 
     }
     else if(stringForSend=='') {
         return 
       }
     else if (/^[a-zA-Z]+$/.test(stringForSend)) {
      this.sendString=stringForSend.toString()
      this.translationService.onGetSuggetiion(stringForSend)
          .subscribe(data => {     
              this.appProvider.current.suggestedString=data;
              this.suggestedDataForTransliteration=this.appProvider.current.suggestedString;
              this.outputStringArrayLength=this.appProvider.current.suggestedString.length
              this.currentActiveIndex=-1;
              this.inputStringLength=this.sendString.length
            },error=>{       
       })
     }
   }

     selectString(state){
       this.currentString=this.currentString.toString()
       this.outputStringLength=state.length
       let replaceWith=state+' '
       let output=this.currentString.replace(this.sendString ,replaceWith)
       if ( this.currentInputTag=='firstName') {
         this.registerModel.firstName=output
       }else if(this.currentInputTag=='lastName'){
         this.registerModel.lastName=output
       }
       let sumIndex=(this.caretPos+this.outputStringLength)-this.inputStringLength
       this.appProvider.current.suggestedString=[]
     }

    onKeyUp(event){
      console.log(event.keyCode )
      if(event.keyCode==32){
        this.currentString=this.currentString.toString()
        if (this.appProvider.current.suggestedString.length>0) {
            if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
             let replaceWith=this.appProvider.current.suggestedString[0]
             let output=this.currentString.replace(this.sendString ,replaceWith)
                 if ( this.currentInputTag=='firstName') {
                   this.appProvider.current.firstName_eng=this.registerModel.firstName;
                   this.registerModel.firstName=output
                 }else if(this.currentInputTag=='lastName'){
                   this.appProvider.current.lastName_eng=this.registerModel.lastName;
                   this.registerModel.lastName=output
                 }
              this.appProvider.current.suggestedString=[]
            }else{
             let replaceWith=this.appProvider.current.suggestedString[this.currentActiveIndex]
             let output=this.currentString.replace(this.sendString ,replaceWith)
             if ( this.currentInputTag=='firstName') {
               this.registerModel.firstName=output
             }else if(this.currentInputTag=='lastName'){
               this.registerModel.lastName=output
             }
             this.appProvider.current.suggestedString=[]
            }
        }
      }else if (this.selectedValue && event.keyCode==13) {
       this.currentString=this.currentString.toString()
       if (this.outputStringArrayLength>0) {
            let replaceWith=this.selectedValue+' '
            let output=this.currentString.replace(this.sendString ,replaceWith)
            if ( this.currentInputTag=='firstName') {
               this.registerModel.firstName=output
             }else if(this.currentInputTag=='lastName'){
               this.registerModel.lastName=output
             }
            this.appProvider.current.suggestedString=[]
        }
      }else if (event.keyCode==38) {
         if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
           this.currentActiveIndex=this.outputStringArrayLength-1
         }else{
           this.currentActiveIndex=this.currentActiveIndex-1
         }
      }else if (event.keyCode==40) {
         if (this.currentActiveIndex==this.currentActiveIndex-1) {
           this.currentActiveIndex=0
         }else{
           this.currentActiveIndex=this.currentActiveIndex+1
         }
      }

    }

    onSuugestionkeyup(state){
      this.selectedValue=state
    }

    getCaretPos(oField) {
        if (oField.selectionStart || oField.selectionStart == '0') {
           this.caretPos = oField.selectionStart;
           return this.caretPos
        }
    }

    clearSuggstion(){
      this.appProvider.current.suggestedString=[]
    }

    // ---------------------------transliteration functions ends---------------------------------

}
