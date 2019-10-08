import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTextTransform]'
})
export class TextTransformDirective {
  @Input() transformType: string;
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.uppercase(this.transformType);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.uppercase();
  }

  private uppercase(transformType?) {
    this.el.nativeElement.style['text-transform'] = transformType ? transformType : null;
  }
}
