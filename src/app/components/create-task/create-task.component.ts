import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {TaskModel} from "../../models/task.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskStatus} from "../../models/task-status.model";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  public taskFormGroup: FormGroup;
  public name: FormControl = new FormControl<any>('', [Validators.required])
  public description: FormControl = new FormControl<any>('', [Validators.required])
  public status: FormControl = new FormControl<any>('', [Validators.required])
  private taskName: string;
  public isEditFlow: boolean = false;

  statusOptions: TaskStatus[] = [
    {value: 'inProgress', viewValue: 'In Progress'},
    {value: 'completed', viewValue: 'Completed'},
    {value: 'notStarted', viewValue: 'Not Started'},
  ]

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
      this.taskService.postTask(this.getTaskData()).subscribe(
        (data) => {
          this.showSnackBarMessage('Task created successfully');
          this.router.navigate(['../list/']);
        },
        (error) => {
          this.showSnackBarMessage('Error while creating task, please try after sometime');
        }
      );
    }
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
      duration: 2000,
    });
  }
}


