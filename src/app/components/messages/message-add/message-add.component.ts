import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sender } from 'src/app/models/sender';
import { GeneralService } from 'src/app/services/general.service';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Group } from 'src/app/models/group';

declare const $: any; // Declare $ to use jQuery

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.css'],
})
export class MessageAddComponent implements OnInit {
  addForm!: FormGroup;
  senders: Sender[] = [];
  groups: Group[] = [];
  destinations: any;

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      message: ['', Validators.required],
      from: ['', Validators.required],
      to: [''],
      toGroup: [''],
      schedule: [''],
    });
    this.carregar();
  }

  messageError = '';
  salvar() {
    if (!this.addForm?.valid) {
      this.messageError = 'Dados incorretos';
      this.errorForm = true;
      return;
    }

    let to = this.addForm.value.to
    let toGroup = this.addForm.value.toGroup
    let toSend = '';
    if(to.length >= 9){
      toSend = this.addForm.value.to
    }else if(toGroup != ''){
      toSend = this.addForm.value.toGroup
    }else{
      this.service.callNotification('error','Sem Destinatários')
      return;
    }

    this.errorForm = false;
    this.loading = true;

    let formattedDateString = this.datePipe.transform(
      this.addForm.value.schedule,
      'yyyyMMddHHmmss'
    );

    let data = {
      message: this.addForm.value.message,
      from: this.addForm.value.from,
      to: toSend,
      schedule: formattedDateString,
    };

    this.service.postter('messages', data).subscribe(
      (res) => {
        this.auth.updateCredit();
        this.router.navigate(['messages']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
        this.messageError = 'Dados inválidos';
        return;
      }
    );
  }

  carregar() {
    this.service.getter('sending_groups').subscribe(
      (res) => {
        this.groups = res;
      },
      (error) => {
      }
    );
    this.service.getter('senders/approved').subscribe(
      (res) => {
        this.senders = res;
        if (this.senders == null || this.senders.length == 0){
          this.service.callNotification('warn','Sem Remetentes disponíveis')
          this.router.navigate(['senders']);
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  validDestonation(tagsValues: string) {
    if (tagsValues) {
      if (tagsValues.length === 1 && tagsValues[0] === '') {
        console.log('Tags are empty');
      } else {
        if (tagsValues.length === 1 && /^\d{9}$/.test(tagsValues[0])) {
        } else {
          console.log('Tags do not meet the validation criteria');
        }
      }
    } else {
      console.log('No tags entered');
    }
  }
}
