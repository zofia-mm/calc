
export enum NumberInputType { Integer, Fraction }
export enum NumberCurrentlyInputed { Number1, Number2 }
export enum Operation { Add, Subtract, Multiply, Divide }

export class CalculationController
{
    SCREEN_DISPLAY_DEFAULT = "0";
    screenDisplay = this.SCREEN_DISPLAY_DEFAULT;
    private updateScreenDisplay = () => {
        this.screenDisplay = this.numberInput.getStringValue();
        }
    
    numberInput = new NumberInput();
    number1 : number = 0;
    operation : Operation = Operation.Add;
    numberCurrentlyInputed : NumberCurrentlyInputed = NumberCurrentlyInputed.Number1;

    /* number inputs */
    onNumberInput = ( num : number ) => {
        this.numberInput.append( num );
        this.updateScreenDisplay();
        }
    onPointInput = () => {
        this.numberInput.inputType = NumberInputType.Fraction;
        this.updateScreenDisplay();
        }

    /* equasion inputs */
    onOperatorInput = ( operation : Operation ) =>
    {
        this.operation = operation;

        this.number1 = this.numberInput.getNumberValue();
        this.numberCurrentlyInputed = NumberCurrentlyInputed.Number2;
        this.numberInput = new NumberInput();
        this.updateScreenDisplay();
    }
    onEqualsInput = () =>
    {
        // operation
        const number2 = this.numberInput.getNumberValue();
        switch( this.operation )
        {
        case Operation.Add: {
            this.numberInput = new NumberInput( this.number1 + number2 );
            break; }
        case Operation.Subtract: {
            this.numberInput = new NumberInput( this.number1 - number2 );
            break; }
        case Operation.Multiply: {
            this.numberInput = new NumberInput( this.number1 * number2 );
            break; }
        case Operation.Divide: {
            this.numberInput = new NumberInput( this.number1 / number2 );
            break; }
        }

        // resetting
        this.numberCurrentlyInputed = NumberCurrentlyInputed.Number1;
        this.updateScreenDisplay();
    }

    /* special inputs */
    onDelInput = () => {
        this.numberInput.removeLast();
        }
    onResetInput = () => {
        this.numberInput = new NumberInput();
        this.screenDisplay = this.SCREEN_DISPLAY_DEFAULT;
        }
}

export class NumberInput
{
    integerInput : string = "";
    fractionInput : string = "";
    inputType : NumberInputType = NumberInputType.Integer;

    constructor( starterNumber : number = 0 )
    {
        if( starterNumber == 0 ) { return; }

        const integerPart = Math.floor( starterNumber );
        this.integerInput =  String( integerPart );

        const fractionPart = starterNumber - integerPart;
        if( fractionPart == 0 ) return; else this.fractionInput = String( fractionPart );
    }

    getNumberValue = () =>
    {
        // both blank
        if( this.fractionInput == "" && this.integerInput == "" )
            return 0;

        // just an integer
        if( this.integerInput != "" && this.fractionInput == "" )
            return +this.integerInput;

        // fraction without an integer
        if( this.integerInput == "" && this.fractionInput != "" )
            return +( "0." + this.fractionInput );

        // both
        return +(this.integerInput + "." + this.fractionInput);
    }
    getStringValue = () =>
    {
        // just an integer
        if( this.inputType == NumberInputType.Integer )
            if( this.integerInput == "" ) return "0"; // ... and it's blank
            else return String( this.integerInput );
        
        // fraction without an integer
        if( this.integerInput == "" )
            return "0." + this.fractionInput;

        // both an integer and a fraction
        return String( this.integerInput ) + "." + String( this.fractionInput );
    }
    
    append = ( num : number ) => { switch( this.inputType )
    {
        case NumberInputType.Integer: {

            // ignoring leading zeros
            if( this.integerInput == "0" ) 
                if ( num == 0 ) break;
                else { this.integerInput = String(num); break; }

            this.integerInput += String(num);

            break; }

        case NumberInputType.Fraction: {
            this.fractionInput += String(num);
            break; }
    } }

    removeLast = () =>
    {
        if( this.inputType == NumberInputType.Integer )
            if( this.integerInput == "" ) return; // nothing to remove
            else this.integerInput = this.integerInput.slice( 0, -1 );
        
        if( this.fractionInput == "" ) { // turning empty fraction into integer
            this.inputType = NumberInputType.Integer;
            return; }
        this.fractionInput = this.fractionInput.slice( 0, -1 );
    }
}