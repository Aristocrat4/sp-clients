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
import { Store } from '@ngrx/store';
import { createClient } from '../../state/clients/client.actions';

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

  constructor(private fb: FormBuilder, private store: Store) {}

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
    this.createClientForm.reset();
    this.visible = true;
  }

  onSubmit() {
    const uniqueClientNumber = Math.floor(
      (Math.random() + Math.random()) * 100000000
    );
    this.createClientForm.controls['clientNumber'].setValue(uniqueClientNumber);
    const newClient: Client = {
      clientNumber: this.createClientForm.controls['clientNumber']?.value,
      name: this.createClientForm.controls['name'].value,
      surname: this.createClientForm.controls['surname'].value,
      gender: this.createClientForm.controls['gender'].value,
      personalId: this.createClientForm.controls['personalId'].value,
      phoneNumber: this.createClientForm.controls['phoneNumber'].value,
      legalAddress: {
        country: this.createClientForm.get('legalAddress.countryLegal')?.value,
        city: this.createClientForm.get('legalAddress.cityLegal')?.value,
        address: this.createClientForm.get('legalAddress.addressLegal')?.value,
      },
      actualAddress: {
        country: this.createClientForm.get('actualAddress.countryActual')
          ?.value,
        city: this.createClientForm.get('actualAddress.cityActual')?.value,
        address: this.createClientForm.get('actualAddress.addressActual')
          ?.value,
      },
      photo: this.createClientForm.controls['photo'].value,
    };
    console.log(newClient);
    this.store.dispatch(createClient({ client: newClient }));
    this.visible = !this.visible;
  }
}
