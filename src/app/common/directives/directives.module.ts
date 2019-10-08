import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { UppercaseDirective } from './uppercase.directive';
import { TextTransformDirective } from './text-transform.directive';
import { TextTransform2Directive } from './text-transform2.directive';

@NgModule({
  declarations: [HighlightDirective, UppercaseDirective, TextTransformDirective, TextTransform2Directive],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    UppercaseDirective,
    TextTransformDirective,
    TextTransform2Directive,
  ]
})
export class DirectivesModule { }
