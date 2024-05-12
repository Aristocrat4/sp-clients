import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
149156967;
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createAccount(account: Account) {
    return this.http.post<Account>(`${this.apiUrl}/clients`, account);
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
  }
}
