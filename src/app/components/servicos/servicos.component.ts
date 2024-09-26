import { Component, OnInit } from '@angular/core';
import { Servicos } from 'src/app/models/quarto';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  loading = true;
  quartos: Servicos[] = [];
  todosQuartos: Servicos[] = [];
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
    this.service.getter('servicos').subscribe(
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
      a.descricao.toUpperCase().includes(this.chave.toUpperCase())
    );

    if (!this.quartos || this.chave.length === 0) {
      this.quartos = this.todosQuartos;
    }
  }
}
