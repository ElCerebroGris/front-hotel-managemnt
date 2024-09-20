import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { QuartosComponent } from './components/quartos/quartos.component';
import { QuartosAddComponent } from './components/quartos/quartos-add/quartos-add.component';
import { UtilizadorNovoComponent } from './components/users/utilizador-novo/utilizador-novo.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ReservasAddComponent } from './components/reservas/reservas-add/reservas-add.component';

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
    path: 'admin',
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
    component: ReservasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'nova-reserva',
    component: ReservasAddComponent,
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
