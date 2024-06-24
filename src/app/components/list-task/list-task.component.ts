import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TaskModel} from "../../models/task.model";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {TaskService} from "../../services/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.scss'
})
export class ListTaskComponent {

  taskList: TaskModel[] = []
  displayedColumns: string[] = ['name', 'description', 'status', 'edit'];
  dataSource = new MatTableDataSource(this.taskList);

  constructor(private router: Router, private httpService: HttpService, private taskService: TaskService, private matSnackBar: MatSnackBar,) {
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
    this.taskService.getAllTask().subscribe((data) => {
      if (data.length > 0) {
        this.taskList = data;
        this.dataSource = new MatTableDataSource(this.taskList);
      } else if (data.length === 0) {
        this.showSnackBarMessage('There are no task to be displayed. Please create a task.', 2000);
      }

    });
  }

  public deleteTask(item: TaskModel): void {
    this.taskService.deleteTask(item.name).subscribe((data) => {
      this.taskList = data;
      this.showSnackBarMessage('Task deleted successfully.');
      this.dataSource = new MatTableDataSource(this.taskList);
    }, () => {
      this.showSnackBarMessage('Task could not be deleted. Please try again.');
    });
  }

  private showSnackBarMessage(snackBarMessage: string, time: number = 3000): void {
    this.matSnackBar.open(snackBarMessage, '', {
      duration: time,
    });
  }
}
