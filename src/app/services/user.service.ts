import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {SignUpModel} from "../models/sign-up.model";
import {environment} from "../../environments/environment";
import {LoginModel} from "../modules/auth/login/login.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLoggedIn: boolean = false;
  public userName: Subject<string> = new Subject<string>();

  constructor(
    public httpService: HttpService,
    private tokenService: TokenService
  ) {
  }


  public login(logInData: LoginModel): Observable<any> {
    const url: string = environment.baseUrl + environment.login;
    return this.httpService.postData(url, logInData).pipe(
      map((response) => {
        if (response.token) {
          this.userLoggedIn = true
          this.userName.next(logInData.userName);
          this.tokenService.setAccessToken(response.token);
        }
      })
    );
  }

  public signup(signUpModel: SignUpModel): Observable<any> {
    const url: string = environment.baseUrl + environment.register;
    return this.httpService.postData(url, signUpModel);
  }

  public isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

}
