import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.css'],
})
export class PaymentChooseComponent implements OnInit {
  idPlan = '';
  loading = false;
  displayReference = false;
  reference = '';
  plan: Plan = new Plan();
  plans: Plan[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GeneralService
  ) {
    this.idPlan = route.snapshot.params['idPlan'];
  }

  ngOnInit(): void {
    this.service.getter('plans').subscribe(
      (res) => {
        this.plans = res;
        this.plan = this.plans.filter(p => p.id==this.idPlan).pop()!;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  pay(paymentMethod: number) {
    this.loading = true;

    if (paymentMethod == 1) {
      let data = {
        plan_id: this.idPlan,
      };

      this.service.postter('gpo_payment', data).subscribe(
        (res) => {
          this.router.navigate(['payment-gpo/' + res.id]);
        },
        (error) => {}
      );
    } else if (paymentMethod == 2) {
      let data = {
        plan_id: this.idPlan,
      };

      this.service.postter('reference_payment', data).subscribe(
        (res) => {
          this.reference = res.reference;
          this.displayReference = true;
          this.loading = false;
        },
        (error) => {}
      );
    }
  }
}
