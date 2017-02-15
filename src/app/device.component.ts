import { Component, Input } from '@angular/core';

import { Fan } from './device';

@Component({
  selector: '[tr-fan]',
  template: `
    <td class="mdl-data-table__cell--non-numeric">
      {{fan.name}}
    </td>
    <!-- Auto -->
    <td class="mdl-data-table__cell--non-numeric">
      <mdl-switch [ngModel]="fan.isAutoMode"  (ngModelChange)="fan.setMode($event)"></mdl-switch>
    </td>
    <td class="mdl-data-table__cell--non-numeric">
      <!-- RELAY Current Value-->
      <mdl-switch *ngIf="fan.getDeviceType() == fan.deviceType.RELAY"  [ngModel]="fan.value" [disabled]="fan.isAutoMode" (ngModelChange)="fan.setValue($event)"></mdl-switch>

      <!-- DIMMER_OUT Current Value-->
      <mdl-slider *ngIf="fan.getDeviceType() == fan.deviceType.DIMMER_OUT" [min]="0" [max]="100" [step]="1" [ngModel]="fan.value" [disabled]="fan.isAutoMode" (ngModelChange)="fan.setValue($event)"></mdl-slider>
    </td>
  `
})
export class FanComponent {
  _fan: Fan;

  @Input() set fan(val: Fan){
    this._fan = val;
  }

  get fan(): Fan {
    return this._fan;
  }
}

@Component({
  selector: '[table-fans]',
  template: `
       <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">{{deviceCategory}}</th>
          <th>Auto</th>
          <th>Current State</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let fan of fans" tr-fan [fan]="fan"></tr>
      </tbody>
  `
})

export class FanComponents {
  _fans: Fan[];

  @Input() set fans(val: Fan[]){
    this._fans = val;
  }

  get fans(): Fan[] {
    return this._fans;
  }

  @Input() deviceCategory: string
}

