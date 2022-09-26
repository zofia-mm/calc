import { Component, Input } from "@angular/core";
import { Theme } from "src/controllers/ThemeController";

@Component({
    selector: 'theme-switch',
    templateUrl: './theme-switch.component.html',
    styleUrls: [
        './theme-switch-colors.component.scss',
        './theme-switch-layout.component.scss'
        ]
    })
export class ThemeSwitchComponent
{
    // the theme it gets from parent
    // used for self theming and nothing else
    @Input() theme : string = Theme.Default;

    // storing and using the value
    @Input() switchValue : number = 1;
    @Input() switchValueChange = (themeNum : number ) => {
        console.log( "unplugged switch component" );
        }
}