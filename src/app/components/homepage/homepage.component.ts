import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DialogComponent } from '../dialog/dialog.component';
import { MainTableComponent } from '../main-table/main-table.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, DialogComponent, MainTableComponent, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
