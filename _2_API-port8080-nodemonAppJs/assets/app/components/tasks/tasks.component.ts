import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { OnInit } from '@angular/core';
import { Book } from '../book/book.model';
import { AuthService } from "../auth/auth.service";
import { TaskService } from './task.service';
@Component({ 
  
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  tasks: Book[];
  title: string;
  author:string;  
  section:string;
  isbn:string;
  constructor(private authService: AuthService, private taskService: TaskService, private router: Router) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        //console.log(tasks);
        this.tasks = tasks;
      },
      error => { console.error(error) });
    }
}