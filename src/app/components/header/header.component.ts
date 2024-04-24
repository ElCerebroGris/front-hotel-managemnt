import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  sms_availible: string = '';
  admin = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName()!;
    //this.sms_availible = this.auth.getSMS()!;

    this.auth.showMenuLateral.subscribe((mostrar) => (this.admin = mostrar));
    if (this.auth.verifyUserAdmin()) {
      this.admin = true;
    }else{
      this.auth.showSMS.subscribe((mostrar) => (this.sms_availible = mostrar));
    }
  }

  logout() {
    this.auth.logout();
  }
}
