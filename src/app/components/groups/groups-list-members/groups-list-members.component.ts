import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, GroupMember } from 'src/app/models/group';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-groups-list-members',
  templateUrl: './groups-list-members.component.html',
  styleUrls: ['./groups-list-members.component.css'],
})
export class GroupsListMembersComponent implements OnInit {
  loading = true;
  recipients: GroupMember[] = [];
  group: Group = new Group();
  idGroup = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  addForm!: FormGroup;
  member: GroupMember = new GroupMember();
  errorForm = false;

  constructor(
    private service: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.idGroup = route.snapshot.params['idGroup'];
  }

  ngOnInit(): void {
    this.member = new GroupMember();
    this.addForm = this._formBuilder.group({
      name: [''],
      phone_number: ['', Validators.required],
    });
    this.carregar();
  }

  carregar() {
    this.addForm.controls['name'].setValue('');
    this.addForm.controls['phone_number'].setValue('');
    this.service.getter('sending_groups/' + this.idGroup).subscribe(
      (res) => {
        this.group = res;
        this.recipients = res.members;
        this.pagesNum = Array.from({ length: this.allCount }, (e, i) => i + 1);
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['messages']);
        this.loading = false;
      }
    );
  }

  handlePageChange(pos: number): void {
    if (pos == 0) ++this.page;
    if (pos == -1) --this.page;
    if (pos > 0) this.page = pos - 1;

    this.service.getter('senders?page=' + this.page).subscribe(
      (res) => {
        this.recipients = res;
        this.count = res.numberOfElements;
      },
      (error) => {}
    );
  }

  salvar() {
    if (!this.addForm?.valid) {
      this.errorForm = true;
      this.service.callNotification('warn', 'Dados inválidos');
      return;
    }
    this.errorForm = false;
    this.loading = true;

    let data = [
      {
        name: this.addForm.value.name,
        phone_number: this.addForm.value.phone_number,
      },
    ];

    this.service.postter('sending_groups/' + this.idGroup, data).subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }

  removerMembro(idMembro: string) {
    this.loading = true;
    this.service.delleter('sending_groups/' + this.idGroup+'/'+idMembro).subscribe(
      (res) => {
        this.service.callNotification('success', 'Removido com sucesso');
        this.carregar();
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }
}
