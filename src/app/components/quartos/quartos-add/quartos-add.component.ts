import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-quartos-add',
  templateUrl: './quartos-add.component.html',
  styleUrls: ['./quartos-add.component.css'],
})
export class QuartosAddComponent implements OnInit {
  addForm!: FormGroup;
  sender: Group = new Group();

  loading = false;
  errorForm = false;

  roomTypes: { id: number; name: string }[] = [
    { id: 1, name: 'Solteiro' },
    { id: 2, name: 'Casal' }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.sender = new Group();
    this.addForm = this._formBuilder.group({
      descricao: ['', Validators.required],
      comodidades: ['', Validators.required],
      roomType: ['', Validators.required],
      preco: ['', Validators.required]
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
      descricao: this.addForm.value.descricao,
      comodidades: this.addForm.value.comodidades,
      tipo: this.addForm.value.roomType,
      preco: this.addForm.value.preco
    };

    this.service.postter('quartos', data).subscribe(
      (res) => {
        this.router.navigate(['quartos']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }
}
