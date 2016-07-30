import {Component} from "@angular/core";
import {TaskService} from "../services/task.service";
@Component({
    selector: 'task-tiile', 
    templateUrl: 'app/html/task-title.component.html',
    inputs: ['task']
})

export class TaskTitle{
    constructor(public taskService: TaskService){}
}