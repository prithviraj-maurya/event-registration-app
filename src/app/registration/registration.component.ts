import { registrationTypes } from './registration.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationTypes = registrationTypes;
  registrationForm: FormGroup;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      selectedRegistrationType: ['', [Validators.required]],
      numberOfTickets: ['', [Validators.required]]
    });
  }

  getFormControlValue(controlName: string) {
    return this.registrationForm.controls[controlName].value || '';
  }

  registrationTypeChanged(event) {
    this.registrationForm.controls.selectedRegistrationType.setValue(event.value);
    if(this.getFormControlValue('selectedRegistrationType') === 'Self') {
      this.registrationForm.controls.numberOfTickets.disable();
    } else {
      this.registrationForm.controls.numberOfTickets.enable();
    }
  }

  uploadFile(event) {
    console.log(event);
  }
}
