import { Component, Input } from "@angular/core";
import { Theme } from "src/controllers/ThemeController";

@Component({
    selector: 'switch',
    templateUrl: './switch.component.html',
    styleUrls: [
        './switch-colors.component.scss',
        './switch-layout.component.scss'
        ]
    })
export class SwitchComponent
{
    // the theme it gets from parent
    // used for self theming and nothing else
    @Input() theme : Theme = Theme.Default;

    // making the component reusable
    @Input() label : string = "";
    @Input() option_amount : number = 0;

    // storing and using the value
    @Input() val : number = 1;
    @Input() show = ( themeNum : number ) => {
        console.log( "unplugged switch component" );
        console.log( this.val );
        }
}