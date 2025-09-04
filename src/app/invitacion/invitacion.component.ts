// src/app/invitation/invitation.component.ts

import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  HostListener, Output, EventEmitter
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-invitacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imagenScroll', {static: true}) imagenScroll!: ElementRef;
  @Output() abrir = new EventEmitter<void>();
  opened = false;

  @ViewChild('bgMusic', {static: false}) bgMusic!: ElementRef<HTMLAudioElement>;

  diasFaltantes: string = '000';
  horasFaltantes: string = '00';
  minutosFaltantes: string = '00';
  segundosFaltantes: string = '00';

  private intervalId: any;
  private fechaObjetivo = new Date('November 29, 2025 20:00:00').getTime();

  private revealObserver!: IntersectionObserver;
  private timelineObserver!: IntersectionObserver;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.iniciarCuentaRegresiva();
  }

  ngAfterViewInit(): void {
    // 1) IntersectionObserver para revelar elementos .reveal
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            this.revealObserver.unobserve(entry.target);
          }
        });
      },
      {root: null, rootMargin: '0px', threshold: 0.1}
    );

    // 3) Observar todos los nodos con .reveal
    const revealElems = document.querySelectorAll<HTMLElement>('.reveal');
    revealElems.forEach(elem => this.revealObserver.observe(elem));
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    document.body.style.overflow = 'auto';

    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }
    if (this.timelineObserver) {
      this.timelineObserver.disconnect();
    }
  }

  openEnvelope(): void {
    this.opened = true;
    this.abrir.emit();
    document.body.style.overflow = 'auto';
    if (this.bgMusic && this.bgMusic.nativeElement) {
      this.bgMusic.nativeElement.play().catch(err => {
        console.warn('No se pudo reproducir la música automáticamente:', err);
      });
    }
  }

  private iniciarCuentaRegresiva(): void {
    this.intervalId = setInterval(() => {
      const ahora = Date.now();
      const diff = this.fechaObjetivo - ahora;
      if (diff <= 0) {
        clearInterval(this.intervalId);
        this.diasFaltantes = '000';
        this.horasFaltantes = '00';
        this.minutosFaltantes = '00';
        this.segundosFaltantes = '00';
        return;
      }
      const segTot = Math.floor(diff / 1000);
      const dias = Math.floor(segTot / (24 * 3600));
      const horas = Math.floor((segTot % (24 * 3600)) / 3600);
      const min = Math.floor((segTot % 3600) / 60);
      const seg = segTot % 60;

      this.diasFaltantes = this.formatearNumero(dias, 3);
      this.horasFaltantes = this.formatearNumero(horas, 2);
      this.minutosFaltantes = this.formatearNumero(min, 2);
      this.segundosFaltantes = this.formatearNumero(seg, 2);
    }, 1000);
  }

  private formatearNumero(valor: number, digitos: number): string {
    return valor.toString().padStart(digitos, '0');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    // 1) Efecto de la imagen dividida
    const contenedor: HTMLElement = this.imagenScroll.nativeElement;
    const topEl = contenedor.getBoundingClientRect().top + window.scrollY;
    const topWin = window.scrollY;
    const altoWin = window.innerHeight;

    if (topWin + altoWin * 0.6 > topEl) {
      contenedor.classList.add('scroll-joined');
    } else {
      contenedor.classList.remove('scroll-joined');
    }
  }
}


