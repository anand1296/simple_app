import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  msg: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PopUpComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    this.msg = this.data.text;
  }

  popupSubmit(resp) {
    console.log(resp);
    this.dialogRef.close({ resp: resp });
  }

}
