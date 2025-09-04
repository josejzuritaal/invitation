// src/app/app.component.ts
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule }              from '@angular/common';
import { RouterModule }              from '@angular/router';
import { InvitationComponent }       from './invitacion/invitacion.component';
import { PortadaComponent }          from './portada/portada.component';
import { CountdownComponent }        from './countdown/countdown.component';
import { TimelineComponent }         from './timeline/timeline.component';
import { RevealOnScrollDirective }   from './shared/reveal-on-scroll.directive';
import { VestimentaComponent }       from './vestimenta/vestimenta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InvitationComponent,
    PortadaComponent,
    CountdownComponent,
    TimelineComponent,
    RevealOnScrollDirective,
    VestimentaComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invitacion-digital';
  sobreAbierto = false;
  @ViewChild('bgMusic', { static: false }) bgMusic!: ElementRef<HTMLAudioElement>;


  manejarAbrir() {
    this.sobreAbierto = true;
    document.body.style.overflow = 'auto'; // Activa scroll cuando se abre el sobre
    setTimeout(() => {
      if (this.bgMusic && this.bgMusic.nativeElement) {
        this.bgMusic.nativeElement.currentTime = 0;
        this.bgMusic.nativeElement.play().catch(err => {
          console.warn('No se pudo reproducir la música automáticamente:', err);
        });
      }
    }, 100);
  }



  ngOnInit() {
    document.body.style.overflow = 'hidden'; // Bloquea scroll mientras esté cerrado el sobre
  }

}
