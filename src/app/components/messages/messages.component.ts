import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { Area } from 'src/app/models/permission';
import { Sender } from 'src/app/models/sender';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  loading = true;
  messages: Message[] = [];
  allProcessos: Message[] = [];
  chave = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  constructor(private service: GeneralService, private auth: AuthService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('messages?page='+(this.page-1)).subscribe(
      (res) => {
        this.messages = this.allProcessos = res.messages;
        this.allCount = res.pagination.last_page+1;
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

    this.service.getter('messages?page=' + (this.page-1)).subscribe(
      (res) => {
        this.messages = res.messages;
        //this.count = res.numberOfElements;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getState(state: string) {
    switch (state) {
      case 'APPROVED':
        return 'APROVADO';
      case 'PENDING':
        return 'PENDENTE';
      case 'REJECTED':
        return 'REJEITADO';
    }
    return '';
  }

  formatDate(dateString: string): string {
    if(!dateString) return '';

    const parsedDate = new Date(
      +dateString.substr(0, 4),  // Year
      +dateString.substr(4, 2) - 1,  // Month (0-based index)
      +dateString.substr(6, 2),  // Day
      +dateString.substr(8, 2),  // Hours
      +dateString.substr(10, 2), // Minutes
      +dateString.substr(12, 2)  // Seconds
    );
    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy HH:mm')!;
  }

  getFirst20Caracters(texto: string): string {
    if (texto.length <= 30) {
      return texto;
    } else {
      return texto.slice(0, 30) + '...';
    }
  }

}
