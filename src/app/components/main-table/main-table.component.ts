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

  constructor(private store: Store<ClientState>) {}

  ngOnInit() {}
}
