import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { of } from 'rxjs';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

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
  isOver = false;
  action: { moving, droping, jump, fall } = {
    moving: '',
    droping: '',
    jump: '',
    fall: ''
  };
  w = 1200;
  h = 600;
  step = 100;
  position = {
    x: 100,
    y: 300
  };
  begin = {
    x: 100,
    y: 300
  };
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getCtx();
    this.run();
  }
  run() {
    this.action.moving = setInterval(() => {
      this.moveFoward();
      this.redraw();
    }, 5);
    this.action.droping = setInterval(() => {
      this.moveDown(this.step);
    }, 500);
  }
  redraw() {
    this.makeBody(this.position);
    // this.makeLand();
  }

  clearBody() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  restart() {
    this.position.x = this.begin.x;
    this.position.y = this.begin.y;
    this.clearBody();
    this.redraw();
  }
  over() {
    clearInterval(this.action.moving);
    clearInterval(this.action.droping);
    clearInterval(this.action.fall);
    clearInterval(this.action.jump);
    this.isOver = true;
  }
  moveFoward() {
    this.position.x += 1;
    this.clearBody();
    if (this.position.x === this.w) {
      this.restart();
    }
  }
  moveUp(range) {
    this.action.jump = setInterval(() => {
      this.position.y -= 1;
      this.clearBody();
      this.redraw();
      range -= 1;
      if (!range) {
        clearInterval(this.action.jump);
      }
    }, 1);
  }
  moveDown(range) {
    this.action.fall = setInterval(() => {
      this.position.y += 1;
      this.clearBody();
      this.redraw();
      range -= 1;
      if (!range) {
        clearInterval(this.action.fall);
      }
    }, 1);
    if (this.position.y >= this.h) {
      this.over();
    }
  }
  click(e) {
    if (this.isOver && this.started) {
      this.started = false;
      this.isOver = false;
      this.restart();
      return;
    }
    if (!this.started) {
      this.run();
      this.started = true;
      this.isOver = false;
      return;
    }
    this.moveUp(this.step);
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
    ctx.stroke();
  }
  makeCicle(position, radius) {
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
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
