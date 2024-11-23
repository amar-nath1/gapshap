import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  constructor() { }

  saveLoginCredsToLocalStorage(key: string, value:string){
    localStorage.setItem(key,value)
  }
}
