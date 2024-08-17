import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../services/currency.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    selectedCurrency: string = 'INR';
    currencyS = inject(CurrencyService);
    sendCurrency(currency: string) {
        this.currencyS.setCurrency(currency);
    }
}
