import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-payment-gpo',
  templateUrl: './payment-gpo.component.html',
  styleUrls: ['./payment-gpo.component.css'],
})
export class PaymentGpoComponent implements OnInit {
  token = '';
  loading = true;
  url: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = route.snapshot.params['token'];
    this.url = this.getSafeUrl();
  }

  ngOnInit(): void {}

  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=' +
        this.token
    );
  }

  loadFrame($event: any) {
    this.loading = false;
  }

  ngAfterViewInit() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  receiveMessage(event: MessageEvent) {
    if (!event.origin.includes('emis.co.ao')) {
      return;
    }
    let redirect_to = window.location.origin + '/payment-gpo-status/'+event.data;
    window.location.replace(redirect_to)
  }
}
