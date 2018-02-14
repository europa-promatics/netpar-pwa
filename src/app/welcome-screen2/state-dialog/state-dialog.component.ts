import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatListModule } from '@angular/material';
import { StateService } from '../../providers/state.service'


@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.css'],
  providers:[StateService]
})
export class StateDialogComponent implements OnInit {
	states;
  unionTerritories;
	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<StateDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any, private stateService:StateService) { }

  	ngOnInit() {
      this.getStates();
      // this.getUnionTerritories();
  	}

  	onClosed(){
	  	this.dialogRef.close();
  	}

    getStates(): void {
      this.stateService.getStates().then(data =>{
        this.states = data
        // alert(JSON.stringify(data))
      } );
    }

    // getUnionTerritories(): void {
    //   this.stateService.getUnionTerritories().then(data =>{
    //     this.unionTerritories = data
    //     alert(JSON.stringify(data))
    //   } );
    // }
}
