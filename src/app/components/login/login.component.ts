import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilizador } from 'src/app/models/utilizador';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = new Utilizador();
  loginForm!: FormGroup;
  loading = false;
  errorForm = false;

  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: GeneralService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.auth.verifyUserLoged()) {
      if (this.auth.verifyUserAdmin())
        this.router.navigate(['/administration-dashboard']);
      else this.router.navigate(['/messages']);
    }
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.loginForm?.valid) {
      return;
    }
    this.loading = true;
    let data = {
      email_or_phone_number: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.auth.postter('sessions', data).subscribe(
      (res) => {
        this.usuario.token = res.auth_token;
        this.usuario.uuid = res.uuid;
        this.usuario.phone_number = this.usuario.username = res.phone_number;
        this.usuario.api_token = res.api_token;
        this.usuario.available_sms = res.available_sms;
        this.usuario.role = res.role;
        this.loading = false;
        this.auth.setLogin(this.usuario);
        if (this.usuario.role == 'admin')
          this.router.navigate(['/administration-dashboard']);
        else this.router.navigate(['/messages']);
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
