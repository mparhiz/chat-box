import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { Comment } from 'src/app/core/models/Comment';
import { Reply } from 'src/app/core/models/Reply';
import { User } from 'src/app/core/models/User';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment?: Comment;
  @Input() reply?: Reply;
  @Input() commentId?: number;
  @Input() currentUser?: User;
  @Output() add = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  screenSize = 660;
  isLargScreen: boolean = window.innerWidth > this.screenSize ? true : false;;
  userInfo_colspan = 7;
  content_colspan = 11;
  content_rowspan = 1.8;
  isReply?: boolean;
  isEdit: boolean = false;
  avatar?: string;
  userName?: string;
  createdAt: string = moment().toISOString();
  content?: string;
  score?: number;
  isVoted?: boolean;
  showForm: boolean = false;

  constructor(public dialog: MatDialog) {
    this.setVariables(window.innerWidth);
  }

  ngOnInit(): void {
    this.isReply = this.reply ? true : false;
    this.avatar = this.comment ? this.comment.user.image.png : this.reply?.user.image.png;
    this.userName = this.comment ? this.comment.user.username : this.reply?.user.username;
    this.createdAt = this.comment ? this.comment.createdAt : this.reply ? this.reply.createdAt : moment().toISOString();
    this.score = this.comment ? this.comment.score : this.reply?.score;
    this.isVoted = this.comment ? this.comment.isVoted : this.reply?.isVoted;
    this.content = this.comment ? this.comment.content : this.reply?.content;
    this.content = (this.reply?.replyingTo ? `@${this.reply?.replyingTo}  ` : "") + this.content;
  }

  isCurrentUser() {
    return this.userName === this.currentUser?.username;
  }

  onEdit() {
    this.isEdit = true;
    if(this.isReply) {
      this.content = this.content!.substring(this.content!.indexOf(' ') + 1);
    }
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete Comment',
        message: 'Are you sure you want to delete this comment? This will remove the comment and can\'t be undone',
        buttons: ['YES, DELETE', 'NO, CANCEL']
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(this.isReply) {
          this.delete.emit({isReply: this.isReply, id: this.reply!.id, commentId: this.commentId});
        } else {
          this.delete.emit({isReply: this.isReply, id: this.comment!.id});
        }
      }
    });
  }

  onUpdate() {
    if(this.isReply) {
      this.reply!.content = this.content!;
      this.update.emit({isReply: this.isReply, comment: this.reply, commentId: this.commentId});
      this.content = (this.reply?.replyingTo ? `@${this.reply?.replyingTo}  ` : "") + this.content;
    } else {
      this.comment!.content = this.content!;
      this.update.emit({isReply: this.isReply, comment: this.comment});
    }
    this.isEdit = false;
  }

  onReply() {
    this.showForm = true;
  }

  addComment(commentInfo: any) {
    this.add.emit(commentInfo);
    this.showForm = false;
  }

  onVote(voteInfo: any) {
    if(this.isReply) {
      this.reply!.score = voteInfo['score'];
      this.reply!.isVoted = voteInfo['isVoted'];
      this.update.emit({isReply: this.isReply, comment: this.reply, commentId: this.commentId});
    } else {
      this.comment!.score = voteInfo['score'];
      this.comment!.isVoted = voteInfo['isVoted'];
      this.update.emit({isReply: this.isReply, comment: this.comment});
    }
  }

  setVariables(innerWidth: number) {
    this.isLargScreen = innerWidth > this.screenSize ? true : false;
    this.userInfo_colspan = innerWidth > this.screenSize ? 7 : 12;
    this.content_colspan = innerWidth > this.screenSize ? 11 : 12;
    this.content_rowspan = innerWidth > this.screenSize ? 1.8 : 2.3;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setVariables(window.innerWidth);
  }
}
