import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from "../../../core/models/user.model";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-user-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButton, MatDialogActions, MatDialogContent],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {
  newUser: User = {
    fullName: '',
    displayName: '',
    email: '',
    details: '',
  };

  constructor(public dialogRef: MatDialogRef<UserAddComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(): void {
    if (this.newUser.fullName && this.newUser.displayName && this.newUser.email) {
      this.dialogRef.close(this.newUser);
    }
  }
}
