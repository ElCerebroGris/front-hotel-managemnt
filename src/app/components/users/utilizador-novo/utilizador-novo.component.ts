import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/utilizador';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-utilizador-novo',
  templateUrl: './utilizador-novo.component.html',
  styleUrls: ['./utilizador-novo.component.css']
})
export class UtilizadorNovoComponent implements OnInit {

  addForm!: FormGroup;
  sender: User = new User();

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.sender = new User();
    this.addForm = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  salvar() {
    if (!this.addForm?.valid) {
      this.errorForm = true;
      return;
    }
    this.errorForm = false;
    this.loading = true;

    let data = {
      nome: this.addForm.value.nome,
      telefone: this.addForm.value.telefone,
      email: this.addForm.value.email,
      username: this.addForm.value.email,
      senha: this.addForm.value.senha,
    };

    this.service.postter('utilizadores/register', data).subscribe(
      (res) => {
        this.router.navigate(['users']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }
}
