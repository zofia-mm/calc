import { CookieService } from 'ngx-cookie-service';

/**
 * Corresponds to style class names in scss mixin themes
 * (in ~/src/scss/colors.scss).
 */
export enum Theme
{
    Default = "default",
    Light = "light",
    Dark = "dark"
}

/**
 * Stores information current theme and means to change it.
 */
export class ThemeController
{
    preferredThemeNumber : number = 1;
    themeCookieKey = 'theme';
    constructor( private cookieService : CookieService )
    {               
        if( this.cookieService.check( this.themeCookieKey ) )
        {
            this.theme = this.cookieService.get( this.themeCookieKey ) as Theme;
            this.prevTheme = this.theme;
            switch( this.theme ) {
                case Theme.Default: this.preferredThemeNumber = 1; break;
                case Theme.Light: this.preferredThemeNumber = 2; break;
                case Theme.Dark: this.preferredThemeNumber = 3; break;
                }
            this.updateDynamicTheme();
            return;
        }

        if( window.matchMedia( '(prefers-color-scheme: dark)' ) ) {
            this.preferredThemeNumber = 3;
            this.theme = Theme.Dark;
            }
        else if ( window.matchMedia( '(prefers-color-scheme: light)' ) ) {
            this.preferredThemeNumber = 2;
            this.theme = Theme.Light;
            }
        this.prevTheme = this.theme;
        this.updateDynamicTheme();
    }

    theme: Theme = Theme.Default;
    prevTheme : Theme = Theme.Default;
    dynamicTheme = "";
    private updateDynamicTheme = () =>
    {
        this.dynamicTheme = this.theme + " prev-" + this.prevTheme;
    }

    toggleTheme = ( themeNum : number ) =>
    {
        this.prevTheme = this.theme;

        switch( themeNum )
        {
            case 1: { this.theme = Theme.Default; break; };
            case 2: { this.theme = Theme.Light; break; };
            case 3: { this.theme = Theme.Dark; break; };
        }

        this.cookieService.set( this.themeCookieKey, this.theme );
        this.updateDynamicTheme();
    }
}
