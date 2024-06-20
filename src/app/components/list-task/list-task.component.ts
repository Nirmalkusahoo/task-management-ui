import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TaskModel} from "../../models/task.model";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {

  taskList: TaskModel[] = [{name: 'Hydrogen', description: 'working', status: 'inProgress'},
  ]
  displayedColumns: string[] = ['name', 'description', 'status', 'edit'];
  dataSource = new MatTableDataSource(this.taskList);

  constructor(private router: Router, private httpService: HttpService, private taskService: TaskService) {
    this.getAllTask()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public editItem(item: TaskModel): void {
    this.router.navigate(['/create', item.name]);
  }

  private getAllTask(): void {
    const url = 'api/task/all';
    this.httpService.getData(url).subscribe((data) => {
      this.taskList = data;
      this.dataSource = new MatTableDataSource(this.taskList);
    });
  }

  public deleteTask(item: TaskModel): void {
    this.taskService.deleteTask(item.name).subscribe((data) => {
      this.taskList = data;
      this.dataSource = new MatTableDataSource(this.taskList);
    });
  }
}
