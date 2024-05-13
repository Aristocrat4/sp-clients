import { Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ClientResolver } from './components/detail/clientresolver.resolver';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'client/:id',
    component: DetailComponent,
    resolve: { client: ClientResolver },
  },
];
