import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { of, BehaviorSubject, Subject, merge } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('canvas2') canvas2: ElementRef;
  frm = new FormGroup({
    red: new FormControl(0, {}),
    green: new FormControl(0, {}),
    blue: new FormControl(0, {}),
    alpha: new FormControl(0, {})
  });
  image: any;
  rbg: any;
  data: ImageData;
  rawData: ImageData;
  constructor() { }

  ngOnInit() {
    this.rbg = this.frm.getRawValue();
    this.frm.valueChanges.subscribe((result) => {
      if (this.rawData) {
        console.log(this.rawData);
        this.convertImage();
      }
    });
  }

  checkImage(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: Event) => {
        this.image = new Image();
        this.image.src = reader.result.toString();
        this.image.onload = (ev) => {
          this.canvas.nativeElement.width = this.image.width;
          this.canvas.nativeElement.height = this.image.height;
          const ctx = this.canvas.nativeElement.getContext('2d');
          ctx.drawImage(this.image, 0, 0);
          this.rawData = ctx.getImageData(0, 0, this.image.width, this.image.height);
          this.convertImage();
        };
      };
    }
  }
  convertImage() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const rawData = ctx.getImageData(0, 0, this.image.width, this.image.height);
    const data = new ImageData(rawData.data, rawData.width, rawData.height);
    const { red, green, blue, alpha } = this.frm.value;
    this.canvas2.nativeElement.width = data.width;
    this.canvas2.nativeElement.height = data.height;
    const ctx2 = this.canvas2.nativeElement.getContext('2d');
    const value = [];
    for (let i = 0; i < data.data.length; i += 4) {
      if (data.data[i + 3]) {
        value.push(red + data.data[i]);
        value.push(green + data.data[i + 1]);
        value.push(blue + data.data[i + 2]);
        value.push(data.data[i + 3] - alpha);
      }
    }
    // Convert image
    of(value).subscribe((result) => {
      data.data.set(result);
      ctx2.putImageData(data, 0, 0);
    });
    //
  }
}
