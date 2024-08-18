import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    imports: [CommonModule],
})
export class MessagesComponent implements OnInit {
    showMessages = false;

    errors$: Observable<string[]>;

    constructor(public messagesService: MessagesService) {
    }

    ngOnInit() {
        this.errors$ = this.messagesService.errors$.pipe(
            tap(() => (this.showMessages = true))
        );
    }

    onClose() {
        this.showMessages = false;
    }
}
