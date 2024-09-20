import { Component, OnInit } from '@angular/core';
import { Quarto } from 'src/app/models/quarto';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-quartos',
  templateUrl: './quartos.component.html',
  styleUrls: ['./quartos.component.css']
})
export class QuartosComponent implements OnInit {

  loading = true;
  quartos: Quarto[] = [];
  todosQuartos: Quarto[] = [];
  chave = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('quartos').subscribe(
      (res) => {
        this.quartos = this.todosQuartos = res;
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
  }

  pesquisa($event: any): void {
    this.quartos = this.todosQuartos.filter((a) =>
      a.tipo.toUpperCase().includes(this.chave.toUpperCase())
    );

    if (!this.quartos || this.chave.length === 0) {
      this.quartos = this.todosQuartos;
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
