import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl: string = ''
  constructor(
    private http: HttpClient,
    
  ) {
    this.apiUrl = 'http://localhost:5000/api/users/'
   }

  post(endpoint: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    return this.http.post(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  get(endpoint: string, skipParams:string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let params = new HttpParams();
    params = params.append('skip', skipParams)
    

    return this.http.get(`${this.apiUrl}${endpoint}`, { headers,params });
  }
}
