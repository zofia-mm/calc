import { CalculationController, NumberInput, NumberInputType } from './CalculationController';

describe( 'CalculationController', () =>
{
    it( 'screen is blank after reset', () =>
    {
        const calcCon = new CalculationController();
        calcCon.onNumberInput( 3 );
        calcCon.onPointInput();
        calcCon.onNumberInput( 7 );

        calcCon.onResetInput();
        expect( calcCon.screenDisplay ).toBe( calcCon.SCREEN_DISPLAY_DEFAULT );
    } );

    describe( 'NumberInput', () =>
    {
        it( 'returns 0 before any append operations', () =>
        {
            const numberInput = new NumberInput();

            expect( numberInput.getStringValue() ).toBe( "0" );
            expect( numberInput.getNumberValue() ).toBe( 0 );
        } );

        describe( 'append', () =>
        {
            it( 'appended integers appear on the end', () =>
            {
                const numberInput = new NumberInput();

                numberInput.append( 3 );
                expect( numberInput.getStringValue() ).toBe( "3" );
                expect( numberInput.getNumberValue() ).toBe( 3 );

                numberInput.append( 4 );
                expect( numberInput.getStringValue() ).toBe( "34" );
                expect( numberInput.getNumberValue() ).toBe( 34 );
            } );

            it( 'appended fractions without an integer have a leading 0 with a dot', () =>
            {
                const numberInput = new NumberInput();
                numberInput.inputType = NumberInputType.Fraction;

                numberInput.append( 3 );
                expect( numberInput.getStringValue() ).toBe( "0.3" );
                expect( numberInput.getNumberValue() ).toBe( 0.3 );

                numberInput.append( 4 );
                expect( numberInput.getStringValue() ).toBe( "0.34" );
                expect( numberInput.getNumberValue() ).toBe( 0.34 );
            } );

            it( 'appended integers and fractions are separated with a dot', () =>
            {
                const numberInput = new NumberInput();

                numberInput.append( 3 );
                numberInput.append( 2 );
                numberInput.inputType = NumberInputType.Fraction;
                numberInput.append( 7 );
                numberInput.append( 9 );
                numberInput.append( 5 );

                expect( numberInput.getStringValue() ).toBe( "32.795" );
                expect( numberInput.getNumberValue() ).toBe( 32.795 );
            } );

            it( 'has no more than one leading integer zero', () => 
            {
                const numberInput = new NumberInput();

                numberInput.append( 0 );
                numberInput.append( 0 );
                numberInput.append( 0 );
                expect( numberInput.getStringValue() ).toBe( "0" );
                expect( numberInput.getNumberValue() ).toBe( 0 );

                numberInput.append( 2 );
                expect( numberInput.getStringValue() ).toBe( "2" );
                expect( numberInput.getNumberValue() ).toBe( 2 );
            } );
        } );

        describe( 'remove', () =>
        {
            it( 'removing last digit of integer', () =>
            {
                const numberInput = new NumberInput();
                numberInput.append( 2 );
                numberInput.append( 3 );
                numberInput.append( 2 );

                numberInput.removeLast();
                expect( numberInput.getStringValue() ).toBe( "23" );
                expect( numberInput.getNumberValue() ).toBe( 23 );
            } );

            it( 'removing all digits of integer should result in 0', () =>
            {
                const numberInput = new NumberInput();
                numberInput.append( 4 );
                numberInput.append( 7 );

                numberInput.removeLast();
                numberInput.removeLast();
                expect( numberInput.getStringValue() ).toBe( "0" );
                expect( numberInput.getNumberValue() ).toBe( 0 );
            } );

            it( 'removing last digit of fraction', () =>
            {
                const numberInput = new NumberInput();
                numberInput.append( 2 );
                numberInput.inputType = NumberInputType.Fraction;
                numberInput.append( 3 );
                numberInput.append( 2 );

                numberInput.removeLast();
                expect( numberInput.getStringValue() ).toBe( "2.3" );
                expect( numberInput.getNumberValue() ).toBe( 2.3 );
            } );

            it( 'removing on an empty fraction should make it into an integer', () =>
            {
                const numberInput = new NumberInput();
                numberInput.append( 2 );
                numberInput.inputType = NumberInputType.Fraction;
                numberInput.append( 3 );
                numberInput.append( 2 );

                numberInput.removeLast();
                numberInput.removeLast();
                numberInput.removeLast();
                expect( numberInput.getStringValue() ).toBe( "2" );
                expect( numberInput.getNumberValue() ).toBe( 2 );
            } );
        } );
    } );
} );