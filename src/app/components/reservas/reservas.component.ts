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
  chave = '';

  page = 1;
  hasNext = false;

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
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
  }

  pesquisa($event: any): void {
    this.users = this.allUsers.filter((a) =>
      a.checkin_date!.toUpperCase().includes(this.chave.toUpperCase())
    );

    if (!this.users || this.chave.length === 0) {
      this.users = this.allUsers;
    }
  }

  confirmarReserva(id: string, estado: string){
    this.loading = true;
    let data = {
      estado: estado
    }
    this.service.putter('reservas/'+id+'/estado', data).subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
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
