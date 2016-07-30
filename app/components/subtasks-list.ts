import {Component} from "@angular/core";
import {TaskService} from "../services/task.service";
@Component({
    selector: 'subtasks-list',
    templateUrl: 'app/html/subtask-list.component.html',
    inputs: ['task']
})

export class SubtaskList{
    constructor(public taskService: TaskService){}
}