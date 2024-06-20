import {Injectable} from '@angular/core';
import {TaskModel} from "../models/task.model";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) {
  }

  public postTask(taskData: TaskModel): Observable<any> {
    const url: string = 'api/task';
    return this.httpService.postData(url, taskData);
  }

  public getTask(name: string): Observable<TaskModel> {
    const url: string = `api/task/${name}`;
    return this.httpService.getData(url);
  }

  public deleteTask(name?: string): Observable<TaskModel[]> {
    const url: string = `api/task/${name}`;
    return this.httpService.deleteData(url);
  }
}
