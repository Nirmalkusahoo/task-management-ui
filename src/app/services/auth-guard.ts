import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot,} from '@angular/router';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    Promise<unknown> {
    return new Promise((res) => {
      if (!this.userService.isUserLoggedIn()) {
        this.router.navigate(['auth', 'login']);
        res(false);
      } else {
        res(true);
      }
    });
  }


}
