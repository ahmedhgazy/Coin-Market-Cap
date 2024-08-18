import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'coin-list',
        pathMatch: 'full',
    },
    {
        path: 'coin-list',
        loadComponent: () =>
            import('./components/coin-list/coin-list.component').then(
                (m) => m.CoinListComponent
            ),
    },
    {
        path: 'coin/:id',
        loadComponent: () =>
            import('./components/coin-details/coin-details.component').then(
                (m) => m.CoinDetailsComponent
            ),
    },
];
