import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quarto, Servicos } from 'src/app/models/quarto';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-reservas-add',
  templateUrl: './reservas-add.component.html',
  styleUrls: ['./reservas-add.component.css']
})
export class ReservasAddComponent implements OnInit {

  addForm!: FormGroup;

  loading = false;
  errorForm = false;

  quartos: Quarto [] = []
  servicos: Servicos [] = []
  servicosSelecionados: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      quarto_id: ['', Validators.required],
      checkin_date: ['', Validators.required],
      checkout_date: ['', Validators.required]
    });
    this.carregar();
  }

  carregar() {
    this.service.getter('quartos').subscribe(
      (res) => {
        this.quartos = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('servicos').subscribe(
      (res) => {
        this.servicos = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  salvar() {
    if (!this.addForm?.valid) {
      this.errorForm = true;
      return;
    }
    this.errorForm = false;
    this.loading = true;

    let data = {
      quarto_id: this.addForm.value.quarto_id,
      checkin_date: this.addForm.value.checkin_date,
      checkout_date: this.addForm.value.checkout_date,
      utilizador_id: this.auth.getUserId(),
      servicos: this.servicosSelecionados
    };

    this.service.postter('reservas', data).subscribe(
      (res) => {
        this.router.navigate(['reservas']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }

  onServicoChange(event: any): void {
    const servicoId = +event.target.value;
    if (event.target.checked) {
      this.servicosSelecionados.push(servicoId);
    } else {
      const index = this.servicosSelecionados.indexOf(servicoId);
      if (index > -1) {
        this.servicosSelecionados.splice(index, 1);
      }
    }
  }
}
