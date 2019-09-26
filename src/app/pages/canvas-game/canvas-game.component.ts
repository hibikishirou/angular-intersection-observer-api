import { distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-canvas-game',
  templateUrl: './canvas-game.component.html',
  styleUrls: ['./canvas-game.component.scss']
})
export class CanvasGameComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  clicked = false;
  constructor() { }

  ngOnInit() {
  }
  click(e) {
    this.clicked = true;
    const ctx = this.getCtx();
    ctx.beginPath();
  }
  drag(e) {
    console.log(e);
    if (this.clicked) {
      const ctx = this.getCtx();
      const { x, y } = this.getPosition(e);
      this.makeCicle(ctx, { x, y }, 0.1);
    }
  }
  blur(e) {
    this.clicked = false;
  }
  makeRect(ctx, position, w, h?) {
    h = h || w;
    ctx.rect(position.x, position.y, w, h);
    // ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  }
  makeCicle(ctx, position, radius) {
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  }
  getPosition(e) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return { x: e.x - rect.left, y: e.y - rect.top };
  }
  getCtx() {
    return this.canvas.nativeElement.getContext('2d');
  }
}
