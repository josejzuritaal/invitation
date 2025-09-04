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


}
