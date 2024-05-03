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
  styleUrls: ['./quartos-add.component.css'],
})
export class QuartosAddComponent implements OnInit {
  addForm!: FormGroup;
  sender: Group = new Group();

  loading = false;
  errorForm = false;

  roomTypes: { id: number; name: string }[] = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Double' },
    { id: 3, name: 'Suite' },
    { id: 4, name: 'Penthouse' },
    { id: 5, name: 'Studio' },
  ];

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
      roomType: ['', Validators.required],
    });
  }

  salvar() {
    if (!this.addForm?.valid) {
      this.errorForm = true;
      return;
    }
    this.errorForm = false;
    this.loading = true;

    const randomId: number = this.getRandomInt(1, 100000);

    let data: Room = {
      id: randomId,
      name: this.addForm.value.name,
      type: this.addForm.value.roomType,
    };

    this.service.addRoom2(data).subscribe(
      (res) => {
        this.router.navigate(['quartos']);
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
        console.log(error)
        this.generalService.callNotification('error', 'Dados inválidos');
      }
    );
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
