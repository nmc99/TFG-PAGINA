import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchcomponentComponent } from './components/matchcomponent/matchcomponent.component';
import { AuthGuard } from 'src/app/auth/services/auth.guard';
import { MatchdetailsComponent } from './components/matchdetails/matchdetails.component';


const routes: Routes = [
  {
    path: '',
    component: MatchcomponentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'd/:servidor/:summonerName/:id', component: MatchdetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
