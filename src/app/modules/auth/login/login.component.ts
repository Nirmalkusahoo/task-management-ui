import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {LoginModel} from './login.model';
import {Router} from '@angular/router';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userName: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private matSnackBar: MatSnackBar, public router: Router,) {
    this.initFormGroup();
  }

  ngOnInit(): void {
  }

  public initFormGroup(): void {
    this.loginForm = this.formBuilder.group({
      userName: this.userName,
      password: this.password,
    });
  }

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.userService.login(this.getLoginData()).subscribe(
        (data) => {
          this.loginForm.reset();
          const snackBarRef = this.showSnackBarMessage('Logged in successfully. Redirecting to create task page.');

          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigate(['/create']);
          });
        },
        (error) => {
          if (error.status == 403) {
            this.showSnackBarMessage('Invalid login username or password. If you are new user please sign up.');
          }
        }
      );
    }
  }

  private getLoginData(): any {
    const loginData: LoginModel = new LoginModel();
    loginData.userName = this.userName.value;
    loginData.password = this.password.value;
    return loginData;
  }

  private showSnackBarMessage(snackBarMessage: string): MatSnackBarRef<any> {
    const snackBarRef = this.matSnackBar.open(snackBarMessage, '', {
      duration: 2000,
    });
    return snackBarRef;
  }
}
