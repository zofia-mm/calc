import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    })
export class AppComponent
{
    theme = "dark";

    toggleTheme = () =>
    {
        switch( this.theme ) {
            case "dark":  { this.theme = "light"; break; };
            case "light": { this.theme = "dark"; break; };
            }
        console.log( this.theme );
    }
}
