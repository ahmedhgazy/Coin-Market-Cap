import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NG_CHARTS_CONFIGURATION } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
@Component({
    selector: 'app-coin-details',
    standalone: true,
    imports: [CommonModule, BaseChartDirective],
    templateUrl: './coin-details.component.html',
    styleUrl: './coin-details.component.scss',
})
export class CoinDetailsComponent implements OnInit, OnDestroy {
    coinId: string;
    coin: any;
    route = inject(ActivatedRoute);
    days: number = 30;
    currencyService = inject(CurrencyService);
    currency: string = 'INR';
    endSub$ = new Subject();
    @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
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
        });
        this.getCoinById(this.coinId);

        this.currencyService.currency$
            .pipe(
                takeUntil(this.endSub$),
                tap((currency) => {
                    this.currency = currency;
                    this.getGraphData(this.days);
                    this.getCoinData();
                })
            )
            .subscribe();
    }

    getCoinById(id: string) {
        this.currencyService.getCurrencyById(id).subscribe((data) => {
            this.coin = data;
        });
    }

    getCoinData() {
        this.currencyService.getCurrencyById(this.coinId).subscribe((res) => {
            if (this.currency === 'USD') {
                res.market_data.current_price.inr =
                    res.market_data.current_price.usd;
                res.market_data.market_cap.inr = res.market_data.market_cap.usd;
            }
            res.market_data.current_price.inr =
                res.market_data.current_price.inr;
            res.market_data.market_cap.inr = res.market_data.market_cap.inr;
            this.coin = res;
        });
    }
    getGraphData(days: number) {
        this.days = days;
        this.currencyService
            .getGraphicalCurrencyData(this.coinId, this.currency, this.days)
            .subscribe((res) => {
                setTimeout(() => {
                    this.myLineChart.chart?.update();
                }, 200);
                this.lineChartData.datasets[0].data = res.prices.map(
                    (a: any) => {
                        return a[1];
                    }
                );
                this.lineChartData.labels = res.prices.map((a: any) => {
                    let date = new Date(a[0]);
                    let time =
                        date.getHours() > 12
                            ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                            : `${date.getHours()}: ${date.getMinutes()} AM`;
                    return this.days === 1 ? time : date.toLocaleDateString();
                });
            });
    }

    /*
    getCoinData() {
        this.currencyService
            .getCurrencyById(this.coinId)
            .pipe(
                takeUntil(this.endSub$),

                tap((res) => {
                    if (this.currency === 'USD') {
                        res.market_data.current_price.inr =
                            res.market_data.current_price.usd;
                        res.market_data.market_cap.inr =
                            res.market_data.market_cap.usd;
                    }
                    res.market_data.current_price.inr =
                        res.market_data.current_price.inr;
                    res.market_data.market_cap.inr =
                        res.market_data.market_cap.inr;
                    this.coin$ = res;
                })
            )
            .subscribe();
    }
    getGraphData(days: number) {
        this.days = days;
        this.currencyService
            .getGraphicalCurrencyData(this.coinId, this.currency, this.days)
            .pipe(
                takeUntil(this.endSub$),

                map((res) => {
                    setTimeout(() => {
                        this.myLineChart.chart?.update();
                    }, 200);
                    this.lineChartData.datasets[0].data = res.prices.map(
                        (a: any) => {
                            return a[1];
                        }
                    );
                    this.lineChartData.labels = res.prices.map((a: any) => {
                        let date = new Date(a[0]);
                        let time =
                            date.getHours() > 12
                                ? `${
                                      date.getHours() - 12
                                  }: ${date.getMinutes()} PM`
                                : `${date.getHours()}: ${date.getMinutes()} AM`;
                        return this.days === 1
                            ? time
                            : date.toLocaleDateString();
                    });
                })
            )
            .subscribe();
    }
    */

    ngOnDestroy() {
        this.endSub$.next(() => {});
        this.endSub$.complete();
    }
}
