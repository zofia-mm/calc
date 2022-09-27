
enum CalculationState { Number1, Operator, Number2, ShowAnswer }
export class CalculationController
{
    private state = CalculationState.Number1;
    private numberInput = new NumberInput();
    private calculation = new Calculation();
    screenDisplay = new ScreenDisplay(
        () => { this.screenDisplay.setValueToString( this.numberInput.getStringValue() ); },
        () => { this.screenDisplay.setValueToNumber( this.calculation.answer ); }
        );
    
    // special input
    onResetInput = () =>
    {
        this.calculation.reset();
        this.numberInput.reset();
        this.state = CalculationState.Number1;
        this.screenDisplay.show( Shown.Input );
    }

    // number inputs
    private numberInputStateUpdate = ( task : ()=>void ) => { switch( this.state )
    {
        case CalculationState.Number1:
        case CalculationState.Number2: {
            task();
            this.screenDisplay.update();
            break; }

        case CalculationState.Operator: {
            this.state = CalculationState.Number2;
            this.numberInput.reset();
            task();
            this.screenDisplay.show( Shown.Input );
            break; }
        case CalculationState.ShowAnswer: {
            this.state = CalculationState.Number1;
            this.numberInput.reset();
            task();
            this.screenDisplay.show( Shown.Input );
            break; }
    } }
    onNumberInput = ( num : number ) => { this.numberInputStateUpdate( () => {
        this.numberInput.append( num );
        } ); }
    onPointInput = () => this.numberInputStateUpdate( () => {
        this.numberInput.inputType = NumberInputType.Fraction;
        } );
    onDelInput = () => this.numberInputStateUpdate( () => {
        this.numberInput.removeLast();
        } );

    // equation inputs
    onOperatorInput = ( operation : Operation ) =>
    {
        switch( this.state )
        {
            case CalculationState.Number1: {
                this.calculation.number1 = this.numberInput.getNumberValue();
                break; }
            
            case CalculationState.Number2: {
                this.calculation.number2 = this.numberInput.getNumberValue();
                this.calculation.calculate();
                this.calculation.number1 = this.calculation.answer;
                this.screenDisplay.show( Shown.Answer );
                break; } 
            
            case CalculationState.ShowAnswer: {
                this.calculation.number1 = this.calculation.answer;
                break;}
        }

        this.state = CalculationState.Operator;
        this.calculation.operation = operation;
    }
    onEqualsInput = () =>
    {
        switch( this.state )
        {
            case CalculationState.Number1: {
                this.calculation.number1 = this.numberInput.getNumberValue();
                break; }

            case CalculationState.Operator:
            case CalculationState.Number2: {
                this.calculation.number2 = this.numberInput.getNumberValue();
                break; }
            
            case CalculationState.ShowAnswer: {
                this.calculation.number1 = this.calculation.answer;
                break; }
        }

        this.state = CalculationState.ShowAnswer;
        this.calculation.calculate();
        this.screenDisplay.show( Shown.Answer );
    }
}

enum NumberInputType { Integer, Fraction }
class NumberInput
{
    integerInput : string = "";
    fractionInput : string = "";
    inputType : NumberInputType = NumberInputType.Integer;

    reset = () =>
    {
        this.integerInput = "";
        this.fractionInput = "";
        this.inputType = NumberInputType.Integer;
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
    
    append = ( num : number ) =>
    {
        // digit limit
        if( this.fractionInput.length + this.integerInput.length > 9 ) { return; }

        switch( this.inputType )
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
        }
    }

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

enum Shown { Input, Answer }
class ScreenDisplay
{
    value = "0";
    setValueToString = ( newValue: string ) =>
    {
        this.value = newValue;
    }
    setValueToNumber = ( newValue: number ) =>
    {
        var prepared_number = "0";
        if( newValue > Math.pow( 10, 10 ) )
        {
            prepared_number = newValue.toPrecision( 10 );
        }
        else
        {
            var preffered_precision = 0;
            if( newValue % 1 == 0 ) preffered_precision = 0
            else preffered_precision = String( newValue - Math.floor( newValue ) ).length;

            console.log( newValue );

            preffered_precision -= String( Math.floor( newValue ) ).length;
            prepared_number = newValue.toFixed( Math.min( Math.max( preffered_precision, 0 ), 10 ) );
        }

        this.value = prepared_number.toLocaleString();
    }

    private showInput = ()=>{};
    private showAnswer = ()=>{};
    constructor( showInput: ()=>void, showAnswer: ()=>void )
    {
        this.showInput = showInput;
        this.showAnswer = showAnswer;
    }

    currentlyShown = Shown.Input;
    show( shown : Shown )
    {
        this.currentlyShown = shown;
        this.update();
    }
    update = () => { switch( this.currentlyShown )
    {
        case Shown.Input:  { this.showInput(); break; }
        case Shown.Answer: { this.showAnswer(); break; }
    } }
}

export enum Operation { Add, Subtract, Multiply, Divide }
class Calculation
{
    number1 : number = 0;
    number2 : number = 0;
    answer : number = 0;
    operation = Operation.Add;
    reset = () =>
    {
        this.number1 = 0;
        this.number2 = 0;
        this.answer = 0;
        this.operation = Operation.Add;
    }

    calculate = () => { switch( this.operation )
    {
        case Operation.Add: {
            this.answer = this.number1 + this.number2;
            break; }

        case Operation.Subtract: {
            this.answer = this.number1 - this.number2;
            break; }

        case Operation.Multiply: {
            this.answer = this.number1 * this.number2;
            break; }

        case Operation.Divide: {
            this.answer = this.number1 / this.number2;
            break; }
    } }
}
