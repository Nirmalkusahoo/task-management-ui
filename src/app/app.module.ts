import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";
import {CreateTaskComponent} from "./components/create-task/create-task.component";
import {ListTaskComponent} from "./components/list-task/list-task.component";
import {MenuComponent} from "./components/menu/menu.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./app.routes";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TokenInterceptor} from "./services/toekn-Interceptor";


@NgModule({
  declarations: [AppComponent, HeaderComponent, CreateTaskComponent, ListTaskComponent, MenuComponent, SideMenuComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, MatInputModule,
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatSelectModule, MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }]
  ,
  bootstrap: [AppComponent]
})

export class AppModule {
}
