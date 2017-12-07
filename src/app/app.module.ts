import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/fromPromise';
import { IfObservable } from 'rxjs/observable/IfObservable';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './components/app/app.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    DashboardComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
