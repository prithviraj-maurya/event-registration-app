import { registrationTypes } from './registration.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetails } from '../models/user.model';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationTypes = registrationTypes;
  registrationForm: FormGroup;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  userDetails: UserDetails;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      selectedRegistrationType: ['', [Validators.required]],
      numberOfTickets: ['', [Validators.required]],
    });
  }

  getFormControlValue(controlName: string) {
    return this.registrationForm.controls[controlName].value || '';
  }

  registrationTypeChanged(event) {
    this.registrationForm.controls.selectedRegistrationType.setValue(
      event.value
    );
    if (this.getFormControlValue('selectedRegistrationType') === 'Self') {
      this.registrationForm.controls.numberOfTickets.disable();
    } else {
      this.registrationForm.controls.numberOfTickets.enable();
    }
  }

  uploadFile(event) {
    this.userDetails = this.registrationForm.value;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.userDetails.profilePicUrl = event.target.result;
      };
    }
    if (!this.userDetails.numberOfTickets) {
      this.userDetails.numberOfTickets = 1;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: this.userDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // api call
      this.userService.saveDetails(this.userDetails).subscribe(
        (result) => {
          this.openSnackBar('Saved successfully...', '');
          this.registrationForm.reset();
          console.log(result);
        },
        (error) => {
          console.log(error);
          this.openSnackBar('Failed to save...', '');
        }
      );
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
