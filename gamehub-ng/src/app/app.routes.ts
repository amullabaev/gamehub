import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
