import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ScreenComponent } from './screen/screen.component';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

describe('AppComponent', () =>
{
    beforeEach( async () => {
    await TestBed.configureTestingModule( {
        declarations: [
            AppComponent,
            ThemeSwitchComponent,
            ScreenComponent,
            KeyboardComponent
            ],
        imports: [
            FormsModule,
            BrowserModule
            ]
        } ).compileComponents();
    });

    it('should create the app', () =>
    {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    } );
});
