import { Component, OnInit } from '@angular/core';
import { Sender } from 'src/app/models/sender';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-senders-admin',
  templateUrl: './senders-admin.component.html',
  styleUrls: ['./senders-admin.component.css'],
})
export class SendersAdminComponent implements OnInit {
  loading = true;
  senders: Sender[] = [];
  allProcessos: Sender[] = [];
  chave = '';

  page = 1;
  hasNext = false;

  constructor(private service: GeneralService, private auth: AuthService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('senders/all?page=' + (this.page - 1)).subscribe(
      (res) => {
        this.senders = this.allProcessos = res;
        if(this.senders.length >= 20) this.hasNext = true;
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

    this.service.getter('senders/all?page=' + (this.page - 1)).subscribe(
      (res) => {
        this.senders = res;
        if(this.senders.length >= 20) this.hasNext = true;
        else this.hasNext = false;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  blockSender(senderId: string) {
    this.loading = true;
    this.service.getter('senders/' + senderId + '/block').subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  unblockSender(senderId: string) {
    this.loading = true;
    this.service.getter('senders/' + senderId + '/unblock').subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  approveSender(approval_token: string) {
    this.loading = true;
    this.service.getter('senders/' + approval_token + '/approve').subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  disaproveSender(approval_token: string) {
    this.loading = true;
    this.service.getter('senders/' + approval_token + '/disapprove').subscribe(
      (res) => {
        this.carregar();
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

  validState(state: string, action: string) {
    if (state == 'PENDING' && action == 'APROVAR') {
      return true;
    } else if (state == 'PENDING' && action == 'REPROVAR') {
      return true;
    } else if (state == 'APPROVED' && action == 'BLOQUEAR') {
      return true;
    } else if (state == 'BLOCKED' && action == 'DESBLOQUEAR') {
      return true;
    }
    return false;
  }
}
