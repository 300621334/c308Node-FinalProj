import { Component } from '@angular/core';
import { Course } from '../../../task'
import { TaskService } from '../../services/task.service'
@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  tasks: Course[];

  title: string;
  author:string;
  section:string;
  isbn:string;
  respRate:string;  
  bloodPress:string;
    tipOfDay:string;  
  emergEmail:string;
 dateCreated:string;
 userId:string;//
 isPatient:boolean;//only nurse can see records of ALL patients
 //isNurse:boolean;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        //console.log(tasks);//doesn't write to console:https://stackoverflow.com/questions/37869496/console-log-not-working-in-angular2-component-typescript
        this.tasks = tasks.course;
        this.userId = tasks.userId;
        this.isPatient = String(this.userId).charAt(0) !== '9';
        //this.isNurse = !(this.isPatient);
      });
  }

  addTask(event) {
    event.preventDefault();
    //this.title = this.userId;
    var newTask = {
      title: this.title,
      author: this.author,
      section: this.section,
      isbn: this.isbn,
      respRate:this.respRate,
      bloodPress:this.bloodPress,
        tipOfDay:this.tipOfDay,
      emergEmail:this.emergEmail,
     dateCreated:this.dateCreated

  }
  console.log(newTask);
  
  this.taskService.addTask(newTask)
      .subscribe(task => {
          this.tasks.push(task);
          this.author = '';
          this.section = '';
          this.section = '';
          this.isbn = '';
      });

  }

  deleteTask(id){
    var tasks = this.tasks;
    
    this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0;i < tasks.length;i++){
                if(tasks[i]._id == id){
                    tasks.splice(i, 1);
                }
            }
        }
    });
}



}