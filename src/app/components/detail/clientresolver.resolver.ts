import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<Client> {
  constructor(private clientService: ClientService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Client> {
    const clientId = route.paramMap.get('id');
    return this.clientService.getClientById(clientId);
  }
}
