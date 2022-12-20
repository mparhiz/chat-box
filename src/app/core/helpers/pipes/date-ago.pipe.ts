import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

moment.locale("en-AU");

@Pipe({
  name:'dateAgo',
  pure:false
})
export class DateAgoPipe implements PipeTransform {
  private timer: number | null = null;
  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
  transform(value:string) {
    this.removeTimer();
    let d = new Date(value);
    let now = new Date();
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime())/1000));
    let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) *1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });

    return moment(d).fromNow();
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = 0;
    }
  }
  private getSecondsUntilUpdate(seconds:number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) {
      return 2;
    } else if (seconds < hr) {
      return 30;
    } else if (seconds < day) {
      return 300;
    } else {
      return 3600;
    }
  }
}
