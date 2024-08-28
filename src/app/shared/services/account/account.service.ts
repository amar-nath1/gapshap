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

    return this.apiService.post('signup',body).pipe(map(()=>{

    }));
  }

  login(email: string, password: string): Observable<any> {
    
    const body = { email, password };

    return this.apiService.post('login',body).pipe(map(()=>{
      
    }));
  }

  sendChatMessage(email: string, message: string): Observable<any> {
    
    const body = { email, message };

    return this.apiService.post('message',body).pipe(map(()=>{
      
    }));
  }
}
