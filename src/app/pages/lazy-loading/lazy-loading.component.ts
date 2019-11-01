import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Observable, concat, defer, of, fromEvent, combineLatest } from 'rxjs';
import { map, flatMap, distinctUntilChanged } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';

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

  VIDEOLIST = [
    { url: './assets/video/videoplayback.mp4' },
    { url: 'https://drive.google.com/open?id=0BwXvXdl3lpTueDJJS0trSTQ1b0U' }
  ];

  AUDIOLIST = [
    {
      url: './assets/music/Khong Sao Ma_ Em Day Roi - Suni Ha Linh_.mp3',
      visible: false,
      play: false
    },
    {
      url: './assets/music/Con Mo Bang Gia - Bang Kieu.mp3',
      visible: false,
      play: false
    }, {
      url: './assets/music/Nuoc Mat Em Lau Bang Tinh Yeu Moi - Da L.mp3',
      visible: false,
      play: false
    }, {
      url: './assets/music/Song Gio Jack_ K-ICM_ - Jack_K-ICM.mp3',
      visible: false,
      play: false
    }, {
      url: './assets/music/Yeu Em Rat Nhieu - Hoang Ton.mp3',
      visible: false,
      play: false
    }
  ];
  playVideo = './assets/video/videoplayback.mp4';
  playingURL = './assets/music/Khong Sao Ma_ Em Day Roi - Suni Ha Linh_.mp3';
  playingNumber = 0;

  @ViewChildren('imgContainer') imgContainer: QueryList<ElementRef>;
  @ViewChild('audioContainer') audioContainer: ElementRef;
  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('loadMore') loadMore: ElementRef;
  @ViewChild('viewPortContainer') viewPortContainer: ElementRef;
  intersectionObserver: IntersectionObserver;
  private pageVisible$: Observable<boolean>;
  private musicAutoplay$: any;
  private playing = false;
  constructor(private sanitizer: DomSanitizer) { }

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
    this.musicAutoplay$ = concat(
      fromEvent(this.audioContainer.nativeElement, 'ended')
    );
    this.musicAutoplay$.subscribe(() => {
      this.playNext();
    });
  }
  ngAfterViewInit() {
    const options = {
      root: this.viewPortContainer.nativeElement,
      rootMargin: '1000px',
      threshold: 1.0
    };
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, options);
    this.intersectionObserver.observe(this.loadMore.nativeElement);
    this.intersectionObserver.observe(this.audioContainer.nativeElement);
    this.intersectionObserver.observe(this.videoContainer.nativeElement);
  }
  playNext() {
    if (this.playingNumber === this.AUDIOLIST.length - 1) {
      this.playingNumber = 0;
    } else {
      this.playingNumber += 1;
    }
    this.playingURL = this.AUDIOLIST[this.playingNumber].url;
    this.audioContainer.nativeElement.load();
    this.audioContainer.nativeElement.play();
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const tag = entry.target.tagName;
      switch (tag) {
        case 'DIV':
          console.log(entry);
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
        case 'VIDEO':
          if (this.videoContainer) {
            if (entry.intersectionRatio === 0) {
              this.videoContainer.nativeElement.pause();
              this.playing = false;
            }
            if (entry.intersectionRatio > 0) {
              this.videoContainer.nativeElement.play();
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

  securityTrustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
