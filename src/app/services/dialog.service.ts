import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  visible: boolean = false;
  clientDataToEdit?: Client;
  clientData$ = new BehaviorSubject<Client | undefined>(undefined);

  constructor() {}

  showDialog(clientData?: Client) {
    if (clientData) {
      this.clientData$.next(clientData);
    }
    this.visible = true;
  }
}
