import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  visible: boolean = false;

  constructor(public readonly detailService: DetailsService) {}

  get fullName() {
    return (
      this.detailService.currentClientData?.name +
      ' ' +
      this.detailService.currentClientData?.surname
    );
  }
  showDialog() {
    this.visible = true;
  }
}
