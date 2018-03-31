var events = require('events');
var eventEmitter = new events.EventEmitter();
var params = require('./params.js').params;
var net = require('net');
var fs = require("fs");
var client;

var eSession = function eSession(res, args) {
    params.session = args.param;
    console.log('Set session ID: ' + params.session);
    res.write(params.session);
    res.end();
}

var eAmplification = function eAmplification(res, args) {
    client = new net.Socket();
    client.connect(params.port, params.host, function() {
        console.log('CONNECTED TO: ' + params.host + ":" + params.port);
        var len = String(args.param).length + String(params.x).length + 1;
        var SET_PARAMETER = 'SET_PARAMETER  ' + params.rtsp + ' RTSP/1.0\r\n' +
            'CSeq: 128\r\nSession: ' + params.session + '\r\nContent-length: ' +
            len + '\r\nContent-type: text/parameters\r\n\r\n' + params.x + ',' + args.param +
            '\r\n\r\n';
        client.write(SET_PARAMETER);

        client.on('data', function(data) {
            console.log('AMPLIFICATION RECEIVED FROM ' + params.host + ':' + params.port + ': ' + data);

            var dataStr = String(data);
            var patt = new RegExp('RTSP/1.0');
            var patt1 = new RegExp('Session: ' + params.session);
            if (patt.test(dataStr) && patt1.test(dataStr)) {
                params.amplification = args.param;
                console.log('AMPLIFICATION CHANGED: ' + params.amplification);
                res.write(params.amplification);
                res.end();
            } else {
                console.log('AMPLIFICATION CHANGED FAILURE:' + data);
            }
            client.destroy();
        });

        client.on('close', function() {
            console.log('Connection closed');
        });
    });
}

var eX = function eX(res, args) {
    client = new net.Socket();
    client.connect(params.port, params.host, function() {
        console.log('CONNECTED TO: ' + params.host + ":" + params.port);
        var len = String(args.param).length + String(params.amplification).length + 1;
        var SET_PARAMETER = 'SET_PARAMETER  ' + params.rtsp + ' RTSP/1.0\r\n' +
            'CSeq: 128\r\nSession: ' + params.session + '\r\nContent-length: ' +
            len + '\r\nContent-type: text/parameters\r\n\r\n' + args.param + ',' + params.amplification +
            '\r\n\r\n';
        client.write(SET_PARAMETER);

        client.on('data', function(data) {
            console.log('X RECEIVED FROM ' + params.host + ':' + params.port + ': ' + data);

            var dataStr = String(data);
            var patt = new RegExp('RTSP/1.0');
            var patt1 = new RegExp('Session: ' + params.session);
            if (patt.test(dataStr) && patt1.test(dataStr)) {
                params.x = args.param;
                console.log('X CHANGED: ' + params.x);
                res.write(params.x);
                res.end();
            } else {
                console.log('X CHANGED FAILURE:' + data);
            }
            client.destroy();
        });

        client.on('close', function() {
            console.log('Connection closed');
        });
    });
}

var eWidth = function eWidth(res, args) {
    client = new net.Socket();
    client.connect(params.port, params.host, function() {
        console.log('CONNECTED TO: ' + params.host + ":" + params.port);
        var GET_PARAMETER = 'GET_PARAMETER  ' + params.rtsp + ' RTSP/1.0\r\n' +
            'CSeq: 100\r\nSession: ' + params.session + '\r\n\r\n';
        client.write(GET_PARAMETER);

        client.on('data', function(data) {
            console.log('WIDTH RECEIVED FROM ' + params.host + ':' + params.port + ': ' + data);
            var dataStr = String(data);
            var patt = new RegExp('RTSP/1.0 200 OK');
            var success = patt.test(dataStr);
            if (success) {
                var value = dataStr.match(/\r\n([0-9]+)/)[1];
                params.width = value;
                params.x = value;
                params.amplification = 1;
                console.log('GET WIDTH: ' + value);
                res.write(value, function() {
                    res.end();
                });

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
eventEmitter.addListener('x', eX);
eventEmitter.addListener('amplification', eAmplification);

exports.events = eventEmitter;