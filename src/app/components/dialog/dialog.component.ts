import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
import * as LR from '@uploadcare/blocks';
import '@uploadcare/blocks/web/lr-file-uploader-regular.min.css';

LR.registerBlocks(LR);

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DialogComponent {
  @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<LR.UploadCtxProvider>
  >;
  files: LR.OutputFileEntry<'success'>[] = [];

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
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent
    );
  }

  handleChangeEvent = async (event: LR.EventMap['change']) => {
    this.files = (await event.detail.allEntries.filter(
      (file) => file.status === 'success'
    )) as LR.OutputFileEntry<'success'>[];

    this.createClientForm.controls['photo'].setValue(this.files[0]?.cdnUrl);
  };

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
