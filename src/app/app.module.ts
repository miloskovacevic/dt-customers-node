import { CustomersListService } from './services/customersList.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteModalModule } from './common/modals/deleteModal/deleteModal.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DeleteModalModule
  ],
  providers: [
    CustomersListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
