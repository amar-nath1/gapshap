import { Component } from '@angular/core';
import { AccountService } from '../shared/services/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public message = '';

  constructor(
    private accountService: AccountService,
  ) {}

  sendChatMessage(){
      this.accountService.sendChatMessage(this.fetchEmailFromLocalStorage(),this.message).subscribe((res)=>{
console.log(res, 'messageSent')
      })
  }

  fetchEmailFromLocalStorage():string{
    return localStorage.getItem('email') || ''
  }

}
