
export class CalculationController
{
    screenDisplay = "";
    updateScreenDisplay = () =>
    {
        this.screenDisplay = String( this.numberInput );
    }

    numberInputType : NumberInputType = NumberInputType.Integer;
    onPointInput = () => {
        this.numberInputType = NumberInputType.Fraction;
        }
    numberInput : number = 0;
    onNumberInput = ( num : number ) =>
    {
        switch( this.numberInputType )
        {
            case NumberInputType.Integer: {
                this.numberInput = this.numberInput * 10 + num;
                break; }
            case NumberInputType.Fraction: {
                this.numberInput = (this.numberInput * 10 + num)/10;
                break; }
        }

        this.updateScreenDisplay();
    }
}

enum NumberInputType { Integer, Fraction }