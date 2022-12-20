import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommentService } from './core/services/comment.service';
import { StorageService } from './core/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  providers: [
    CommentService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
