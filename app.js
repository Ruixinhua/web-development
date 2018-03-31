const express = require('express');
var http = require('http');
const app = express();
const url = require('url');
const event = require('./js/vlc_event.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('html'));
app.use(express.static('js'));
app.use(express.static('css'));
app.use(express.static('resources'));

app.get('/test', function(req, res) {
    console.log('1');
    var opt = {
        host: 'http://127.0.0.1',
        port: '8080',
        method: 'GET',
        path: '/DataServer/local/test'
    };
    var content = '';
    var reqe = http.request(opt, function(resp) {
        resp.on('data', function(body) {
            console.log('return');
            content += body;
        }).on("end", function() {
            res.end(content);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        reqe.end();
    })
})

app.get('/connect', function(req, res) {
    var params = url.parse(req.url, true).query;
    var ps = require('./js/params.js').params;
    console.log("主页 GET 请求: " + params.a);
    res.send("Test 请求 " + ps.session);
})

app.post('/event', urlencodedParser, function(req, res) {
    var response = {
        name: req.body.name,
        param: req.body.param
    };
    console.log(response);
    event.events.emit(response.name, res, response);
})

app.listen(8085, () => {
    console.log(`App listening at port 8085`)
})