import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {

  // Ćwiczenie 1: Renderowanie bez błędu
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  // Ćwiczenie 2 & 3: Konwersja PLN -> USD (Pętla z różnymi kwotami)
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { amount: 100, expected: 'PLN 100.00 = $28.57' },
      { amount: 200, expected: 'PLN 200.00 = $57.14' },
      { amount: 350, expected: 'PLN 350.00 = $100.00' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  // Ćwiczenie 4: Konwersja USD -> PLN
  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { amount: 10, expected: '$10.00 = PLN 35.00' },
      { amount: 100, expected: '$100.00 = PLN 350.00' },
      { amount: 200, expected: '$200.00 = PLN 700.00' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  // Ćwiczenie 5: Te same waluty (PLN -> PLN oraz USD -> USD)
  it('should render same value on both sides when from and to are the same', () => {
    render(<ResultBox from="PLN" to="PLN" amount={123} />);
    const outputPLN = screen.getByTestId('output');
    expect(outputPLN).toHaveTextContent('PLN 123.00 = PLN 123.00');
    cleanup();

    render(<ResultBox from="USD" to="USD" amount={123} />);
    const outputUSD = screen.getByTestId('output');
    expect(outputUSD).toHaveTextContent('$123.00 = $123.00');
    cleanup();
  });

  // Zadanie: Negatywne przypadki (Wartość ujemna)
  it('should render "Wrong value..." when amount is lower than zero', () => {
    const testCases = [ -1, -50, -100 ];

    for (const amount of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
      cleanup();
    }
  });
});