import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { Routes, Router, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainComponent}
];


@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PagesModule { }
