import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {UserDatasource} from '../user/user.datasource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userColumns: string[] = ['position', 'firstName', 'lastName', 'age', 'actions'];
  dataSource: UserDatasource;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.getAllUsersInTable();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      // this.dataSource.addEmptyUser(data);
    });
  }

}
