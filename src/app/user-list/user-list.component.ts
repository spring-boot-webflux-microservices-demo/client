import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<any>;
  userColumns: string[] = ['position', 'firstName', 'lastName', 'age'];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(u => {
      this.users = u;
    });
  }

}
