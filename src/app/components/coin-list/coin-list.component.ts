import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TruncateDecimalPipe } from '../../pipes/fixed-digits.pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';

import { Table, TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { PRIME_UTILITIES } from '../../../prime';
import { BackToTopDirective } from '../../shared/directives/top.directive';
import { LoadingService } from '../../shared/loading/loading.service';
import { MessagesService } from '../../shared/messages/messages.service';
@Component({
    selector: 'app-coin-list',
    standalone: true,
    imports: [
        CommonModule,
        TruncateDecimalPipe,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        TagModule,
        IconFieldModule,
        InputIconModule,
        PRIME_UTILITIES,
        BackToTopDirective,
    ],

    templateUrl: './coin-list.component.html',
    styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
    loadingS = inject(LoadingService);
    displayedColumns: string[] = [
        'symbol',
        'current_price',
        'price_change_percentage_24h',
        'market_cap',
    ];

    currencyService: CurrencyService = inject(CurrencyService);
    currency: string = 'INR';
    trendingCurrency$: Observable<any[]>;
    allData$: Observable<any[]>;
    dataSource!: MatTableDataSource<any>;
    router: Router = inject(Router);
    route: ActivatedRoute = inject(ActivatedRoute);
    @ViewChild('dt1') dt1: Table | undefined;
    messages = inject(MessagesService);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedCoins: any;
    constructor() {}

    ngOnInit(): void {
        this.trendingCurrency$ = this.loadingS.showLoadingUntilCompleted(
            this.currencyService.getTrendingCurrency('INR').pipe(
                catchError((err) => {
                    const message =
                        'Something went wrong, please try again later';
                    this.messages.showErrors(message);

                    return throwError(() => err);
                })
            )
        );
        // Get allData
        this.allData$ = this.currencyService.getCurrency('INR').pipe(
            tap((res) => {
                this.dataSource = new MatTableDataSource(res);
            })
        );
    }

    navToDetails(row) {
        this.router.navigate(['coin-detail', row.id]);
    }

    /*   PRIME NG TABLE  */

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
        return null;
    }

    onGlobalFilter(event: Event) {
        this.dt1.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
