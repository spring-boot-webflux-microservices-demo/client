import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {UserDatasource} from '../user/user.datasource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  dataSource: UserDatasource;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.getAllUsersInTable();
  }
}
