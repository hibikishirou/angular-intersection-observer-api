import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.uppercase(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.uppercase(null);
  }

  private uppercase(isUppercase?) {
    this.el.nativeElement.style['text-transform'] = isUppercase ? 'uppercase' : null;
  }
}
