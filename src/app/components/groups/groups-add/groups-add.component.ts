import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-groups-add',
  templateUrl: './groups-add.component.html',
  styleUrls: ['./groups-add.component.css']
})
export class GroupsAddComponent implements OnInit {

  addForm!: FormGroup;
  sender: Group = new Group();

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: GeneralService
  ) {}

  ngOnInit(): void {
    this.sender = new Group();
    this.addForm = this._formBuilder.group({
      name: ['', Validators.required],
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
      name: this.addForm.value.name,
    };

    this.service.postter('sending_groups', data).subscribe(
      (res) => {
        this.router.navigate(['groups']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
        this.service.callNotification("error", "Dados inválidos");
      }
    );
  }

}
