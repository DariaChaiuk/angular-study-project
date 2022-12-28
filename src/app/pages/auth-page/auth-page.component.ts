import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActionsApi } from './store/auth.actions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  loginForm!: FormGroup;
  isRegistartionNow = false;
  authError: string = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required]),
      isPowerUser: this.fb.control(false)
    })

    this.store.select('auth').subscribe(data => {
      this.isLoading = data.loading;
      this.authError = data.authError;
    })
  }

  login() {
    this.authError = '';
    if (this.loginForm.valid) {
      this.changeLoadingStatus();
      this.store.dispatch(AuthActionsApi.loginapi({ email: this.loginForm.value['login'], password: this.loginForm.value['password'] }))
    }
  }

  changeLoadingStatus() {
    this.isLoading = !this.isLoading;
  }

  registration() {
    this.authError = '';
    if (this.isRegistartionNow && this.loginForm.valid) {
      this.changeLoadingStatus();
      this.store.dispatch(AuthActionsApi.signupapi({ email: this.loginForm.value['login'], password: this.loginForm.value['password'] }))
    }
    else if (!this.isRegistartionNow) {
      this.changeRegistrationProcessStatus();
    }
  }

  changeRegistrationProcessStatus() {
    this.isRegistartionNow = !this.isRegistartionNow;
  }

  cancelRegistration() {
    this.changeRegistrationProcessStatus();
  }

}
