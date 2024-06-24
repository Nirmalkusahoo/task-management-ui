import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
/**
 *  A one stop service to do all the http calls
 */
// tslint:disable:no-any
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  public getData(url: string, header?: HttpHeaders, param?: HttpParams): Observable<any> {
    return this.http.get(url, {headers: header, params: param});
  }


  public postData(url: string, postData: any): Observable<any> {
    return this.http.post(url, postData);
  }


  public putData(url: string, putData: any, header?: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    if (header) {
      headers = header;
    }

    return this.http.put(url, putData, {headers});
  }

  public deleteData(url: string): Observable<any> {
    return this.http.delete(url);
  }

}
