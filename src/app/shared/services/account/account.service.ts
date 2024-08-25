import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private apiService : ApiService

  ) { }

  signup(username: string, email: string, password: string): Observable<any> {
    
    const body = { username, email, password };

    return this.apiService.post(body).pipe(map(()=>{
      
    }));
  }
}
