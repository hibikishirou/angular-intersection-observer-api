import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlDataComponent } from './crawl-data.component';

describe('CrawlDataComponent', () => {
  let component: CrawlDataComponent;
  let fixture: ComponentFixture<CrawlDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
