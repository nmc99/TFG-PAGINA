import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LolComponent } from './lol.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LolComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'match', loadChildren: () => import('./match/match.module').then(m => m.MatchModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
