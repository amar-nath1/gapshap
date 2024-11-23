import { Component } from '@angular/core';
import { AccountService } from '../shared/services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public message = '';
  public loggedInEmail = '';
  public messagesArr: any = [];

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
;
  public alertInputs = [
    {
      placeholder: 'Group Name',
    },
    // {
    //   placeholder: 'Nickname (max 8 characters)',
    //   attributes: {
    //     maxlength: 8,
    //   },
    // },
    // {
    //   type: 'number',
    //   placeholder: 'Age',
    //   min: 1,
    //   max: 100,
    // },
    // {
    //   type: 'textarea',
    //   placeholder: 'A little about yourself',
    // },
  ];

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
    // setInterval(() => {
      // this.getAllMessages()
      this.getRecentMsgsFromStorage()
    // }, 4000);
    this.loggedInEmail = this.fetchEmailFromLocalStorage();
  }

  setResult(ev:any) {
    debugger
    console.log(`Dismissed with role: ${ev.detail}`);
  }

  sendChatMessage(){
      this.accountService.sendChatMessage(this.loggedInEmail, this.message).subscribe((res)=>{
        
        this.saveMsgToStorage(res.messageObj)
          this.message = '';
      })
  }

  saveMsgToStorage(msgObj:any){
    let getMsgFromStorage = localStorage.getItem('userMsgs')
    if (getMsgFromStorage){
      const parsedMsgs = JSON.parse(getMsgFromStorage)
      if (parsedMsgs.length<10){
        parsedMsgs.unshift(msgObj)
      }
      else {
        parsedMsgs.pop()
        parsedMsgs.unshift(msgObj)
      }

      localStorage.setItem('userMsgs',JSON.stringify(parsedMsgs))
    }
    else {
      localStorage.setItem('userMsgs',JSON.stringify([msgObj]))
    }
    
  }

  fetchEmailFromLocalStorage():string{
    return localStorage.getItem('email') || ''
  }

  getAllMessages(){
    this.accountService.getAllMessages('9').subscribe((res)=>{
      const skipFirstTenMsgs = res.filter((msgObj:any,indx:number)=>{
         return indx > 9;
      })
        this.messagesArr = skipFirstTenMsgs;
    })
  }

  getRecentMsgsFromStorage() {
    const x = localStorage.getItem('userMsgs')
    if (x) {
      
      this.messagesArr = JSON.parse(x)
    }
  }

  

  ionViewWillLeave(){

    localStorage.setItem('recentTenMessage', JSON.stringify(this.messagesArr.slice(0,10)))
  }

  routeToLogin() {
    this.router.navigateByUrl('/login')
  }

  viewOlderMsgs() {
    
  }

}
