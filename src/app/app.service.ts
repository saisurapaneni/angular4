import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

  constructor(private http: Http) {

    }

    public getJSON(): Observable<any> {
         return this.http.get("./assets/data/dealers.json")
                         .map((res:any) => res.json());
                        // .catch((error:any) => console.log(error));

     }
}
