import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ScreenComponent } from './screen/screen.component';

@NgModule({
    declarations: [
        AppComponent,
        ScreenComponent,
        KeyboardComponent
        ],
    imports: [
        BrowserModule
        ],
    providers: [],
    bootstrap: [AppComponent]
    })
export class AppModule { }
