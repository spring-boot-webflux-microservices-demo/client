import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddUserDialogComponent>) {
    this.description = 'Add User';
  }

  add() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      age: 0
    });
  }

}
