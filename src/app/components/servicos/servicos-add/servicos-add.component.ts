import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-servicos-add',
  templateUrl: './servicos-add.component.html',
  styleUrls: ['./servicos-add.component.css']
})
export class ServicosAddComponent implements OnInit {

  addForm!: FormGroup;

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      descricao: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  salvar() {
    if (!this.addForm?.valid) {
      return;
    }
    this.loading = true;

    let data = {
      descricao: this.addForm.value.descricao,
      preco: this.addForm.value.preco
    };

    this.service.postter('servicos', data).subscribe(
      (res) => {
        this.router.navigate(['servicos']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }
}
