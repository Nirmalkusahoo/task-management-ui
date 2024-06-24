import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management';
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    // sessionStorage.removeItem('token');
  }
}
