import { Routes } from '@angular/router';
import { CoinListComponent } from './components/conin-list/coin-list.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'coin-list',
        pathMatch: 'full',
    },
    {
        path: 'coin-list',
        component: CoinListComponent,
    },
    {
        path: 'coin/:id',
        component: CoinDetailsComponent,
    },
];
