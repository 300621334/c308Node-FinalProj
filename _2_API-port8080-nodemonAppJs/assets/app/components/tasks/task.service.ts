import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Location } from '@angular/common';
import { AuthService } from "../auth/auth.service";
import { Book } from '../book/book.model'
import 'rxjs/Rx';
import { Observable } from "rxjs";
//import 'rxjs/add/operator/map';

const headers = new Headers({ 'Content-Type': 'application/json' });
@Injectable()
export class TaskService {
    constructor(private http: Http, private authService: AuthService) {
    }

    getTasks() {
       return this.http.get('http://localhost/book/'+ "?token=" + this.authService.token(), { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    addTask(newTask){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/book', JSON.stringify(newTask), {headers: headers})
            .map(res => res.json());
    }
}