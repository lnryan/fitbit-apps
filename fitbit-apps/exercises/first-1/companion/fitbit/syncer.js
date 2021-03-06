/*  Copied from sdk-moment/companion/simple/component-settings.js. 
    Renamed to communicate what it actually does. 
  */
import * as messaging from "messaging";
import { settingsStorage } from "settings";

export function initialize() {
  settingsStorage.addEventListener("change", evt => {
    if (evt.oldValue !== evt.newValue) {
      //console.log('New Setting',evt.key,evt.newValue);
      sendValue(evt.key, evt.newValue);
    }
  });
}

function sendValue(key, val) {
  if (val) {
    //console.log(JSON.stringify(val));
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}