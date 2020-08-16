import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = 'https://api.spaceXdata.com/v3/launches';
  getRecords(params: any): Observable<any> {
    console.log('get records in service ', params);
    const length = Object.keys(params).length;
    if (Object.keys(params).length !== 0 && params.constructor === Object) {
      let query = '';
      // tslint:disable-next-line: forin
      for (const key in params) {
        query += `&${key}=${params[key]}`;
      }
      query = query.substring(1, query.length);
      console.log('query for call ', query);
      console.log('url called ', `${this.baseUrl}?${query}`);
      return this.http.get(`${this.baseUrl}?${query}`);
    }
    else {
      const query = '&limit=100';
      this.router.navigate(['launches'], {
        queryParams: {
          limit: 100
        }
      });
      return of([]);
    }
  }
}
