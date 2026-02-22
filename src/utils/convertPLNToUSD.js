export const convertPLNToUSD = (PLN) => {
  // 1. Sprawdzamy czy wejście jest tekstem lub jest puste
  if (typeof PLN === 'string' || typeof PLN === 'undefined') {
    return NaN;
  }

  // 2. Sprawdzamy czy to na pewno liczba (np. czy nie przekazano tablicy)
  if (typeof PLN !== 'number') {
    return 'Error';
  }

  // 3. Sprawdzamy czy liczba nie jest ujemna (logika biznesowa)
  if (PLN < 0) {
    return '$0.00';
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};