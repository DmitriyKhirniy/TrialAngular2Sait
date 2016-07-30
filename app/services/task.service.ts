
import {Task} from '../models/task.model'
import {Injectable} from '@angular/core';
import{Observable} from 'rxjs/Observable'
import 'rxjs/Rx';
import {SubTask} from "../models/subtask.model";
@Injectable()

export class TaskService{

    public usingTask: Task = new Task("", "", false , [ new SubTask("No subtask", false) ]);
    
    changeUsingTask(task: Task){
        this.usingTask = task;
    }
    
    tasks: Task[] = [
        new Task("sleep", "Completed", false, [new SubTask("No subtasks", false)]),
        new Task("eat", "In progress", false, [new SubTask("No subtasks", false)]),
        new Task("code", "In the plan", false, [new SubTask("No subtasks", false)]),
        new Task("Make todo-application", "In progress", false, [new SubTask("No subtasks", false)]),
        new Task("Понять Angular 2", "In the plan", false, [new SubTask("Найти статьи", true), new SubTask("Кодить", false),new SubTask("Написать программу", false)]),
        new Task("Find the book 'ngBook2'", "Completed", false, [new SubTask("No subtasks", false)])
    ];
    
    add(element: Task):void
    {
        this.tasks = [...this.tasks,element];
        console.log(this.tasks);
    }
    getTasks(): Task[]{
        return this.tasks;
    }

    resetSubTasks(task: Task):void{
        let completed = 0;
        for(let i=0;i<task.tasks.length;i++){
            if(task.tasks[i].isDone) completed++;
        }
        let percent = Math.round( 100/task.tasks.length*completed);
        task.percent = percent+"%";
        task.percentText = percent+"% Complete";
    }

    changeEditable(task: Task):void{
        if(task.textEditable) {
            task.editBtnClass = "btn btn-danger btn-sm editTextButton";
            task.textEditable = false;
            task.editBtnText = "Edit text";
        }
        else {
            task.editBtnClass = "btn btn-success btn-sm editTextButton";
            task.textEditable = true;
            task.editBtnText = "Editing";
        }
    }

    addSubTask(task: Task, subTaskTitle: string):void{
       
        if(task.tasks[0].title == "No subtasks")
        {
            task.tasks.splice( 0,1 );
        }
        task.tasks.push( new SubTask(subTaskTitle, false) );
        //subTaskTitle= "";
        this.resetSubTasks( task );
    }

    subTaskDone(task: Task, subTask: SubTask ):void{
        if(subTask.title !="No subtasks") {
            subTask.done();
            let completed = 0;
            for (let i = 0; i < task.tasks.length; i++) {
                if (task.tasks[i].isDone) completed++;
            }
            let percent = Math.round(100 / task.tasks.length * completed);
            task.percent = percent + "%";
            task.percentText = percent + "% Complete";
            if (completed > 0 && completed != task.tasks.length) {
                task.class = "list-group-item-warning";
                task.status = "In progress";
            }
            if (percent == 100) {
                task.statusChange("Completed");
            }
        }
    }
}
