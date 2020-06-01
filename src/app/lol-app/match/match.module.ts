import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchcomponentComponent } from './components/matchcomponent/matchcomponent.component';
import { MatchdetailsComponent } from './components/matchdetails/matchdetails.component';
import {NgScrollbarModule} from 'ngx-scrollbar';

@NgModule({
  declarations: [MatchcomponentComponent, MatchdetailsComponent],
  imports: [
    CommonModule,
    MatchRoutingModule,
    NgScrollbarModule
  ]
})
export class MatchModule { }
