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

export enum DeviceType {
  RELAY,
  DIMMER_OUT,
  TEMPERATURE,
}

export class Device<T> {

  // Export enum
  deviceType = DeviceType;

  private _deviceType: DeviceType;
  private _isAutoMode: boolean;
  private _manualValue: T;
  private _autoValue: T;

  private _fbIsAutoMode: FirebaseObjectObservable<any>;
  private _fbValue: FirebaseObjectObservable<any>;
  private _fbManualValue: FirebaseObjectObservable<any>;


  constructor(af: AngularFire, public name: string, device_type: string, device_id: string){
    this._fbIsAutoMode = af.database.object('/current' + '/' + device_type + '/' + device_id + '/' + 'is_auto_mode');
    this._fbValue = af.database.object('/current' + '/' + device_type + '/' + device_id + '/' + 'value');
    this._fbManualValue = af.database.object('/current' + '/' + device_type + '/' + device_id + '/' + 'manual_value');

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

    this._fbIsAutoMode.subscribe(snapshot => {
      this._isAutoMode = snapshot.$value;
    });

    this._fbValue.subscribe(snapshot => {
      this._autoValue = snapshot.$value;
    });

    this._fbManualValue.subscribe(snapshot => {
      this._manualValue = snapshot.$value;
    });
  }

  set mode(value: boolean) {
    this._fbIsAutoMode.set(value);
  }

  get mode():boolean {
    return this._isAutoMode;
  }

  set value(value: T) {
    this._manualValue = value;
    this._fbManualValue.set(value);
  }

  get value(): T {
    if (this._isAutoMode) {
      return this._autoValue;
    } else {
      return this._manualValue;
    }
  }

  getDeviceType(): DeviceType {
    return this._deviceType;
  }

}

