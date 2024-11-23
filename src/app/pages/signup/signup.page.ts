import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AuthManagerService } from 'src/app/shared/services/authenticationManager/auth-manager.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public errorInRegistration = {isError: false, errorText:''}
  public signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private authManager: AuthManagerService,
  ) {

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    })
   }

   passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      const newUser = {username: this.signupForm.value.username, email: this.signupForm.value.email, password: this.signupForm.value.password}
      this.signupUserApiCall(newUser.username, newUser.email, newUser.password)
    }
  }

  signupUserApiCall(username: string, email: string, password: string){
    this.accountService.signup(username, email, password).subscribe((res)=>{
      this.authManager.saveLoginCredsToLocalStorage('email', email)
      this.router.navigateByUrl('/home')
    },(error)=>{
      console.log(error,'this.is error')
      this.errorInRegistration = {isError: true, errorText: error.error.error}
      this.hideErrorMessage()
    })
  }

  hideErrorMessage(){
    setTimeout(() => {
      this.errorInRegistration = {isError: false, errorText: ''}
    }, 1000);
  }

  ngOnInit() {
  }

}
