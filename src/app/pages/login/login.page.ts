import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public errorInRegistration = {isError: false, errorText:''}
  
  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    })
   }

   

  ngOnInit() {
  }


  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form login Submitted', this.loginForm.value);
      const newUser = {email: this.loginForm.value.email, password: this.loginForm.value.password}
      this.loginUserApiCall(newUser.email, newUser.password)
    }
  }

  loginUserApiCall(email: string, password: string){
    this.accountService.login(email, password).subscribe((res)=>{
      // alert(' Login  Successfully')
      this.saveLoginCredsToLocalStorage(email)
      this.router.navigateByUrl('/home')

    },(error)=>{
      console.log(error,'this.is error')
      this.errorInRegistration = {isError: true, errorText: error.error.message}
      this.hideErrorMessage()
    })
  }

  saveLoginCredsToLocalStorage(email:string){
    localStorage.setItem('email',email)
  }

  hideErrorMessage(){
    setTimeout(() => {
      this.errorInRegistration = {isError: false, errorText: ''}
    }, 1000);
  }

}
