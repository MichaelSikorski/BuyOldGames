import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ViewCartComponent } from './view-cart/view-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseComponent,
    NavBarComponent,
    ViewCartComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	MatSidenavModule,
	MatToolbarModule,
	MatListModule,
	MatBadgeModule,
	BrowserAnimationsModule,
	HttpClientModule,
	FormsModule,
 ServiceWorkerModule.register('ngsw-worker.js', {
   enabled: environment.production,
   // Register the ServiceWorker as soon as the application is stable
   // or after 30 seconds (whichever comes first).
   registrationStrategy: 'registerWhenStable:30000'
 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
