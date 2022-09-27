import { Component } from '@angular/core';
import { ThemeController } from 'src/controllers/ThemeController';
import { CalculationController } from 'src/controllers/CalculationController';
import { CookieService } from 'ngx-cookie-service';

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
    calculationController : CalculationController = new CalculationController();    
    themeController;
    constructor( private cookieService: CookieService )
    {
        this.themeController = new ThemeController( cookieService );
    }
}
