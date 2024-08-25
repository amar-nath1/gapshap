import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.apiUrl = 'http://localhost:5000/api/users/signup'
   }

  post(body:{username: string, email: string, password: string}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    return this.http.post(this.apiUrl, body, { headers });
  }
}
