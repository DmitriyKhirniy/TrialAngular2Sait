import {Component, Input} from '@angular/core';
import {SearchFiler} from "../pipes/search.pipe";
import {TaskService} from "../services/task.service";
import {FilterService} from "../services/filter.service";
import {StatusService} from "../services/status.service";
import {Task} from "../models/task.model";
import {SubTask} from "../models/subtask.model";
import {UserService} from "../services/user.service";
import {TasksList} from "./tasks-list.component";

@Component({
    selector: 'main-component',
    templateUrl: 'app//html/main.html',
    directives: [TasksList],
    pipes: [SearchFiler],
    providers: [TaskService, FilterService, StatusService, UserService]
})



export class MainComponent { 

    @Input() status;


    //The setting of component
    public Settings: Object = {
        message:          "All is fine",
        messageClass:     "alert alert-success",
        messageVisible:   "hidden",
        editButtonText:   "Edit text",
        subTaskTitle:     "",
        editable:         false
    };


    message:string = "All is fine";
    messageClass:string = "alert alert-success";
    messageVisible:string = "hidden";
    
    editButtonText: string = "Edit text";

    editable: boolean = false;
    constructor(public taskService: TaskService, public filterService: FilterService, public statusService: StatusService, public userService: UserService){
      //  console.log("Con "+this.userService.loadUser());
    }


    filters: string[] = [
        "All tasks",
        "In the plan",
        "In progress",
        "Completed"
    ];

    subTaskTitle: string = "";

    public currentTask: Task = new Task("", "In the plan", false, [new SubTask("No subtasks", false)]);

    public mainTask:Task = new Task("", "In the plan", false, [new SubTask("No subtasks", false)]);

    changeMainTask(task: Task):void{
        this.mainTask = task;
    }

    onChange(value: string, task: Task):void
    {
        task.statusChange(value);
        this.resetJSON();
    }

    onSubmit():void
    {
        this.tasks.push(this.currentTask);
        this.currentTask = new Task("", "In the plan",false, [new SubTask("No subtasks", false)]);
        this.resetJSON();
    }

    //Method that reset json file in local storage
    private resetJSON():void{
        let str = JSON.stringify( this.tasks );
        localStorage.setItem( "TaskStorage", '{'+'"tasks":'+str+'}');
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
            this.resetJSON();
        }
    }

    addSubTask():void{
        this.mainTask.subTaskStyle = "default";
        if(this.mainTask.tasks[0].title == "No subtasks")
        {
            this.mainTask.tasks.splice( 0,1 );
        }
        this.mainTask.tasks.push( new SubTask(this.subTaskTitle, false) );
        this.subTaskTitle= "";
        this.taskService.resetSubTasks( this.mainTask );
        this.resetJSON();
    }

    removeSubTask(subtask: SubTask):void{
        let index = this.mainTask.tasks.indexOf(subtask);
        this.mainTask.tasks.splice( index, 1 );
        this.taskService.resetSubTasks( this.mainTask );
    }

    removeTask(task:Task): void{
        let index = this.tasks.indexOf( task );
        this.tasks.splice( index, 1 );
        this.resetJSON();
    }

    tasks: Task[];
    ngOnInit(): void{
        this.tasks = [];
        this.parseUserTasks(this.tasks);
    }

    parseUserTasks(tasks: Task[]):void {

        /* $.getJSON( "app/data/data.json", function(data){

         let length = data.tasks.length;
         let subTasks;
         for(let i = 0;i<length;i++)
         {
         subTasks = [];
         if(data.tasks[i].tasks.length != 0) {
         for (let j = 0; j < data.tasks[i].tasks.length; j++) {
         subTasks.push(new SubTask(data.tasks[i].tasks[j].title, data.tasks[i].tasks[j].isDone));
         }
         }else {
         subTasks.push( new SubTask("No subtasks", false));
         }
         tasks.push(new Task( data.tasks[i].title, data.tasks[i].status, data.tasks[i].textEditable,  subTasks ));
         }

         } )
         */


        let data = JSON.parse(localStorage.getItem("TaskStorage"));
        if (data != null) {
            let length = data.tasks.length;
            let subTasks;
            for (let i = 0; i < length; i++) {
                subTasks = [];
                if (data.tasks[i].tasks.length != 0) {
                    for (let j = 0; j < data.tasks[i].tasks.length; j++) {
                        subTasks.push(new SubTask(data.tasks[i].tasks[j].title, data.tasks[i].tasks[j].isDone));
                    }
                } else {
                    subTasks.push(new SubTask("No subtasks", false));
                }
                tasks.push(new Task(data.tasks[i].title, data.tasks[i].status, data.tasks[i].textEditable, subTasks));
            }

        }
        else console.log("Np tasks");
    }

    
}
