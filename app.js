var express = require('express'),
	app = express.createServer();


app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false
	});
	app.set('view cache', false);

	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/static'));
	app.use(app.router);
});

var main = require('./controllers/main.js');
app.get('/', main.index);
app.get('/thegoods/', main.resume);
app.get('/resources.1337.js', require('./controllers/resources.js').index);
app.get('/less/:filename.css', require('./controllers/less.js').compile);

//Setup socket.io stats
require('./stats').register(app);

app.listen(process.env.PORT||8080);
