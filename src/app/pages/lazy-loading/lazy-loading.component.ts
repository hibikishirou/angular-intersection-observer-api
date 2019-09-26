import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.scss']
})
export class LazyLoadingComponent implements OnInit, AfterViewInit {
  IMGLIST = [
    {
      url: './assets/images/2.jpg',
      visible: true,
    },
    {
      url: './assets/images/3.jpg',
      visible: false,
    },
    {
      url: './assets/images/4.jpg',
      visible: false,
    },
    {
      url: './assets/images/5.jpg',
      visible: false,
    },
    {
      url: './assets/images/6.jpg',
      visible: false,
    },
    {
      url: './assets/images/7.jpg',
      visible: false,
    },
  ];
  @ViewChildren('imgContainer') imgContainer: QueryList<ElementRef>;
  @ViewChild('loadMore') loadMore: ElementRef;
  intersectionObserver: IntersectionObserver;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    });
    this.intersectionObserver.observe(this.loadMore.nativeElement);
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    console.log(entries);
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio > 0) {
        const result = this.IMGLIST.find(item => !item.visible);
        if (result) {
          result.visible = true;
        }
      }
    });
  }

  loadedImg() {
    return this.IMGLIST.reduce((result, item) => {
      return item.visible ? result + 1 : result;
    }, 0);
  }
}
