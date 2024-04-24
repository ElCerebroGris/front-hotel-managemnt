import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilizador } from 'src/app/models/utilizador';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario = new Utilizador();
  loginForm!: FormGroup;
  loading = false;
  errorForm = false;
  validOTP = false;
  phone_number = '';

  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: GeneralService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.auth.verifyUserLoged()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this._formBuilder.group({
      opt_token: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.loginForm?.valid) {
      this.errorForm = true;
      return;
    }
    this.errorForm = false;
    this.loading = true;

    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      name: this.loginForm.value.name,
      opt_token: this.loginForm.value.opt_token,
      phone_number: this.phone_number,
      password_confirmation: this.loginForm.value.password_confirmation,
    };

    this.auth.postter('users', data).subscribe({
      next: (res) => {
        this.usuario.token = res.auth_token;
        this.usuario.uuid = res.uuid;
        this.usuario.phone_number = this.usuario.username = res.phone_number;
        this.usuario.api_token = res.api_token;
        this.usuario.available_sms = res.available_sms ?? 0;
        this.loading = false;
        this.auth.setLogin(this.usuario);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorForm = true;
      },
    });
  }

  confirmOTP() {
    if (!this.isValidPhoneNumber(this.phone_number)) {
      this.errorForm = true;
      this.service.callNotification('error', 'Telefone inválido');
      return;
    }

    this.errorForm = false;
    this.loading = true;

    let dataOtp = {
      phone_number: this.phone_number,
      otp_type: 'REGISTRATION',
    };

    this.auth.postter('otp/create-otp', dataOtp).subscribe({
      next: (res) => {
        this.validOTP = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorForm = true;
      },
    });
  }

  isValidPhoneNumber(str: string) {
    // Check if the string is a number
    const isNumber = !isNaN(Number(str));

    // Check if the string has 9 characters
    const hasNineCharacters = str.length === 9;

    // Check if the string starts with '9'
    const startsWithNine = str.startsWith('9');

    // Return true only if all conditions are met
    return isNumber && hasNineCharacters && startsWithNine;
  }
}
