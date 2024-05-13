import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Client } from '../../models/client.model';
import { Store } from '@ngrx/store';
import { ClientState } from '../../state/clients/client.reducer';
import { selectClients } from '../../state/clients/client.selector';
import { deleteClient } from '../../state/clients/client.actions';
import { DialogService } from '../../services/dialog.service';
import { DetailsService } from '../../services/details.service';
import { getAccounts } from '../../state/accounts/account.action';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    CommonModule,
    PaginatorModule,
    TableModule,
    InputTextModule,
  ],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss',
})
export class MainTableComponent {
  clients$: Observable<Client[]> = this.store
    .select(selectClients)
    .pipe(map((clients) => clients.slice().reverse()));

  constructor(
    private store: Store<ClientState>,
    private dialogService: DialogService,
    private detailService: DetailsService,
    private route: Router
  ) {}

  onDelete(clientNumber: string) {
    this.store.dispatch(deleteClient({ clientNumber }));
  }

  onEdit(client: Client) {
    let newObj = { ...client };
    delete newObj.id;
    this.dialogService.showDialog(newObj);
  }

  onDetails(client: Client) {
    this.route.navigate([`client/${client.id}`]);
    // this.detailService.showDialog(client);
    this.store.dispatch(getAccounts({ clientNumber: client.clientNumber }));
  }
}
