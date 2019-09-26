import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-canvas-game',
  templateUrl: './canvas-game.component.html',
  styleUrls: ['./canvas-game.component.scss']
})
export class CanvasGameComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  ctx: any;
  started = false;
  jumbing = false;
  clicked = false;
  w = 1200;
  h = 600;
  position = {
    x: 100,
    y: 449
  };
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getCtx();
    this.makeLand();
    this.makeBody(this.position);
    this.run();
  }
  run() {
    setInterval(() => {
      this.moveFoward();
      this.redraw();
    }, 5);
  }
  redraw() {
    // this.clearBody();
    this.makeBody(this.position);
  }
  clearBodyBottom() {
    this.ctx.clearRect(this.position.x - 50, this.position.y + 2, 100, 50);
  }
  clearBodyTop() {
    this.ctx.clearRect(this.position.x - 52, this.position.y - 2, 100, 150);
  }
  clearBodyBehind() {
    this.ctx.clearRect(this.position.x - 52, this.position.y - 100, 100, 150);
  }
  clearBody() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  moveFoward() {
    this.position.x += 1;
    this.clearBodyBehind();
    if (this.position.x === 1200) {
      this.position.x = 50;
    }
  }
  moveUp(range) {
    this.position.y -= 1;
    this.clearBodyBottom();
    this.redraw();
  }
  moveDown(range) {
    const down = setInterval(() => {
      this.position.y += 1;
      this.clearBodyTop();
      this.redraw();
      range -= 1;
      if (!range) {
        clearInterval();
        this.jumbing = false;
      }
    }, 1);
  }
  click(e) {
    if (!this.started) {
      this.run();
      this.started = true;
      return;
    }
    if (!this.jumbing) {
      const up = this.moveUp(50);
    }
  }
  drag(e) {
    // if (this.clicked) {
    //   const ctx = this.getCtx();
    //   const { x, y } = this.getPosition(e);
    //   this.makeCicle(ctx, { x, y }, 0.1);
    // }
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
  makeCicle(position, radius) {
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = '#FFFFFF';
    this.ctx.stroke();
  }
  makeLand() {
    this.ctx.moveTo(0, 500);
    this.ctx.lineTo(this.w, 500);
    this.ctx.stroke();
    this.ctx.beginPath();
  }
  makeBody(position) {
    this.creatCircle(position, 50, 'red');
  }
  creatCircle(position, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.ellipse(position.x, position.y, radius, radius, Math.PI, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.beginPath();
  }
  getPosition(e) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return { x: e.x - rect.left, y: e.y - rect.top };
  }
  getCtx() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // return this.canvas.nativeElement.getContext('2d');
  }
}
