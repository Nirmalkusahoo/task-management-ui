import {Injectable} from '@angular/core';
import {TaskModel} from "../models/task.model";
import {catchError, map, NEVER, Observable} from "rxjs";
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: HttpService) {
  }

  public postTask(taskData: TaskModel): Observable<any> {
    // const url: string = 'http://localhost:8091/api/task';
    const url: string = environment.baseUrl + environment.Task
    return this.httpService.postData(url, taskData);
  }
  public updateTask(taskData: TaskModel): Observable<any> {
    // const url: string = 'http://localhost:8091/api/task';
    const url: string = environment.baseUrl + environment.Task
    return this.httpService.putData(url, taskData);
  }

  public getTask(name: string): Observable<TaskModel> {
    // const url: string = `http://localhost:8091/api/task/${name}`;
    const url: string = environment.baseUrl + environment.Task + '/' + name;
    return this.httpService.getData(url);
  }

  public getAllTask(): Observable<any[]> {
    // const url: string = 'http://localhost:8091/api/task/all';
    const url: string = environment.baseUrl + environment.AllTask;
    return this.httpService.getData(url).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError((error) => {
        console.log(error);
        return NEVER;
      })
    );
  }

  public deleteTask(name?: string): Observable<TaskModel[]> {
    // const url: string = `http://localhost:8091/api/task/${name}`;
    const url: string = environment.baseUrl + environment.Task + '/' + name;
    return this.httpService.deleteData(url);
  }
}
