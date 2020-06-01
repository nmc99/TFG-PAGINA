import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './lol-routing.module';
import { LolComponent } from './lol.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AuthServicesService } from '../auth/services/auth-services.service';

@NgModule({
  declarations: [LolComponent, ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [
    HttpClientModule,
    AuthServicesService
  ]
})
export class LolAppModule { }
