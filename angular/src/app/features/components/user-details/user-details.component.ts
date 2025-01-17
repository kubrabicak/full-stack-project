import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-user-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButton],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
