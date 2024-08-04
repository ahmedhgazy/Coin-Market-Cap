import {
    Component,
    inject,
    OnInit,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TruncateDecimalPipe } from '../../pipes/fixed-digits.pipe';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
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
    ],
    templateUrl: './coin-list.component.html',
    styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
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

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {}

    ngOnInit(): void {
        this.trendingCurrency$ =
            this.currencyService.getTrendingCurrency('INR');
        // Get allData
        this.allData$ = this.currencyService.getCurrency('INR').pipe(
            tap((res) => {
                this.dataSource = new MatTableDataSource(res);
            })
        );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        this.dataSource.paginator.firstPage();
    }

    router: Router = inject(Router);
    route: ActivatedRoute = inject(ActivatedRoute);

    navToDetails(row) {
        this.router.navigate(['coin-detail', row.id]);
    }
}
