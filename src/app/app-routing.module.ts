import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelComponent } from './components/painel/painel.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageAddComponent } from './components/messages/message-add/message-add.component';
import { SendersComponent } from './components/senders/senders.component';
import { SendersAddComponent } from './components/senders/senders-add/senders-add.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MessageViewComponent } from './components/messages/message-view/message-view.component';
import { RechargesComponent } from './components/recharges/recharges.component';
import { PaymentGpoComponent } from './components/recharges/payment-gpo/payment-gpo.component';
import { PaymentGpoStatusComponent } from './components/recharges/payment-gpo-status/payment-gpo-status.component';
import { Error404Component } from './components/error404/error404.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { DashboardComponent } from './components/administration/dashboard/dashboard.component';
import { SendersAdminComponent } from './components/administration/senders-admin/senders-admin.component';
import { UsersComponent } from './components/administration/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupsAddComponent } from './components/groups/groups-add/groups-add.component';
import { GroupsListMembersComponent } from './components/groups/groups-list-members/groups-list-members.component';
import { PaymentChooseComponent } from './components/recharges/payment-choose/payment-choose.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'administration-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administration-senders',
    component: SendersAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administration-users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'painel',
    component: PainelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'senders',
    component: SendersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'senders-new',
    component: SendersAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups-new',
    component: GroupsAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups-view/:idGroup',
    component: GroupsListMembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages-new',
    component: MessageAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recharges',
    component: RechargesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recharges-payment/:idPlan',
    component: PaymentChooseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'message-view/:idMessage',
    component: MessageViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-gpo/:token',
    component: PaymentGpoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payment-gpo-status/:token',
    component: PaymentGpoStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activate/:token',
    component: EmailConfirmationComponent,
    canActivate: [AuthGuard]
  },
  {
      path: '**',
      component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
