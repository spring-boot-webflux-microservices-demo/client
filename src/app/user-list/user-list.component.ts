import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<any>;
  userColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getAll().subscribe(u => {
      this.users = u;
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => this.addUserIntoTable('{\n' +
      '\t"firstName": "Petras",\n' +
      '\t"lastName": "Petraitis",\n' +
      '\t"age": 34\n' +
      '}'));
  }

  private addUserIntoTable(newUser) {
    console.log(newUser);
    this.userService.saveUser(newUser).subscribe(saved => {
      console.log(saved);
      this.users.push(saved);
    });
  }
}
