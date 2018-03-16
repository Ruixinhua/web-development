var events = require('events');
var eventEmitter = new events.EventEmitter();
var params = require('./params.js').params;
var net = require('net');
var fs = require("fs");
var client = new net.Socket();

var eSession = function eSession(res, session) {
    params.session = session;
    console.log('Set session ID: ' + params.session);
    res.send(params.session);
}

var eWidth = function eWidth(res) {
    client.connect(params.port, params.host, function() {
        console.log('CONNECTED TO: ' + params.host + ":" + params.port);
        var GET_PARAMETER = 'GET_PARAMETER  ' + params.rtsp + ' RTSP/1.0\r\n' +
            'CSeq: 100\r\nSession: ' + params.session + '\r\n\r\n';
        client.write(GET_PARAMETER);

        client.on('data', function(data) {
            console.log('RECEIVED FROM ' + params.host + ':' + params.port + ': ' + data);
            var dataStr = String(data);
            var patt = new RegExp('RTSP/1.0 200 OK');
            var success = patt.test(dataStr);
            if (success) {
                var value = dataStr.match(/\r\n([0-9]+)/)[1];
                params.width = value;
                params.x = value;
                params.amplification = 1;
                console.log('GET WIDTH: ' + value);
                res.send(value);
            } else {
                console.log('GET WIDTH FAILURE:' + value);
            }
            client.destroy();
        });

        client.on('close', function() {
            console.log('Connection closed');
        });
    });
}

eventEmitter.addListener('session', eSession);
eventEmitter.addListener('width', eWidth);

exports.events = eventEmitter;