import {Component} from "@angular/core";
import {TaskService} from "../services/task.service";
@Component({
    selector: 'text-edit-btn',
    template:
    '<button type="button" [(ngClass)]="task.editBtnClass" (click)="taskService.changeEditable(task, $event.target)">'+
        '<span class="glyphicon glyphicon-align-justify"></span>'+
          '{{task.editBtnText}}'+
    '</button>',
    inputs: ['task']
})

export class TextEditBtn{
    constructor(public taskService: TaskService){}
}
