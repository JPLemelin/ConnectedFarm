'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// TODO: unit-test it => https://firebase.google.com/docs/functions/unit-testing

/**
 * Register on data change of /current/{device_type}/{device_id}/value
 *  - Update lastmodified
 *  - Add it to the history
 */
exports.onDeviceUpdate = functions.database.ref('/current/{deviceType}/{deviceId}/value').onWrite( event => {
  const deviceType = event.params.deviceType;
  const deviceId = event.params.deviceId;
  const value = event.data.val();

  admin.database().ref('/current/' + deviceType + '/' + deviceId + '/lastmodified').set(event.timestamp);
});
