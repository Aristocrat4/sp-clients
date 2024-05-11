import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/account.model';
import { Observable, map } from 'rxjs';
import { Client } from '../../models/client.model';
import { Store, select } from '@ngrx/store';
import { ClientState } from '../../state/clients/client.reducer';
import { selectClients } from '../../state/clients/client.selector';
import { deleteClient } from '../../state/clients/client.actions';
import { DialogService } from '../../services/dialog.service';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-main-table',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
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
    private detailService: DetailsService
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
    this.detailService.showDialog(client);
    console.log(client);
  }
}
