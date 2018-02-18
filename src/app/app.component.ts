import { Component,OnInit, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dealersList  = [];
  dealers = [];
  searchedDelears = [];
  services: any;
  selectedServices: any = [];
  hideMobileMenu = true;
  dialogRef: MatDialogRef<ModalComponent>;

  config: MatDialogConfig = {
  disableClose: false,
  hasBackdrop: true,
  backdropClass: '',
  width: '70%',
  height: '90%',
  position: {
    top: '',
    bottom: '',
    left: '',
    right: ''
  }
};


constructor(public dialog: MatDialog, @Inject(DOCUMENT) public doc: any, private appService: AppService) {
    this.services = [
      { name: 'Service Pro', selected: true },
      { name: 'Installation Pro', selected: true },
      { name: 'Residential Pro', selected: true },
      { name: 'Commercial Pro', selected: false }
    ]
    this.dialog.afterOpen.subscribe(() => {
          if (!doc.body.classList.contains('no-scroll')) {
            doc.body.classList.add('no-scroll');
          }
        });

  }

  openDialog(poolName) {


    this.dialogRef = this.dialog.open(ModalComponent, this.config);
    this.dialogRef.componentInstance.data = poolName;
    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.dialogRef = null;
      this.doc.body.classList.remove('no-scroll');
    });
  }


    ngOnInit(){
      this.appService.getJSON()
        .subscribe(dealersResponse => this.dealers = dealersResponse,
          error => console.log(error));

          //this.fitleredDealers(this.dealersList.dealers);
    }
showMenu() {
      this.hideMobileMenu = false;
    }
hideMenu() {
  this.hideMobileMenu = true;
}
  checkIfAllSelected(item) {
    this.selectedServices = [];
     if(item.selected == true){
       this.selectedServices.push(item);
     }

  }
  fitleredDealers(dealers) {
    this.dealers = [];
    for(let i =0 ; i<3; i++){
      this.dealers.push(dealers.data[i]);
    }

  }

}
