import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SummonerComponent } from './summoner/summoner.component';
import { SortPipePipe } from '../match/sort-pipe.pipe';
import { LoadingComponent } from '../components/loading/loading.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [SummonerComponent, SortPipePipe, LoadingComponent, SettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
