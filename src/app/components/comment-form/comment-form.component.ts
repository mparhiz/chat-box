import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Comment } from 'src/app/core/models/Comment';
import { Reply } from 'src/app/core/models/Reply';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() isReply?: boolean;
  @Input() commentId?: number;
  @Input() replyingTo?: string;
  @Input() currentUser?: User;
  @Output() submit = new EventEmitter<any>();

  isLargScreen: boolean = true;
  placeholder: string = "";
  content: string = "";
  screenSize = 660;
  content_colspan = 9;
  buttons_colspan = 2;

  constructor() { }

  ngOnInit() {
    this.setVariables(window.innerWidth);
    this.placeholder = `${(this.isReply ? `@${this.replyingTo} ` : "")}Add a comment...`;
  }

  onSend() {
    let newComment: any;
    if(this.isReply) {
      newComment = {
        content: this.content,
        createdAt: moment().toISOString(),
        score: 0,
        user: this.currentUser!,
        isVoted: false,
        replyingTo: this.replyingTo
      } as Partial<Reply>;
    } else {
      newComment = {
        content: this.content,
        createdAt: moment().toISOString(),
        score: 0,
        user: this.currentUser!,
        replies: [],
        isVoted: false
      } as Partial<Comment>;
    }
    this.submit.emit({comment: newComment, isReply: this.isReply, commentId: this.commentId});
    this.content = "";
  }

  setVariables(innerWidth: number) {
    this.isLargScreen = innerWidth > this.screenSize ? true : false;
    this.content_colspan = innerWidth > this.screenSize ? 9 : 12;
    this.buttons_colspan = innerWidth > this.screenSize ? 2 : 6;
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setVariables(window.innerWidth);
  }
}
