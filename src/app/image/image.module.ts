import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';



@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ImageModule { }
