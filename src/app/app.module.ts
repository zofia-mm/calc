import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { ScreenComponent } from './screen/screen.component';
import { KeyboardComponent } from './keyboard/keyboard.component';


@NgModule({
    declarations: [
        AppComponent,
        ThemeSwitchComponent,
        ScreenComponent,
        KeyboardComponent
        ],
    imports: [
        BrowserModule,
        FormsModule
        ],
    providers: [CookieService],
    bootstrap: [AppComponent]
    })
export class AppModule { }
