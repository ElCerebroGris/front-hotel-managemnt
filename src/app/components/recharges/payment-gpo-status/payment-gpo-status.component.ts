import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-payment-gpo-status',
  templateUrl: './payment-gpo-status.component.html',
  styleUrls: ['./payment-gpo-status.component.css']
})
export class PaymentGpoStatusComponent implements OnInit {

  status = '';
  token = ''
  loading = true;

  constructor(private route: ActivatedRoute,
    private service: GeneralService,
    private auth: AuthService) {
    this.token = route.snapshot.params['token'];
   }

  ngOnInit(): void {
    this.checkStatus();
  }

  async checkStatus() {
    await this.delay(15000);
    await this.service.getter('gpo_payment/'+this.token).subscribe(
      (res) => {
        this.status = res.status;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.auth.updateCredit();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
