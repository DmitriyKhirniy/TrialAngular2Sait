export class SubTask{
    public class: string;
    constructor(public title: string, public isDone: boolean)
    {
        if(isDone) this.class = "glyphicon glyphicon-ok";
        else this.class= "";
    }

    done(): void{
        this.class = "glyphicon glyphicon-ok";
        this.isDone = true;
    }
    notDone():void{
        this.class = "";
        this.isDone = false;
    }
}
