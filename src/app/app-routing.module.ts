import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {LogInComponent} from './log-in/log-in.component';

const routes: Routes = [
  { path: 'dashboard', component: OverviewComponent },
  {path: '', component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
