import {Task} from "../models/task.model";
import {SubTask} from "../models/subtask.model";

export class UserService{
    public tasks;
    public isLoad: boolean = false;
    public getTasks():Task[]
    {
        return this.tasks;
    }
    
    public loadUser(): Task[]{
       /* $.getJSON("app/data/users.data.json", function(data) {
            this.tasks = new Array();
            let length = data.user.tasks.length;
            for(let i = 0;i<length;i++)
            {
                this.tasks.push( new Task( data.user.tasks[i].title, data.user.tasks[i].status, false, []) );
                console.log(data.user.tasks[i].title +"\t"+data.user.tasks[i].status+"\t"+data.user.tasks.length);
               // this.tasks[i] = new Task( data.user.tasks[i].title, data.user.tasks[i].status, false, []);

                for (let subtask in data.user.tasks.tasks){
                    this.tasks[0].tasks.push(subtask.title , subtask.isDone);
                }
                console.log(this.tasks);
            }
            this.isLoad = true;
            */
            return this.tasks;
    }
    
}