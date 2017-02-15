// import {FirebaseRef}  from 'angularfire2';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

// interface Device {
//   value: number;
// }
//
// interface DeviceInput extends Device {
// }
//
// export interface DeviceOutput extends Device {
//   mode: number|string;
// }
//
// class DeviceRelay implements DeviceOutput {
//   mode: number|string;
//   value: number;
// }
//
// class DeviceDimmerOut implements DeviceOutput {
//   mode: number|string;
//   value: number;
// }
//
// class DeviceTempSensor implements DeviceInput {
//   value: number;
// }
//
// export function createDevice(af: AngularFire, devices_ref: string, device_type: string, device_id: string): DeviceOutput
// {
//   var newDevice;
//   var deviceRef = af.database.object(devices_ref + '/' + device_type + '/' + device_id).$ref;
//   if (device_type == 'relays') {
//     newDevice = new DeviceRelay();
//
//     newDevice.mode = deviceRef.child('mode');
//     newDevice.value = deviceRef.child('value');
//   }
//   else if (device_type == 'dimmers_out') {
//
//   }
//
//   return newDevice;
// }


// export class Fan {
//
//   name: string;
//   device: DeviceOutput;
//
//   constructor(name: string, device: DeviceOutput) {
//     this.name = name
//     this.device = device
//   }
// }

export enum DeviceType {
  RELAY,
  DIMMER_OUT,
  TEMPERATURE,
}

export class Fan {

  deviceType = DeviceType;

  isAutoMode: boolean;
  value: boolean | number;

  private _deviceType: DeviceType;
  private _mode: FirebaseObjectObservable<any>;
  private _value: FirebaseObjectObservable<any>;

  constructor(af: AngularFire, public name: string, device_type: string, device_id: string){
    this._mode = af.database.object('/current' + '/' + device_type + '/' + device_id + '/' + 'mode');
    this._value = af.database.object('/current' + '/' + device_type + '/' + device_id + '/' + 'value');

    // TODO: Refactor
    if (device_type == "relays") {
      this._deviceType = DeviceType.RELAY;
    } else if (device_type == "dimmers_out") {
      this._deviceType = DeviceType.DIMMER_OUT;
    } else if (device_type == "temp_sensors") {
      this._deviceType = DeviceType.TEMPERATURE;
    } else {
      throw new TypeError("Unknown type: " + device_type);
    }


    this._mode.subscribe(snapshot => {
      this.isAutoMode = snapshot.$value == "auto"
    });

    this._value.subscribe(snapshot => {
      this.value = snapshot.$value
    });
  }

  setMode(is_auto: boolean) {
    if (is_auto) {
      this._mode.set("auto");
    }
    else {
      this._mode.set(this.value);
    }
  }

  setValue(value: boolean | number) {
    if (this.isAutoMode == false) {
      this._mode.set(value);
    }
    else {
      // Should not happened!
    }
  }

  getDeviceType(): DeviceType {
    return this._deviceType;
  }


}

