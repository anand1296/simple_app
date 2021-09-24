import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';

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
    "https://t3.ftcdn.net/jpg/02/70/25/48/240_F_270254841_otSDX3fPBgcbCiUdir82QjgyF8XSQwD5.jpg",
    "https://t4.ftcdn.net/jpg/01/89/47/25/240_F_189472519_5qrxIMDEEYOfknudMBG6rh9OnGNbxFdt.jpg",
    "https://t3.ftcdn.net/jpg/04/36/99/52/240_F_436995234_tGH3fNrZmeXocffxWh9WPa4eSABoJwq2.jpg",
    "https://t4.ftcdn.net/jpg/02/96/58/43/240_F_296584307_tKTtq5lxE3PKsbD5IrmhpRMLl76BAmMt.jpg",
    "https://t3.ftcdn.net/jpg/03/14/10/08/240_F_314100817_6PQbrZyKcqvE1GKizoXBJPMe6GiYAkM7.jpg",
    "https://t3.ftcdn.net/jpg/03/22/04/88/240_F_322048853_DOj6xDy7Cpz98ZNi0I9UN708TZSqjt5m.jpg",
    "https://t3.ftcdn.net/jpg/03/13/69/24/240_F_313692438_3ZCPZqlCazXoiMa8vDzqJdj39R8D5Tty.jpg",
    "https://t3.ftcdn.net/jpg/01/88/72/72/240_F_188727297_jyQehFbvmXMYaEDNMVrMws2hgmodxqmX.jpg"


  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: String, private dialogRef: MatDialogRef<ImageSelectorComponent>, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  avatarSelected(img_url) {
    console.log(img_url);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      text: "Are you sure you want to continue?"
    };
    let dialogRef = this.dialog.open(PopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      if(data.resp.toLowerCase() === 'positive') {
        this.dialogRef.close({ data: img_url });
      }
      else {
        console.log('Pop up was cancelled!');
      }
    })
  }

}
