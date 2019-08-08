import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Service Imports */
import { HelperService } from 'src/app/services/helper/helper.service';

/* Interface Imports */
import { UserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-view-user-modal',
  templateUrl: './view-user-modal.component.html',
  styleUrls: ['./view-user-modal.component.scss']
})
export class ViewUserModalComponent implements OnInit {
  constructor(
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<ViewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserData
  ) { }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
