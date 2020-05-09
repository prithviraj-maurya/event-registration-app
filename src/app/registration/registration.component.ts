import { registrationTypes } from './registration.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  selectedRegistrationType: string;
  registrationTypes = registrationTypes;
  constructor() { }

  ngOnInit(): void {
  }

  registrationTypeChanged(event) {
    this.selectedRegistrationType = event.value;
  }

  uploadFile(event) {
    console.log(event);
  }
}
