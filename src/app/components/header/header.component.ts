import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  newClient = true;

  constructor(public readonly dialogService: DialogService) {}
  onNewClient() {
    this.dialogService.showDialog();
  }
}
