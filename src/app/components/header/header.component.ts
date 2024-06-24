import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public userName: string;
  public toolTipMessage: string;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.userName.subscribe((userName) => {
      this.userName = userName;
      this.toolTipMessage = 'You are logged in as ' + this.userName;
    });

  }
}
