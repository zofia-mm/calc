
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
    theme: Theme;

    constructor( _theme : Theme = Theme.Default )
    {
        this.theme = _theme;
    }

    toggleTheme = () =>
    {
        switch( this.theme )
        {
            case Theme.Default:  { this.theme = Theme.Light; break; };
            case Theme.Light:    { this.theme = Theme.Dark; break; };
            case Theme.Dark:     { this.theme = Theme.Default; break; };
        }
    }
}
