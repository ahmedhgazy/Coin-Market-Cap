import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../services/currency.service';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { Option } from '../../models/option.model';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        RouterModule,
        MenuComponent,
        CommonModule,
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
    @Output()
    toggleSideNav = new EventEmitter<void>();
    isAuth$: Observable<boolean>;
    options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

    constructor(private themeService: ThemeService) {}

    themeChangeHandler(themeToSet: string) {
        this.themeService.setTheme(themeToSet);
    }
}
