import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any;
  title = 'app';
  counter = 1;

  constructor(private userService: UserService, private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Users Page');
    this.metaService.addTag({
      name: 'description',
      content: 'Dynamically generated'
    });
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  add() {
    this.counter++;
  }
}
