import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTextTransform2]'
})
export class TextTransform2Directive {
  @Input() transformType2: string;
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.uppercase(this.transformType2);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.uppercase();
  }

  private uppercase(transformType?) {
    this.el.nativeElement.style['text-transform'] = transformType ? transformType : null;
  }
}
