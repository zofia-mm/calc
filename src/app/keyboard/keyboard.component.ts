import { Component, Input } from "@angular/core";
import { CalculationController } from "src/controllers/CalculationController";
import { Theme } from "src/controllers/ThemeController";

@Component({
    selector: 'keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: [
        './keyboard-colors.component.scss',
        './keyboard-layout.component.scss'
        ]
    })
export class KeyboardComponent
{
    @Input() theme : Theme = Theme.Default;
    @Input() calculationController : CalculationController = new CalculationController();
}