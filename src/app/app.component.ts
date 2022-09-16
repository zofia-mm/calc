import { Component } from '@angular/core';
import { Theme, ThemeController } from 'src/controllers/ThemeController';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app-layout.component.scss',
        './app-colors.component.scss'
        ]
    })
export class AppComponent
{
    themeController : ThemeController = new ThemeController();
    toggleTheme = () => { this.themeController.toggleTheme() }
}
