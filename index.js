var express = require('express'),
    app = express();

app.use('/',express.static(__dirname));
app.use('/bootstrap',express.static(__dirname+'/node_modules/bootstrap'));
app.use('/d3',express.static(__dirname+'/node_modules/d3'));
app.use('/d3-queue',express.static(__dirname+'/node_modules/d3-queue'));
app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist'));

app.listen(8080);
console.log('App listening on port 8080');