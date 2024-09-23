import { Component, OnInit } from '@angular/core';
import { Quarto } from 'src/app/models/quarto';
import { Reserva } from 'src/app/models/reserva';
import { User, Utilizador } from 'src/app/models/utilizador';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  loading = true;
  users: Reserva[] = [];
  allUsers: Reserva[] = [];
  quartos: Quarto[] = [];
  utilizadores: User[] = [];
  chave = '';

  page = 1;
  hasNext = false;

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
    this.carregarExtra()
  }

  carregar() {
    this.service.getter('reservas').subscribe(
      (res) => {
        this.users = this.allUsers = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.loading = false;
  }

  carregarExtra() {
    this.service.getter('utilizadores').subscribe(
      (res) => {
        this.utilizadores = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('quartos').subscribe(
      (res) => {
        this.quartos = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.loading = false;
  }

  pesquisa($event: any): void {
    this.users = this.allUsers.filter((a) =>
      a.checkin_date!.toUpperCase().includes(this.chave.toUpperCase())
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

  getQuarto(id: string){
    let q = this.quartos.filter(q => q.id=id).pop();
    return q ? q.comodidades: '';
  }

  getUser(id: string){
    let q = this.utilizadores.filter(q => q.id=id).pop();
    return q ? q.nome: '';
  }
}