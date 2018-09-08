import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {User} from '../user/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  users = new MatTableDataSource<User>();

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUsersInTable();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      this.addUserIntoTable(data);
      this.getAllUsersInTable();
    });
  }

  private addUserIntoTable(newUser) {
    this.userService.saveUser(newUser).subscribe(saved => {
      this.users.data.push(saved);
    });
  }

  private getAllUsersInTable() {
    this.userService.getAll().subscribe(u => {
      this.users.data = u;
    });
  }
}
