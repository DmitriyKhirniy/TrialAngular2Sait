
import {Pipe} from "@angular/core";
@Pipe({
    name: "searchFilter"
})

export class SearchFiler{
    transform(value, status){
        return (status == "All tasks") ? value : value.filter(  (item) => item.status == status);
    }
}
