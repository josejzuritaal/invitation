import { Component } from '@angular/core';
import {RevealOnScrollDirective} from '../shared/reveal-on-scroll.directive';
import { MatIconModule } from '@angular/material/icon';
import {NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {
  CarouselCaptionComponent,
  CarouselComponent, CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from '@coreui/angular';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-vestimenta',
  imports: [
    RevealOnScrollDirective, MatIconModule, NgbCarouselModule, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink
  ],
  templateUrl: './vestimenta.component.html',
  styleUrls: ['./vestimenta.component.css']
})
export class VestimentaComponent {
  slides: any[] = new Array(3).fill({ id: -1, src: ''
});
  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'imagenes/carrusel/5.jpg',

    };
    this.slides[1] = {
      id: 1,
      src: 'imagenes/carrusel/3.jpg',

    };
    this.slides[2] = {
      id: 2,
      src: 'imagenes/carrusel/4.jpg',

    };
    this.slides[3] = {
      id: 3,
      src: 'imagenes/carrusel/1.jpg',

    };
  }
}


