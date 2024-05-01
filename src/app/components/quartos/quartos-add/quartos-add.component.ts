import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Room } from 'src/app/models/room';
import { GeneralService } from 'src/app/services/general.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-quartos-add',
  templateUrl: './quartos-add.component.html',
  styleUrls: ['./quartos-add.component.css']
})
export class QuartosAddComponent implements OnInit {

  addForm!: FormGroup;
  sender: Group = new Group();

  loading = false;
  errorForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: RoomService,
    private generalService: GeneralService
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

    let data: Room = {
      id: 11,
      name: this.addForm.value.name,
      type: ''
    };

    this.service.addRoom(data).subscribe(
      (res) => {
        this.router.navigate(['quartos']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
        this.generalService.callNotification("error", "Dados inválidos");
      }
    );
  }


}
