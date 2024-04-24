import { Component, OnInit } from '@angular/core';
import { Sender } from 'src/app/models/sender';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css'],
})
export class SendersComponent implements OnInit {
  loading = true;
  senders: Sender[] = [];
  allProcessos: Sender[] = [];
  chave = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  constructor(private service: GeneralService, private auth: AuthService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('senders').subscribe(
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

    this.service.getter('senders?page=' + (this.page-1)).subscribe(
      (res) => {
        this.senders = res.senders;
        //this.count = res.numberOfElements;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
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
