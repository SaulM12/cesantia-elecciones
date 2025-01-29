import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PrimeNG } from 'primeng/config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cesantiaFront';

  constructor(private config: PrimeNG) {}

  ngOnInit() {
    this.translateToSpanishPrimeNgComponents();
  }

  translateToSpanishPrimeNgComponents() {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      accept: 'Aceptar',
      reject: 'Cancelar',
      dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      weak: 'Semana',
      startsWith: 'Empieza por',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina por',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Sin filtro',
      emptyFilterMessage: 'Sin resultados',
      emptyMessage: 'No se han encontrado resultados',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      is: 'Es',
      isNot: 'No es',
      before: 'Antes',
      clear: 'Limpiar',
      apply: 'Filtrar',
      after: 'Después',
      dateFormat: 'yy-mm-dd',
    });
  }
}
