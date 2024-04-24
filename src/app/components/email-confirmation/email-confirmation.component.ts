import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
})
export class EmailConfirmationComponent implements OnInit {
  token = '';
  loading = true;

  constructor(private service: GeneralService, private route: ActivatedRoute) {
    this.token = route.snapshot.params['token'];
  }

  ngOnInit(): void {
    this.checkStatus();
    this.loading = false;
  }

  checkStatus() {
    this.service.getter('confirm-email/' + this.token).subscribe(
      (res) => {
        this.service.callNotification(
          'success',
          'Email confirmado com sucesso'
        );
      },
      (error) => {
        this.service.callNotification('error', 'Token inválido');
      }
    );
  }
}
