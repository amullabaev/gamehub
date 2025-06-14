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
    path: 'games',
    loadComponent: () =>
      import('./games/games.component').then(
        (m) => m.GamesComponent
      ),
  },
  {
    path: 'games/:game',
    loadComponent: () =>
      import('./game-page/game-page.component').then(
        (m) => m.GamePageComponent
      ),
  },
  {
    path: 'clicker',
    loadComponent: () =>
      import('./clicker/clicker.component').then(
        (m) => m.ClickerComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
