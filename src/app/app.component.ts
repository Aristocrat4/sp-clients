import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { MainTableComponent } from './components/main-table/main-table.component';
import { Store } from '@ngrx/store';
import { ClientService } from './services/client.service';
import { initializeClientData } from './state/clients/client.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, HeaderComponent, MainTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store, private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe((clients) => {
      this.store.dispatch(initializeClientData({ clients }));
    });
  }
}
