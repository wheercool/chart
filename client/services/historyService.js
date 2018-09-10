import {delay} from '../utils'
import {representingInterval, makePoint, mergePoints} from '../model/channelModel'

const dataInterval = {min: 0, max: 1000}
const channelsData = {
  // "Temperature": [],
  // "Pressure": []
};

var temperature = [],
    pressure = [],
    torque = [];

for (var i = dataInterval.min; i < dataInterval.max / 3; i++) {
  temperature.push(makePoint(i, i))
  pressure.push(makePoint(i, i + 2))
  torque.push(makePoint(i, i * 2))
}

for (var i = dataInterval.max / 3; i < dataInterval.max / 2; i++) {
  temperature.push(makePoint(i, dataInterval.max /3 - i,))
  pressure.push(makePoint(i, dataInterval.max /3 - i + 2))
  torque.push(makePoint(i, (dataInterval.max /3 - i) * 2))
}

for (var i = dataInterval.max / 2; i < dataInterval.max; i++) {
  temperature.push(makePoint(i, i))
  pressure.push(makePoint(i, i + 2))
  torque.push(makePoint(i, i * 2))
}

export default function(url, requrestedInterval, channels, zoom) {
    // var url = '/ajax/' + offset + '/' + (offset + 2000);
    var mergedPoints = mergePoints(null,
                  representingInterval(requrestedInterval, torque),
                  representingInterval(requrestedInterval, pressure)
               );

    var response = {
        requrestedInterval,
        dataInterval,
        channels,
        values: mergedPoints
    }
    return delay(300, response);
    // return fetch(url);

}
