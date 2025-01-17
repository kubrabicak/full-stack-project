import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value
      .split(' ') // Split by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(' '); // Join words back together
  }
}
