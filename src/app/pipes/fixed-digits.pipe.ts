import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDecimal',
  standalone: true,
})
export class TruncateDecimalPipe implements PipeTransform {
  transform(value: number, digits: number = 3): number {
    if (isNaN(value)) {
      return null;
    }

    return parseFloat(value.toFixed(digits));
  }
}
