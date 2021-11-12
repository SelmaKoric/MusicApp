import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "./shared/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationInterceptor} from "./auth/authentication-interceptor";
import { FilterPipe } from './shared/filter.pipe';
import { FilterByCategoryPipe } from './shared/filter-by-category.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { SongComponent } from './song/song.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    FilterByCategoryPipe,
    SongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [UserService,
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
