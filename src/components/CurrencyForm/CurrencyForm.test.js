import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should run action callback with proper data on form submit', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const action = jest.fn();

      // 1. Renderowanie komponentu
      render(<CurrencyForm action={action} />);

      // 2. Znalezienie elementów
      const submitButton = screen.getByText('Convert');
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');

      // 3. Symulacja interakcji
      userEvent.type(amountField, testObj.amount);
      userEvent.selectOptions(fromField, testObj.from);
      userEvent.selectOptions(toField, testObj.to);

      // 4. Kliknięcie przycisku
      userEvent.click(submitButton);

      // 5. Sprawdzenie wyników
      // Pamiętamy, że amount ma być liczbą (parseInt w komponencie)
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testObj.amount),
        from: testObj.from,
        to: testObj.to,
      });

      // 6. Czyszczenie DOM przed kolejną iteracją pętli
      cleanup();
    }
  });
});