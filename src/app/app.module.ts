import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PainelComponent } from './components/painel/painel.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { GeneralService } from './services/general.service';
import { AuthGuard } from './helpers/auth.guard';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageAddComponent } from './components/messages/message-add/message-add.component';
import { SendersComponent } from './components/senders/senders.component';
import { SendersAddComponent } from './components/senders/senders-add/senders-add.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MessageViewComponent } from './components/messages/message-view/message-view.component';
import { DatePipe } from '@angular/common';
import { RechargesComponent } from './components/recharges/recharges.component';
import { PaymentGpoComponent } from './components/recharges/payment-gpo/payment-gpo.component';
import { PaymentGpoStatusComponent } from './components/recharges/payment-gpo-status/payment-gpo-status.component';
import { Error404Component } from './components/error404/error404.component';
import { ResponseInterceptor } from './helpers/responseInterceptor';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { DocDevComponent } from './components/admin/doc-dev/doc-dev.component';
import { DashboardComponent } from './components/administration/dashboard/dashboard.component';
import { SendersAdminComponent } from './components/administration/senders-admin/senders-admin.component';
import { UsersComponent } from './components/administration/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupsAddComponent } from './components/groups/groups-add/groups-add.component';
import { GroupsAddMemberComponent } from './components/groups/groups-add-member/groups-add-member.component';
import { GroupsListMembersComponent } from './components/groups/groups-list-members/groups-list-members.component';
import { PaymentChooseComponent } from './components/recharges/payment-choose/payment-choose.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PainelComponent,
    ArquivosComponent,
    LoginComponent,
    MessagesComponent,
    MessageAddComponent,
    SendersComponent,
    SendersAddComponent,
    RegisterComponent,
    AdminComponent,
    MessageViewComponent,
    RechargesComponent,
    PaymentGpoComponent,
    PaymentGpoStatusComponent,
    Error404Component,
    EmailConfirmationComponent,
    DocDevComponent,
    DashboardComponent,
    SendersAdminComponent,
    UsersComponent,
    GroupsComponent,
    GroupsAddComponent,
    GroupsAddMemberComponent,
    GroupsListMembersComponent,
    PaymentChooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CanvasJSAngularChartsModule
  ],
  providers: [DatePipe, AuthService, AuthGuard, GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
