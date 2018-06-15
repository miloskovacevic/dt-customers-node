import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'customersList', pathMatch: 'full' },
  {
      path: '',
      component: DashboardComponent,
      children: [
          { path: 'customersList', loadChildren: './customersList/customersList.module#CustomersListModule' }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
