import { Component, Input } from "@angular/core";
import { Theme } from "src/controllers/ThemeController";

@Component({
    selector: 'screen',
    templateUrl: './screen.component.html',
    styleUrls: [
        './screen-colors.component.scss',
        './screen-layout.component.scss'
        ]
    })
export class ScreenComponent
{
    @Input() theme : string = Theme.Default;
    @Input() value : string = "399,981";
}