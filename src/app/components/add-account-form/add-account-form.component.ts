import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { createAccount } from '../../state/accounts/account.action';

@Component({
  selector: 'app-add-account-form',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
  ],
  templateUrl: './add-account-form.component.html',
  styleUrl: './add-account-form.component.scss',
})
export class AddAccountFormComponent {
  @Input() clientNumber?: number;
  @Output() closeAddAccountEvent = new EventEmitter<boolean>();

  currencies: string[] = [];
  types = ['Current', 'Savings', 'Accumulative'];

  accountForm: FormGroup = this.fb.group({
    clientNumber: 0,
    accountNumber: 0,
    type: ['', [Validators.required]],
    currency: [[], [Validators.required]],
    status: 'Active',
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onCancel() {
    this.closeAddAccountEvent.emit(false);
  }

  onAdd(clientNumber?: number) {
    const uniqueAccountNumber = Math.floor(
      (Math.random() + Math.random()) * 100000000
    );
    this.accountForm.controls['clientNumber'].setValue(clientNumber);
    this.accountForm.controls['accountNumber'].setValue(uniqueAccountNumber);
    this.store.dispatch(createAccount({ account: this.accountForm.value }));
    this.onCancel();
  }

  isFormValid(): boolean {
    return this.accountForm.valid;
  }
}
