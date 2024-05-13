import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DetailsService } from '../../services/details.service';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../../models/account.model';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { Store } from '@ngrx/store';
import { selectAccounts } from '../../state/accounts/account.selector';
import { AddAccountFormComponent } from '../add-account-form/add-account-form.component';
import { Client } from '../../models/client.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getAccounts } from '../../state/accounts/account.action';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    TagModule,
    CommonModule,
    DataViewModule,
    AddAccountFormComponent,
    RouterModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  visible: boolean = false;
  showAddAccount: boolean = false;
  client!: Client;
  private routeDataSubscription: Subscription = new Subscription();

  accountNumbers$: Observable<Account[]> = this.store.select(selectAccounts);

  constructor(
    public readonly detailService: DetailsService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  get fullName() {
    return (
      this.detailService.currentClientData?.name +
      ' ' +
      this.detailService.currentClientData?.surname
    );
  }

  ngOnInit() {
    this.getResolvedData();
    this.store.dispatch(
      getAccounts({ clientNumber: this.client.clientNumber })
    );
  }

  getResolvedData() {
    this.routeDataSubscription = this.route.data.subscribe((data) => {
      this.client = data['client'];
    });
  }

  onAddAccount() {
    this.showAddAccount = true;
  }

  closeAddEvent(event: boolean) {
    this.showAddAccount = event;
  }

  showDialog() {
    this.visible = true;
  }

  getSeverity(account: Account) {
    switch (account.status) {
      case 'Active':
        return 'success';
      case 'Closed':
        return 'danger';

      default:
        return undefined;
    }
  }
  ngOnDestroy() {
    this.routeDataSubscription.unsubscribe();
  }
}
