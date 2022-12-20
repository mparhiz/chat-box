import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Comment } from 'src/app/core/models/Comment';
import { CommentService } from 'src/app/core/services/comment.service';
import { Reply } from 'src/app/core/models/Reply';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = new Array<Comment>();
  currentUser?: User;

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.commentService.getCurrentUser();
    this.comments = this.commentService.getComments();
  }

  addComment(commentInfo: any) {
    const isReply = commentInfo['isReply'];
    if (isReply) {
      const commentId = commentInfo['commentId'];
      const newComment = commentInfo['comment'] as Reply;
      this.commentService.addNewReply(newComment, commentId);
    } else {
      const newComment = commentInfo['comment'] as Comment;
      this.commentService.addNewComment(newComment);
    }
  }

  deleteComment(commentInfo: any) {
    const isReply = commentInfo['isReply'];
    if(isReply) {
      this.comments = this.commentService.deleteReply(commentInfo['id'], commentInfo['commentId'])!;
    } else {
      this.comments = this.commentService.deleteComment(commentInfo['id']);
    }
  }

  updateComment(commentInfo: any) {
    const isReply = commentInfo['isReply'];
    if(isReply) {
      const reply = commentInfo['comment'] as Reply;
      this.comments = this.commentService.updateReply(reply, commentInfo['commentId'])!;
    } else {
      const comment = commentInfo['comment'] as Comment;
      this.comments = this.commentService.updateComment(comment)!;
    }
  }
}
