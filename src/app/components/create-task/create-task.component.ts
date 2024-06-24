import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {TaskModel} from "../../models/task.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  public taskFormGroup: FormGroup;
  public name: FormControl = new FormControl('', [Validators.required])
  public description: FormControl = new FormControl()
  public status: FormControl = new FormControl('', [Validators.required])
  private taskName: string;
  public isEditFlow: boolean = false;

  statusOptions: string[] = ['To Do', 'In Progress', 'Done']

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private matSnackBar: MatSnackBar, public router: Router, private activatedRoute: ActivatedRoute,) {
    this.taskFormGroup = this.formBuilder.group({
      name: this.name,
      description: this.description,
      status: this.status
    })

    this.activatedRoute.params.subscribe((params) => {
      this.taskName = params['id'];
      if (this.taskName) {
        this.isEditFlow = true;
        this.fetchItem();
      }
    });
  }

  private fetchItem(): void {
    this.taskService
      .getTask(this.taskName)
      .subscribe((response) => {
        const fetchedTask: TaskModel = {...response};
        this.patchForm(fetchedTask);
      });
  }

  private patchForm(item: TaskModel): void {
    this.name.patchValue(item.name);
    this.description.patchValue(item.description);
    this.status.patchValue(item.status);
  }

  public onSubmit(): void {
    this.taskFormGroup.markAllAsTouched();
    if (this.taskFormGroup.valid) {
      if (this.isEditFlow) {
        this.updateTask();
      } else {
        this.createTask()
      }
    }
  }

  private createTask(): void {
    this.taskService.postTask(this.getTaskData()).subscribe(
      (data) => {
        this.showSnackBarMessage('Task created successfully.');
        this.taskFormGroup.reset();
        this.taskFormGroup.updateValueAndValidity();
      },
      (error) => {
        this.showSnackBarMessage('Error while creating task, please try after sometime.');
      }
    );
  }

  private updateTask(): void {
    this.taskService.updateTask(this.getTaskData()).subscribe(
      (data) => {
        this.showSnackBarMessage('Task updated successfully.');
        this.taskFormGroup.reset();
      },
      (error) => {
        this.showSnackBarMessage('Error while updating task, please try after sometime.');
      }
    );
  }

  private getTaskData(): any {
    const taskModel: TaskModel = new TaskModel();
    taskModel.name = this.name.value;
    taskModel.description = this.description.value;
    taskModel.status = this.status.value;
    return taskModel;
  }

  private showSnackBarMessage(snackBarMessage: string): void {
    this.matSnackBar.open(snackBarMessage, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}


