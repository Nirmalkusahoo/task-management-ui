import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SignUpModel} from "../../../models/sign-up.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public userName: FormControl = new FormControl('', [Validators.required]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private matSnackBar: MatSnackBar, public router: Router, private activatedRoute: ActivatedRoute,) {
    this.initFormGroup();
  }

  ngOnInit(): void {
  }

  public initFormGroup(): void {
    this.signUpForm = this.formBuilder.group({
      userName: this.userName,
      password: this.password,
    });
  }

  public onSubmit(): void {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.userService.signup(this.getSignUpData()).subscribe(
        (data) => {
          this.signUpForm.reset();
          this.showSnackBarMessage('User created successfully, redirecting to Login Page');

        },
        (error) => {
        }
      );
    }
  }

  private getSignUpData(): SignUpModel {
    const signUpModel: SignUpModel = new SignUpModel();
    signUpModel.userName = this.userName.value;
    signUpModel.password = this.password.value;
    return signUpModel;
  }

  private showSnackBarMessage(snackBarMessage: string): void {
    const snackBarRef = this.matSnackBar.open(snackBarMessage, '', {
      duration: 3000,
    })
    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}
