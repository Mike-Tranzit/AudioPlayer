import {Component, ViewChild} from '@angular/core';
import { Howl } from 'howler';
import {IonRange} from '@ionic/angular';

export interface  Track {
  path: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /**
   * Музыка по-умолчанию
   */
  playlist: Track[] = [
      {
        name: 'A new begignning',
        path: './assets/mp3/bensound-anewbeginning.mp3'
      },
      {
        name: 'Creativ Minds',
        path: './assets/mp3/bensound-creativeminds.mp3'
      },
      {
        name: 'Summer',
        path: './assets/mp3/bensound-summer.mp3'
      },
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', {static: false}) range: IonRange;
  constructor() {}

  /**
   * Запуск проигрывателя
   * @param track: Track
   */
  start(track: Track) {
    if (this.player) {
       this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        this.isPlaying = false;
        this.activeTrack = null;
      }
    });
    this.player.play();
  }

  /**
   * Пауза, воспроизвести
   * @param pause boolean
   */
  togglePlayer(pause: boolean) {
    this.isPlaying = !pause;
    if (!pause) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  getActualPlailistIndex() {
    return this.playlist.indexOf(this.activeTrack);
  }

  /**
   * Следующая песня
   */
  next() {
    const index = this.getActualPlailistIndex();
    if (index !== this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  /**
   * Предыдущая песня
   */
  prev() {
      const index = this.getActualPlailistIndex();
      if (index > 0) {
        this.start(this.playlist[index - 1]);
      } else {
        this.start(this.playlist[this.playlist.length - 1]);
      }
  }

  /**
   * Текущее состояние
   */
  seek() {
    const newValue = +this.range.value;
    const duration = this.player.duration();
    this.playerSeek = duration * (newValue / 100);
  }

  get playerSeek() {
    return this.player.seek();
  }

  set playerSeek(value) {
    this.player.seek(value);
  }

  get seekState() {
    // tslint:disable-next-line:prefer-const
    let {minutes, seconds} = this.calculateTrackProgress(this.playerSeek);
    if (Number.isNaN(seconds)) {
      seconds = 0;
    }
    const timeResult = `${seconds} сек`;
    if (minutes > 0) {
      return `${minutes} мин `.concat(timeResult);
    }
    return timeResult;
  }

  /**
   * Метод вычисления прогресса проигрывания
   */
  get durationState() {
    const {minutes, seconds} = this.calculateTrackProgress(this.trackDuration);
    return `${minutes} мин ${seconds} сек`;
  }

  get trackDuration() {
    return this.player.duration();
  }

  /**
   *
   * @param value number
   */
  private calculateTrackProgress(value: number) {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value - (minutes * 60));
    return {minutes, seconds};
  }

  /**
   * Обновления прогреса проигрывания
   */
  updateProgress() {
    const seek = this.playerSeek;
    this.progress = ((seek / this.player.duration()) * 100) || 0;

    if (this.isPlaying) {
      setTimeout(() => {
        this.updateProgress();
      } , 100);
    }
  }
}
