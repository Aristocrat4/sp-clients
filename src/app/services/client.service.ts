import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  createClient(client: Client) {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  deleteClient(clientNumber: string): Observable<void> {
    const url = `${this.apiUrl}/clients/${clientNumber}`;
    return this.http.delete<void>(url);
  }

  updateClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${client.clientNumber}`;
    return this.http.put<Client>(url, client);
  }
  getClientById(clientId: string | null): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${clientId}`);
  }
}
