import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealOnScrollDirective} from '../shared/reveal-on-scroll.directive';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective,],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineContainer', { static: false })
  timelineContainer!: ElementRef<HTMLElement>;

  @ViewChild('timelineProgress', { static: false })
  timelineProgress!: ElementRef<HTMLElement>;

  private rafId: number | null = null;

  ngAfterViewInit(): void {
    // Primer cálculo justo después de renderizar el componente
    this.actualizarProgresoLinea();
  }

  ngOnDestroy(): void {
    // Cuando el componente se destruye, cancelamos cualquier rAF pendiente
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Cada vez que hay un evento de scroll, recalculamos la altura de la barra
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => {
      this.actualizarProgresoLinea();
    });
  }

  private actualizarProgresoLinea(): void {
    if (!this.timelineContainer || !this.timelineProgress) {
      return;
    }

    const timelineEl = this.timelineContainer.nativeElement;
    const progressEl = this.timelineProgress.nativeElement;

    // Datos principales
    const rect = timelineEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Coordenadas absolutas
    const timelineTop = rect.top + window.scrollY;
    const timelineBottom = timelineTop + rect.height;

    const scrollTop = window.scrollY;
    const scrollBottom = scrollTop + windowHeight;

    // Puntos de inicio y fin de la animación
    const start = timelineTop - windowHeight * 0.5; // Empieza a la mitad inferior de la pantalla
    const end = timelineBottom - windowHeight * 0.2; // Termina cuando casi se sale por abajo

    let pct = (scrollBottom - start) / (end - start);
    pct = Math.max(0, Math.min(pct, 1)); // Limita entre 0 y 1

    // Progreso real
    const newHeight = pct * rect.height;
    progressEl.style.height = `${newHeight}px`;
  }

}
