import { Component, OnInit, OnDestroy } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevealOnScrollDirective} from '../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  // 1) Variables que almacenan el texto que se mostrará en la plantilla (interpolación)
  diasFaltantes: string = '000';
  horasFaltantes: string = '00';
  minutosFaltantes: string = '00';
  segundosFaltantes: string = '00';

  // 2) ID del setInterval (para poder limpiarlo luego)
  private intervalId!: any;

  // 3) Fecha objetivo (puedes ajustarla a tu fecha/hora deseada)
  private fechaObjetivo: number =
    new Date('November 29, 2025 20:00:00').getTime();

  constructor() {}

  ngOnInit(): void {
    // Iniciamos la cuenta regresiva tan pronto se cargue el componente
    this.iniciarCuentaRegresiva();
  }

  ngOnDestroy(): void {
    // Al destruirse el componente, detenemos el intervalo para no filtrar memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // ----------------------------
  // 4) MÉTODO QUE ACTUALIZA CADA SEGUNDO
  // ----------------------------
  private iniciarCuentaRegresiva(): void {
    this.intervalId = setInterval(() => {
      const ahora = new Date().getTime();
      const diff = this.fechaObjetivo - ahora;

      if (diff <= 0) {
        // Cuando llegue o pase la fecha, detenemos el intervalo y mostramos “00:00:00:00”
        clearInterval(this.intervalId);
        this.diasFaltantes = '000';
        this.horasFaltantes = '00';
        this.minutosFaltantes = '00';
        this.segundosFaltantes = '00';
        return;
      }

      // Convertimos la diferencia a segundos totales
      const segTot = Math.floor(diff / 1000);
      // Calculamos días, horas, minutos y segundos
      const dias   = Math.floor(segTot / (24 * 3600));
      const horas  = Math.floor((segTot % (24 * 3600)) / 3600);
      const min    = Math.floor((segTot % 3600) / 60);
      const seg    = segTot % 60;

      // Formateamos cada parte con ceros a la izquierda
      this.diasFaltantes    = this.formatearNumero(dias, 3);
      this.horasFaltantes   = this.formatearNumero(horas, 2);
      this.minutosFaltantes = this.formatearNumero(min, 2);
      this.segundosFaltantes= this.formatearNumero(seg, 2);
    }, 1000);
  }

  // ----------------------------
  // 5) MÉTODO AUXILIAR: agrega ceros a la izquierda
  //    por ejemplo, formatearNumero(5, 2) → "05"
  //                 formatearNumero(12,3) → "012"
  // ----------------------------
  private formatearNumero(valor: number, digitos: number): string {
    return valor.toString().padStart(digitos, '0');
  }
}
