import { Component, Input } from '@angular/core';

import { Fan } from './device';

@Component({
  selector: 'fan',
  template: `
    <div *ngIf="fan">
      <h3>Fan: {{fan.name}};</h3><br/>

      <span>AUTO: {{fan.isAutoMode}};</span><br/>
      <span>Value: {{fan.value}};</span><br/>

      <!-- Auto-->
      <mdl-switch [ngModel]="fan.isAutoMode"  (ngModelChange)="fan.setMode($event)"></mdl-switch>
  
      <!-- RELAY Current Value-->
      <mdl-switch *ngIf="fan.getDeviceType() == fan.deviceType.RELAY"  [ngModel]="fan.value" [disabled]="fan.isAutoMode" (ngModelChange)="fan.setValue($event)"></mdl-switch>
      
      <!-- DIMMER_OUT Current Value-->
      <mdl-slider *ngIf="fan.getDeviceType() == fan.deviceType.DIMMER_OUT" [min]="0" [max]="100" [step]="1" [ngModel]="fan.value" [disabled]="fan.isAutoMode" (ngModelChange)="fan.setValue($event)"></mdl-slider>
      
  `
})

export class FanComponent {
  @Input()
  fan : Fan;
}

