
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
    constructor() { this.updateDynamicTheme() }

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

        this.updateDynamicTheme();
    }
}
