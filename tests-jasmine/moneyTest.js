import { formatCurrency } from "../scripts/utils/money.js";

// creating a test suite: 
describe('test suite: formatCurrency', ()=>{
    it('converts cents in to dollars',()=>{
        //expect helps to comapre 2 values
        expect(formatCurrency(2095)).toEqual('20.95');
    }); //this creates a test

    it('works with 0', ()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent',()=>{
        expect(formatCurrency('2000.5')).toEqual('20.01');
    })
});