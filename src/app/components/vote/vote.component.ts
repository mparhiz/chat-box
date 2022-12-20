import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit{
  @Input() score?: number;
  @Input() direction?: string;
  @Input() isVoted?: boolean;
  @Output() voted = new EventEmitter<any> ();

  constructor() { }

  ngOnInit() { }

  addScore() {
    this.score = this.score as number + 1;
    this.isVoted = true;
    this.voted.emit({score: this.score, isVoted: this.isVoted});
  }

  subtractScore() {
    this.score = this.score as number > 0 ? this.score as number - 1 : 0;
    this.isVoted = false;
    this.voted.emit({score: this.score, isVoted: this.isVoted});
  }

}
