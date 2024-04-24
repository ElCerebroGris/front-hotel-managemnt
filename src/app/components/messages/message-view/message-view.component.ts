import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, Recipient } from 'src/app/models/message';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css'],
})
export class MessageViewComponent implements OnInit {
  loading = true;
  recipients: Recipient[] = [];
  message: Message = new Message();
  idMessage = '';

  page = 1;
  count = 0;
  allCount = 0;
  pagesNum!: number[];

  constructor(
    private service: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idMessage = route.snapshot.params['idMessage'];
  }

  ngOnInit(): void {
    this.service.getter('messages/one?id=' + this.idMessage).subscribe(
      (res) => {
        this.message = res;
        this.recipients = res.recipients;
        //this.allCount = res.pagination.totalPages;
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

  getState(state: string) {
    switch (state) {
      case 'DELIVERED':
        return 'ENTREGUE';
      case 'APPROVED':
        return 'APROVADO';
      case 'PENDING':
        return 'PENDENTE';
      case 'REJECTED':
        return 'REJEITADO';
      case 'REFUSED':
        return 'REJEITADA';
    }
    return '';
  }
}
