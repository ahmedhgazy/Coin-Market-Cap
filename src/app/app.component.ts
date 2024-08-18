import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/loading/loading.component';
import { MessagesComponent } from './shared/messages/messages.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        HeaderComponent,
        LoadingComponent,
        MessagesComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'Coin-Market-Cap';
}
