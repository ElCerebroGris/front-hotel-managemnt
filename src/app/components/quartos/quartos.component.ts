import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-quartos',
  templateUrl: './quartos.component.html',
  styleUrls: ['./quartos.component.css']
})
export class QuartosComponent implements OnInit {

  loading = true;
  senders: Room[] = [];
  allProcessos: Room[] = [];
  chave = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  constructor(private service: RoomService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getRooms().subscribe(
      (res) => {
        this.senders = this.allProcessos = res;
        //this.allCount = res.pagination.last_page+1;
        this.pagesNum = Array.from({ length: this.allCount }, (e, i) => i + 1);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  handlePageChange(pos: number): void {
    this.loading = true;
    if (pos == 0) ++this.page;
    if (pos == -1) --this.page;
    if (pos > 0) this.page = pos - 1;
  }

  pesquisa($event: any): void {
    this.senders = this.allProcessos.filter((a) =>
      a.name.toUpperCase().includes(this.chave.toUpperCase())
    );

    if (!this.senders || this.chave.length === 0) {
      this.senders = this.allProcessos;
    }
  }

  getState(state: string) {
    switch (state) {
      case 'APPROVED':
        return 'APROVADO';
      case 'PENDING':
        return 'AGUARDE APPROVAÇÃO';
      case 'REJECTED':
        return 'REJEITADO';
        case 'BLOCKED':
        return 'BLOQUEADO';
    }
    return '';
  }

}
