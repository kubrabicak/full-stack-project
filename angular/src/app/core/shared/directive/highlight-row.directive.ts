import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective implements OnChanges {
  @Input('appHighlightRow') condition: boolean = false;
  @Input() highlightClass: string = 'highlight-row'; // Custom CSS class to apply

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['condition']) {
      if (this.condition) {
        this.renderer.addClass(this.el.nativeElement, this.highlightClass);
      } else {
        this.renderer.removeClass(this.el.nativeElement, this.highlightClass);
      }
    }
  }
}
