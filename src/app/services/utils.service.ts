import { Injectable } from '@angular/core';
import { Card } from '../entitys/Card';

@Injectable({
  providedIn: 'root'
})

/*
    SERVICIO ENCARGADO DE DAR FUNCIONES DE TRATAMIENTO DE DATOS
*/

export class UtilService {

  constructor() {

  }

  calMarginLeft(index: number, ancho: number, anchoElemento: number, cantidad: number): string {

    /* console.log("! -- ancho "+ancho+" anchoelemento "+anchoElemento+" cantidad "+cantidad); */

    let margen = 0;

    if (index > 0) {
      if (ancho <= (anchoElemento * cantidad) + 10 * cantidad) {
        margen = ancho - (anchoElemento * cantidad);
        margen = margen / (cantidad - 1) - 1;
        return margen + 'px';
      } else {
        return '10px';
      }
    } else {

      margen = (ancho - (anchoElemento * cantidad)) / 2;

      if (index === 0 && ancho >= margen + ((anchoElemento + 10) * cantidad) - 10) {
        return margen + 'px';
      }
    }

    return '0px';

  }

  px(numero: number): string {
    return numero + 'px';
  }

  pilaRandom(cards: Card[]) {

    const pila: Card[] = [];
    const iteraciones: number = cards.length;

    for (let i = 1; i <= iteraciones; i++) {

      const x: number = this.randomEntero(iteraciones - i, 0);
      pila.push(cards[x]);
      cards.splice(x, 1);
    }

    return pila;

  }

  randomEntero(max: number, min: number) {
    return  Math.floor(Math.random() * (max - min)) + min;
  }

}
