import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import {
    forkJoin,
    map,
    Observable,
    Subject,
    switchMap,
    takeUntil,
    tap,
    throwError,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NG_CHARTS_CONFIGURATION } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { LoadingService } from '../../shared/loading/loading.service';
import { MessagesService } from '../../shared/messages/messages.service';
@Component({
    selector: 'app-coin-details',
    standalone: true,
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './coin-details.component.html',
    styleUrl: './coin-details.component.scss',
})
export class CoinDetailsComponent implements OnInit, OnDestroy {
    loadingS = inject(LoadingService);
    coinId: string;
    coin: any;
    route = inject(ActivatedRoute);
    days: number = 30;
    currencyService = inject(CurrencyService);
    currency: string = 'INR';
    endSub$ = new Subject();
    @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
    messages = inject(MessagesService);

    public lineChartType: ChartType = 'line';

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: `Price Trends`,
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: '#185ff6',
                pointBackgroundColor: '#185ff6',
                pointBorderColor: '#185ff6',
                pointHoverBackgroundColor: '#185ff6',
                pointHoverBorderColor: '#185ff6',
            },
        ],
        labels: [],
    };
    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            point: {
                radius: 1,
            },
        },

        plugins: {
            legend: { display: true },
        },
    };

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.coinId = params['id'];
            this.initializeData();
        });
    }

    initializeData(days?: number) {
        if (days !== undefined) {
            this.days = days;
        }

        this.currencyService.currency$
            .pipe(
                takeUntil(this.endSub$),
                switchMap((currency) => {
                    this.currency = currency;
                    return forkJoin({
                        coinData: this.getCoinData(),
                        graphData: this.getGraphData(this.days),
                    });
                })
            )
            .subscribe({
                next: ({ coinData, graphData }) => {
                    this.coin = coinData;
                    this.updateChartData(graphData);
                },
                complete: () => console.log('Data loading completed'),
            });
    }

    getCoinData(): Observable<any> {
        return this.currencyService.getCurrencyById(this.coinId).pipe(
            map((res) => {
                if (this.currency === 'USD') {
                    res.market_data.current_price.inr =
                        res.market_data.current_price.usd;
                    res.market_data.market_cap.inr =
                        res.market_data.market_cap.usd;
                }
                return res;
            })
        );
    }

    getGraphData(days: number): Observable<any> {
        this.days = days;
        return this.currencyService.getGraphicalCurrencyData(
            this.coinId,
            this.currency,
            this.days
        );
    }

    updateChartData(graphData: any) {
        this.lineChartData.datasets[0].data = graphData.prices.map(
            (a: any) => a[1]
        );
        this.lineChartData.labels = graphData.prices.map((a: any) => {
            let date = new Date(a[0]);
            let time =
                date.getHours() > 12
                    ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                    : `${date.getHours()}: ${date.getMinutes()} AM`;
            return this.days === 1 ? time : date.toLocaleDateString();
        });
        setTimeout(() => {
            this.myLineChart.chart?.update();
        }, 200);
    }
    ngOnDestroy() {
        this.endSub$.next(() => {});
        this.endSub$.complete();
    }
}
