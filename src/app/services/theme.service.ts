import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from '../models/option.model';
import { StyleManagerService } from './style-manager.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    constructor(
        private http: HttpClient,
        private styleManager: StyleManagerService
    ) {}

    getThemeOptions(): Observable<Array<Option>> {
        // assets/options.json
        return this.http.get<Array<Option>>('../../assets/options.json');
    }
    // /assets/${themeToSet}.scss
    setTheme(themeToSet: string) {
        this.styleManager.setStyle('theme', `../../assets/${themeToSet}.scss`);
    }
}
