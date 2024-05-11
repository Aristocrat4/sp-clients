import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogService } from '../../services/dialog.service';
import { nameValidator } from '../../Validators/name.validator';
import { Client } from '../../models/client.model';
import { createClient } from '../../state/clients/client.actions';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  genders = ['Male', 'Female'];
  createClientForm: FormGroup = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dialogService.clientData$.subscribe((client) => {
      if (client) {
        this.createClientForm.setValue(client);
      }
    });
  }

  onHide() {
    this.createClientForm.reset();
  }

  isFormValid(): boolean {
    return this.createClientForm.valid;
  }

  showDialog(clientData?: Client) {
    this.createClientForm.reset();
    this.dialogService.showDialog();
  }

  onSubmit() {
    const uniqueClientNumber = Math.floor(
      (Math.random() + Math.random()) * 100000000
    );
    this.createClientForm.controls['clientNumber'].setValue(uniqueClientNumber);
    this.store.dispatch(createClient({ client: this.createClientForm.value }));
    this.dialogService.visible = false;
  }

  onCancel() {
    this.dialogService.visible = false;
  }
}
