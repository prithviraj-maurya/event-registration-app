import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserDetails } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: Array<UserDetails>;
  selectedUser: UserDetails;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getDetails().subscribe(
      (result) => {
        this.users = result;
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Couldnot fetch user details', '');
      }
    );
  }

  openUserDetails(userDetails: UserDetails) {
    this.selectedUser = userDetails;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: this.selectedUser,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
