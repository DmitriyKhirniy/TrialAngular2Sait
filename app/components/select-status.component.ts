import {Component} from "@angular/core";
import {StatusService} from "../services/status.service";
@Component({
    selector: 'select-status',
    template:
      '<select  disabled="{{task.completed}}" [(ngModel)]="task.status" (change)="task.statusChange($event.target.value)" class="listItemStatus">'+
           '<option value ="{{item}}" *ngFor="let item of statusService.statuses">{{item}}</option>'+
      '</select>',
    inputs: ['task']
})

export class SelectStatus{
    constructor(public statusService: StatusService)
    {

    }
}