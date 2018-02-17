import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppService } from './app.service';
import {MatDialog} from '@angular/material';
import { ModalComponent } from './modal/modal.component';

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

  constructor(private appService: AppService, public dialog: MatDialog){
    this.services = [
      { name: 'Service Pro', selected: true },
      { name: 'Installation Pro', selected: true },
      { name: 'Residential Pro', selected: true },
      { name: 'Commercial Pro', selected: false }
    ]
  }

  openDialog(poolName) {
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '700px',
      width: '650px',
      data: {name: poolName},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

    ngOnInit(){
      this.appService.getJSON()
        .subscribe(dealersResponse => this.dealers = dealersResponse,
          error => console.log(error));

          //this.fitleredDealers(this.dealersList.dealers);
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
