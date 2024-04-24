import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan, Recharge } from 'src/app/models/plan';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.component.html',
  styleUrls: ['./recharges.component.css'],
})
export class RechargesComponent implements OnInit {
  loading = true;
  plans: Plan[] = [];
  recharges: Recharge[] = [];
  recharges_reference: Recharge[] = [];
  recharges_result: Recharge[] = [];

  constructor(
    private service: GeneralService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('plans').subscribe(
      (res) => {
        this.plans = res;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('recharges').subscribe(
      (res) => {
        this.recharges = res;
        this.listRecharges();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  listRecharges() {
    this.service.getter('recharges_reference').subscribe(
      (res) => {
        this.recharges_reference = res;
        this.recharges.forEach((item) => {
          item.origin = 'Multicaixa Express';
          this.recharges_result.push(item);
        });
        this.recharges_reference.forEach((item) => {
          item.origin = 'Referência Multicaixa';
          this.recharges_result.push(item);
        });

        this.recharges_result = this.recharges_result.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getState(state: string) {
    switch (state) {
      case 'ACCEPTED':
        return 'PAGO';
      case 'PAID':
        return 'PAGO';
      case 'PENDING':
        return 'PENDENTE';
      case 'REJECTED':
        return 'REJEITADO';
    }
    return '';
  }

  getPrice(price: string) {
    return parseInt(price);
  }
}
