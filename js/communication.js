var net = require('net');
var client = new net.Socket();

//var HOST = '172.25.25.220';
//var PORT = '554';
var HOST = '192.168.222.1';
var PORT = '554';
client.connect(PORT, HOST, function() {
	console.log('CONNECTED TO: ' + HOST + ":" + PORT);

	client.on('data', function(data) {
		console.log('RECEIVED: ' + data);
		if (data == 'end')
			client.destroy();
	});

	client.on('close', function() {
		console.log('Connection closed');
	});
});
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		chunk = chunk.slice(0, -2);
		if (chunk === '') {
			process.stdin.emit('end');
			return;
		}
		client.write(chunk);
	}
});
process.stdin.on('end', () => {
	console.log('STDIN closed');
});
