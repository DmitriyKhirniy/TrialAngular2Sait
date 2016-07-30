import {Component, Input} from "@angular/core";
import {SearchFiler} from "../pipes/search.pipe";
import {SelectStatus} from "./select-status.component";
import {TaskProgressBar} from "./task-progressBar.component";
import {TextEditBtn} from "./text-edit-btn.component";
import {SubtaskList} from "./subtasks-list";
import {Task} from "../models/task.model";
import {SubTask} from "../models/subtask.model";
import {TaskService} from "../services/task.service";
import {TaskTitle} from "./task-ttile.component";
@Component({
    selector: 'tasks-list',
    templateUrl: 'app/html/task-list.component.html',
    directives: [SelectStatus, TaskProgressBar, TextEditBtn, SubtaskList, TaskTitle],
    pipes: [SearchFiler],
    inputs: ['tasks']
})

export class TasksList{
    @Input() status;

    public usingTask: Task;
    
    constructor(public taskService: TaskService){
        this.usingTask = new Task("", "" , false , [new SubTask("No subtasks", false)]);
    }
    
    public changeUsingTask(task: Task){
        this.usingTask = task;
    };
}

