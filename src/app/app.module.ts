import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorCatchingInterceptor } from './interceptors/error-catching-interceptors';
import { OperationComponent } from './operation/operation.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { StatementComponent } from './statement/statement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperationComponent,
    PageNotFoundComponent,
    StatementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
