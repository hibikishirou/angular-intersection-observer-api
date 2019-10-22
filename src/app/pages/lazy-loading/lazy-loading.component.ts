import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Observable, concat, defer, of, fromEvent, combineLatest } from 'rxjs';
import { map, flatMap, distinctUntilChanged } from 'rxjs/operators';

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

  AUDIOLIST = [
    {
      url: './assets/music/Khong Sao Ma_ Em Day Roi - Suni Ha Linh_.mp3',
      visible: false,
      play: false
    }
  ];
  @ViewChildren('imgContainer') imgContainer: QueryList<ElementRef>;
  @ViewChild('audioContainer') audioContainer: ElementRef;
  @ViewChild('loadMore') loadMore: ElementRef;
  intersectionObserver: IntersectionObserver;
  private pageVisible$: Observable<boolean>;
  private playing = false;
  constructor() { }

  ngOnInit() {
    this.pageVisible$ = concat(
      defer(() => of(!document.hidden)),
      fromEvent(document, 'visibilitychange')
        .pipe(
          map(e => !document.hidden),
        )
    );
    this.pageVisible$.subscribe(() => {
      if (this.playing) {
        if (document.hidden) {
          this.audioContainer.nativeElement.pause();
        } else {
          this.audioContainer.nativeElement.play();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    });
    this.intersectionObserver.observe(this.loadMore.nativeElement);
    this.intersectionObserver.observe(this.audioContainer.nativeElement);
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const tag = entry.target.tagName;
      switch (tag) {
        case 'DIV':
          if (entry.intersectionRatio > 0) {
            const result = this.IMGLIST.find(item => !item.visible);
            if (result) {
              result.visible = true;
            }
          }
          break;
        case 'AUDIO':
          if (this.audioContainer) {
            if (entry.intersectionRatio === 0) {
              this.audioContainer.nativeElement.pause();
              this.playing = false;
            }
            if (entry.intersectionRatio > 0) {
              this.audioContainer.nativeElement.play();
              this.playing = true;
            }
          }
          break;
      }

    });
  }

  loadedImg() {
    return this.IMGLIST.reduce((result, item) => {
      return item.visible ? result + 1 : result;
    }, 0);
  }
}
