import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentComponent } from './comment/comment.component';
import { VoteComponent } from './vote/vote.component';
import { DateAgoPipe } from '../core/helpers/pipes/date-ago.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
  declarations: [
    DateAgoPipe,
    CommentListComponent,
    CommentComponent,
    VoteComponent,
    DialogComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    CommentListComponent
  ]
})
export class ComponentsModule { }
