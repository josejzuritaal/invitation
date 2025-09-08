import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealOnScrollDirective} from '../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {

  isPlaying = false;

  toggleMusic() {
    const audio = document.getElementById('musica') as HTMLAudioElement;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }


}
