import { Component } from '@angular/core';
import { ThemeController } from 'src/controllers/ThemeController';
import { CalculationController } from 'src/controllers/CalculationController';

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
    calculationController : CalculationController = new CalculationController();
}
