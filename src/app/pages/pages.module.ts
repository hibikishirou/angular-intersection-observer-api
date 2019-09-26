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
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'image', component: ImageComponent },
  { path: 'lazy-loading', component: LazyLoadingComponent },
  { path: 'canvas-game', component: CanvasGameComponent },
];


@NgModule({
  declarations: [MainComponent, ImageComponent, LazyLoadingComponent, CanvasGameComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatSliderModule,
  ]
})
export class PagesModule { }
