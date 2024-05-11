import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  visible: boolean = false;
  currentClientData?: Client;

  constructor() {}

  showDialog(client: Client) {
    this.currentClientData = client;
    this.visible = true;
  }
}
