import { Component, Input } from '@angular/core';

import { Device } from './device';

@Component({
  selector: '[tr-device]',
  template: `
    <!-- Name -->
    <td class="mdl-data-table__cell--non-numeric">
      {{device.name}}
    </td>
    <!-- Auto -->
    <td class="mdl-data-table__cell--non-numeric">
      <mdl-switch [ngModel]="device.mode"  (ngModelChange)="device.mode = $event"></mdl-switch>
    </td>
    
    <!-- Current Value / Manual Value -->
    <td class="mdl-data-table__cell--non-numeric">
      <!-- RELAY Current Value-->
      <mdl-switch *ngIf="device.getDeviceType() == device.deviceType.RELAY"  [ngModel]="device.value" [disabled]="device.mode" (ngModelChange)="device.value = $event"></mdl-switch>

      <!-- DIMMER_OUT Current Value-->
      <div *ngIf="device.getDeviceType() == device.deviceType.DIMMER_OUT">
        <div style="width: 300px;">
          <mdl-slider [min]="0" [max]="100" [step]="1" [ngModel]="device.value" [disabled]="device.mode" (ngModelChange)="device.value = $event"></mdl-slider>
        </div>
        <div>{{device.value}}</div>
      </div>
    </td>
  `
})
export class DeviceComponent {
  _device: Device<any>;

  @Input() set device(val: Device<any>){
    this._device = val;
  }

  get device(): Device<any> {
    return this._device;
  }
}

@Component({
  selector: '[table-devices]',
  template: `
       <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">{{deviceCategory}}</th>
          <th>Auto</th>
          <th>Current State</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let device of devices" tr-device [device]="device"></tr>
      </tbody>
  `
})

export class DeviceComponents {
  _devices: Device<any>[];

  @Input() set devices(val: Device<any>[]){
    this._devices = val;
  }

  get devices(): Device<any>[] {
    return this._devices;
  }

  @Input() deviceCategory: string
}

