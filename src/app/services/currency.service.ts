import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor() {}
  baseUrl = environment.apiUrl;

  http: HttpClient = inject(HttpClient);

  // get currencies
  getCurrency(currency: string): Observable<any> {
    return this.http
      .get(
        `${this.baseUrl}markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`
      )
      .pipe(shareReplay());
  }
// get trending currencies
  getTrendingCurrency(currency: string) {
    return this.http
      .get<any>(
        `${this.baseUrl}markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      )
      .pipe(shareReplay());
  }


// get currencies graph details (chart)
  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http
      .get<any>(
        `${this.baseUrl}${coinId}/market_chart?vs_currency=${currency}&days=${days}`
      )
      .pipe(shareReplay());
  }

// get currency details
  getCurrencyById(coinId: string) {
    return this.http.get<any>(`${this.baseUrl}${coinId}`).pipe(shareReplay());
  }
}
