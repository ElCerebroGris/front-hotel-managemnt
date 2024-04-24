import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sender } from 'src/app/models/sender';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-senders-add',
  templateUrl: './senders-add.component.html',
  styleUrls: ['./senders-add.component.css'],
})
export class SendersAddComponent implements OnInit {
  addForm!: FormGroup;
  sender: Sender = new Sender();

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.sender = new Sender();
    this.addForm = this._formBuilder.group({
      name: ['', Validators.required],
    });
  }

  salvar() {
    if (!this.addForm?.valid) {
      this.errorForm = true;
      this.service.callNotification("warn", "Dados inválidos");
      return;
    }
    this.errorForm = false;
    this.loading = true;

    let data = {
      name: this.addForm.value.name,
    };

    this.service.postter('senders', data).subscribe(
      (res) => {
        this.router.navigate(['senders']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }
}
