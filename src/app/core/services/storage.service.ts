import { Injectable } from '@angular/core';

import { User } from '../models/User';
import { Comment } from '../models/Comment';

const commentsStorageName = "comments";
const userStorageName = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setDataStorage(comments: Comment[], currentUser: User) {
    localStorage.setItem(commentsStorageName, JSON.stringify(comments));
    localStorage.setItem(userStorageName, JSON.stringify(currentUser));
  }

  getCommentsStorage(): Comment[] {
    return JSON.parse(localStorage.getItem(commentsStorageName)!);
  }

  getCurrentUserStorage(): User {
    return JSON.parse(localStorage.getItem(userStorageName)!);
  }

  updateCommentsStorage(comments: Comment[]) {
    localStorage.setItem(commentsStorageName, JSON.stringify(comments));
  }
}
