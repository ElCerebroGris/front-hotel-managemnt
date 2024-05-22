import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { UsersComponent } from './components/administration/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupsAddComponent } from './components/groups/groups-add/groups-add.component';
import { GroupsListMembersComponent } from './components/groups/groups-list-members/groups-list-members.component';
import { PaymentChooseComponent } from './components/recharges/payment-choose/payment-choose.component';
import { QuartosComponent } from './components/quartos/quartos.component';
import { QuartosAddComponent } from './components/quartos/quartos-add/quartos-add.component';
import { UtilizadorNovoComponent } from './components/administration/users/utilizador-novo/utilizador-novo.component';

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
    path: 'quartos',
    component: QuartosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quarto-novo',
    component: QuartosAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'novo-utilizador',
    component: UtilizadorNovoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservas',
    component: DashboardComponent,
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
    path: 'recharges-payment/:idPlan',
    component: PaymentChooseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent,
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
