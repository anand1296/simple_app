import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  imgArr = [
    "https://t4.ftcdn.net/jpg/03/12/93/33/240_F_312933371_vMqXBtR0s84b7WHGbUWpgIzVmhrgp8za.jpg",
    "https://t3.ftcdn.net/jpg/02/96/35/64/240_F_296356423_f6IEidPVRWzaqj2MJQ2VLJJTYGRAtY4P.jpg",
    "https://t4.ftcdn.net/jpg/02/21/01/35/240_F_221013513_4LfB8Iuq4ayaK8A2SVZtiZ9kxRWEhbsb.jpg",
    "https://t4.ftcdn.net/jpg/03/21/90/47/240_F_321904727_6Xe21aryx4iHdVHJN9gIsIKvSp5iaObX.jpg",
    "https://t4.ftcdn.net/jpg/02/73/16/09/240_F_273160999_u1hoyXmJO3CqAkM6D2v4UocKZlsmPfg9.jpg",
    "https://t3.ftcdn.net/jpg/02/70/25/48/240_F_270254841_otSDX3fPBgcbCiUdir82QjgyF8XSQwD5.jpg"
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: String, private dialogRef: MatDialogRef<ImageSelectorComponent>) { }

  ngOnInit(): void {
  }

  avatarSelected(img_url) {
    console.log(img_url);
    this.dialogRef.close({ data: img_url });
  }

}
