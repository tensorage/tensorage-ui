import _multiply from 'lodash/multiply';
import _divide from 'lodash/divide';

export function formatCurrency(
  amount: number,
  decimalPlaces: number = 0,
  locale: string = 'en-US'
): string {
  if (isNaN(amount)) {
    throw new Error('Invalid number');
  }

  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
  });
}

export function formatNumber(
  numberToFormat: number,
  decimalPlaces: number = 2,
  locale: string = 'en-US'
): string {
  if (isNaN(numberToFormat)) {
    throw new Error('Invalid number');
  }

  return numberToFormat.toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}

export function calculatePercentage(value, total) {
  // Use _.divide to handle division by zero and return 0 if the total is zero
  return isNaN(value) || isNaN(total) || total === 0
    ? 0
    : _multiply(_divide(value, total), 100);
}

export function truncateDecimals(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.floor(number * factor) / factor;
}

export function calculateSpaceInMB(value: number): number {
  return _multiply(value, 4);
}

export function formatStorageSize(sizeInMB): {
  size: number | string;
  unit: 'MB' | 'GB' | 'TB';
} {
  let size = sizeInMB;
  let unit: 'MB' | 'GB' | 'TB' = 'MB';

  if (sizeInMB >= 1024 * 1024) {
    size = sizeInMB / (1024 * 1024);
    unit = 'TB';
  } else if (sizeInMB >= 1024) {
    size = sizeInMB / 1024;
    unit = 'GB';
  }

  return { size: formatNumber(size, 0), unit };
}

export function formatStorage(sizeInMB): string {
  let size = sizeInMB;
  let unit: 'MB' | 'GB' | 'TB' = 'MB';

  if (sizeInMB >= 1024 * 1024) {
    size = sizeInMB / (1024 * 1024);
    unit = 'TB';
  } else if (sizeInMB >= 1024) {
    size = sizeInMB / 1024;
    unit = 'GB';
  }

  return `${formatNumber(size, 0)} ${unit}`;
}
