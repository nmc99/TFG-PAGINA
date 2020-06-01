import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthGuard } from './auth/services/auth.guard';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServicesService } from './auth/services/auth-services.service';
import { ProfileService } from './lol-app/services/profile.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClientModule,
    AuthServicesService,
    ProfileService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
