import { Component,OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dealers  = [];

  constructor(private appService: AppService){}
    ngOnInit(){
      this.appService.getJSON()
        .subscribe(dealersResponse => this.dealers = dealersResponse,
          error => console.log(error));
    }

}
