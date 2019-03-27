import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { UserHomeComponent } from './components/user/user.home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { routing } from './app.routing';
import { AuthService } from "./components/auth/auth.service";
import {RouteGuard} from "./components/auth/routeguard.service";
import { UserHomeService } from './components/user/user.home.service';
import {TasksComponent} from './components/tasks/tasks.component';
import{HeroAppComponent}from './components/course/course.component';



@NgModule({
    declarations: [
        AppComponent, 
        UserHomeComponent, 
        HeaderComponent, 
        LoginComponent,
        TasksComponent,
        HeroAppComponent,
        RegisterComponent
    ],
    providers:[AuthService, Location, RouteGuard, UserHomeService,TasksComponent],
    imports: [BrowserModule, 
    
        FormsModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule
],
    bootstrap: [AppComponent]
})
export class AppModule {

}