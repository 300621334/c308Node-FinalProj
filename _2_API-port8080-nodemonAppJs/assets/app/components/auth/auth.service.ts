import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import {Location} from '@angular/common';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import {User} from "../user/user.model";

const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class AuthService {

    //passing in will save the param
    constructor(private http: Http, private location: Location) {}

    register(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:8080/auth/register', body, {headers: headers})
            .map((response: Response) => response.json()) 
            .catch((error: Response) => Observable.throw(error.json()));
    }

    login(user: User) {//send only uName/pw -&- fetch rest of fields from db
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:8080/auth/login', body, {headers: headers})
            .map((response: Response) => response.json()) //sent as DATA to authService.login(user).subscribe(data=>...)
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    userName(){
        return localStorage.getItem('username');
    }

    fullName(){
        return localStorage.getItem('fullname');
    }
    stuentid(){
        return localStorage.getItem('studentid');
    }
    token(){
        return localStorage.getItem('token');
    }
 }