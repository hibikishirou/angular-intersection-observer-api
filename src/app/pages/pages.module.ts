import { DirectivesModule } from './../common/directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { LazyLoadingComponent } from './lazy-loading/lazy-loading.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanvasGameComponent } from './canvas-game/canvas-game.component';
import { CrawlDataComponent } from './crawl-data/crawl-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'image', component: ImageComponent },
  { path: 'lazy-loading', component: LazyLoadingComponent },
  { path: 'canvas-game', component: CanvasGameComponent },
  { path: 'crawl-question', component: CrawlDataComponent },
  { path: 'question-bank', loadChildren: './question-bank/question-bank.module#QuestionBankModule' }
];


@NgModule({
  declarations: [MainComponent, ImageComponent, LazyLoadingComponent, CanvasGameComponent, CrawlDataComponent],
  imports: [
    DirectivesModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ]
})
export class PagesModule { }
