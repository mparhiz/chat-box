import { Injectable } from '@angular/core';
import data from '../../../assets/data.json';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import moment from 'moment';
import { StorageService } from './storage.service';
import { Reply } from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments?: Comment[];
  private currentUser?: User;

  constructor(private storageService: StorageService) {
    let currentUser = this.storageService.getCurrentUserStorage();
    let comments = this.storageService.getCommentsStorage();
    if(currentUser && comments) {
      this.currentUser = currentUser;
      this.comments = comments;
    } else {
      this.currentUser = data.currentUser;
      this.comments = data.comments;
      this.storageService.setDataStorage(this.comments, this.currentUser)
    }
  }

  getComments(): Comment[] {
    return this.comments!;
  }

  getCurrentUser(): User {
    return this.currentUser!;
  }

  addNewComment(newComment: Comment) {
    newComment.id = moment().valueOf();
    this.comments!.push(newComment);
    this.storageService.updateCommentsStorage(this.comments!);
    return this.comments;
  }

  addNewReply(newReply: Reply, commentId: number) {
    newReply.id = moment().valueOf();
    let index = this.findCommentIndex(commentId);
    this.comments![index].replies.push(newReply);
    this.storageService.updateCommentsStorage(this.comments!);
    return this.comments;
  }

  updateComment(updatedComment: Comment) {
    let index = this.findCommentIndex(updatedComment.id)
    this.comments![index] = updatedComment;
    this.storageService.updateCommentsStorage(this.comments!);
    return this.comments;
  }

  updateReply(updatedReply: Reply, commentId: number) {
    let commentIndex = this.findCommentIndex(commentId);
    let replyIndex = this.findReplyIndex(commentIndex, updatedReply.id);
    this.comments![commentIndex].replies[replyIndex] = updatedReply;
    this.storageService.updateCommentsStorage(this.comments!);
    return this.comments;
  }

  deleteComment(id: number) {
    this.comments = this.comments!.filter(comment => comment.id !== id );
    this.storageService.updateCommentsStorage(this.comments);
    return this.comments;
  }

  deleteReply(replyId: number, commentId: number) {
    const commentIndex = this.findCommentIndex(commentId);
    this.comments![commentIndex].replies = this.comments![commentIndex].replies.filter(reply => reply.id !== replyId );
    this.storageService.updateCommentsStorage(this.comments!);
    return this.comments;
  }

  private findCommentIndex(id: number) {
    const comment = this.comments!.filter(comment => comment.id === id )[0];
    return this.comments!.indexOf(comment);
  }
  private findReplyIndex(commentIndex: number, replyId: number) {
    const reply = this.comments![commentIndex].replies.filter(reply => reply.id === replyId )[0];
    return this.comments![commentIndex].replies.indexOf(reply);
  }
}
