import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {mgwSlideShowComponent} from './mgwSlideShow/mgwSlideShow.component';


@NgModule({
  declarations: [
    AppComponent,
    mgwSlideShowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
