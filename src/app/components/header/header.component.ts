import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Client } from '../../models/client.model';
import { nameValidator } from '../../Validators/name.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  visible: boolean = false;
  genders: string[] | undefined;
  createClientForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.genders = ['Male', 'Female'];
    this.createClientForm = this.fb.group({
      clientNumber: 0,
      name: ['', [nameValidator()]],
      surname: ['', [nameValidator()]],
      gender: ['', [Validators.required]],
      personalId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^5\d{8}$/)]],
      legalAddress: this.fb.group({
        countryLegal: ['', Validators.required],
        cityLegal: ['', Validators.required],
        addressLegal: ['', Validators.required],
      }),
      actualAddress: this.fb.group({
        countryActual: ['', Validators.required],
        cityActual: ['', Validators.required],
        addressActual: ['', Validators.required],
      }),
      photo: '',
    });
  }

  isFormValid(): boolean {
    return this.createClientForm.valid;
  }

  showDialog() {
    this.visible = true;
  }
  onSubmit() {
    const uniqueClientNumber = Math.floor(
      (Math.random() + Math.random()) * 100000000
    );
    this.createClientForm.controls['clientNumber'].setValue(uniqueClientNumber);
    console.log(this.createClientForm);
    this.createClientForm.reset();
    this.visible = !this.visible;
  }
}
