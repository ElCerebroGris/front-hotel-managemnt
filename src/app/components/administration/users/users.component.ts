import { Component, OnInit } from '@angular/core';
import { User, Utilizador } from 'src/app/models/utilizador';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loading = true;
  users: User[] = [];
  allUsers: User[] = [];
  chave = '';

  page = 1;
  hasNext = false;

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('users?page=' + (this.page - 1)).subscribe(
      (res) => {
        this.users = this.allUsers = res;
        if(this.users.length >= 20) this.hasNext = true;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.loading = false;
  }

  handlePageChange(pos: number): void {
    this.loading = true;
    if (pos == 0) ++this.page;
    if (pos == -1) --this.page;
    if (pos > 0) this.page = pos - 1;

    this.service.getter('users?page=' + (this.page - 1)).subscribe(
      (res) => {
        this.users = res;
        if(this.users.length >= 20) this.hasNext = true;
        else this.hasNext = false;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  pesquisa($event: any): void {
    this.users = this.allUsers.filter((a) =>
      a.phone_number!.toUpperCase().includes(this.chave.toUpperCase())
    );

    if (!this.users || this.chave.length === 0) {
      this.users = this.allUsers;
    }
  }

  getState(state: string) {
    switch (state) {
      case 'client':
        return 'Cliente';
      case 'admin':
        return 'Administrador';
    }
    return '';
  }

}
